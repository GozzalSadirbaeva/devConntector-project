import { User } from "@/interface/user";
import { baseUrl } from "@/utils/url";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  async function getMe() {
    try {
      setError("");
      let res = await axios.get(baseUrl + "auth");
      setUser(res.data);
    } catch (error: unknown) {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMe();
  }, []);
  async function login(email: string, password: string) {
    try {
      let res = await axios.post(
        baseUrl + "auth",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        localStorage.setItem("token", res?.data?.token);
        router.push("/dashboard");
      }
    } catch (error: unknown) {
      setError(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  async function register(name: string, email: string, password: string) {
    try {
      let res = await axios.post(
        baseUrl + "users",
        { name, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        localStorage.setItem("token", res?.data?.token);
        router.push("/dashboard");
      }
    } catch (error: unknown) {
      setError(error.response?.data?.message || "Register failed");
    } finally {
      setLoading(false);
    }
  }
  function logOut() {}
  return { login, logOut, user, error, loading, register };
}

export default useAuth;
