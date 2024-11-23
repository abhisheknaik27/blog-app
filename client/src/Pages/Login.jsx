import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
  };

  return (
    <form className="max-w-[400px] m-auto pt-20" onSubmit={login}>
      <h1 className="text-2xl font-bold mb-3 text-center">LOGIN</h1>
      <input
        value={username}
        className="block mb-2 w-[100%] py-2 px-2 border rounded-lg bg-blue-200 "
        type="text"
        placeholder="Enter Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        value={password}
        className="block mb-2 w-[100%] py-2 px-2 border rounded-lg bg-blue-200 mt-4"
        type="password"
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="w-[100%] block border rounded-lg mt-4 py-2 px-2 bg-blue-500 text-gray-50 font-semibold uppercase">
        Login
      </button>
    </form>
  );
};

export default Login;
