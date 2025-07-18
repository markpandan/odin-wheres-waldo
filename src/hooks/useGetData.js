import { useEffect, useState } from "react";
import { fetchGet } from "../utils/fetchUtils";

const useGetData = (route, token) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchPosts = async () => {
      try {
        const response = await fetchGet(route, abortController.signal, token);

        const jsonData = await response.json();
        if (!response.ok) {
          setData(jsonData.message);
        } else {
          setData(jsonData.output);
        }
      } catch (error) {
        if (!error.name === "AbortError") {
          console.error(error.message);
        }
      }
    };

    fetchPosts();

    return () => abortController.abort();
  }, [route, token]);

  return data;
};

export default useGetData;
