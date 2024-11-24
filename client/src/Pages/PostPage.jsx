import { format } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import { FaRegEdit } from "react-icons/fa";

const PostPage = () => {
  const [postInfo, setPostInfo] = useState(null);
  const { id } = useParams();
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    const fetchFunction = async () => {
      const response = await fetch(`http://localhost:4000/post/${id}`);
      const json = await response.json();
      setPostInfo(json);
      console.log(json);
    };
    fetchFunction();
  }, []);

  if (!postInfo) return "";
  return (
    <div className="">
      <h1 className=" text-center text-4xl font-bold mb-4">{postInfo.title}</h1>
      <div className=" block text-center mb-4 text-gray-500 text-sm">
        <time>
          Created on{" "}
          <span className="font-semibold">
            {format(new Date(postInfo.createdAt), "MMMM d, yyyy p")}
          </span>
        </time>
        <div>
          By{" "}
          <span className="font-bold text-gray-800">
            @{postInfo.author.username}
          </span>
        </div>
      </div>

      {userInfo.id == postInfo.author._id && (
        <div className="flex justify-center items-center align-middle gap-2 mb-6 bg-gray-400 text-white font-semibold px-3 py-2 border rounded-md hover:bg-gray-500 max-w-sm mx-auto">
          <FaRegEdit />

          <Link to={`/edit/${postInfo._id}`}>EDIT THIS POST</Link>
        </div>
      )}

      <div className="flex w-full max-h-[300px] overflow-hidden mb-6">
        <img
          className="object-cover  object-center"
          src={`http://localhost:4000/${postInfo.cover}`}
        />
      </div>

      <div
        className="leading-7 text-justify text-xl"
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
      />
    </div>
  );
};

export default PostPage;
