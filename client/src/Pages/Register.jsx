import React, { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const register = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status == 200) {
      alert("Registration Success");
    } else {
      alert("Registration Failed");
    }
  };
  return (
    <form className="max-w-[400px] m-auto pt-20" onSubmit={register}>
      <h1 className="text-2xl font-bold mb-3 text-center">REGISTER</h1>
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
        Register
      </button>
    </form>
  );
};

export default Register;
