import React from 'react'
import { Text } from '@mantine/core'
import {auth} from '@/configs/auth'
import FavoredCards from '@/components/FavoredCards/FavoredPosts'
import type { P } from '@/types/types'
type PostList = {
  created_at: string;
  id: number;
  like: number;
  who_liked: string;
  post_creator: string;
  post_id: number | string;
  posts_users: P;
};
 export const dynamic = "force-dynamic";
 type F={
  data:PostList[]
 }

const Activity = async() => {
 const session = await auth() 
   const result = await fetch(`https://blog-copy-kitt.vercel.app/api/likelist?name=${session?.user?.name}`, {
    cache: "no-store",
  }); 
 const favoredPost:F = await result.json()
    return (
    <>
    <Text
    style={{ fontSize: "30px", lineHeight: "140%" }}
    c="rgb(255 255 255)"
    fw={700}
  >
    Activity
  </Text>
        <FavoredCards  postList={favoredPost.data} />
   </>
  )
}

export default Activity