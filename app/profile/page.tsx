import React from 'react'
import { getServerSession } from "next-auth/next"
import { authOptions } from '../api/auth/[...nextauth]/route'
import { Text,Group,Stack,Divider,Tabs,Avatar } from '@mantine/core';
import logo from '@/public/assets/logo.svg'
import Profile from '@/components/Profile';


export default async function ProfilePage(){
  const session= await getServerSession(authOptions)
  console.log(session)
  return (
    <section className='profile_container'>
      {session&&(
        <>
        <Stack>
            <Group mt={20}>
              <Avatar 
              src={session.user?.image ? session.user?.image:logo}
               size='xl' alt='avatar'/>
          <Stack gap={1}>
            <Text style={{fontSize:'24px'}} c={'rgb(255 255 255)'} fw={700}>{session?.user?.name}</Text>
            <Text size='md'  c={'rgb(105 124 137)'} fw={500}>{session?.user?.email}</Text>
            </Stack>
            </Group>
             <Divider my='sm'/>
             <Profile/>
             </Stack>
             </> )}
    </section>
  )
}

