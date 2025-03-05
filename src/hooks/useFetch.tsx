import { baseUrl } from "@/utils/url";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";

function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchData = useCallback(async () => {
    try {
      setError("");
      setLoading(true);
      const res = await axios.get(baseUrl + url, {
        headers: {
          "x-auth-token": `${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      setData(res.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { loading, error, data, refetch: fetchData };
}

export default useFetch;
