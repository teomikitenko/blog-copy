import HomePosts from "@/components/Home";
import { Text } from "@mantine/core";
import { supabase } from "@/configs/postsConfigs";
import { Suspense } from "react";

export const dynamic = 'force-dynamic'


export default async function HomePage() {
  /*   const posts = await fetch("https://blog-copy-kitt.vercel.app/api/posts"); */
   const posts = await fetch("http://localhost:3000/api/posts"); 
   const data = await posts.json(); 
   /*   const { data } = await supabase
     .from('posts_users')
     .select()
     .order('id_order', { ascending: false })
     .range(0,4)  */
  const { data: allposts, error } = await supabase.from("posts_users").select();
  return (
    <div className="home_page">
      <Text
        style={{ fontSize: "30px", lineHeight: "140%" }}
        c="rgb(255 255 255)"
        fw={700}
      >
        Home
      </Text>
      <Suspense fallback={<div>...loding</div>}>
        <HomePosts posts={data} allPosts={allposts} />
      </Suspense>
    </div>
  );
}
