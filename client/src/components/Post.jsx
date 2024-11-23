import React from "react";

const Post = () => {
  return (
    <>
      {/* Posts */}
      <div className="grid grid-cols-2 gap-3 mb-8 ">
        <div className="">
          <img
            src="https://placehold.co/600x300"
            alt=""
            className="max-w-[100%] m-1"
          />
        </div>

        <div className="p-0">
          <h1 className="text-2xl font-bold">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.{" "}
          </h1>
          <p className="py-2 text-gray-400 text-sm font-semibold flex gap-2">
            <a href="" className="text-gray-700">
              Abhishek
            </a>
            <time>2024-01-20 03:34</time>
          </p>
          <p className="my-3 leading-6">
            brief description(summary) Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Laboriosam eos saepe itaque qui repudiandae ad
            iure magnam suscipit enim, delectus et nostrum! Repellendus soluta
            et animi fugiat quas delectus id.
          </p>
        </div>
      </div>
    </>
  );
};

export default Post;
