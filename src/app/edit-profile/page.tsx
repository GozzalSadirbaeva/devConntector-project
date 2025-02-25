"use client";

import { ProfileData } from "@/interface/profileData";
import { baseUrl } from "@/utils/url";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateProfile = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("* Select Professional Status");
  const [status, setStatus] = useState("");
  const [twitter, setTwitter] = useState<string>("");
  const [facebook, setFacebook] = useState<string>("");
  const [youtube, setYoutube] = useState<string>("");
  const [linkedin, setLinkedin] = useState<string>("");
  const [instagram, setInstagram] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [skills, setSkills] = useState<string>("");
  const [github, setGithub] = useState<string>("");
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
            "x-auth-token": localStorage.getItem("token"),
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
      Edit Your Profile
      </h1>
      <h2 className="text-[#333333] text-2xl py-5 ">
        Add some changes to your profile
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
          placeholder="Company"
          className="w-full border-2 border-[#000000a9] px-2 py-2 rounded-md text-xl"
        />
        <label htmlFor="" className="text-gray-600 mb-6 text-sm">
          Could be your own company or one you work for
        </label>
        <input
          type="text"
          value={website}
          placeholder="Website"
          className="w-full border-2 border-[#000000a9] px-2 py-2 rounded-md text-xl"
        />
        <label htmlFor="" className="text-gray-600 mb-6 text-sm">
          Could be your own or a company website
        </label>
        <input
          type="text"
          value={location}
          placeholder="Location"
          className="w-full border-2 border-[#000000a9] px-2 py-2 rounded-md text-xl"
        />
        <label htmlFor="" className="text-gray-600 mb-6 text-sm">
          City & state suggested (eg. Boston, MA)
        </label>
        <input
          type="text"
          value={skills}
          placeholder="Skills"
          className="w-full border-2 border-[#000000a9] px-2 py-2 rounded-md text-xl"
        />
        <label htmlFor="" className="text-gray-600 mb-6 text-sm">
          Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
        </label>
        <input
          type="text"
          value={github}
          placeholder="GitHub Username"
          className="w-full border-2 border-[#000000a9] px-2 py-2 rounded-md text-xl"
        />
        <label htmlFor="" className="text-gray-600 mb-6 text-sm">
          If you want your latest repos and a Github link, include your username
        </label>

        <textarea
          name="bio"
          value={bio}
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
                // name={social.name}
                value={twitter}
                onChange={onchange}
                placeholder="Twitter"
                className="w-full border-2 border-gray-400 px-3 py-2 rounded-md text-lg"
              />
              <input
                type="text"
                // name={social.name}
                value={facebook}
                onChange={onchange}
                placeholder="Facebook"
                className="w-full border-2 border-gray-400 px-3 py-2 rounded-md text-lg"
              />
              <input
                type="text"
                // name={social.name}
                value={youtube}
                onChange={onchange}
                placeholder="Youtube"
                className="w-full border-2 border-gray-400 px-3 py-2 rounded-md text-lg"
              />
              <input
                type="text"
                // name={social.name}
                value={linkedin}
                onChange={onchange}
                placeholder="Linkedin"
                className="w-full border-2 border-gray-400 px-3 py-2 rounded-md text-lg"
              />
              <input
                type="text"
                // name={social.name}
                value={instagram}
                onChange={onchange}
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
