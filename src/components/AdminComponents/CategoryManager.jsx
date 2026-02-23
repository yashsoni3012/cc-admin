import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import useSubmit from "../../hooks/useSubmit";
import { API } from "../../api/endpoints";
import { Toast, useToast } from "../../components/Toast"; 

// --- Loader Component ---
const Spinner = () => (
  <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const CategoryManager = () => {
  const { data, loading, setData } = useFetch(API.CATEGORY.LIST);
  const { submitData, loading: submitting } = useSubmit();
  const { toast, showToast, closeToast } = useToast();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null });
  const [isDeleting, setIsDeleting] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState({ name: "", text: "", image: null });

  // --- ✅ FIXED: Handle Image URL for Previews ---
  const getImageUrl = (img) => {
    if (!img) return null;
    
    // 1. If it's a new File object (Upload Preview)
    if (img instanceof File) return URL.createObjectURL(img);

    // 2. Handle External URL
    if (typeof img === 'string') {
        const timestamp = new Date().getTime(); 
        if (img.startsWith("http") || img.startsWith("blob:")) return `${img}?t=${timestamp}`;
        
        // 3. Handle Server Relative Path
        const BASE_DOMAIN = "https://codingcloud.pythonanywhere.com";
        const cleanPath = img.startsWith("/") ? img : `/${img}`;
        return `${BASE_DOMAIN}${cleanPath}?t=${timestamp}`;
    }
    return null;
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFile = (e) => setFormData({ ...formData, image: e.target.files[0] });

  // --- ✅ FIXED: Load existing image URL into state ---
  const handleEdit = (item) => {
    setFormData({ 
        name: item.name || "", 
        text: item.text || "", 
        image: item.image // Keep the URL string so we can preview it
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({ name: "", text: "", image: null });
    setEditingId(null);
    setShowForm(false);
  };

  // --- ✅ FIXED: Robust Submit Handler (Like CourseManager) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Manually build FormData to control what gets sent
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("text", formData.text);

    // 2. Only append 'image' if it is a NEW File. 
    // If it is a string (old URL) or null, do NOT append it (or append empty string if creating)
    if (formData.image instanceof File) {
        formDataToSend.append("image", formData.image);
    } else {
        // If creating new, and no image, send empty string to avoid "required" errors (if backend allows blank)
        if (!editingId) formDataToSend.append("image", ""); 
    }

    let result;
    
    if (editingId) {
      // UPDATE
      result = await submitData(API.CATEGORY.DETAIL(editingId), formDataToSend, true, 'PATCH');
      
      if (result.success) {
        setData((prevData) => 
          prevData.map((item) => {
            if (item.id === editingId) {
              const updatedItem = { ...item, ...result.data };
              updatedItem.name = formData.name;
              updatedItem.text = formData.text;
              // Update preview immediately if new file uploaded
              if (formData.image instanceof File) {
                   updatedItem.image = URL.createObjectURL(formData.image);
              }
              return updatedItem;
            }
            return item;
          })
        );
        showToast("Category Updated Successfully!", "success");
        resetForm();
      } else {
        showToast(result.error || "Update Failed", "error");
      }

    } else {
      // CREATE
      result = await submitData(API.CATEGORY.LIST, formDataToSend, true, 'POST');
      
      if (result.success) {
        const newItem = {
          id: result.data.id, 
          name: formData.name, 
          text: formData.text, 
          image: result.data.image || (formData.image instanceof File ? URL.createObjectURL(formData.image) : null)
        };
        setData((prevData) => [...prevData, newItem]);
        showToast("Category Added Successfully!", "success");
        resetForm();
      } else {
        // Handle server errors gracefully
        let msg = "Failed to add category";
        if (result.error && typeof result.error === 'object') {
            msg = Object.values(result.error).flat().join(" ");
        }
        showToast(msg, "error");
      }
    }
  };

  const promptDelete = (id) => {
    setDeleteModal({ show: true, id });
  };

  const confirmDelete = async () => {
    const id = deleteModal.id;
    if (!id) return;

    setIsDeleting(true);
    const result = await submitData(API.CATEGORY.DETAIL(id), {}, false, 'DELETE');
    setIsDeleting(false);

    if (result.success) {
      setData((prevData) => prevData.filter((item) => item.id !== id));
      showToast("Category Deleted", "success");
      setDeleteModal({ show: false, id: null });
    } else {
      showToast("Delete failed", "error");
    }
  };

  return (
    <div className="container mx-auto p-5 min-h-screen">
      <Toast toast={toast} onClose={closeToast} />

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowForm(true)}
          className="bg-[#4522f0] text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-[#401afc] transition cursor-pointer hover:shadow-lg transform hover:-translate-y-1"
        >
          + Add New Category
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        {loading && data.length === 0 ? (
          <div className="h-64 flex flex-col justify-center items-center text-gray-500">
             <div className="h-10 w-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-3"></div>
             Loading...
          </div>
        ) : (
          <table className="min-w-full">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-6 text-left w-20">#</th>
                <th className="py-3 px-6 text-left">Image</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Text</th>
                <th className="py-3 px-6 text-center w-40">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.map((item, index) => (
                <tr key={item.id || `cat-${index}`} className="hover:bg-blue-50 transition">
                  <td className="py-4 px-6 text-gray-500">{index + 1}</td>
                  <td className="py-4 px-6">
                    {item.image ? (
                        <img
                          src={getImageUrl(item.image)}
                          alt={item.name}
                          className="h-12 w-12 object-cover rounded-lg border border-gray-300"
                          onError={(e) => { e.target.src = "https://via.placeholder.com/50?text=Err"; }}
                        />
                    ) : (
                        <div className="h-12 w-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">No Img</div>
                    )}
                  </td>
                  <td className="py-4 px-6 font-bold">{item.name}</td>
                  <td className="py-4 px-6 text-gray-600">{item.text}</td>
                  <td className="py-4 px-6 text-center flex justify-center gap-3">
                    <button 
                      onClick={() => handleEdit(item)} 
                      className="bg-amber-500 text-white p-2 rounded hover:bg-amber-600 shadow-sm transition cursor-pointer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                    </button>
                    <button 
                      onClick={() => promptDelete(item.id)} 
                      className="bg-red-500 text-white p-2 rounded hover:bg-red-600 shadow-sm transition cursor-pointer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* --- FORM MODAL --- */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
              {editingId ? "Edit Category" : "Add New Category"}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
                <input type="text" name="name" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.name} onChange={handleChange} required />
              </div>
              
              {/* ✅ FIXED: Image Preview Section */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Image</label>
                <div className="border border-gray-300 rounded-lg p-2 bg-gray-50 flex items-center gap-3">
                    {/* Preview Image */}
                    {formData.image && (
                        <img 
                            src={getImageUrl(formData.image)} 
                            className="h-10 w-10 object-cover rounded bg-gray-200 border" 
                            alt="Preview" 
                        />
                    )}
                    <input type="file" onChange={handleFile} accept="image/*" className="w-full text-sm text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded-md file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Text</label>
                <input type="text" name="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.text} onChange={handleChange} required />
              </div>
              
              <div className="flex gap-3 mt-4">
                <button 
                  type="submit" 
                  disabled={submitting} 
                  className="flex-1 bg-[#4522f0] text-white py-3 rounded-lg font-bold hover:bg-[#401afc] flex justify-center items-center gap-2 disabled:opacity-70 cursor-pointer disabled:cursor-not-allowed"
                >
                  {submitting ? <> <Spinner /> Processing... </> : <>{editingId ? "Update" : "Submit"}</>}
                </button>
                
                <button 
                  type="button" 
                  disabled={submitting} 
                  onClick={resetForm} 
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-bold hover:bg-gray-300 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- DELETE CONFIRMATION MODAL --- */}
      {deleteModal.show && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-sm p-6 rounded-2xl shadow-2xl transform transition-all scale-100">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
              <svg className="h-8 w-8 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-center text-gray-900 mb-2">Delete Category?</h3>
            <p className="text-sm text-gray-500 text-center mb-6">
              Are you sure you want to delete this category? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setDeleteModal({ show: false, id: null })}
                disabled={isDeleting}
                className="cursor-pointer flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete}
                disabled={isDeleting}
                className="cursor-pointer flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition flex justify-center items-center gap-2"
              >
                {isDeleting ? <Spinner /> : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CategoryManager;