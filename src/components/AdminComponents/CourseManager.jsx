import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import useSubmit from "../../hooks/useSubmit";
import { API } from "../../api/endpoints";
import { Toast, useToast } from "../../components/Toast";

// --- SPINNER ---
const Spinner = () => (
  <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const CourseManager = () => {
  const { data: courses, loading: loadingCourses, setData: setCourses } = useFetch(API.COURSES.LIST);
  const { data: categories, loading: loadingCats } = useFetch(API.CATEGORY.LIST);
  const { submitData, loading: submitting } = useSubmit();
  const { toast, showToast, closeToast } = useToast();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null });
  const [isDeleting, setIsDeleting] = useState(false);

  const initialFormState = {
    category: "", name: "", text: "", duration: "", lecture: "",
    level: "", students: "", certificate: "No", language: "English",
    image: null, banner_img: null, pdf_file: null
  };
  const [formData, setFormData] = useState(initialFormState);

  // --- Helper: Get Image/File URL ---
  const getFileUrl = (fileOrUrl) => {
    if (!fileOrUrl) return null;
    
    // 1. If it's a new File object (Upload Preview)
    if (fileOrUrl instanceof File) {
        return URL.createObjectURL(fileOrUrl);
    }

    // 2. If it's an existing URL String (Backend Data)
    if (typeof fileOrUrl === 'string') {
        if (fileOrUrl.startsWith("http") || fileOrUrl.startsWith("blob:")) return fileOrUrl;
        // Fix relative paths from Django
        const BASE_DOMAIN = "https://codingcloud.pythonanywhere.com";
        return `${BASE_DOMAIN}${fileOrUrl}`;
    }
    
    return null;
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFile = (e) => setFormData({ ...formData, [e.target.name]: e.target.files[0] });

  // --- ✅ FIXED: Load existing images into state ---
  const handleEdit = (item) => {
    setFormData({
      category: item.category || "",
      name: item.name || "",
      text: item.text || "",
      duration: item.duration || "",
      lecture: item.lecture || "",
      level: item.level || "",
      students: item.students || "",
      certificate: item.certificate || "No",
      language: item.language || "English",
      // Store the URL string so we can preview it
      image: item.image, 
      banner_img: item.banner_img, 
      pdf_file: item.pdf_file
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();

    formDataToSend.append("category", parseInt(formData.category) || "");
    formDataToSend.append("name", formData.name || "");
    formDataToSend.append("text", formData.text || "");
    formDataToSend.append("duration", formData.duration || "");
    formDataToSend.append("lecture", formData.lecture || "");
    formDataToSend.append("level", formData.level || "");
    formDataToSend.append("certificate", formData.certificate || "No");
    formDataToSend.append("language", formData.language || "English");

    const studentCount = formData.students ? formData.students : 0;
    formDataToSend.append("students", studentCount);

    // --- Files Logic ---
    // Only append if it's a NEW file (Object). If it's a String (URL), ignore it (keep old).
    if (formData.image instanceof File) {
        formDataToSend.append("image", formData.image);
    } else if (!editingId) {
        formDataToSend.append("image", ""); // Send empty only on Create
    }

    if (formData.banner_img instanceof File) {
        formDataToSend.append("banner_img", formData.banner_img);
    } else if (!editingId) {
        formDataToSend.append("banner_img", "");
    }

    if (formData.pdf_file instanceof File) {
        formDataToSend.append("pdf_file", formData.pdf_file);
    } else if (!editingId) {
        formDataToSend.append("pdf_file", "");
    }

    let result;

    if (editingId) {
      result = await submitData(API.COURSES.DETAIL(editingId), formDataToSend, true, 'PATCH');
      
      if (result.success) {
        setCourses((prev) =>
          prev.map((item) => {
            if (item.id === editingId) {
              const updatedItem = { ...item, ...result.data };
              updatedItem.name = formData.name;
              updatedItem.level = formData.level;
              updatedItem.students = studentCount;
              updatedItem.language = formData.language;
              updatedItem.category = formData.category;
              
              // Update preview
              if (formData.image instanceof File) updatedItem.image = URL.createObjectURL(formData.image);
              
              return updatedItem;
            }
            return item;
          })
        );
        showToast("Course updated successfully!", "success");
        resetForm();
      } else {
        let errorMsg = "Update failed.";
        if (result.error && typeof result.error === 'object') {
            errorMsg = Object.values(result.error).flat().join(" ");
        }
        showToast(errorMsg, "error");
      }

    } else {
      result = await submitData(API.COURSES.LIST, formDataToSend, true, 'POST');
      
      if (result.success) {
        const newItem = {
          id: result.data.id,
          ...formData,
          students: studentCount,
          image: result.data.image || (formData.image instanceof File ? URL.createObjectURL(formData.image) : null)
        };
        setCourses((prev) => [...prev, newItem]);
        showToast("New course added successfully!", "success");
        resetForm();
      } else {
        let errorMsg = "Failed to add course.";
        if (result.error && typeof result.error === 'object') {
            errorMsg = Object.values(result.error).flat().join(" ");
        }
        showToast(errorMsg, "error");
      }
    }
  };

  // --- DELETE HANDLERS ---
  const promptDelete = (id) => setDeleteModal({ show: true, id });

  const confirmDelete = async () => {
    const id = deleteModal.id;
    if (!id) return;

    setIsDeleting(true);
    const result = await submitData(API.COURSES.DETAIL(id), {}, false, 'DELETE');
    setIsDeleting(false);

    if (result.success) {
      setCourses((prev) => prev.filter((item) => item.id !== id));
      showToast("Course deleted successfully", "success");
      setDeleteModal({ show: false, id: null });
    } else {
      showToast("Delete failed", "error");
    }
  };

  const safeCourses = Array.isArray(courses) ? courses : [];

  return (
    <div className="container mx-auto p-5 min-h-screen">
      <Toast toast={toast} onClose={closeToast} />

      <div className="flex justify-end mb-4">
        <button onClick={() => setShowForm(true)} className="bg-[#4522f0] text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-[#401afc] transition cursor-pointer hover:shadow-lg transform hover:-translate-y-1">
          + Add New Course
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        {loadingCourses ? (
          <div className="h-64 flex flex-col justify-center items-center text-gray-500">
            <div className="flex flex-col items-center">
              <div className="h-10 w-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-3"></div>
              <span>Loading Courses...</span>
            </div>
          </div>
        ) : (
          <table className="min-w-full">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-6 text-left w-12">#</th>
                <th className="py-3 px-6 text-left w-20">Image</th>
                <th className="py-3 px-6 text-left">Course Name</th>
                <th className="py-3 px-6 text-left w-24">Level</th>
                <th className="py-3 px-6 text-left w-24">Lectures</th>
                <th className="py-3 px-6 text-left w-24">Duration</th>
                <th className="py-3 px-6 text-left w-24">Language</th>
                <th className="py-3 px-6 text-center w-32">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {safeCourses.map((item, index) => (
                <tr key={item.id || `temp-${index}`} className="hover:bg-blue-50 transition">
                  <td className="py-4 px-6 text-gray-500">{index + 1}</td>
                  <td className="py-4 px-6">
                    {item.image ? (
                      <img src={getFileUrl(item.image)} className="h-12 w-12 object-cover rounded-lg border border-gray-300"
                        onError={(e) => { e.target.src = "https://via.placeholder.com/50?text=Err"; }} alt={item.name} />
                    ) : <div className="text-xs text-gray-500">No Img</div>}
                  </td>
                  <td className="py-4 px-6 font-bold">{item.name}</td>
                  <td className="py-4 px-6 text-gray-600">{item.level}</td>
                  <td className="py-4 px-6 text-gray-600 font-semibold">{item.lecture || 0}</td>
                  <td className="py-4 px-6 text-gray-600 font-semibold">{item.duration || 0}</td>
                  <td className="py-4 px-6 text-gray-600">{item.language}</td>
                  <td className="py-4 px-6 text-center flex justify-center gap-3">
                    <button onClick={() => handleEdit(item)} className="bg-amber-500 text-white p-2 rounded hover:bg-amber-600 shadow-sm transition cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                    </button>
                    <button onClick={() => promptDelete(item.id)} className="bg-red-500 text-white p-2 rounded hover:bg-red-600 shadow-sm transition cursor-pointer">
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
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm overflow-y-auto py-10">
          <div className="bg-white w-full max-w-2xl p-8 rounded-2xl shadow-2xl animate-fade-in my-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
              {editingId ? "Edit Course" : "Add New Course"}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                <select name="category" value={formData.category} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" required>
                  <option value="">-- Select Category --</option>
                  {loadingCats ? <option>Loading...</option> : categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                </select>
              </div>

              <input type="text" name="name" placeholder="Course Name" className="p-3 border rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500" value={formData.name} onChange={handleChange} required />
              <textarea name="text" placeholder="Course Description" className="p-3 border rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500" rows="3" value={formData.text} onChange={handleChange} required />

              {/* --- ✅ FIXED IMAGE PREVIEWS IN FORM --- */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Course Image */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Course Image</label>
                  <div className="border border-gray-300 rounded-lg p-2 bg-gray-50 flex items-center gap-3">
                    {/* Preview */}
                    {formData.image && (
                        <img 
                            src={getFileUrl(formData.image)} 
                            className="h-10 w-10 object-cover rounded bg-gray-200 border" 
                            alt="Preview" 
                        />
                    )}
                    <input type="file" name="image" onChange={handleFile} accept="image/*" className="w-full text-sm text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded-md file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" />
                  </div>
                </div>

                {/* Banner Image */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Banner Image</label>
                  <div className="border border-gray-300 rounded-lg p-2 bg-gray-50 flex items-center gap-3">
                    {/* Preview */}
                    {formData.banner_img && (
                        <img 
                            src={getFileUrl(formData.banner_img)} 
                            className="h-10 w-10 object-cover rounded bg-gray-200 border" 
                            alt="Preview" 
                        />
                    )}
                    <input type="file" name="banner_img" onChange={handleFile} accept="image/*" className="w-full text-sm text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded-md file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" />
                  </div>
                </div>
              </div>

              {/* PDF File */}
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">PDF Syllabus/File</label>
                <div className="border border-gray-300 rounded-lg p-2 bg-gray-50 flex items-center gap-3">
                  {/* PDF Status Indicator */}
                  {formData.pdf_file && (
                      <div className="text-xs text-green-600 font-bold bg-green-100 px-2 py-1 rounded">
                         PDF Attached
                      </div>
                  )}
                  <input type="file" name="pdf_file" onChange={handleFile} accept=".pdf" className="w-full text-sm text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded-md file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="duration" placeholder="Duration (e.g. 2 Months)" className="p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={formData.duration} onChange={handleChange} />
                <input type="text" name="lecture" placeholder="Lectures (e.g. 20)" className="p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={formData.lecture} onChange={handleChange} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="level" placeholder="Level (e.g. Beginner)" className="p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={formData.level} onChange={handleChange} />
                <input type="number" name="students" placeholder="Students Enrolled (Optional)" className="p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={formData.students} onChange={handleChange} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Certificate</label>
                  <select name="certificate" value={formData.certificate} onChange={handleChange} className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Language</label>
                  <select name="language" value={formData.language} onChange={handleChange} className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="English">English</option>
                    <option value="Marathi">Marathi</option>
                    <option value="Hindi">Hindi</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-4 pt-4 border-t">
                <button type="submit" disabled={submitting} className="flex-1 bg-[#4522f0] text-white py-3 rounded-lg font-bold hover:bg-[#401afc] flex justify-center items-center gap-2 disabled:opacity-70 cursor-pointer">
                  {submitting ? <> <Spinner /> Saving... </> : <>{editingId ? "Update Course" : "Save Course"}</>}
                </button>
                <button type="button" disabled={submitting} onClick={resetForm} className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-bold hover:bg-gray-300 cursor-pointer">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteModal.show && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-sm p-6 rounded-2xl shadow-2xl transform transition-all scale-100">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
              <svg className="h-8 w-8 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-center text-gray-900 mb-2">Delete Course?</h3>
            <p className="text-sm text-gray-500 text-center mb-6">
              Are you sure you want to delete this course? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteModal({ show: false, id: null })} disabled={isDeleting} className="cursor-pointer flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition">Cancel</button>
              <button onClick={confirmDelete} disabled={isDeleting} className="cursor-pointer flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition flex justify-center items-center gap-2">
                {isDeleting ? <Spinner /> : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseManager;