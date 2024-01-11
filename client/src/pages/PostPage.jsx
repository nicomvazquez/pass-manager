import React, { useEffect } from "react";

import { usePost } from "../context/PostContext.jsx";

import PostCard from "../components/PostCard.jsx";

function PostPage() {
  const { posts, getPosts } = usePost();

  useEffect(() => {
    getPosts();
  }, []);

  if (posts.length === 0) return <h1>no post again</h1>;

  return (
    <div>
      <div>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default PostPage;
