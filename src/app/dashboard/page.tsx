"use client";
import useFetch from "@/hooks/useFetch";
import { baseUrl } from "@/utils/url";
import axios from "axios";
import Link from "next/link";
import { FaBriefcase, FaGraduationCap, FaUserEdit } from "react-icons/fa";
import { useState, useEffect } from "react";

interface Experience {
  _id: string;
  company: string;
  title: string;
  years: string;
  from: number;
  to: number;
}

interface Education {
  _id: string;
  school: string;
  degree: string;
  years: string;
  from: number;
  to:number
}

interface User {
  name: string;
  email: string;
  experience: Experience[];
  education: Education[];
}

function Dashboard() {
  const { data } = useFetch<{ name: string }>("auth");
  const { data: profile} = useFetch<User>("profile/me");
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);

  useEffect(() => {
    if (profile?.experience) {
      setExperiences(profile.experience);
    }
    if (profile?.education) {
      setEducations(profile.education);
    }
  }, [profile]);

  const deleteExperience = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      await axios.delete(`${baseUrl}profile/experience/${id}`, {
        headers: {
          "x-auth-token": token,
          "Content-Type": "application/json",
        },
      });

      setExperiences(experiences.filter((exp) => exp._id !== id));
    } catch (error) {
      console.error("Error deleting experience:", error);
    }
  };

  const deleteEducation = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      await axios.delete(`${baseUrl}profile/education/${id}`, {
        headers: {
          "x-auth-token": token,
          "Content-Type": "application/json",
        },
      });

      setEducations(educations.filter((edu) => edu._id !== id));
    } catch (error) {
      console.error("Error deleting education:", error);
    }
  };
  const deleteAccount = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }
  
      const confirmDelete = window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone!"
      );
      if (!confirmDelete) return;
  
      await axios.delete(`${baseUrl}profile`, {
        headers: {
          "x-auth-token": token,
          "Content-Type": "application/json",
        },
      });
  
      localStorage.removeItem("token"); 
      window.location.href = "/login";
    } catch (error) {
      console.error( error);
    }
  };
  

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toISOString().split("T")[0]; 
  };
  


  return (
    <div className="px-10 py-8">
      <h1 className="font-bold text-[50px] text-[#0f3352]">Dashboard</h1>
      <h2 className="text-[#333333] text-3xl pt-5 flex items-center">
        <FaUserEdit className="mr-2" /> Welcome {data?.name}
      </h2>

      {profile ? (
        <div className="mt-6 space-x-4 flex flex-col">
          <div className="flex">
            <button className="px-4 py-2 border rounded-lg">
              <Link href="/edit-profile" className="flex items-center">
                <FaUserEdit className="mr-2" /> Edit Profile
              </Link>
            </button>
            <button className="px-4 py-2 rounded-lg flex items-center border">
              <Link href="/add-experience" className="flex items-center">
                <FaBriefcase className="mr-2" /> Add Experience
              </Link>
            </button>
            <button className="px-4 py-2 border rounded-lg flex items-center">
              <Link href="/add-education" className="flex items-center">
                <FaGraduationCap className="mr-2" /> Add Education
              </Link>
            </button>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-semibold">Experience Credentials</h3>
            <table className="mt-4">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2">Company</th>
                  <th className="p-2">Title</th>
                  <th className="p-2">Years</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {experiences.map((exp) => (
                  <tr key={exp._id}>
                    <td className="p-2">{exp.company}</td>
                    <td className="p-2">{exp.title}</td>
                    <td className="p-2">{formatDate(exp.from)} - {exp.to ? formatDate(exp.to) : "Present"}</td>

                    <td className="p-2">
                      <button
                        onClick={() => deleteExperience(exp._id)}
                        className="px-2 py-1 bg-red-500 text-white rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-semibold">Education Credentials</h3>
            <table className=" mt-4">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2">School</th>
                  <th className="p-2">Degree</th>
                  <th className="p-2">Years</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {educations.map((edu) => (
                  <tr key={edu._id} >
                    <td className="p-2">{edu.school}</td>
                    <td className="p-2">{edu.degree}</td>
                    <td className="p-2">{formatDate(edu.from)} - {edu.to ? formatDate(edu.to) : "Present"}</td>

                    <td className="p-2">
                      <button
                        onClick={() => deleteEducation(edu._id)}
                        className="px-2 py-1 bg-red-500 text-white rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={() => deleteAccount()} className="text-white bg-red-500 px-3 py-1 rounded-lg mt-3">Delete Account</button>
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