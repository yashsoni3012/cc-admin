import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import useSubmit from "../../hooks/useSubmit";
import { API } from "../../api/endpoints";
import { Toast, useToast } from "../../components/Toast";

const Spinner = () => (
  <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const ArticleManager = () => {
  // ✅ CHANGE 1: 'setArticles' chya aivaji 'refetch' ghetla
  const { data: rawArticles, loading, refetch } = useFetch(API.ARTICLES.LIST);
  const { data: rawCourses } = useFetch(API.COURSES.LIST);

  const { submitData, loading: submitting } = useSubmit();
  const { toast, showToast, closeToast } = useToast();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null });
  const [isDeleting, setIsDeleting] = useState(false);

  const initialForm = { 
    description: "", 
    text: "", 
    tag: "", 
    course: "", 
    admin_id: 1, 
    image: null 
  };
  const [formData, setFormData] = useState(initialForm);

  // Helper for Images
  const getImageUrl = (img) => {
    if (img instanceof File) return URL.createObjectURL(img);
    if (typeof img === 'string' && img) {
        const timestamp = new Date().getTime();
        if (img.startsWith("http")) return `${img}?t=${timestamp}`;
        const BASE = "https://codingcloud.pythonanywhere.com";
        const cleanPath = img.startsWith("/") ? img : `/${img}`;
        return `${BASE}${cleanPath}?t=${timestamp}`;
    }
    return "https://via.placeholder.com/150?text=No+Img";
  };

  const safeArticles = Array.isArray(rawArticles) ? rawArticles : (rawArticles?.results || rawArticles?.data || []);
  const safeCourses = Array.isArray(rawCourses) ? rawCourses : (rawCourses?.results || rawCourses?.data || []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFile = (e) => setFormData({ ...formData, image: e.target.files[0] });

  const handleEdit = (item) => {
    setFormData({
        description: item.description || "",
        text: item.text || "",
        tag: item.tag || "",
        course: item.course || "",
        admin_id: item.admin_id || 1,
        image: item.image
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData(initialForm);
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("description", formData.description);
    formDataToSend.append("text", formData.text);
    formDataToSend.append("tag", formData.tag);
    formDataToSend.append("course", formData.course);
    formDataToSend.append("admin_id", formData.admin_id);

    if (formData.image instanceof File) {
        formDataToSend.append("image", formData.image);
    }

    let result;
    if (editingId) {
      // --- UPDATE ---
      result = await submitData(API.ARTICLES.DETAIL(editingId), formDataToSend, true, 'PATCH');
      if (result.success) {
        showToast("Article updated", "success");
        // ✅ CHANGE 2: Manually state update karnyapeksha 'refetch()' call kara
        // He server varun fresh list aanel (juna data gayap honar nahi)
        refetch();
        resetForm();
      } else {
        showToast("Update failed", "error");
      }
    } else {
      // --- CREATE ---
      result = await submitData(API.ARTICLES.LIST, formDataToSend, true, 'POST');
      if (result.success) {
        showToast("Article created", "success");
        // ✅ CHANGE 3: Create zalyavar parat list aanli (Refresh sarkha)
        refetch();
        resetForm();
      } else {
        showToast("Creation failed", "error");
      }
    }
  };

  const confirmDelete = async () => {
    if (!deleteModal.id) return;
    setIsDeleting(true);
    const result = await submitData(API.ARTICLES.DETAIL(deleteModal.id), {}, false, 'DELETE');
    setIsDeleting(false);
    
    if (result.success) {
        showToast("Article deleted", "success");
        // ✅ CHANGE 4: Delete zalyavar pan list refresh kara
        refetch();
        setDeleteModal({ show: false, id: null });
    } else {
        showToast("Delete failed", "error");
    }
  };

  // ... (Khalcha UI Code same theva) ...
  return (
    <div className="container mx-auto p-5 min-h-screen">
      <Toast toast={toast} onClose={closeToast} />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Articles</h1>
        <button onClick={() => setShowForm(true)} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition flex items-center gap-2 cursor-pointer shadow-md">
          <span>+</span> New Article
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        {loading ? (
          <div className="h-40 flex items-center justify-center text-gray-500 gap-2"><Spinner /> Loading...</div>
        ) : (
          <table className="min-w-full">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-6 text-left w-16">#</th>
                <th className="py-3 px-6 text-left w-24">Image</th>
                <th className="py-3 px-6 text-left">Description</th>
                <th className="py-3 px-6 text-left w-32">Tag</th>
                <th className="py-3 px-6 text-left w-32">Course ID</th>
                <th className="py-3 px-6 text-center w-32">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {safeArticles.length > 0 ? safeArticles.map((item, i) => (
                <tr key={item.id || i} className="hover:bg-gray-50 transition">
                  <td className="py-4 px-6 text-gray-500">{i + 1}</td>
                  <td className="py-4 px-6">
                    <img src={getImageUrl(item.image)} className="h-12 w-12 object-cover rounded-md border border-gray-300" alt="Art" />
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-800 line-clamp-1">{item.description}</td>
                  <td className="py-4 px-6"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold">{item.tag}</span></td>
                  <td className="py-4 px-6 text-sm text-gray-500">{item.course}</td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex justify-center gap-3">
                        <button onClick={() => handleEdit(item)} className="bg-amber-500 text-white p-2 rounded hover:bg-amber-600 shadow-sm transition cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </button>
                        <button onClick={() => setDeleteModal({show:true, id:item.id})} className="bg-red-500 text-white p-2 rounded hover:bg-red-600 shadow-sm transition cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan="6" className="py-10 text-center text-gray-400">No articles found.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* FORM MODAL (Add/Edit) */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">{editingId ? "Edit Article" : "New Article"}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                
                <div>
                    <label className="block text-sm font-semibold mb-1 text-gray-700">Description</label>
                    <input name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-1 text-gray-700">Content Text</label>
                    <textarea name="text" value={formData.text} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-blue-500" rows="3" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold mb-1 text-gray-700">Tag (e.g. HTML)</label>
                        <input name="tag" value={formData.tag} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-blue-500" required />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1 text-gray-700">Select Course</label>
                        <select name="course" value={formData.course} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded bg-white outline-none focus:ring-2 focus:ring-blue-500" required>
                            <option value="">-- Select --</option>
                            {safeCourses.map(c => (
                                <option key={c.id} value={c.id}>{c.name || `Course ${c.id}`}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <input type="hidden" name="admin_id" value={formData.admin_id} />

                <div>
                    <label className="block text-sm font-semibold mb-1 text-gray-700">Article Image</label>
                    <div className="border p-2 rounded flex items-center gap-3">
                         <img src={getImageUrl(formData.image)} className="h-10 w-10 object-cover rounded" alt="Preview"/>
                         <input type="file" onChange={handleFile} className="w-full text-sm cursor-pointer" accept="image/*" />
                    </div>
                </div>

                <div className="flex gap-3 mt-4">
                    <button type="button" onClick={resetForm} className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-bold hover:bg-gray-300 cursor-pointer">Cancel</button>
                    <button type="submit" disabled={submitting} className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 flex justify-center items-center gap-2 cursor-pointer">
                        {submitting ? <><Spinner /> Saving...</> : "Save"}
                    </button>
                </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteModal.show && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center backdrop-blur-sm animate-fade-in">
            <div className="bg-white p-6 rounded-xl shadow-xl w-80 text-center">
                <h3 className="font-bold text-lg mb-2 text-gray-900">Delete Article?</h3>
                <p className="text-gray-500 text-sm mb-6">Cannot be undone.</p>
                <div className="flex gap-3">
                    <button onClick={() => setDeleteModal({show:false, id:null})} className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg font-semibold cursor-pointer">Cancel</button>
                    <button onClick={confirmDelete} className="flex-1 bg-red-600 text-white py-2 rounded-lg font-semibold flex justify-center items-center gap-2 cursor-pointer">
                        {isDeleting ? <Spinner /> : "Delete"}
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default ArticleManager;
