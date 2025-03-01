"use client";
import useFetch from "@/hooks/useFetch";
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

interface Comment {
  _id: string;
  text: string;
  name: string;
  date: string;
  avatar?: string;
}

const DetailPage: React.FC = () => {
  const { postId } = useParams();
  const [comment, setComment] = useState<string>("");
  const [info, setInfo] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const { data, error: err } = useFetch<{ _id: string; name: string }>("auth");

  const router = useRouter();

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const res = await axios.get(`${baseUrl}posts/${postId}`, {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        });
        setInfo(res.data);
        setComments(res.data.comments || []);
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };

    fetchPostData();
  }, [postId]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      const res = await axios.post(
        `${baseUrl}posts/comment/${postId}`,
        { text: comment },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );

      setComments([res.data, ...comments]);
      setComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const delComment = async (commentId: string) => {
    try {
      await axios.delete(`${baseUrl}posts/comment/${postId}/${commentId}`, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });

      setComments(comments.filter((c) => c._id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

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
            src={info?.avatar || "/default-avatar.png"}
            alt="User Avatar"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold">{info?.name}</h3>
            <p className="text-gray-500 text-sm">
              Posted on {new Date(info?.date || "").toLocaleDateString()}
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

      <div className="mt-6">
        {comments.length > 0 && (
          <h2 className="text-xl font-semibold mb-4">Comments</h2>
        )}
        {comments.map((c) => (
          <div
            key={c._id}
            className="border p-4 rounded-lg shadow-md bg-white flex items-start gap-4 mb-4"
          >
            <img
              src={c.avatar || "/default-avatar.png"}
              alt="User Avatar"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="text-md font-semibold">{c.name}</h3>
              <p className="text-gray-500 text-sm">
                Posted on {new Date(c.date).toLocaleDateString()}
              </p>
              <p className="text-gray-700 mt-2">{c.text}</p>
              {/* {data?._id === c.name && (
               )} */}
                <button
                  onClick={() => delComment(c._id)}
                  className="text-white bg-red-500 px-3 py-1 rounded-lg mt-2"
                >
                  Delete
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailPage;
