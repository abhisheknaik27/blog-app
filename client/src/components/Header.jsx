import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <main className="m-w-[500px] m-0 pt-5 px-2">
        <header className="flex justify-between items-center mb-10 ">
          <Link to="/" className="text-gray-600 text-xl font-bold">
            My Blog
          </Link>
          <nav className="flex gap-5">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </nav>
        </header>
      </main>
    </>
  );
};

export default Header;
