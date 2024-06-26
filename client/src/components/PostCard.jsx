import React from "react";
import { useNavigate } from "react-router-dom";

import { usePost } from "../context/PostContext.jsx";

function PostCard({ post }) {
  const { deletePost } = usePost();

  const navigate = useNavigate();

  return (
    <div className="bg-slate-200 max-w-md min-w-10 w-full p-6 rounded-md text-black shadow-2xl">
      <h1 className="text-3xl font-medium">{post.title}</h1>
      <p className="my-4 text-xl font-bold">
        password: <span className="font-normal">{post.password}</span>
      </p>
      <div className="flex justify-between">
        <a href={post.url}>
          <button className="bg-green-600 px-3 py-2 rounded-md">
            ir al sitio
          </button>
        </a>
        <div className="flex gap-3 text-white">
          <button
            onClick={() => {
              deletePost(post.id);
            }}
            className="bg-red-700 px-3 py-2 rounded-md"
          >
            X
          </button>
          <button
            onClick={() => {
              navigate(`/posts/update/${post.id}`);
            }}
            className="bg-teal-600 px-3 py-2 rounded-md"
          >
            /
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
