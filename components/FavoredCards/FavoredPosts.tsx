import type { P } from "@/types/types";
import FavoredCard from "./FavoredCard";

type PostList = {
  created_at: string;
  id: number;
  like: number;
  who_liked: string;
  post_creator: string;
  post_id: number | string;
  posts_users: P;
};

const FavoredCards = ({ postList }: { postList: PostList[] }) => {
  const filterdArray: PostList[] = postList?.filter(
    (p, index) =>
      index === postList.findIndex((post) => post.post_id === p.post_id)
  );
  console.log(filterdArray);
  return (
    <div className="card_posts">
      {filterdArray?.map((p) => (
        <FavoredCard key={p.created_at} p={p} postList={postList} />
      ))}
    </div>
  );
};

export default FavoredCards;
