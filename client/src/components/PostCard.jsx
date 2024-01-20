import React from "react";
import { useNavigate } from "react-router-dom";

import { usePost } from "../context/PostContext.jsx";

function PostCard({ post }) {
  const { deletePost } = usePost();

  const navigate = useNavigate();

  return (
    <div className="bg-slate-800 max-w-sm w-full p-3 rounded-md">
      <h1 className="text-3xl">{post.title}</h1>
      <p className="my-4">password: {post.password}</p>
      <div className="flex justify-between">
        <a href={post.url}>
          <button className="bg-green-600 px-3 py-2 rounded-md text-slate-950">
            visitar
          </button>
        </a>
        <div className="flex gap-3">
          <button
            onClick={() => {
              deletePost(post.id);
            }}
            className="bg-red-700 px-3 py-2 rounded-md"
          >
            eliminar
          </button>
          <button
            onClick={() => {
              navigate(`/posts/update/${post.id}`);
            }}
            className="bg-teal-600 px-3 py-2 rounded-md text-slate-950"
          >
            editar
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
