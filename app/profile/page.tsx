import React from 'react'
import { getServerSession } from "next-auth/next"
import { authOptions } from '../api/auth/[...nextauth]/route'
import Profile from '@/components/Profile';


export default async function ProfilePage(){
  const session= await getServerSession(authOptions)
  return (
    <section className='profile_container'>
      {session&&<Profile user={session.user}/>}
    </section>
  )
}

