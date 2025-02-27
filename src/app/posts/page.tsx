"use client";
import { baseUrl } from "@/utils/url";
import useFetch from "@/hooks/useFetch";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillLike, AiFillDislike } from "react-icons/ai";

interface Post {
  _id: string;
  text: string;
  name: string;
  date: string;
  avatar?: string;
  user: string;  
}

function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [createPost, setCreatePost] = useState<string>("");
  const { data, error: err } = useFetch<{ _id: string; name: string }>("auth"); 

  const createNewPost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token not found.");
      }

      const response = await axios.post(
        `${baseUrl}posts`,
        { text: createPost },
        {
          headers: {
            "x-auth-token": token,
            "Content-Type": "application/json",
          },
        }
      );
      setPosts([response.data, ...posts]);
      setCreatePost("");
    } catch (error: any) {
      console.error("Error creating post:", error);
      setError(error.response?.data?.message || error.message || "Failed to create post.");
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication token not found.");
        }

        const response = await axios.get(`${baseUrl}posts`, {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        });
        setPosts(response.data);
      } catch (error: any) {
        console.error("Error fetching posts:", error);
        setError(error.response?.data?.message || error.message || "Failed to fetch posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const deletePost = async (postId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token not found.");
      }

      await axios.delete(`${baseUrl}posts/${postId}`, {
        headers: {
          "x-auth-token": token,
          "Content-Type": "application/json",
        },
      });

      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error: any) {
      console.error("Error deleting post:", error);
      setError(error.response?.data?.message || error.message || "Failed to delete post.");
    }
  };

  if (loading) return <div className="text-center text-lg font-semibold">Loading...</div>;
  if (error) return <div className="text-center text-red-500 font-semibold">{error}</div>;

  return (
    <div>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-teal-600 mb-4">Posts</h1>
        <div className="flex items-center space-x-2 mb-4">
          <p className="text-lg">Welcome to the community</p>
        </div>
        <div className="bg-teal-500 text-white font-bold p-3 rounded-t-lg">
          Say Something...
        </div>
        <form onSubmit={createNewPost}>
          <textarea
            className="w-full p-3 border rounded-b-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Create a post"
            value={createPost}
            onChange={(e) => setCreatePost(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="mt-4 mb-5 bg-[#1e293b] text-white py-2 px-4 rounded hover:bg-gray-700"
          >
            Submit
          </button>
        </form>

        <div className="flex flex-col">
          {posts.length === 0 ? (
            <p className="text-center text-gray-500">No posts available</p>
          ) : (
            <ul className="space-y-4">
              {posts.map((post) => (
                <li key={post._id} className="border rounded-lg p-4 shadow-md flex items-start gap-4 bg-white">
                  <img src={post.avatar} alt={post.name} className="w-12 h-12 rounded-full object-cover" />

                  <div className="flex flex-col w-full">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-semibold">{post.name}</h3>
                      <p className="text-gray-500 text-xs">{new Date(post.date).toLocaleDateString()}</p>
                    </div>
                    <p className="text-gray-700 mt-2">{post.text}</p>

                    <div className="flex items-center gap-2 mt-2">
                      <button className="flex items-center gap-1 bg-[#1e293b] text-white p-2 rounded-md text-sm hover:bg-gray-700">
                        <AiFillLike /> Like
                      </button>
                      <button className="flex items-center gap-1 bg-[#1e293b] text-white p-2 rounded-md text-sm hover:bg-gray-700">
                        <AiFillDislike /> Dislike
                      </button>
                      <button className="bg-[#14b8a6] text-white px-3 py-2 rounded-md text-sm">
                        Discussion
                      </button>

                      {data?._id === post.user && (
                        <button
                          onClick={() => deletePost(post._id)}
                          className="ml-auto bg-red-500 text-white px-3 py-2 rounded-md text-sm hover:bg-red-700"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Posts;
