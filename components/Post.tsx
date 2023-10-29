'use client'
import { Card, Text, Group, Stack } from '@mantine/core';
import Image from 'next/image';
import '@mantine/core/styles/Card.css';
import logo from '@/public/assets/logo.svg'
import {useState} from 'react'

type PostType={
    id:number
    created_at:string,
    created_by:string,
    post_text:string | number,
    comments:object
  }
  type PostProps={
    p:PostType
  }

const Post = ({p}:PostProps) => {
    const [like, setlike] = useState(0)
  return (
    <Card key={p.id} style={{display:'flex'}} bg={'#212529'}  shadow="sm" p={35}  >
    <Card.Section>
      <Group gap={25} align='flex-start' >
      <Image src={logo.src} 
    style={{objectFit: "cover"}} width={30}  height={30} alt='avatar'/> 
      <Stack> 
  <Text c={'rgb(255 255 255)'} fw={500}>{p?.created_by}</Text>
   <Text c={'rgb(255 255 255)'} fw={500}>{p.post_text}</Text>
</Stack>
      </Group>
   </Card.Section>
</Card>
  )
}

export default Post