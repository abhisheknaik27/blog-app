import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((res) => {
      res.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  const logout = () => {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  };
  return (
    <>
      <main className="m-w-[500px] m-0 pt-5 px-2">
        <header className="flex justify-between items-center mb-10 ">
          <Link to="/" className="text-gray-600 text-xl font-bold">
            My Blog
          </Link>
          <nav className="flex gap-5">
            {userInfo?.username ? (
              <>
                <Link to="/create">Create New </Link>
                <a onClick={logout}>Logout</a>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}
          </nav>
        </header>
      </main>
    </>
  );
};

export default Header;
