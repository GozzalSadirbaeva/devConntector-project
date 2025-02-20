import { baseUrl } from "@/utils/url";
import axios from "axios";
import { useEffect, useState } from "react";

function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  async function fetchData() {
    try {
      setError("");
      setLoading(true);
      let res = await axios.get(baseUrl + url);
      console.log(res.data);
      setData(res.data)
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, [url]);
  return { loading, error, data, refetch: fetchData };
}

export default useFetch;
