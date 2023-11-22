
import Post from "./Post";
import { takeAllPosts} from "@/configs/postsConfigs";
import type { P } from "@/types/types";


const HomePosts = async({ posts }: { posts?: P[]|any }) => {
  /* const allUsers=await takeAllPosts() */
  
  return (
    <div className="card_posts">
      {posts?.map((p: P) => (
        <Post  key={p.id}  p={p} posts={posts} />
      ))}
    </div>
  );
};

export default HomePosts;
