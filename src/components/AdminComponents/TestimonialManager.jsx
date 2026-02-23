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

const TestimonialManager = () => {
  // 1. Fetch Data
  const { data: rawData, loading, setData: setTestimonials } = useFetch(API.TESTIMONIALS.LIST);
  const { data: rawCategories } = useFetch(API.CATEGORY.LIST);

  const { submitData, loading: submitting } = useSubmit();
  const { toast, showToast, closeToast } = useToast();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null });
  const [isDeleting, setIsDeleting] = useState(false);

  // --- FORM STATE ---
  const initialForm = {
    name: "",
    designation: "",
    text: "", // UI uses 'text', Backend uses 'review'
    category: "", 
    image: null
  };
  const [formData, setFormData] = useState(initialForm);

  // Safe Data Access
  const safeData = Array.isArray(rawData) ? rawData : (rawData?.results || rawData?.data || []);
  const categories = Array.isArray(rawCategories) ? rawCategories : (rawCategories?.results || rawCategories?.data || []);

  // --- HELPER: Get Image URL (Robust Version) ---
  const getImageUrl = (img, name) => {
    // 1. New Upload Preview (File Object)
    if (img instanceof File) return URL.createObjectURL(img);
    
    // 2. String from Backend
    if (typeof img === 'string' && img) {
      if (img.startsWith("http") || img.startsWith("blob:")) return img;
      
      const BASE_DOMAIN = "https://codingcloud.pythonanywhere.com"; 
      let cleanPath = img.startsWith("/") ? img : `/${img}`;
      
      // ✅ FIX: Ensure /media/ exists for Django paths
      if (!cleanPath.startsWith("/media/")) {
         cleanPath = `/media${cleanPath}`;
      }
      return `${BASE_DOMAIN}${cleanPath}`;
    }
    
    // 3. Fallback for List View (Not used in Form anymore)
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name || "User")}&background=random`;
  };

  // --- HANDLERS ---
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleFile = (e) => {
    if (e.target.files && e.target.files[0]) {
        console.log("File Selected:", e.target.files[0]); 
        setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name || "",
      designation: item.designation || "",
      text: item.review || item.text || "", // Handle both keys
      category: typeof item.category === 'object' ? item.category.id : item.category,
      image: item.image // Keep existing URL string
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData(initialForm);
    setEditingId(null);
    setShowForm(false);
  };

  // --- SUBMIT HANDLER ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!editingId && !formData.image) {
      showToast("Please select a user photo.", "error");
      return;
    }

    if (!formData.category) {
        showToast("Please select a category.", "error");
        return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("designation", formData.designation);
    
    // ✅ FIX: Backend expects 'review', Frontend uses 'text'
    formDataToSend.append("review", formData.text);
    
    // ✅ FIX: Backend expects 'category_id', Frontend uses 'category'
    formDataToSend.append("category_id", parseInt(formData.category)); 

    // ✅ FIX: Only append image if it's a NEW File
    if (formData.image instanceof File) {
      formDataToSend.append("image", formData.image);
    }

    let result;
    if (editingId) {
      // UPDATE
      result = await submitData(API.TESTIMONIALS.DETAIL(editingId), formDataToSend, true, 'PATCH');
      
      if (result.success) {
        setTestimonials((prev) => {
          const list = Array.isArray(prev) ? prev : (prev?.data || []);
          return list.map((item) => {
            if (item.id === editingId) {
              const updatedItem = { ...item, ...result.data };
              // UI Updates
              const selectedCat = categories.find(c => c.id.toString() === formData.category.toString());
              updatedItem.category_details = selectedCat; 
              updatedItem.text = formData.text; 
              
              if (formData.image instanceof File) {
                 updatedItem.image = URL.createObjectURL(formData.image);
              }
              return updatedItem;
            }
            return item;
          });
        });
        showToast("Testimonial updated!", "success");
        resetForm();
      } else {
         showToast(result.error || "Update failed.", "error");
      }
    } else {
      // CREATE
      result = await submitData(API.TESTIMONIALS.LIST, formDataToSend, true, 'POST');
      
      if (result.success) {
        const selectedCat = categories.find(c => c.id.toString() === formData.category.toString());
        
        const newItem = {
          ...result.data, 
          text: result.data.review || formData.text,
          category_details: selectedCat,
        };

        // If backend returns default image but we uploaded one, show local preview
        if (formData.image instanceof File && (!result.data.image || result.data.image.includes("default"))) {
             newItem.image = URL.createObjectURL(formData.image);
        }

        setTestimonials((prev) => {
          const list = Array.isArray(prev) ? prev : (prev?.data || []);
          return [...list, newItem];
        });
        showToast("Testimonial added!", "success");
        resetForm();
      } else {
        showToast(result.error || "Failed to add testimonial.", "error");
      }
    }
  };

  // --- DELETE HANDLERS ---
  const promptDelete = (id) => setDeleteModal({ show: true, id });

  const confirmDelete = async () => {
    const id = deleteModal.id;
    if (!id) return;
    setIsDeleting(true);
    const result = await submitData(API.TESTIMONIALS.DETAIL(id), {}, false, 'DELETE');
    setIsDeleting(false);
    if (result.success) {
      setTestimonials((prev) => {
        const list = Array.isArray(prev) ? prev : (prev?.data || []);
        return list.filter((item) => item.id !== id);
      });
      showToast("Testimonial deleted", "success");
      setDeleteModal({ show: false, id: null });
    } else {
      showToast("Delete failed", "error");
    }
  };

  return (
    <div className="container mx-auto p-5 min-h-screen">
      <Toast toast={toast} onClose={closeToast} />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Testimonials</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-[#4522f0] text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-[#401afc] transition cursor-pointer flex items-center gap-2"
        >
          <span>+</span> Add Testimonial
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        {loading ? (
          <div className="h-40 flex flex-col justify-center items-center text-gray-500">
            <Spinner />
            <span className="mt-2 text-sm">Loading...</span>
          </div>
        ) : (
          <table className="min-w-full">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-6 text-left w-16">#</th>
                <th className="py-3 px-6 text-left w-20">Image</th>
                <th className="py-3 px-6 text-left w-48">Name & Title</th>
                <th className="py-3 px-6 text-left w-32">Category</th>
                <th className="py-3 px-6 text-left">Review</th>
                <th className="py-3 px-6 text-center w-32">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {safeData.length > 0 ? safeData.map((item, index) => (
                // ✅ FIX: Added index to key to prevent Duplicate Key Error
                <tr key={`${item.id}-${index}`} className="hover:bg-blue-50 transition">
                  <td className="py-4 px-6 text-gray-500">{index + 1}</td>
                  <td className="py-4 px-6">
                    <img
                      src={getImageUrl(item.image, item.name)}
                      alt={item.name}
                      className="h-12 w-12 object-cover rounded-full border border-gray-300"
                      onError={(e) => { 
                        e.target.onerror = null; 
                        e.target.src = "https://placehold.co/100?text=Error"; 
                      }}
                    />
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-bold text-gray-800">{item.name}</div>
                    <div className="text-xs text-gray-500">{item.designation}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-semibold">
                      {item.category_details?.name || "General"}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-600 truncate max-w-xs" title={item.review || item.text}>
                      {item.review || item.text}
                  </td>
                  <td className="py-4 px-6 text-center flex justify-center gap-3">
                    <button onClick={() => handleEdit(item)} className="bg-amber-500 text-white p-2 rounded hover:bg-amber-600 shadow-sm transition cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                    </button>
                    <button onClick={() => promptDelete(item.id)} className="bg-red-500 text-white p-2 rounded hover:bg-red-600 shadow-sm transition cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="py-10 text-center text-gray-400">No testimonials found.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-2xl">
            <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">
              {editingId ? "Edit Testimonial" : "New Testimonial"}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              {/* Name & Designation */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
                  <input type="text" name="name" className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Designation</label>
                  <input type="text" name="designation" className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={formData.designation} onChange={handleChange} placeholder="e.g. Student" required />
                </div>
              </div>

              {/* Category Dropdown */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                <select 
                    name="category" 
                    className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    value={formData.category} 
                    onChange={handleChange} 
                    required
                >
                    <option value="">Select a Category</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Review</label>
                <textarea name="text" rows="3" className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={formData.text} onChange={handleChange} required></textarea>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">User Photo</label>
                <div className="border border-gray-300 rounded-lg p-2 bg-gray-50 flex items-center gap-3">
                  
                  {/* ✅ FIX: Only show image if one exists (Hides the orange 'US' circle) */}
                  {formData.image && (
                    <img
                      src={getImageUrl(formData.image, formData.name)}
                      className="h-10 w-10 object-cover rounded-full border border-gray-200"
                      alt="Preview"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  )}
                  
                  <input type="file" onChange={handleFile} accept="image/*" className="w-full text-sm text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded-md file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-4">
                <button type="button" disabled={submitting} onClick={resetForm} className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-bold hover:bg-gray-300 cursor-pointer">Cancel</button>
                <button type="submit" disabled={submitting} className="flex-1 bg-[#4522f0] text-white py-3 rounded-lg font-bold hover:bg-[#401afc] flex justify-center items-center gap-2 disabled:opacity-70 cursor-pointer">
                  {submitting ? <> <Spinner /> Saving... </> : <>{editingId ? "Update" : "Save"}</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-sm p-6 rounded-2xl shadow-2xl">
            <h3 className="text-xl font-bold text-center text-gray-900 mb-2">Delete Testimonial?</h3>
            <p className="text-sm text-gray-500 text-center mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteModal({ show: false, id: null })} disabled={isDeleting} className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition cursor-pointer">Cancel</button>
              <button onClick={confirmDelete} disabled={isDeleting} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition flex justify-center items-center gap-2 cursor-pointer">
                {isDeleting ? <Spinner /> : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default TestimonialManager;