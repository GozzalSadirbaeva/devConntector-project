"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const AddExperience = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    company: "",
    location: "",
    fromDate: "",
    toDate: "",
    currentJob: false,
    description: "",
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, currentJob: e.target.checked, toDate: e.target.checked ? "" : formData.toDate });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-[#0f3352]">Add An Experience</h1>
      <p className="text-gray-600 mt-2">💼 Add any developer/programming positions that you have had in the past</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input
          type="text"
          name="jobTitle"
          placeholder="* Job Title"
          required
          value={formData.jobTitle}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />
        <input
          type="text"
          name="company"
          placeholder="* Company"
          required
          value={formData.company}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />

        <div className="flex flex-col gap-2">
          <label className="text-gray-700">From Date</label>
          <input
            type="date"
            name="fromDate"
            required
            value={formData.fromDate}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="currentJob"
            checked={formData.currentJob}
            onChange={handleCheckboxChange}
            className="h-4 w-4"
          />
          <label className="text-gray-700">Current Job</label>
        </div>

        {!formData.currentJob && (
          <div className="flex flex-col gap-2">
            <label className="text-gray-700">To Date</label>
            <input
              type="date"
              name="toDate"
              value={formData.toDate}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
        )}

        <textarea
          name="description"
          placeholder="Job Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded-md h-32"
        />

        <div className="flex gap-4">
          <button type="submit" className="bg-[#0f3352] text-white px-4 py-2 rounded-md hover:bg-[#0d2a45]">Submit</button>
          <button type="button" onClick={() => router.back()} className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400">Go Back</button>
        </div>
      </form>
    </div>
  );
};

export default AddExperience;