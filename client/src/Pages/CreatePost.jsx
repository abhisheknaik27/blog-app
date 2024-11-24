import { useState } from "react";
import { Navigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};
const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  const createPost = async (e) => {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);
    e.preventDefault();

    const response = await fetch("http://localhost:4000/post", {
      method: "POST",
      body: data,
      credentials: "include",
    });

    if (response.ok) {
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <form className="px-2" onSubmit={createPost}>
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
      <ReactQuill
        value={content}
        modules={modules}
        formats={formats}
        className="mt-4"
        onChange={(newValue) => setContent(newValue)}
      />
      <button className="block w-full px-2 py-2 mt-4 border rounded-lg uppercase font-semibold bg-blue-300 hover:bg-blue-400">
        Create Post
      </button>
    </form>
  );
};

export default CreatePost;
