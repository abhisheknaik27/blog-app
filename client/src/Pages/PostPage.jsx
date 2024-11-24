import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PostPage = () => {
  const [postInfo, setPostInfo] = useState(null);
  const { id } = useParams();

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
      <div className=" block text-center mb-6 text-gray-500 text-sm">
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
