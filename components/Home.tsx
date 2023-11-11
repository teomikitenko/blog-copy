"use client";
import Post from "./Post";

type PostType = {
  id: number;
  created_at: string;
  created_by: string;
  text: string | number;
};

const HomePosts = ({ posts }: { posts?: PostType[]|any }) => {
  return (
    <div className="card_posts">
      {posts?.map((p: PostType) => (
        <Post key={p.id} p={p} />
      ))}
    </div>
  );
};

export default HomePosts;
