import { useEffect, useState } from "react";
import { fetchPost } from "../utils/fetchUtils";

const usePostData = (route, body, token) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchPosts = async () => {
      try {
        const response = await fetchPost(
          route,
          body,
          abortController.signal,
          token
        );

        const jsonData = await response.json();
        if (!response.ok) {
          setError(jsonData.message);
        } else {
          setData(jsonData.output);
        }
      } catch (error) {
        if (!error.name === "AbortError") {
          console.error(error.message);
          setError(`An error has occured. Error Code: ${error.name}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();

    return () => abortController.abort();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading, error };
};

export default usePostData;
