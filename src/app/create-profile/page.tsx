"use client";

import { ProfileData } from "@/interface/profileData";
import { baseUrl } from "@/utils/url";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateProfile = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>(
    "* Select Professional Status"
  );
  const [status, setStatus] = useState<string>("");
  const [twitter, setTwitter] = useState<string>("");
  const [facebook, setFacebook] = useState<string>("");
  const [youtube, setYoutube] = useState<string>("");
  const [linkedin, setLinkedin] = useState<string>("");
  const [instagram, setInstagram] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [skills, setSkills] = useState<string>("");
  const [githubusername, setGithubusername] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  const [showSocialLinks, setShowSocialLinks] = useState(false);

  const options = [
    { value: "developer", label: "Developer" },
    { value: "junior", label: "Junior Developer" },
    { value: "senior", label: "Senior Developer" },
    { value: "manager", label: "Manager" },
    { value: "student", label: "Student" },
    { value: "teacher", label: "Instructor or Teacher" },
    { value: "intern", label: "Intern" },
    { value: "other", label: "Other" },
  ];

  const createProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${baseUrl}profile`,
        { company, location, status, website, skills, githubusername, bio },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Profile created:", res.data);
      if (res.status === 200) {
        router.push("/dashboard");
      }
    } catch (error: any) {
      console.error("Error creating profile:", error.response?.data || error);
    }
  };

  return (
    <div className="px-16 pb-10">
      <h1 className="font-bold text-[50px] leading-[60px] text-[#0f3352] pt-8">
        Create Your Profile
      </h1>
      <h2 className="text-[#333333] text-2xl py-5 ">
        Let's get some information to make your profile stand out!
      </h2>

      <form onSubmit={createProfile}>
        <div className="relative w-full">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full px-4 py-2 border-2 border-[#000000a9] rounded-md text-xl bg-white text-left"
          >
            {selected}
          </button>
          {isOpen && (
            <ul className="absolute w-full bg-white border-2 border-[#000000a9] rounded-md shadow-lg mt-1 z-10">
              {options.map((option) => (
                <li
                  key={option.value}
                  onClick={() => {
                    setSelected(option.label);
                    setStatus(option.value);
                    setIsOpen(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-xl"
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>
        <p className="text-gray-600 pb-6 text-sm">
          Give us an idea of where you are at in your career
        </p>

        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company"
          className="w-full border-2 border-[#000000a9] px-2 py-2 rounded-md text-xl"
        />
        <label htmlFor="" className="text-gray-600 mb-6 text-sm">
          Could be your own company or one you work for
        </label>
        <input
          type="text"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          placeholder="Website"
          className="w-full border-2 border-[#000000a9] px-2 py-2 rounded-md text-xl"
        />
        <label htmlFor="" className="text-gray-600 mb-6 text-sm">
          Could be your own or a company website
        </label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          className="w-full border-2 border-[#000000a9] px-2 py-2 rounded-md text-xl"
        />
        <label htmlFor="" className="text-gray-600 mb-6 text-sm">
          City & state suggested (eg. Boston, MA)
        </label>
        <input
          type="text"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="Skills"
          className="w-full border-2 border-[#000000a9] px-2 py-2 rounded-md text-xl"
        />
        <label htmlFor="" className="text-gray-600 mb-6 text-sm">
          Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
        </label>
        <input
          type="text"
          value={githubusername}
          onChange={(e) => setGithubusername(e.target.value)}
          placeholder="GitHub Username"
          className="w-full border-2 border-[#000000a9] px-2 py-2 rounded-md text-xl"
        />
        <label htmlFor="" className="text-gray-600 mb-6 text-sm">
          If you want your latest repos and a Github link, include your username
        </label>

        <textarea
          name="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Info about yourself"
          className="w-full border-2 border-[#000000a9] px-2 py-2 rounded-md text-xl"
        ></textarea>
        <p className="text-gray-600 mb-6 text-sm">
          Tell us a little about yourself
        </p>

        <div className="px-8 py-6">
          <button
            type="button"
            onClick={() => setShowSocialLinks(!showSocialLinks)}
            className="px-4 py-2 border-2 border-gray-400 rounded-md text-lg bg-white text-black text-left"
          >
            Add Social Network Links{" "}
          </button>
          <span className="text-gray-600 pl-3">Optional</span>

          {showSocialLinks && (
            <div>
              <input
                type="text"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                placeholder="Twitter"
                className="w-full border-2 border-gray-400 px-3 py-2 rounded-md text-lg"
              />
              <input
                type="text"
                onChange={(e) => setFacebook(e.target.value)}
                value={facebook}
                placeholder="Facebook"
                className="w-full border-2 border-gray-400 px-3 py-2 rounded-md text-lg"
              />
              <input
                type="text"
                value={youtube}
                onChange={(e) => setYoutube(e.target.value)}
                placeholder="Youtube"
                className="w-full border-2 border-gray-400 px-3 py-2 rounded-md text-lg"
              />
              <input
                type="text"
                onChange={(e) => setLinkedin(e.target.value)}
                value={linkedin}
                placeholder="Linkedin"
                className="w-full border-2 border-gray-400 px-3 py-2 rounded-md text-lg"
              />
              <input
                type="text"
                onChange={(e) => setInstagram(e.target.value)}
                value={instagram}
                placeholder="Instagram"
                className="w-full border-2 border-gray-400 px-3 py-2 rounded-md text-lg"
              />
            </div>
          )}
        </div>

        <div className="flex gap-5 pt-6">
          <button
            type="submit"
            className="px-5 py-2 bg-[#187e3ff1] text-white rounded-md text-lg"
          >
            Send
          </button>
          <Link
            href="/dashboard"
            className="px-5 py-2 bg-[#4b5563] text-white rounded-md text-lg"
          >
            Go Back
          </Link>
        </div>
      </form>
    </div>
  );
};

export default CreateProfile;
