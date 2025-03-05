"use client";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

function Register() {
  const route = useRouter();
  const { loading, register } = useAuth();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      route.push("/dashboard");
    }
  }, [route]); 

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await register(name, email, password); 
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <div className="flex gap-[130px] max-w-[1440px] w-full mx-auto my-0">
      <div>
        <Image src="/sign9.avif" alt="Signup Image" width={800} height={500} className="pl-20" />
      </div>
      <div className="bg-[#7ba1c392] px-10 py-3 rounded-lg mt-20 mb-10 pt-8 mr-20 ">
        <h2 className="text-2xl text-center p-4 font-semibold text-[#0f3352]">
          Sign Up
        </h2>
        <p className="text-center pb-3 text-lg text-[#0f3352]">
          Create Your Account
        </p>
        <form onSubmit={onSubmit} className="flex flex-col gap-3 items-center">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
            className="px-2 py-2 rounded-lg outline-none w-[300px]"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="px-2 py-2 rounded-lg outline-none w-[300px]"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="px-2 py-2 rounded-lg outline-none w-[300px]"
          />
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Confirm password"
            className="px-2 py-2 rounded-lg outline-none w-[300px]"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#0f3352] text-white rounded-md mt-3"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
          <p className="text-[#0f3352]">
            Already have an account?{" "}
            <span
              onClick={() => route.push("/login")}
              className="underline cursor-pointer"
            >
              Sign In
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
