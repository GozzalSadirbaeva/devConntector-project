"use client";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function Login() {
  const route = useRouter();
  const { loading, login, error } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };
  if (error) {
    return <h1>{error}</h1>;
  }
  return (
    <div>
      <div className="flex max-w-[1440px] w-full mx-auto my-0">
        <div>
          <img src="/login4.jpg" alt="" className="w-[90%]" />
        </div>
        <div className="bg-[#7ba1c392] px-10 py-5 rounded-lg mt-20 mb-10 pt-14 mr-20">
          <h2 className="text-2xl text-center p-4 font-semibold text-[#0f3352]">
            Login
          </h2>
          <form
            action=""
            onSubmit={onSubmit}
            className="flex flex-col gap-3 items-center "
          >
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Email"
              className="px-2 py-2 rounded-lg outline-none w-[300px]"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="px-2 py-2 rounded-lg outline-none w-[300px]"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#0f3352] text-white rounded-md mt-3"
            >
              {loading ? "Loading... " : "Submit"}
            </button>
            <p className="text-[#0f3352]">
              Dont have an account?{" "}
              <span
                onClick={() => route.push("/register")}
                className="underline cursor-pointer "
              >
                Sign Up
              </span>{" "}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
