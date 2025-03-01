"use client";
import { baseUrl } from "@/utils/url";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
interface Post {
  _id: string;
  text: string;
  name: string;
  date: string;
  avatar?: string;
  user: string;
  likes: string[];
}

const DetailPage: React.FC = () => {
  const { postId } = useParams();
  const [comment, setComment] = useState<string>("");
  const [info, setInfo] = useState<Post | null>(null);

  const router = useRouter();
  console.log(postId);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Comment:", comment);
    setComment("");
  };
  console.log(info, "asdfgh");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`${baseUrl}posts/${postId}`, {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        });
        setInfo(res.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [postId]);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
      >
        Back To Posts
      </button>

      <div className="border rounded-lg p-4 shadow-md bg-white">
        <div className="flex items-center gap-4">
          <img
            src={info?.avatar}
            alt="User Avatar"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold">{info?.name}</h3>
            <p className="text-gray-500 text-sm">
              Posted on {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        <p className="text-gray-700 mt-3">{info?.text}</p>

        <div className="flex items-center gap-2 mt-3">
          <button className="flex items-center gap-1 bg-gray-200 px-3 py-2 rounded-md hover:bg-gray-300">
            <AiFillLike /> Like <span>{info?.likes?.length}</span>
          </button>
          <button className="flex items-center gap-1 bg-gray-200 px-3 py-2 rounded-md hover:bg-gray-300">
            <AiFillDislike /> Dislike
          </button>
          <button className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600">
            Discussion
          </button>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="bg-teal-500 text-white font-bold p-3 rounded-t-lg">
          Leave a Comment
        </h2>
        <form
          onSubmit={handleCommentSubmit}
          className="border p-4 rounded-b-lg"
        >
          <textarea
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Comment the post"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="mt-4 bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default DetailPage;
