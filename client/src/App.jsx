import React from "react";
import Post from "./components/Post";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import Layout from "./components/Layout.jsx";
import HomePage from "./Pages/HomePage.jsx";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
