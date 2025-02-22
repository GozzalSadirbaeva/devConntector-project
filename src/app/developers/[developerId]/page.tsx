"use client";
import useFetch from "@/hooks/useFetch";

const DetailPage = () => {
  const { data } = useFetch("profile/user/:${user_id}");
  // console.log(data);

  return (
    <div>
      {data?.map((info) => (
        <div key={info._id} className="py-6">
          <img
            src={info.user.avatar}
            alt={info.user.name}
            className="w-[150px] rounded-full"
          />
        </div>
      ))}
    </div>
  );
};

export default DetailPage;
