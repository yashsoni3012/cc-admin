import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import useSubmit from "../../hooks/useSubmit";
import { API } from "../../api/endpoints";
import { Toast, useToast } from "../../components/Toast";

// Spinner Component
const Spinner = () => (
  <svg
    className="animate-spin h-5 w-5 text-current"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

const TopicManager = () => {
  const { toast, showToast, closeToast } = useToast();
  const { submitData, loading: submitting } = useSubmit();

  // --- State for data ---
  const [courses, setCourses] = useState([]);
  const [modules, setModules] = useState([]);
  const [topicsByModule, setTopicsByModule] = useState([]);
  const [loading, setLoading] = useState({
    courses: true,
    modules: true,
    topics: true,
  });

  // --- UI State ---
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [filteredModules, setFilteredModules] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTopic, setEditingTopic] = useState(null); // { id, name, moduleId }
  const [formData, setFormData] = useState({ module: "", name: "" });
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    id: null,
    moduleId: null,
  });

  // --- Fetch All Data on Mount ---
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading({ courses: true, modules: true, topics: true });

      try {
        // Fetch Courses (You need to define API.COURSES.LIST in your endpoints)
        const coursesRes = await fetch(API.COURSES.LIST);
        const coursesJson = await coursesRes.json();
        // Adjust based on your API response structure for courses
        const coursesData = coursesJson.data || coursesJson.results || coursesJson;
setCourses(Array.isArray(coursesData) ? coursesData : []);

        // Fetch Modules
        const modulesRes = await fetch(API.MODULES.LIST);
        const modulesJson = await modulesRes.json();
        const modulesData = modulesJson.data || modulesJson.results || modulesJson;
setModules(Array.isArray(modulesData) ? modulesData : []);
        // Fetch Topics (grouped by module)
        const topicsRes = await fetch(API.TOPICS.LIST);
        const topicsJson = await topicsRes.json();
        // The topics API returns data grouped by module: { data: [{ module_id, module_name, topics: [...] }] }
        const topicsData = topicsJson.data || topicsJson.results || topicsJson;
        setTopicsByModule(Array.isArray(topicsData) ? topicsData : []);
      } catch (error) {
        console.error("Error fetching data:", error);
        showToast("Failed to load data", "error");
      } finally {
        setLoading({ courses: false, modules: false, topics: false });
      }
    };

    fetchAllData();
  }, []);

  // --- Filter modules when course is selected ---
  useEffect(() => {
    if (selectedCourseId && modules.length > 0) {
      const filtered = modules.filter(
        (mod) => Number(mod.course_data) === Number(selectedCourseId),
      );
      setFilteredModules(filtered);
    } else {
      setFilteredModules([]);
    }
    // Reset form module selection when course changes
    setFormData((prev) => ({ ...prev, module: "" }));
  }, [selectedCourseId, modules]);

  // --- Flatten topics for display with course context ---
const flattenedTopics = Array.isArray(topicsByModule)
  ? topicsByModule.flatMap(moduleGroup =>
      (Array.isArray(moduleGroup.topics) ? moduleGroup.topics : []).map(topic => ({
        ...topic,
        module_id: moduleGroup.module_id,
        module_name: moduleGroup.module_name,
      }))
    )
  : [];

  // --- Handlers ---
  const handleCourseChange = (e) => {
    setSelectedCourseId(e.target.value);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({ module: "", name: "" });
    setEditingTopic(null);
    setShowForm(false);
  };

  const handleEdit = (topic) => {
    setEditingTopic(topic);
    setFormData({
      module: topic.module_id,
      name: topic.name,
    });
    // Find the course for this module to pre-select it?
    // For simplicity, we clear course selection, user must re-select.
    setSelectedCourseId("");
    setShowForm(true);
  };

  // --- Submit Handler (POST to /topics/) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.module || !formData.name.trim()) {
      showToast("Please select a module and enter a topic name", "error");
      return;
    }

    const payload = {
      module: parseInt(formData.module),
      name: formData.name,
    };

    let result;
    if (editingTopic) {
      // Update existing topic
      result = await submitData(
        API.TOPICS.DETAIL(editingTopic.id),
        payload,
        true,
        "PATCH",
      );
    } else {
      // Create new topic
      result = await submitData(API.TOPICS.LIST, payload, true, "POST");
    }

    if (result.success) {
      showToast(editingTopic ? "Topic updated!" : "Topic created!", "success");
      // Refetch topics to update the list (simplest approach)
      const topicsRes = await fetch(API.TOPICS.LIST);
      const topicsJson = await topicsRes.json();
      const topicsData = topicsJson.data || topicsJson.results || topicsJson;
      setTopicsByModule(Array.isArray(topicsData) ? topicsData : []);
      resetForm();
    } else {
      showToast(result.error?.message || "Operation failed", "error");
    }
  };

  // --- Delete Handler ---
  const promptDelete = (id, moduleId) =>
    setDeleteModal({ show: true, id, moduleId });

  const confirmDelete = async () => {
    const { id, moduleId } = deleteModal;
    if (!id) return;

    const result = await submitData(API.TOPICS.DETAIL(id), {}, false, "DELETE");
    if (result.success) {
      showToast("Topic deleted", "success");
      // Update local state by filtering out the deleted topic
      setTopicsByModule((prev) =>
        prev.map((moduleGroup) =>
          moduleGroup.module_id === moduleId
            ? {
                ...moduleGroup,
                topics: moduleGroup.topics.filter((t) => t.id !== id),
              }
            : moduleGroup,
        ),
      );
      setDeleteModal({ show: false, id: null, moduleId: null });
    } else {
      showToast("Delete failed", "error");
    }
  };

  // --- Render Logic ---
  const isLoading = loading.courses || loading.modules || loading.topics;

  return (
    <div className="container mx-auto p-5 min-h-screen">
      <Toast toast={toast} onClose={closeToast} />

      {/* Header and Course Selector */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Topic Manager</h1>
        <div className="flex w-full md:w-auto gap-4">
          <select
            value={selectedCourseId}
            onChange={handleCourseChange}
            className="flex-1 md:w-64 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          >
            <option value="">Filter by Course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              setEditingTopic(null);
              setFormData({ module: "", name: "" });
              setShowForm(true);
            }}
            disabled={!selectedCourseId}
            className="bg-[#4522f0] text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-[#401afc] transition disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            + Add Topic
          </button>
        </div>
      </div>

      {/* Topics Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        {isLoading ? (
          <div className="h-40 flex flex-col justify-center items-center text-gray-500">
            <Spinner />
            <span className="mt-2">Loading...</span>
          </div>
        ) : (
          <table className="min-w-full">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-6 text-left">#</th>
                <th className="py-3 px-6 text-left">Course</th>
                <th className="py-3 px-6 text-left">Module</th>
                <th className="py-3 px-6 text-left">Topic Name</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {flattenedTopics.length > 0 ? (
                flattenedTopics.map((topic, index) => {
                  // Find the course for this module (optional, for display)
                  const moduleInfo = modules.find(
                    (m) => m.id === topic.module_id,
                  );
                  const courseName =
                    courses.find((c) => c.id === moduleInfo?.course_data)
                      ?.name || "N/A";
                  return (
                    <tr key={topic.id} className="hover:bg-blue-50">
                      <td className="py-4 px-6 text-gray-500">{index + 1}</td>
                      <td className="py-4 px-6">
                        <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                          {courseName}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                          {topic.module_name}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-bold">{topic.name}</td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() => handleEdit(topic)}
                            className="bg-amber-500 text-white p-2 rounded hover:bg-amber-600"
                          >
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() =>
                              promptDelete(topic.id, topic.module_id)
                            }
                            className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                          >
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="py-10 text-center text-gray-400">
                    {selectedCourseId
                      ? "No topics found for the selected filter."
                      : "Select a course to view or add topics."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">
              {editingTopic ? "Edit Topic" : "Add New Topic"}
            </h2>
            <form onSubmit={handleSubmit}>
              {/* Course Selector (Read-only in form, based on selection) */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Course
                </label>
                <select
                  value={selectedCourseId}
                  onChange={handleCourseChange}
                  className="w-full p-3 border rounded-lg bg-gray-100"
                  disabled={!!editingTopic} // Disable change during edit for simplicity
                  required
                >
                  <option value="">Select Course</option>
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                {!selectedCourseId && (
                  <p className="text-xs text-red-500 mt-1">
                    Please select a course first.
                  </p>
                )}
              </div>

              {/* Module Selector (Filtered) */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Module
                </label>
                <select
                  name="module"
                  value={formData.module}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  disabled={!selectedCourseId || loading.modules}
                  required
                >
                  <option value="">-- Select Module --</option>
                  {filteredModules.map((mod) => (
                    <option key={mod.id} value={mod.id}>
                      {mod.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Topic Name */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Topic Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Introduction to React"
                  required
                />
              </div>

              {/* Form Actions */}
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || !selectedCourseId}
                  className="flex-1 py-2 bg-[#4522f0] text-white rounded-lg hover:bg-[#401afc] flex justify-center items-center gap-2 disabled:opacity-50"
                >
                  {submitting ? <Spinner /> : editingTopic ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center">
          <div className="bg-white w-full max-w-sm p-6 rounded-2xl shadow-2xl">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                <svg
                  className="h-8 w-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Delete Topic?</h3>
              <p className="text-sm text-gray-500 mb-6">
                This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() =>
                    setDeleteModal({ show: false, id: null, moduleId: null })
                  }
                  className="flex-1 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex justify-center items-center gap-2"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopicManager;
