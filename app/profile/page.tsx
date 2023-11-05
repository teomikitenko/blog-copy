import React from 'react'
import { getServerSession } from "next-auth/next"
import { authOptions } from '../api/auth/[...nextauth]/route'
import Profile from '@/components/Profile';
import { takeAllUserPost } from '@/configs/postsConfigs';


export default async function ProfilePage(){
  const session= await getServerSession(authOptions)
  const threads=await takeAllUserPost(session?.user?.name!)
  return (
    <section className='profile_container'>
      {session&&<Profile threads={threads} user={session.user}/>}
    </section>
  )
}

