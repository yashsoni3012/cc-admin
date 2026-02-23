import React, { useState, useEffect } from "react";
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

const FaqManager = () => {
  // 1. Fetch Data
  const { data: rawFaqs, loading: loadingFaqs, error: fetchError, setData: setFaqs } = useFetch(API.FAQS.LIST);
  const { data: rawCourses, loading: loadingCourses } = useFetch(API.COURSES.LIST);
  
  const { submitData, loading: submitting } = useSubmit();
  const { toast, showToast, closeToast } = useToast();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null });
  const [isDeleting, setIsDeleting] = useState(false);

  const initialFormState = { course: "", question: "", answer: "" };
  const [formData, setFormData] = useState(initialFormState);

  // --- ✅ CRITICAL FIX: HANDLE "{ data: [...] }" STRUCTURE ---
  // We check if it's an array. If not, we check .data, then .results, then default to []
  const safeFaqs = Array.isArray(rawFaqs) 
    ? rawFaqs 
    : (rawFaqs?.data || rawFaqs?.results || []);

  const safeCourses = Array.isArray(rawCourses) 
    ? rawCourses 
    : (rawCourses?.data || rawCourses?.results || []);

  // --- LOGIC: GET COURSE NAME ---
  const getCourseName = (courseId) => {
    if (!safeCourses.length || !courseId) return "Loading...";
    const course = safeCourses.find(c => c.id == courseId);
    return course ? course.name : "Unknown Course";
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleEdit = (item) => {
    setFormData({
      course: item.course || "", 
      question: item.question || "",
      answer: item.answer || ""
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setEditingId(null);
    setShowForm(false);
  };

  // --- SUBMIT ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const payload = { ...formData, course: parseInt(formData.course) };
    const selectedCourse = safeCourses.find(c => c.id == payload.course);
    const courseName = selectedCourse ? selectedCourse.name : "Unknown";

    let result;

    if (editingId) {
      // UPDATE
      result = await submitData(API.FAQS.DETAIL(editingId), payload, true, 'PATCH');
      
      if (result.success) {
        setFaqs((prev) => {
          // Handle the wrapper object when updating state
          const isArray = Array.isArray(prev);
          const list = isArray ? prev : (prev?.data || prev?.results || []);
          
          const updatedList = list.map((item) => {
             if (item.id === editingId) {
                 return { ...item, ...result.data, ...formData, course_name: courseName }; 
             }
             return item;
          });

          // Maintain the object structure if it was an object
          if (!isArray && prev?.data) return { ...prev, data: updatedList };
          return updatedList;
        });
        showToast("FAQ updated successfully!", "success");
        resetForm();
      } else {
        showToast(result.error || "Update failed", "error");
      }

    } else {
      // CREATE
      result = await submitData(API.FAQS.LIST, payload, true, 'POST');
      
      if (result.success) {
        const newItem = {
            id: result.data.id,
            ...formData,
            course: payload.course,
            course_name: courseName
        };
        
        setFaqs((prev) => {
            const isArray = Array.isArray(prev);
            const list = isArray ? prev : (prev?.data || prev?.results || []);
            const updatedList = [...list, newItem];

            if (!isArray && prev?.data) return { ...prev, data: updatedList };
            return updatedList;
        });

        showToast("New FAQ added successfully!", "success");
        resetForm();
      } else {
        showToast(result.error || "Failed to add FAQ", "error");
      }
    }
  };

  // --- DELETE ---
  const promptDelete = (id) => setDeleteModal({ show: true, id });

  const confirmDelete = async () => {
    const id = deleteModal.id;
    if (!id) return;

    setIsDeleting(true);
    const result = await submitData(API.FAQS.DETAIL(id), {}, false, 'DELETE');
    setIsDeleting(false);

    if (result.success) {
      setFaqs((prev) => {
          const isArray = Array.isArray(prev);
          const list = isArray ? prev : (prev?.data || prev?.results || []);
          const updatedList = list.filter((item) => item.id !== id);

          if (!isArray && prev?.data) return { ...prev, data: updatedList };
          return updatedList;
      });
      showToast("FAQ deleted successfully", "success");
      setDeleteModal({ show: false, id: null });
    } else {
      showToast("Delete failed", "error");
    }
  };

  return (
    <div className="container mx-auto p-5 min-h-screen">
      <Toast toast={toast} onClose={closeToast} />

      <div className="flex justify-end mb-4">
        <button onClick={() => setShowForm(true)} className="bg-[#4522f0] text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-[#401afc] transition cursor-pointer hover:shadow-lg transform hover:-translate-y-1">
          + Add New FAQ
        </button>
      </div>

      {fetchError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{fetchError}</span>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        {loadingFaqs ? (
          <div className="h-64 flex flex-col justify-center items-center text-gray-500">
             <div className="flex flex-col items-center">
                 <div className="h-10 w-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-3"></div>
                 <span>Loading FAQs...</span>
             </div>
          </div>
        ) : (
          <table className="min-w-full">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-6 text-left w-16">#</th>
                <th className="py-3 px-6 text-left w-1/4">Course</th>
                <th className="py-3 px-6 text-left w-1/4">Question</th>
                <th className="py-3 px-6 text-left">Answer</th>
                <th className="py-3 px-6 text-center w-32">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {safeFaqs.length > 0 ? safeFaqs.map((item, index) => (
                <tr key={item.id || `temp-${index}`} className="hover:bg-blue-50 transition">
                  <td className="py-4 px-6 text-gray-500">{index + 1}</td>
                  
                  <td className="py-4 px-6 font-bold text-black">
                    {item.course_name ? item.course_name : getCourseName(item.course)}
                  </td>
                  
                  <td className="py-4 px-6 font-semibold text-gray-800">{item.question}</td>
                  <td className="py-4 px-6 text-gray-600 text-sm">
                    {item.answer?.length > 50 ? item.answer.substring(0, 50) + "..." : item.answer}
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
                    <td colSpan="5" className="text-center py-10 text-gray-500">
                        No FAQs found.
                    </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-2xl animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
              {editingId ? "Edit FAQ" : "Add New FAQ"}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Select Course</label>
                <select name="course" value={formData.course} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" required>
                  <option value="">-- Choose a Course --</option>
                  {safeCourses.length > 0 ? safeCourses.map(c => <option key={c.id} value={c.id}>{c.name}</option>) : <option>Loading courses...</option>}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Question</label>
                <input type="text" name="question" placeholder="e.g. What is Python?" className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={formData.question} onChange={handleChange} required />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Answer</label>
                <textarea name="answer" placeholder="Type answer here..." className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" rows="4" value={formData.answer} onChange={handleChange} required />
              </div>
              
              <div className="flex gap-3 mt-4 pt-4 border-t">
                <button type="submit" disabled={submitting} className="flex-1 bg-[#4522f0] text-white py-3 rounded-lg font-bold hover:bg-[#401afc] flex justify-center items-center gap-2 disabled:opacity-70 cursor-pointer">
                  {submitting ? <> <Spinner /> Saving... </> : <>{editingId ? "Update FAQ" : "Save FAQ"}</>}
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
            <h3 className="text-xl font-bold text-center text-gray-900 mb-2">Delete FAQ?</h3>
            <p className="text-sm text-gray-500 text-center mb-6">Are you sure you want to delete this FAQ? This action cannot be undone.</p>
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

export default FaqManager;