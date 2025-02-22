"use client";

import { ProfileData } from "@/interface/profileData";
import { baseUrl } from "@/utils/url";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaTwitter } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";


const CreateProfile = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("* Select Professional Status");
  const [status, setStatus] = useState("");
  const [profileData, setProfileData] = useState<ProfileData>({
    company: "",
    website: "",
    location: "",
    skills: "",
    github: "",
  });
  const descriptions = [
    {
      id: 1,
      desc: "Could be your own company or one you work for",
    },
    {
      id: 2,
      desc: "Could be your own or a company website",
    },
    {
      id: 3,
      desc: "City & state suggested (eg. Boston, MA)",
    },
    {
      id: 4,
      desc: "Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)",
    },
    {
      id: 5,
      desc: "If you want your latest repos and a Github link, include your username",
    },
  ];
  const [showSocialLinks, setShowSocialLinks] = useState(false);
  const [socialData, setSocialData] = useState({
    twitter: "",
    facebook: "",
    youtube: "",
    linkedin: "",
    instagram: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSocialData({ ...socialData, [e.target.name]: e.target.value });
  };

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

  const onchange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const createProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${baseUrl}profile`,
        { ...profileData, status },
        {
          headers: {
            "x-auth-token": localStorage.getItem("accessToken"),
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Profile created:", res.data);
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Error creating profile:", error.response?.data || error);
    }
  };

  return (
    <div className="px-16 pb-10">
      <h1 className="font-bold text-[50px] leading-[60px] text-[#0f3352] pt-8">
        Create Your Profile
      </h1>
      <h2 className="text-[#333333] text-2xl py-5">
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

        {Object.keys(profileData).map((key) => (
          <div key={key}>
            <input
              type="text"
              name={key}
              value={profileData[key as keyof ProfileData]}
              onChange={handleChange}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              className="w-full border-2 border-[#000000a9] px-2 py-2 rounded-md text-xl"
            />
            <p className="text-gray-600 pb-6 text-sm">
              {
                descriptions.find(
                  (d, index) => index === Object.keys(profileData).indexOf(key)
                )?.desc
              }
            </p>
          </div>
        ))}

        <textarea
          name="bio"
          placeholder="Info about yourself"
          className="w-full border-2 border-[#000000a9] px-2 py-2 rounded-md text-xl"
        ></textarea>
        <p className="text-gray-600 pb-6 text-sm">
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
            <div className="mt-4 space-y-4">
              {[
                { name: "twitter", placeholder: "Twitter URL", icon: <FaTwitter/> },
                { name: "facebook", placeholder: "Facebook URL", icon: <FaSquareFacebook/> },
                { name: "youtube", placeholder: "YouTube URL", icon: <FaYoutube/> },
                { name: "linkedin", placeholder: "LinkedIn URL", icon: <FaLinkedin/> },
                { name: "instagram", placeholder: "Instagram URL", icon: <FaInstagramSquare/> },
              ].map((social) => (
                <div key={social.name} className="flex items-center gap-3">
                  <span className="text-2xl">{social.icon}</span>
                  <input
                    type="text"
                    name={social.name}
                    value={socialData[social.name as keyof typeof socialData]}
                    onChange={onchange}
                    placeholder={social.placeholder}
                    className="w-full border-2 border-gray-400 px-3 py-2 rounded-md text-lg"
                  />
                </div>
              ))}
            </div>
          )}

          {/* <div className="flex gap-5 pt-6">
            <button
              type="submit"
              className="px-5 py-2 bg-green-600 text-white rounded-md text-lg"
            >
              Submit
            </button>
            <button
              type="button"
              className="px-5 py-2 bg-gray-500 text-white rounded-md text-lg"
            >
              Go Back
            </button>
          </div> */}
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
