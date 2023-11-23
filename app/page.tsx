import HomePosts from "@/components/Home";
import { Text } from "@mantine/core";

export const dynamic = 'force-dynamic'


export default async function HomePage() {
 /*  const posts = await fetch("http://localhost:3000/api/posts")
  const data = await posts.json(); */
 
  return (
    <div className="home_page">
      <Text
        style={{ fontSize: "30px", lineHeight: "140%" }}
        c="rgb(255 255 255)"
        fw={700}
      >
        Home
      </Text>
      <HomePosts /* posts={data} */ />
    </div>
  );
}
