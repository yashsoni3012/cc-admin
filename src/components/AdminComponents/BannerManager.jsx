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

const BannerManager = () => {
  // 1. Fetch Data
  const { data: rawBanners, loading, setData: setBanners } = useFetch(API.BANNERS.LIST);
  const { submitData, loading: submitting } = useSubmit();
  const { toast, showToast, closeToast } = useToast();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null });
  const [isDeleting, setIsDeleting] = useState(false);

  // --- FORM STATE ---
  const initialFormState = { 
    image: null, 
    CTA_text: "", 
    CTA_link: "", 
    order: 0, 
    status: true // Default to Active
  };
  const [formData, setFormData] = useState(initialFormState);

  // --- SAFETY: Handle API Response Types ---
  const safeBanners = Array.isArray(rawBanners) 
    ? rawBanners 
    : (rawBanners?.data || rawBanners?.results || []);

  // --- HELPER: Get Image URL ---
  const getImageUrl = (img) => {
    if (!img) return null;
    if (img instanceof File) return URL.createObjectURL(img);
    if (typeof img === 'string') {
        const timestamp = new Date().getTime(); 
        if (img.startsWith("http") || img.startsWith("blob:")) return `${img}?t=${timestamp}`;
        const BASE_DOMAIN = "https://codingcloud.pythonanywhere.com";
        const cleanPath = img.startsWith("/") ? img : `/${img}`;
        return `${BASE_DOMAIN}${cleanPath}?t=${timestamp}`;
    }
    return null;
  };

  // --- HANDLERS ---
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Handle Checkbox for "status" field vs Text inputs
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const handleFile = (e) => setFormData({ ...formData, image: e.target.files[0] });

  const handleEdit = (item) => {
    setFormData({ 
        image: item.image, 
        CTA_text: item.CTA_text || "",
        CTA_link: item.CTA_link || "",
        order: item.order || 0,
        status: item.status // Boolean true/false
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setEditingId(null);
    setShowForm(false);
  };

// --- ✅ FIXED SUBMIT HANDLER ---
 const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("CTA_text", formData.CTA_text);
    
    // Ensure URL is valid
    let cleanLink = formData.CTA_link.trim();
    if (cleanLink && !cleanLink.startsWith("http")) {
        cleanLink = `https://${cleanLink}`;
    }
    formDataToSend.append("CTA_link", cleanLink);
    formDataToSend.append("order", formData.order);
    formDataToSend.append("status", formData.status ? "True" : "False");

    if (formData.image instanceof File) {
      formDataToSend.append("image", formData.image);
    }

    let result;
    
    // --- API CALLS ---
    if (editingId) {
      result = await submitData(API.BANNERS.DETAIL(editingId), formDataToSend, true, 'PATCH');
      
      if (result.success) {
        // ✅ FIX 1: Handle state update safely for UPDATE
        setBanners((prev) => {
          // Check if 'prev' is the array, or if the array is inside 'prev.results' or 'prev.data'
          const list = Array.isArray(prev) ? prev : (prev?.results || prev?.data || []);
          
          return list.map((item) => 
            item.id === editingId ? { ...item, ...result.data } : item
          );
        });
        showToast("Banner updated", "success");
        resetForm();
      } else {
        console.error(result.error);
        showToast("Update failed", "error");
      }

    } else {
      result = await submitData(API.BANNERS.LIST, formDataToSend, true, 'POST');
      
      if (result.success) {
        // ✅ FIX 2: Handle state update safely for CREATE
        setBanners((prev) => {
          // Safety check to ensure we are spreading an array
          const list = Array.isArray(prev) ? prev : (prev?.results || prev?.data || []);
          return [...list, result.data];
        });
        
        showToast("Banner created", "success");
        resetForm();
      } else {
        console.error(result.error);
        showToast("Creation failed", "error");
      }
    }
  };
  // --- DELETE HANDLERS ---
  const promptDelete = (id) => setDeleteModal({ show: true, id });

  const confirmDelete = async () => {
    const id = deleteModal.id;
    if (!id) return;

    setIsDeleting(true);
    const result = await submitData(API.BANNERS.DETAIL(id), {}, false, 'DELETE');
    setIsDeleting(false);

    if (result.success) {
      setBanners((prev) => {
          const list = Array.isArray(prev) ? prev : (prev?.data || []);
          return list.filter((item) => item.id !== id);
      });
      showToast("Banner deleted successfully", "success");
      setDeleteModal({ show: false, id: null });
    } else {
      showToast("Delete failed", "error");
    }
  };

  return (
    <div className="container mx-auto p-5 min-h-screen">
      <Toast toast={toast} onClose={closeToast} />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Banner Manager</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-[#4522f0] text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-[#401afc] transition cursor-pointer flex items-center gap-2"
        >
          <span>+</span> Add Banner
        </button>
      </div>

      {/* --- TABLE LIST --- */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        {loading ? (
          <div className="h-64 flex flex-col justify-center items-center text-gray-500">
             <Spinner />
             <span className="mt-2 text-sm">Loading Banners...</span>
          </div>
        ) : (
          <table className="min-w-full">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-6 text-left w-16">#</th>
                <th className="py-3 px-6 text-left w-24">Image</th>
                <th className="py-3 px-6 text-left">CTA Text</th>
                <th className="py-3 px-6 text-left">Link</th>
                <th className="py-3 px-6 text-center">Order</th>
                <th className="py-3 px-6 text-center">Status</th>
                <th className="py-3 px-6 text-center w-32">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {safeBanners.length > 0 ? safeBanners.map((item, index) => (
                <tr key={item.id || index} className="hover:bg-blue-50 transition">
                  <td className="py-4 px-6 text-gray-500">{index + 1}</td>
                  <td className="py-4 px-6">
                    {item.image ? (
                        <img
                          src={getImageUrl(item.image)}
                          alt="Banner"
                          className="h-12 w-20 object-cover rounded border border-gray-300"
                          onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=No+Img"; }}
                        />
                    ) : (
                        <div className="h-12 w-20 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs">No Img</div>
                    )}
                  </td>
                  <td className="py-4 px-6 font-semibold text-gray-700">{item.CTA_text || "-"}</td>
                  <td className="py-4 px-6 text-blue-600 underline text-sm truncate max-w-xs">
                    <a href={item.CTA_link} target="_blank" rel="noreferrer">{item.CTA_link}</a>
                  </td>
                  <td className="py-4 px-6 text-center">{item.order}</td>
                  <td className="py-4 px-6 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${item.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {item.status ? "Active" : "Inactive"}
                    </span>
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
                    <td colSpan="7" className="py-10 text-center text-gray-400">No banners found.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* --- FORM MODAL --- */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
              {editingId ? "Edit Banner" : "Add New Banner"}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Banner Image</label>
                <div className="border border-gray-300 rounded-lg p-2 bg-gray-50 flex flex-col gap-3">
                    {formData.image && (
                        <img 
                            src={getImageUrl(formData.image)} 
                            className="h-32 w-full object-cover rounded border border-gray-200" 
                            alt="Preview" 
                        />
                    )}
                    <input type="file" onChange={handleFile} accept="image/*" className="w-full text-sm text-gray-500 file:mr-2 file:py-2 file:px-4 file:rounded-md file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" />
                </div>
              </div>

              {/* Grid for Inputs */}
              <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">CTA Text</label>
                    <input type="text" name="CTA_text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.CTA_text} onChange={handleChange} placeholder="e.g. Shop Now" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Order</label>
                    <input type="number" name="order" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.order} onChange={handleChange} placeholder="e.g. 1" />
                  </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">CTA Link</label>
                <input type="text" name="CTA_link" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.CTA_link} onChange={handleChange} placeholder="https://..." />
              </div>

              {/* Status Checkbox */}
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <input 
                    type="checkbox" 
                    name="status" 
                    id="statusCheck"
                    checked={formData.status} 
                    onChange={handleChange} 
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                  />
                  <label htmlFor="statusCheck" className="text-sm font-semibold text-gray-700 cursor-pointer select-none">
                    Active Status (Visible on Site)
                  </label>
              </div>
              
              <div className="flex gap-3 mt-4">
                <button 
                  type="button" 
                  disabled={submitting} 
                  onClick={resetForm} 
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-bold hover:bg-gray-300 cursor-pointer"
                >
                  Cancel
                </button>
                
                <button 
                  type="submit" 
                  disabled={submitting} 
                  className="flex-1 bg-[#4522f0] text-white py-3 rounded-lg font-bold hover:bg-[#401afc] flex justify-center items-center gap-2 disabled:opacity-70 cursor-pointer"
                >
                  {submitting ? <> <Spinner /> Saving... </> : <>{editingId ? "Update" : "Save"}</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- DELETE MODAL --- */}
      {deleteModal.show && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-sm p-6 rounded-2xl shadow-2xl">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
              <svg className="h-8 w-8 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-center text-gray-900 mb-2">Delete Banner?</h3>
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

export default BannerManager;