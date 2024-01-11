import { createContext, useContext, useEffect, useState } from "react";
import {
  getPostsRequest,
  getPostRequest,
  postPostsRequest,
  deletePostsRequest,
  updatePostsRequest,
} from "../api/postApi.js";

const PostContext = createContext();

export const usePost = () => {
  const context = useContext(PostContext);
  if (!context) throw new Error("the context not exist");
  return context;
};

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const res = await getPostsRequest();
      const update = res.data.reverse();
      setPosts(update);
    } catch (error) {
      console.log(error);
    }
  };

  const getPost = async (id) => {
    const res = await getPostRequest(id);
    console.log(res.data)
    return res.data;
  };

  const postPost = async (post) => {
    try {
      const res = await postPostsRequest(post);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (id) => {
    try {
      const res = await deletePostsRequest(id);
      console.log(res);
      if (res.status == 200) setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const updatePost = async (id, post) => {
    try {
      const res = await updatePostsRequest(id, post);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PostContext.Provider
      value={{ posts, getPosts, getPost, postPost, deletePost, updatePost }}
    >
      {children}
    </PostContext.Provider>
  );
};
