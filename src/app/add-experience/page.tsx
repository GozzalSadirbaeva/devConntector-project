"use client";
import { baseUrl } from "@/utils/url";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AddExperience = () => {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [currentJob, setCurrentJob] = useState<boolean>(false);

  const addexp = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await axios.put(
      `${baseUrl}profile/experience`,
      { title, company, from, to },
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    );
    if (res.status === 200) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-[#0f3352]">Add An Experience</h1>
      <p className="text-gray-600 mt-2">
        💼 Add any developer/programming positions that you have had in the past
      </p>

      <form onSubmit={addexp} className="mt-6 space-y-4">
        <input
          type="text"
          placeholder="* Job Title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
        <input
          type="text"
          placeholder="* Company"
          required
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 border rounded-md"
        />

        <div className="flex flex-col gap-2">
          <label className="text-gray-700">From Date</label>
          <input
            type="date"
            required
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={currentJob}
            onChange={() => setCurrentJob(!currentJob)}
            className="h-4 w-4"
          />
          <label className="text-gray-700">Current Job</label>
        </div>

        {!currentJob && (
          <div className="flex flex-col gap-2">
            <label className="text-gray-700">To Date</label>
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
        )}

        <textarea
          placeholder="Job Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded-md h-32"
        />

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-[#0f3352] text-white px-4 py-2 rounded-md hover:bg-[#0d2a45]"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Go Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExperience;
