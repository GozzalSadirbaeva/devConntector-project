// "use client";
// import { ProfileData } from "@/interface/profileData";
// import { baseUrl } from "@/utils/api";
// import axios from "axios";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// const CreateProfile = () => {
//   const route = useRouter();
//   const [isOpen, setIsOpen] = useState(false);
//   const [selected, setSelected] = useState("* Select Professional Status");
//   const [status, setStatus] = useState("");
//   const [profileData, setProfileData] = useState<ProfileData>;

//   const options = [
//     { value: "developer", label: "Developer" },
//     { value: "junior", label: "Junior Developer" },
//     { value: "senior", label: "Senior Developer" },
//     { value: "manager", label: "Manager" },
//     { value: "student", label: "Student" },
//     { value: "teacher", label: "Instructor or Teacher" },
//     { value: "intern", label: "Intern" },
//     { value: "other", label: "Other" },
//   ];

//   const handleChange = (e: React.FormEvent) => {
//     setProfileData({ ...profileData, [e.target.name]: e.target.value });
//   };

//   const createProfile = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         baseUrl + `profile`,
//         { ...profileData, status },
//         {
//           headers: {
//             "x-auth-token": localStorage.getItem("accessToken"),
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       console.log("Profile created:", res.data);
//       route.push("/dashboard");
//     } catch (error) {
//       console.error("Error creating profile:", error.response?.data || error);
//     }
//   };

//   return (
//     <div className="px-16 pb-10">
//       <h1 className="font-bold text-[50px] leading-[60px] text-[#0f3352] pt-8">
//         Create Your Profile
//       </h1>
//       <h2 className="text-[#333333] text-2xl py-5">
//         Let's get some information to make your profile stand out!
//       </h2>

//       <form onSubmit={createProfile}>
//         <div className="relative w-full">
//           <button
//             type="button"
//             onClick={() => setIsOpen(!isOpen)}
//             className="w-full px-4 py-2 border-2 border-[#000000a9] rounded-md text-xl bg-white text-left"
//           >
//             {selected}
//           </button>
//           {isOpen && (
//             <ul className="absolute w-full bg-white border-2 border-[#000000a9] rounded-md shadow-lg mt-1 z-10">
//               {options.map((option) => (
//                 <li
//                   key={option.value}
//                   onClick={() => {
//                     setSelected(option.label);
//                     setStatus(option.value);
//                     setIsOpen(false);
//                   }}
//                   className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-xl"
//                 >
//                   {option.label}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//         <p className="text-gray-600 pb-6 text-sm">
//           Give us an idea of where you are at in your career
//         </p>

//         {[
//           { name: "company", placeholder: "Company" },
//           { name: "website", placeholder: "Website" },
//           { name: "location", placeholder: "Location" },
//           { name: "skills", placeholder: "* Skills" },
//           { name: "githubusername", placeholder: "GitHub Username" },
//         ].map((input) => (
//           <div key={input.name}>
//             <input
//               type="text"
//               name={input.name}
//               value={profileData[input.name]}
//               onChange={handleChange}
//               placeholder={input.placeholder}
//               className="w-full border-2 border-[#000000a9] px-2 py-2 rounded-md text-xl "
//             />
//             <p className="text-gray-600 pb-6 text-sm">
//               {input.name === "skills"
//                 ? "Please use comma-separated values (eg. HTML, CSS, JavaScript)"
//                 : ""}
//             </p>
//           </div>
//         ))}

//         {/* Bio */}
//         <textarea
//           name="bio"
//           value={profileData.bio}
//           onChange={handleChange}
//           placeholder="Info about yourself"
//           className="w-full border-2 border-[#000000a9] px-2 py-2 rounded-md text-xl "
//         ></textarea>
//         <p className="text-gray-600 pb-6 text-sm">
//           Tell us a little about yourself
//         </p>

//         {/* Social Media */}
//         <button
//           type="button"
//           className="px-10 py-2 bg-[#0f3352] text-white rounded-sm mb-6"
//         >
//           Add Social Network Links
//         </button>

//         {["youtube", "twitter", "instagram", "linkedin", "facebook"].map(
//           (network) => (
//             <input
//               key={network}
//               type="text"
//               name={network}
//               value={profileData[network]}
//               onChange={handleChange}
//               placeholder={`${
//                 network.charAt(0).toUpperCase() + network.slice(1)
//               } URL`}
//               className="w-full border-2 border-[#000000a9] px-2 py-2 rounded-md text-xl mb-4"
//             />
//           )
//         )}

//         {/* Tugmalar */}
//         <div className="flex gap-5 pt-6">
//           <Link
//             href="/dashboard"
//             className="px-5 py-2 bg-[#187e3ff1] text-white rounded-md text-lg"
//           >
//             Send
//           </Link>
//           <Link
//             href="/dashboard"
//             className="px-5 py-2 bg-[#4b5563] text-white rounded-md text-lg"
//           >
//             Go Back
//           </Link>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreateProfile;
