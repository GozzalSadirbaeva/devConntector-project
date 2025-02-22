"use client";
import useFetch from "@/hooks/useFetch";
import axios from "axios";
import Link from "next/link";

function Dashboard() {
  const { data } = useFetch("profile/me");
  console.log(data);
  async function getMe(e) {
    try {
      let res = await axios.post(baseUrl + "profile/me", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        localStorage.setItem("token", res?.data?.token);
      }
    } catch (error) {
      setError(error.response?.data?.message || "aaa");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="px-16">
        <h1 className="font-bold text-[50px] leading-[60px] text-[#0f3352] pt-8">
          Dashboard
        </h1>
        <h2 className="text-[#333333] text-3xl pt-5">Welcome Gozzal</h2>
        <p className="text-xl pt-3">
          You have not yet setup a profile, please add some info
        </p>
        <button className="px-4 py-2 bg-[#0f3352] text-white rounded-md mt-4">
          <Link href="/create-profile">Create Profile</Link>
        </button>
      </div>
    </>
  );
}

export default Dashboard;
