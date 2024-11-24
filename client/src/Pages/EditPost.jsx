import React, { useEffect, useState } from "react";

import { Navigate, useParams } from "react-router-dom";
import Editor from "../components/Editor";

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const fetchFunction = async () => {
      const response = await fetch(`http://localhost:4000/post/${id}`);
      const json = await response.json();
      setTitle(json.title);
      setSummary(json.summary);
      setContent(json.content);
    };
    fetchFunction();
  }, []);

  const updatePost = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }

    const response = await fetch(`http://localhost:4000/post/${id}`, {
      method: "PUT",
      body: data,
    });
    setRedirect(true);
  };
  if (redirect) {
    return <Navigate to={"/post/" + id} />;
  }
  return (
    <form className="px-2" onSubmit={updatePost}>
      <input
        value={title}
        type="title"
        placeholder="Title"
        className="block w-full px-2 py-2 pl-4 border rounded-lg border-gray-300"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        value={summary}
        type="summary"
        placeholder="Summary"
        className="block w-full px-2 py-2 pl-4 border rounded-lg border-gray-300 mt-4"
        onChange={(e) => setSummary(e.target.value)}
      />
      <input
        type="file"
        onChange={(e) => setFiles(e.target.files)}
        className="block w-full px-2 py-2 pl-4 border rounded-lg border-gray-300 mt-4"
      />

      <Editor value={content} onChange={setContent} />

      <button className="block w-full px-2 py-2 mt-4 border rounded-lg uppercase font-semibold bg-blue-600 hover:bg-blue-700">
        Update Post
      </button>
    </form>
  );
};

export default EditPost;
