'use client';

import { useState } from 'react';
import Link from 'next/link';

const AddEducation = () => {
  const [current, setCurrent] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-[#0f3352]">Add Your Education</h1>
      <p className="text-gray-600 mt-2">
        🔧 Add any school or bootcamp that you have attended
      </p>
      <form className="mt-6">
        <input
          type="text"
          placeholder="* School or Bootcamp"
          className="w-full p-2 border rounded-md mb-4"
        />
        <input
          type="text"
          placeholder="* Degree or Certificate"
          className="w-full p-2 border rounded-md mb-4"
        />
        <input
          type="text"
          placeholder="Field of Study"
          className="w-full p-2 border rounded-md mb-4"
        />

        <label className="block text-gray-700">From Date</label>
        <input type="date" className="w-full p-2 border rounded-md mb-4" />

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={current}
            onChange={() => setCurrent(!current)}
            className="mr-2"
          />
          <span>Current School</span>
        </div>

        {!current && (
          <>
            <label className="block text-gray-700">To Date</label>
            <input type="date" className="w-full p-2 border rounded-md mb-4" />
          </>
        )}

        <textarea
          placeholder="Program Description"
          className="w-full p-2 border rounded-md mb-4 h-24"
        ></textarea>

        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-[#0f3352] text-white rounded-md">Submit</button>
          <Link href="/dashboard">
            <button className="px-4 py-2 bg-gray-500 text-white rounded-md">Go Back</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddEducation;
