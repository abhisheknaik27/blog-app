import React from "react";

const Login = () => {
  return (
    <form className="max-w-[400px] m-auto pt-20">
      <h1 className="text-2xl font-bold mb-3 text-center">LOGIN</h1>
      <input
        className="block mb-2 w-[100%] py-2 px-2 border rounded-lg bg-blue-200 "
        type="text"
        placeholder="Enter Username"
      />
      <input
        className="block mb-2 w-[100%] py-2 px-2 border rounded-lg bg-blue-200 mt-4"
        type="password"
        placeholder="Enter Password"
      />
      <button className="w-[100%] block border rounded-lg mt-4 py-2 px-2 bg-blue-500 text-gray-50 font-semibold uppercase">
        Login
      </button>
    </form>
  );
};

export default Login;
