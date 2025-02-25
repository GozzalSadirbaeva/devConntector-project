"use client";
import useFetch from "@/hooks/useFetch";
import Link from "next/link";
import { FaBriefcase, FaGraduationCap, FaUserEdit } from "react-icons/fa";

interface User {
  name: string;
  email: string;
  experience: { company: string; title: string; years: string }[];
  education: { school: string; degree: string; years: string }[];
}

function Dashboard() {
  const { data, error } = useFetch<{ name: string }>("auth");
  const { data: profile, error: errorProfile } = useFetch<User>("profile/me");

  return (
    <div className="px-10 py-8">
      <h1 className="font-bold text-[50px] text-[#0f3352]">Dashboard</h1>
      <h2 className="text-[#333333] text-3xl pt-5 flex items-center">
        <FaUserEdit className="mr-2" /> Welcome {data?.name}
      </h2>

      {profile ? (
        <div className="mt-6 space-x-4 flex">
          <button className="px-4 py-2 border  rounded-lg ">
            <Link href="/edit-profile" className="flex items-center"><FaUserEdit className="mr-2" /> Edit Profile</Link>
          </button>
          <button className="px-4 py-2  rounded-lg flex items-center border ">
            <Link href="/add-experience" className="flex items-center"><FaBriefcase className="mr-2" /> Add Experience</Link>
          </button>
          <button className="px-4 py-2 border  rounded-lg flex items-center ">
            <Link href="/add-education" className="flex items-center"><FaGraduationCap className="mr-2" /> Add Education</Link>
          </button>
          <div className="mt-8">
        <h3 className="text-2xl font-semibold">Experience Credentials</h3>
        <table className=" border mt-4">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">Company</th>
              <th className="p-2">Title</th>
              <th className="p-2">Years</th>
            </tr>
          </thead>
          <tbody>
            {profile?.experience?.map((exp, index) => (
              <tr key={index} className="border-t">
                <td className="p-2">{exp.company}</td>
                <td className="p-2">{exp.title}</td>
                <td className="p-2">{exp.years}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-semibold">Education Credentials</h3>
        <table className=" border mt-4">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">School</th>
              <th className="p-2">Degree</th>
              <th className="p-2">Years</th>
            </tr>
          </thead>
          <tbody>
            {profile?.education?.map((edu, index) => (
              <tr key={index} className="border-t">
                <td className="p-2">{edu.school}</td>
                <td className="p-2">{edu.degree}</td>
                <td className="p-2">{edu.years}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        </div>
      ) : (
        <div className="mt-4">
          <p className="text-xl">
            You have not yet set up a profile, please add some info.
          </p>
          <button className="px-4 py-2 bg-[#0f3352] text-white rounded-md mt-4 hover:bg-[#0d2a45]">
            <Link href="/create-profile">Create Profile</Link>
          </button>
        </div>
      )}

      
    </div>
  );
}

export default Dashboard;
