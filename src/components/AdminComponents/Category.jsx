import React, { useState, useEffect } from "react";
import axios from "axios";

// --- Loader Component ---
const Spinner = () => (
  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const CategoryManager = () => {
  // --- States ---
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // Force Refresh Key to reload images
  const [refreshKey, setRefreshKey] = useState(0);

  // Form Fields
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [imageFile, setImageFile] = useState(null);

  // Loaders
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const PROXY_URL = "/api/category/";
  const BASE_IMAGE_URL = "https://codingcloud.pythonanywhere.com";

  // --- Helper: Image URL ---
  const getImageUrl = (img) => {
    if (!img) return null;
    const timestamp = new Date().getTime(); 
    if (img.startsWith("http")) return `${img}?t=${timestamp}`;
    const cleanPath = img.startsWith("/") ? img : `/${img}`;
    return `${BASE_IMAGE_URL}${cleanPath}?t=${timestamp}`;
  };

  // --- 1. FETCH DATA ---
  const fetchData = async () => {
    if (data.length === 0) setLoading(true);
    try {
      const response = await axios.get(PROXY_URL);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refreshKey]);

  // --- 2. SETUP EDIT ---
  const handleEdit = (item) => {
    setName(item.name || "");
    setText(item.text || "");
    setImageFile(null);
    setEditingId(item.id);
    setShowForm(true);
  };

  // --- 3. SUBMIT ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("text", text);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    const currentId = editingId;

    try {
      if (currentId) {
        // UPDATE
        const response = await axios.patch(`${PROXY_URL}${currentId}/`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        setData((prevData) =>
          prevData.map((item) =>
            item.id === currentId ? { ...item, ...response.data } : item
          )
        );
        fetchData(); 
        setRefreshKey(oldKey => oldKey + 1);
        alert("Updated Successfully!");

      } else {
        // CREATE
        const response = await axios.post(PROXY_URL, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        
        setData((prevData) => [...prevData, response.data]);
        setRefreshKey(oldKey => oldKey + 1);
        alert("Added Successfully!");
      }
      
      resetForm();
    } catch (error) {
      console.error("Error submitting:", error);
      alert("Failed to submit.");
    } finally {
      setSubmitting(false);
    }
  };

  // --- 4. DELETE ---
  const handleDelete = async (id) => {
    if (window.confirm("Delete this item?")) {
      setDeletingId(id);
      try {
        await axios.delete(`${PROXY_URL}${id}/`);
        setData((prevData) => prevData.filter((item) => item.id !== id));
      } catch (error) {
        console.error("Delete failed:", error);
      } finally {
        setDeletingId(null);
      }
    }
  };

  const resetForm = () => {
    setName("");
    setText("");
    setImageFile(null);
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="container mx-auto p-5 min-h-screen">


      <div className="flex justify-end mb-4">
        {/* ✅ ADD BUTTON: Added cursor-pointer */}
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition cursor-pointer hover:shadow-lg transform hover:-translate-y-1"
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
                <tr key={item.id} className="hover:bg-blue-50 transition">
                  <td className="py-4 px-6 text-gray-500">{index + 1}</td>
                  <td className="py-4 px-6">
                    {item.image ? (
                        <img
                          key={`${item.id}-${refreshKey}`}
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
                    
                    {/* ✅ EDIT BUTTON: Added cursor-pointer */}
                    <button 
                      onClick={() => handleEdit(item)} 
                      className="bg-amber-500 text-white p-2 rounded hover:bg-amber-600 shadow-sm transition cursor-pointer"
                      title="Edit"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                    </button>

                    {/* ✅ DELETE BUTTON: Added cursor-pointer */}
                    <button 
                      onClick={() => handleDelete(item.id)} 
                      disabled={deletingId === item.id} 
                      className="bg-red-500 text-white p-2 rounded hover:bg-red-600 shadow-sm disabled:opacity-50 transition cursor-pointer disabled:cursor-not-allowed"
                      title="Delete"
                    >
                        {deletingId === item.id ? <Spinner /> : <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>}
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
              {editingId ? "Edit Category" : "Add New Category"}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
                <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Image</label>
                <div className="border border-gray-300 rounded-lg p-1 bg-gray-50">
                    <input type="file" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" onChange={(e) => setImageFile(e.target.files[0])} accept="image/*" required={!editingId} />
                </div>
                {editingId && <p className="text-xs text-gray-500 mt-1">* Optional</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Text</label>
                <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={text} onChange={(e) => setText(e.target.value)} required />
              </div>
              
              <div className="flex gap-3 mt-4">
                {/* ✅ SUBMIT BUTTON: Added cursor-pointer */}
                <button 
                  type="submit" 
                  disabled={submitting} 
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 flex justify-center items-center gap-2 disabled:opacity-70 cursor-pointer disabled:cursor-not-allowed"
                >
                  {submitting ? <> <Spinner /> Processing... </> : <>{editingId ? "Update" : "Submit"}</>}
                </button>
                
                {/* ✅ CANCEL BUTTON: Added cursor-pointer */}
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
    </div>
  );
};

export default CategoryManager;