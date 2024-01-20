import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function Navbar() {
  const navigate = useNavigate();

  const { isAutenticated, user, logout } = useAuth();

  return (
    <nav className="bg-slate-400 flex justify-between items-center py-5 px-10 my-3 rounded-md">
      <Link to={"/"}>
        <h1 className="text-2xl">password manager</h1>
      </Link>
      <ul className="flex gap-x-3 items-center">
        {isAutenticated ? (
          <>
            <li className="mx-5">welcome {user.username}</li>
            <li>
              <Link to={"/posts"}>posts</Link>
            </li>
            <li className="bg-green-700 p-3 rounded-md">
              <Link to={"/posts/new"}>add post</Link>
            </li>
            <li>
              <Link to={"/generator"}>generate password</Link>
            </li>
            <li className="bg-red-500 p-3 rounded-md">
              <Link
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="bg-teal-500 px-3 py-2 rounded-md">
              <Link to={"/login"}>login</Link>
            </li>
            <li>
              <Link to={"/register"}>register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
