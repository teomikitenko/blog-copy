import React from 'react'
import Search from '@/components/Search'
import { takeAllUsers } from '@/configs/postsConfigs'



export default async function SearchPage(){
  const users=await takeAllUsers()
  console.log(users)
  return (
    <Search users={users}/>
  )
}

