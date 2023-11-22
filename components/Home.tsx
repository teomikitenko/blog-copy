import Post from "./Post";
import type { P } from "@/types/types";

const HomePosts =  ({ posts }: { posts?: P[] | any }) => {
  return (
    <div className="card_posts">
      {posts?.map((p: P) => (
        <Post key={p.id} p={p} posts={posts} />
      ))}
    </div>
  );
};

export default HomePosts;
