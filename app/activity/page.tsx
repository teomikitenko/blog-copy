import React from 'react'
import { Text } from '@mantine/core'
import { takeLikePostList } from '@/configs/postsConfigs'
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


const Activity = async() => {
 const session = await auth() 
 const favoredPost:PostList[]|any = await takeLikePostList(session?.user?.name!)
 
 console.log(favoredPost)
  return (
    <>
    <Text
    style={{ fontSize: "30px", lineHeight: "140%" }}
    c="rgb(255 255 255)"
    fw={700}
  >
    Activity
  </Text>
  <FavoredCards postList={favoredPost as PostList[]}/>
  </>
  )
}

export default Activity