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

const RegisterMessageManager = () => {
  // 1. Fetch Data
  const { data: rawData, loading, setData: setMessages } = useFetch(API.REGISTER_MSG.LIST);
  const { submitData, loading: submitting } = useSubmit();
  const { toast, showToast, closeToast } = useToast();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null });
  const [isDeleting, setIsDeleting] = useState(false);

  // Safe Data Access
  const safeData = rawData?.data || [];

  // --- FORM STATE ---
  const initialForm = {
    first_name: "",
    last_name: "",
    mobile: "",
    message: ""
  };
  const [formData, setFormData] = useState(initialForm);

  // --- HANDLERS ---
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleEdit = (item) => {
    setFormData({
      first_name: item.first_name || "",
      last_name: item.last_name || "",
      mobile: item.mobile || "",
      message: item.message || ""
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData(initialForm);
    setEditingId(null);
    setShowForm(false);
  };

  // --- SUBMIT HANDLER (Create/Update) ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare JSON Payload
    const payload = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        mobile: formData.mobile,
        message: formData.message
    };

    let result;
    if (editingId) {
      // UPDATE (PATCH)
      // Assuming your API supports PATCH at /register_msg/{id}/
      result = await submitData(API.REGISTER_MSG.DELETE(editingId), payload, false, 'PATCH');
      
      if (result.success) {
        setMessages((prev) => {
            const list = prev?.data || [];
            return {
                ...prev,
                data: list.map(item => item.id === editingId ? { ...item, ...result.data } : item)
            };
        });
        showToast("Inquiry updated!", "success");
        resetForm();
      } else {
        showToast("Update failed.", "error");
      }
    } else {
      // CREATE (POST)
      result = await submitData(API.REGISTER_MSG.LIST, payload, false, 'POST');
      
      if (result.success) {
        setMessages((prev) => {
            const list = prev?.data || [];
            return { ...prev, data: [...list, result.data] };
        });
        showToast("Inquiry added!", "success");
        resetForm();
      } else {
        showToast("Failed to add inquiry.", "error");
      }
    }
  };

  // --- DELETE HANDLERS ---
  const promptDelete = (id) => setDeleteModal({ show: true, id });

  const confirmDelete = async () => {
    const id = deleteModal.id;
    if (!id) return;
    
    setIsDeleting(true);
    const result = await submitData(API.REGISTER_MSG.DELETE(id), {}, false, 'DELETE');
    setIsDeleting(false);

    if (result.success) {
      setMessages((prev) => {
        const list = prev?.data || [];
        return { ...prev, data: list.filter((item) => item.id !== id) };
      });
      showToast("Message deleted", "success");
      setDeleteModal({ show: false, id: null });
    } else {
      showToast("Delete failed", "error");
    }
  };

  return (
    <div className="container mx-auto p-5 min-h-screen">
      <Toast toast={toast} onClose={closeToast} />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">User Inquiries</h1>
        
        <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">
                Total: <span className="font-bold">{safeData.length}</span>
            </div>
            {/* ADD BUTTON */}
            <button
            onClick={() => setShowForm(true)}
            className="bg-[#4522f0] text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-[#401afc] transition flex items-center gap-2"
            >
            <span>+</span> Add Inquiry
            </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        {loading ? (
          <div className="h-40 flex flex-col justify-center items-center text-gray-500">
            <Spinner />
            <span className="mt-2 text-sm">Loading messages...</span>
          </div>
        ) : (
          <table className="min-w-full">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-6 text-left w-16">ID</th>
                <th className="py-3 px-6 text-left w-48">Name</th>
                <th className="py-3 px-6 text-left w-32">Mobile</th>
                <th className="py-3 px-6 text-left">Message</th>
                <th className="py-3 px-6 text-center w-32">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {safeData.length > 0 ? safeData.map((item) => (
                <tr key={item.id} className="hover:bg-blue-50 transition">
                  <td className="py-4 px-6 text-gray-500">#{item.id}</td>
                  <td className="py-4 px-6">
                    <div className="font-bold text-gray-800">
                        {item.first_name} {item.last_name}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-600 font-mono text-sm">
                    {item.mobile}
                  </td>
                  <td className="py-4 px-6 text-gray-700">
                      {item.message}
                  </td>
                  <td className="py-4 px-6 text-center flex justify-center gap-2">
                    {/* EDIT BUTTON */}
                    <button 
                        onClick={() => handleEdit(item)} 
                        className="bg-amber-100 text-amber-600 p-2 rounded hover:bg-amber-200 transition"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                    </button>
                    {/* DELETE BUTTON */}
                    <button 
                        onClick={() => promptDelete(item.id)} 
                        className="bg-red-100 text-red-600 p-2 rounded hover:bg-red-200 transition"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="py-10 text-center text-gray-400">No messages found.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* --- CREATE / EDIT FORM MODAL --- */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-2xl">
            <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">
              {editingId ? "Edit Inquiry" : "New Inquiry"}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              {/* First Name & Last Name */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">First Name</label>
                  <input type="text" name="first_name" className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={formData.first_name} onChange={handleChange} required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Last Name</label>
                  <input type="text" name="last_name" className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={formData.last_name} onChange={handleChange} required />
                </div>
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Mobile Number</label>
                <input type="text" name="mobile" className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={formData.mobile} onChange={handleChange} required />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
                <textarea name="message" rows="3" className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={formData.message} onChange={handleChange} required></textarea>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-4">
                <button type="button" disabled={submitting} onClick={resetForm} className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-bold hover:bg-gray-300 transition">Cancel</button>
                <button type="submit" disabled={submitting} className="flex-1 bg-[#4522f0] text-white py-3 rounded-lg font-bold hover:bg-[#401afc] flex justify-center items-center gap-2 disabled:opacity-70 transition">
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
            <h3 className="text-xl font-bold text-center text-gray-900 mb-2">Delete Message?</h3>
            <p className="text-sm text-gray-500 text-center mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteModal({ show: false, id: null })} disabled={isDeleting} className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition">Cancel</button>
              <button onClick={confirmDelete} disabled={isDeleting} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition flex justify-center items-center gap-2">
                {isDeleting ? <Spinner /> : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default RegisterMessageManager;