import React from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
const Post = ({ _id, title, summary, cover, content, createdAt, author }) => {
  return (
    <>
      {/* Posts */}
      <div className="grid grid-cols-1 md:grid-cols-[1.5fr,1fr] gap-4 mt-8 mb-8 max-h-[600px] overflow-hidden">
        <div className="flex items-center justify-center max-h-[400px] overflow-hidden w-full">
          <Link to={`/post/${_id}`}>
            <img
              src={"http://localhost:4000/" + cover}
              alt=""
              className="pt-2 w-full h-full object-cover"
            />
          </Link>
        </div>

        <div className="p-0">
          <Link to={`/post/${_id}`}>
            <h1 className="text-3xl font-bold">{title}</h1>
          </Link>
          <p className="py-2 text-gray-400 flex items-baseline gap-2">
            <a href="" className="text-gray-700 text-sm font-semibold ">
              {author.username}
            </a>
            <time className="text-[10px]">
              {format(new Date(createdAt), "MMM d, yyyy p")}
            </time>
          </p>
          <p className="my-3 leading-6 text-justify pr-4">{summary}</p>
        </div>
      </div>
    </>
  );
};

export default Post;
