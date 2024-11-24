import React, { useEffect, useState } from "react";
import Post from "../components/Post";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("http://localhost:4000/posts");
      const json = await response.json();
      setPosts(json);
    };
    fetchPosts();
  }, []);
  return <>{posts.length > 0 && posts.map((post) => <Post {...post} />)}</>;
};

export default HomePage;
