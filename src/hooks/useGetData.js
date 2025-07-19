import { useEffect, useState } from "react";
import { fetchGet } from "../utils/fetchUtils";

const useGetData = (route, token) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchPosts = async () => {
      try {
        const response = await fetchGet(route, abortController.signal, token);

        const jsonData = await response.json();
        if (!response.ok) {
          setError(jsonData.message);
        } else {
          setData(jsonData.output);
        }
      } catch (error) {
        if (!error.name === "AbortError") {
          console.error(error.message);
          setError(`An error has occured. Error Name: ${error.name}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();

    return () => abortController.abort();
  }, [route, token]);

  return { data, loading, error };
};

export default useGetData;
