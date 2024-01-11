import React from "react";
import { useNavigate } from "react-router-dom";

import { usePost } from "../context/PostContext.jsx";

function PostCard({ post }) {
  const { deletePost } = usePost();

  const navigate = useNavigate();

  return (
    <div className="bg-slate-800 max-w-sm w-full p-3 rounded-md">
      <h1>{post.title}</h1>
      <p>{post.password}</p>
      <a href={post.url}>
        <button>visitar</button>
      </a>
      <div className="flex gap-3">
        <button
          onClick={() => {
            deletePost(post.id);
          }}
        >
          eliminar
        </button>
        <button
          onClick={() => {
            navigate(`/posts/update/${post.id}`);
          }}
        >
          editar
        </button>
      </div>
    </div>
  );
}

export default PostCard;
