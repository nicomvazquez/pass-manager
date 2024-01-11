import axios from "./axios.js";

export const getPostsRequest = async () => {
  return await axios.get("/post");
};

export const getPostRequest = async (id) => {
  return await axios.get(`/post/${id}`);
};

export const postPostsRequest = async (post) => {
  return await axios.post("/post", post);
};

export const deletePostsRequest = async (id) => {
  return await axios.delete(`/post/${id}`);
};

export const updatePostsRequest = async (id, post) => {
  const result = await axios.put(`/post/${id}`, post);
  return result;
};
