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
      setLoading(true);
      setError("");
      const res = await axios.get(baseUrl + "auth");
      setUser(res.data);
    } catch (err) {
      console.error("Fetching user failed:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMe();
  }, []);

  async function login(email: string, password: string) {
    try {
      setLoading(true);
      const res = await axios.post(
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
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Login failed");
      } else {
        setError("An unexpected error occurred");
      }
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  }

  async function register(name: string, email: string, password: string) {
    try {
      setLoading(true);
      const res = await axios.post(
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
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Register failed");
      } else {
        setError("An unexpected error occurred");
      }
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  }

  function logOut() {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/");
  }

  return { login, logOut, user, error, loading, register };
}

export default useAuth;
