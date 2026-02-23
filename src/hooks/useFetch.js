import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // We define fetchData inside useCallback so it doesn't change unless URL changes
  const fetchData = useCallback(async () => {
    if (!url) return;

    setLoading(true);
    try {
      const response = await axios.get(url);
      setData(response.data);
      setError(null);
    } catch (err) {
      console.error("Fetch Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url]);

  // ✅ FIX: Only run this when the URL changes or fetchData changes
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData, setData };
};

export default useFetch;