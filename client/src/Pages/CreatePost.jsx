import { useState } from "react";
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

  console.log(title, summary, content);

  const createPost = (e) => {
    e.preventDefault();
  };

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
