"use client";
import { DeveloperInterface, Repo } from "@/interface/user";
import { baseUrl } from "@/utils/url";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const DetailPage = () => {
  const { developerId } = useParams();
  const [info, setInfo] = useState<DeveloperInterface | null>(null);
  const [github, setGithub] = useState<Repo[] | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`${baseUrl}profile/user/${developerId}`);
        setInfo(res.data);
        // console.log(res);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (developerId) {
      fetchUserData();
    }
  }, [developerId]);

  useEffect(() => {
    const fetchGithubData = async () => {
      if (!info?.githubusername) return;

      try {
        const resgithub = await axios.get(
          `${baseUrl}profile/github/${info?.githubusername}`
        );
        setGithub(resgithub.data);
        console.log(resgithub, "dcsddffsdddddddddddddddddddddd f");
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
      }
    };

    fetchGithubData();
  }, [info?.githubusername]);
  // console.log(github);

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center">
        <Image
          src={info?.user?.avatar || "/default-avatar.png"} 
          alt={info?.user?.name || "User avatar"}
          width={144} 
          height={144}
          className="w-36 h-36 rounded-full border-4 border-gray-200"
        />

        <h2 className="text-2xl font-bold mt-4">{info?.user?.name}</h2>
        <h3 className="text-lg text-gray-600">Company: {info?.company}</h3>
        <p className="text-gray-500 mt-2">Location: {info?.location}</p>
        <p className="text-gray-700 text-center mt-2 px-4">Bio: {info?.bio}</p>

        {info?.skills && (
          <div className="mt-4">
            <h4 className="text-lg font-semibold text-gray-700">Skills:</h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {info.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="w-full mt-8">
          <h3 className="text-xl font-semibold text-gray-800 text-center">
            GitHub Repositories
          </h3>

          {Array.isArray(github) ? (
            <div className="mt-4 space-y-4">
              {github?.map((repo) => (
                <div
                  key={repo.id}
                  className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
                >
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-semibold text-lg hover:underline"
                  >
                    {repo.name}
                  </a>
                  <p className="text-gray-600 mt-1">
                    {repo.description || "No description provided."}
                  </p>
                  <div className="flex gap-3 mt-3">
                    <span className="bg-blue-500 text-white text-sm px-3 py-1 rounded-lg">
                      ⭐ Stars: {repo.stargazers_count}
                    </span>
                    <span className="bg-gray-800 text-white text-sm px-3 py-1 rounded-lg">
                      👀 Watchers: {repo.watchers_count}
                    </span>
                    <span className="bg-gray-400 text-black text-sm px-3 py-1 rounded-lg">
                      🍴 Forks: {repo.forks_count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center mt-4">
              No GitHub repositories found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
