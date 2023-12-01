import HomePosts from "@/components/Home";
import { Text } from "@mantine/core";
import { takeCommunityPosts } from "@/configs/postsConfigs";

export default async function HomePage() {
        const posts = await fetch("https://blog-copy-kitt.vercel.app/api/posts", {
    cache: "no-store",
  });       

 
  const data = await posts.json(); 
  return (
    <div className="home_page">
      <Text
        style={{ fontSize: "30px", lineHeight: "140%" }}
        c="rgb(255 255 255)"
        fw={700}
      >
        Home
      </Text>
      <HomePosts posts={data} />
    </div>
  );
}
