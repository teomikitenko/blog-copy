"use client"
import { takeAllPosts } from '@/configs/postsConfigs';
import { useEffect, useState } from 'react';
import Post from './Post';


type PostType={
  id:number
  created_at:string,
  created_by:string,
   text:string | number,
 
}



const HomePosts = () => {
  const [posts, setPosts] = useState<PostType[] | null>([])
   takeAllPosts()
   useEffect(()=>{
    takeAllPosts()
    .then(res=>setPosts(res))
   },[])
   return (
    <div className="card_posts">
       {posts?.map((p:PostType)=>(
    <Post key={p.id} p={p}/>
      ))} 
    </div>
 
    
  )
}

export default HomePosts