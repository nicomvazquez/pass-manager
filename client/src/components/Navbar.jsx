import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function Navbar() {
  const navigate = useNavigate();

  const { isAutenticated, user, logout } = useAuth();

  return (
    <nav className="bg-slate-400 flex justify-between py-5 px-10 my-3 rounded-md">
      <Link to={"/"}>
        <h1>passwoed manager</h1>
      </Link>
      <ul className="flex gap-x-3">
        {isAutenticated ? (
          <>
            <li>welcome {user.username}</li>
            <li>
              <Link to={"/posts"}>posts</Link>
            </li>
            <li>
              <Link to={"/posts/new"}>add post</Link>
            </li>
            <li>
              <Link to={"/generator"}>generate password</Link>
            </li>
            <li>
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
            <li>
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
