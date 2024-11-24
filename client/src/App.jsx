import React from "react";
import CreatePost from "./Pages/CreatePost.jsx";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import Layout from "./components/Layout.jsx";
import HomePage from "./Pages/HomePage.jsx";
import { UserContextProvider } from "./UserContext.jsx";
import PostPage from "./Pages/PostPage.jsx";
import EditPost from "./Pages/EditPost.jsx";
const App = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
};

export default App;
