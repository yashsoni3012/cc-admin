import { useState } from "react";
import axios from "axios";

const useSubmit = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitData = async (url, data = {}, isFile = false, method = 'POST') => {
    setLoading(true);
    setError(null);

    try {
      let payload = data;
      let headers = {};

      if (isFile) {
        // 1. If it's a file, we MUST send FormData
        if (!(data instanceof FormData)) {
           // Convert if user forgot
           const formData = new FormData();
           Object.keys(data).forEach(key => formData.append(key, data[key]));
           payload = formData;
        } else {
           payload = data;
        }
        
        // 2. CRITICAL: Delete Content-Type so browser sets the "Boundary"
        delete headers["Content-Type"]; 
      } else {
        headers["Content-Type"] = "application/json";
      }

      const config = { headers };

      let response;
      switch (method.toUpperCase()) {
        case 'DELETE':
          response = await axios.delete(url, config);
          break;
        case 'PATCH':
          response = await axios.patch(url, payload, config);
          break;
        case 'PUT':
          response = await axios.put(url, payload, config);
          break;
        case 'POST':
        default:
          response = await axios.post(url, payload, config);
          break;
      }

      setLoading(false);
      return { success: true, data: response.data };

    } catch (err) {
      console.error("API Error:", err.response || err);
      const errMsg = err.response?.data 
        ? JSON.stringify(err.response.data) 
        : err.message;
      setError(errMsg);
      setLoading(false);
      return { success: false, error: errMsg };
    }
  };

  return { submitData, loading, error };
};

export default useSubmit;