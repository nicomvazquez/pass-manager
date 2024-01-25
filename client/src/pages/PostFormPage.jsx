import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { usePost } from "../context/PostContext.jsx";
import { useEffect } from "react";

function PostFormPage() {
  const { postPost, updatePost, getPost } = usePost();

  const navigate = useNavigate();
  const params = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    async function loadPost() {
      if (params.id) {
        const post = await getPost(params.id);
        setValue("title", post.title);
        setValue("password", post.password);
        setValue("url", post.url);
      }
    }
    loadPost();
  }, []);

  return (
    <div className="bg-slate-600 max-w-md p-10 rounded-md">
      <form
        onSubmit={handleSubmit(async (values) => {
          if (params.id) {
            updatePost(params.id, values);
          } else {
            postPost(values);
          }
          navigate("/posts");
        })}
      >
        <label htmlFor="">web site</label>
        <input
          type="text"
          className="bg-zinc-500 w-full px-4 py-2 rounded-sm my-2"
          {...register("title", { required: true })}
        />

        <label htmlFor="">password</label>
        <input
          type="text"
          className="bg-zinc-500 w-full px-4 py-2 rounded-sm my-2"
          {...register("password", { required: true })}
        />

        <label htmlFor="">url</label>
        <input
          type="text"
          className="bg-zinc-500 w-full px-4 py-2 rounded-sm my-2"
          {...register("url", { required: true })}
        />

        <input type="submit" />
      </form>
    </div>
  );
}

export default PostFormPage;
