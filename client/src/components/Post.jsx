import React from "react";
import { format } from "date-fns";
const Post = ({ title, summary, cover, content, createdAt, author }) => {
  return (
    <>
      {/* Posts */}
      <div className="grid grid-cols-2 gap-3 mb-8 max-h-[400px] overflow-hidden">
        <div className="flex items-start justify-center max-h-[400px] overflow-hidden ">
          <img
            src={"http://localhost:4000/" + cover}
            alt=""
            className="pt-2 w-full h-[300px] md:h-[400px] object-cover"
          />
        </div>

        <div className="p-0">
          <h1 className="text-2xl font-bold">{title}</h1>
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
