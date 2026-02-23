import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import useSubmit from "../../hooks/useSubmit";
import { API } from "../../api/endpoints";
import { Toast, useToast } from "../../components/Toast";

// --- INTERNAL SPINNER COMPONENT ---
const Spinner = () => (
  <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const ModuleManager = () => {
  // 1. Fetch Data
  const { data: rawModules, loading, setData: setModules } = useFetch(API.MODULES.LIST);
  const { submitData, loading: submitting } = useSubmit();
  const { toast, showToast, closeToast } = useToast();

  // 2. Local State
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [moduleName, setModuleName] = useState(""); 
  
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null });
  const [isDeleting, setIsDeleting] = useState(false);

  // --- ✅ CRITICAL FIX: Handle different API response structures ---
  // Checks if data is in .data, .results, or just the array itself
  const safeModules = Array.isArray(rawModules) 
    ? rawModules 
    : (rawModules?.data || rawModules?.results || []);

  // --- HANDLERS ---
  const handleEdit = (item) => {
    setModuleName(item.name || "");
    setEditingId(item.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setModuleName("");
    setEditingId(null);
    setShowForm(false);
  };

  // --- SUBMIT (Create & Edit) ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!moduleName.trim()) {
      showToast("Module name is required", "error");
      return;
    }

    const payload = { name: moduleName };
    let result;

    if (editingId) {
      // UPDATE (PATCH)
      result = await submitData(API.MODULES.DETAIL(editingId), payload, true, 'PATCH');
      
      if (result.success) {
        setModules((prev) => {
          // Handle state update safely regardless of structure
          const isArray = Array.isArray(prev);
          const list = isArray ? prev : (prev?.data || prev?.results || []);
          
          const updatedList = list.map(item => item.id === editingId ? { ...item, ...result.data, name: moduleName } : item);

          // Return structure matching original state
          if (!isArray && prev?.data) return { ...prev, data: updatedList };
          return updatedList;
        });
        showToast("Module updated successfully!", "success");
        resetForm();
      } else {
        showToast("Update failed. Check connection.", "error");
      }

    } else {
      // CREATE (POST)
      result = await submitData(API.MODULES.LIST, payload, true, 'POST');

      if (result.success) {
        const newItem = { id: result.data.id, name: moduleName };
        
        setModules((prev) => {
          // Handle state update safely
          const isArray = Array.isArray(prev);
          const list = isArray ? prev : (prev?.data || prev?.results || []);
          const updatedList = [...list, newItem];

          if (!isArray && prev?.data) return { ...prev, data: updatedList };
          return updatedList;
        });
        
        showToast("Module created successfully!", "success");
        resetForm();
      } else {
        showToast("Failed to create module.", "error");
      }
    }
  };

  // --- DELETE HANDLERS ---
  const promptDelete = (id) => setDeleteModal({ show: true, id });

  const confirmDelete = async () => {
    const id = deleteModal.id;
    if (!id) return;

    setIsDeleting(true);
    const result = await submitData(API.MODULES.DETAIL(id), {}, false, 'DELETE');
    setIsDeleting(false);

    if (result.success) {
      setModules((prev) => {
        const isArray = Array.isArray(prev);
        const list = isArray ? prev : (prev?.data || prev?.results || []);
        const updatedList = list.filter(item => item.id !== id);

        if (!isArray && prev?.data) return { ...prev, data: updatedList };
        return updatedList;
      });
      showToast("Module deleted successfully", "success");
      setDeleteModal({ show: false, id: null });
    } else {
      showToast("Delete failed", "error");
    }
  };

  return (
    <div className="container mx-auto p-5 min-h-screen">
      <Toast toast={toast} onClose={closeToast} />

      {/* --- HEADER & ADD BUTTON --- */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Module Manager</h1>
        <button 
          onClick={() => setShowForm(true)} 
          className="bg-[#4522f0] text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-[#401afc] transition cursor-pointer flex items-center gap-2"
        >
          <span>+</span> Add Module
        </button>
      </div>

      {/* --- TABLE LIST --- */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        {loading ? (
          <div className="h-40 flex flex-col justify-center items-center text-gray-500">
            <Spinner /> 
            <span className="mt-2 text-sm">Loading Modules...</span>
          </div>
        ) : (
          <table className="min-w-full">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-6 text-left w-20">#</th>
                <th className="py-3 px-6 text-left">Module Name</th>
                <th className="py-3 px-6 text-center w-40">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {safeModules.length > 0 ? safeModules.map((item, index) => (
                <tr key={item.id || index} className="hover:bg-blue-50 transition">
                  <td className="py-4 px-6 text-gray-500">{index + 1}</td>
                  <td className="py-4 px-6 font-bold text-gray-800">{item.name}</td>
                  <td className="py-4 px-6 text-center flex justify-center gap-3">
                    {/* EDIT BUTTON */}
                    <button onClick={() => handleEdit(item)} className="bg-amber-500 text-white p-2 rounded hover:bg-amber-600 shadow-sm transition cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                    </button>
                    {/* DELETE BUTTON */}
                    <button onClick={() => promptDelete(item.id)} className="bg-red-500 text-white p-2 rounded hover:bg-red-600 shadow-sm transition cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                   <td colSpan="3" className="py-10 text-center text-gray-400">No modules found. Click "+ Add Module" to create one.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* --- ADD / EDIT MODAL --- */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl">
            <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">
              {editingId ? "Edit Module" : "Create New Module"}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Module Name</label>
                <input 
                  type="text" 
                  className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Enter module name..."
                  value={moduleName}
                  onChange={(e) => setModuleName(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="flex gap-3 mt-2">
                <button type="button" onClick={resetForm} className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition cursor-pointer">Cancel</button>
                <button 
                  type="submit" 
                  disabled={submitting}
                  className="flex-1 py-2 bg-[#4522f0] text-white rounded-lg font-semibold hover:bg-[#401afc] transition flex justify-center items-center gap-2 cursor-pointer"
                >
                  {submitting ? <Spinner /> : (editingId ? "Update" : "Create")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- DELETE CONFIRMATION MODAL --- */}
      {deleteModal.show && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-sm p-6 rounded-2xl shadow-2xl">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
              <svg className="h-8 w-8 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-center text-gray-900 mb-2">Delete Module?</h3>
            <p className="text-sm text-gray-500 text-center mb-6">Are you sure you want to delete this module? This cannot be undone.</p>
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

export default ModuleManager;