import React, { useEffect } from "react";

import { usePost } from "../context/PostContext.jsx";

import PostCard from "../components/PostCard.jsx";

function PostPage() {
  const { posts, getPosts } = usePost();

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="h-full w-full">
      <h1 className="text-4xl my-10 text-center">
        {posts.length === 0 ? "no passwords again" : "your passwords"}
      </h1>

      <div className="w-full flex flex-wrap justify-items-start gap-7">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default PostPage;
