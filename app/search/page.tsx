import React from 'react'
import Search from '@/components/Search'
import { takeAllUsers } from '@/configs/postsConfigs'

export const dynamic = 'force-dynamic'

export default async function SearchPage(){
  const users=await takeAllUsers()
  return (
    <Search users={users}/>
  )
}

