"use client";
import { useRouter } from "next/navigation";
import "./style.css";

function Main() {
  const router = useRouter();

  return (
    <div className="bg-img2 min-h-screen flex justify-center items-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative bg-[#ffffff6c] p-10 py-20 text-center rounded-lg shadow-lg z-10">
        <h1 className="text-[50px] font-bold pb-4 text-[#0f3352]">Developer Connector</h1>
        <h2 className="text-2xl mt-2 pb-4">
          Create a developer profile/portfolio, share posts and get help from
          other developers
        </h2>
        <div className="mt-4 space-x-4">
          <button
            onClick={() => router.push("/register")}
            className="px-5 py-2 bg-[#0f3352] text-white rounded text-lg"
          >
            Sign up
          </button>
          <button
            onClick={() => router.push("/login")}
            className="px-5 py-2 bg-gray-600 text-white rounded  text-lg"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Main;
