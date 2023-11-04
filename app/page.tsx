import HomePosts from "@/components/Home";
import { takeAllPosts } from "@/configs/postsConfigs";
import { revalidateTag } from 'next/cache'





export default async function HomePage() {
  const posts = await fetch('http://localhost:3000/api/posts', { next: { revalidate: 1 }});
  const data = await posts.json()

  
  return (
    <div className="home_page">
      <h1>Home</h1>
       <HomePosts   posts={data}  /> 
    </div>
  );
}
