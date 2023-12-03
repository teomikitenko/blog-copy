import type { P } from "@/types/types";
import FavoredCard from "./FavoredCard";
import type { PList } from "@/types/types";


const FavoredCards = ({ postList }: { postList: PList[] }) => {
  const filterdArray: PList[] = postList?.filter(
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
