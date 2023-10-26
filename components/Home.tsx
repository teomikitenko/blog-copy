"use client"
import { Card, Text, Group, Stack } from '@mantine/core';
import Image from 'next/image';
import '@mantine/core/styles/Card.css';
import logo from '@/public/assets/logo.svg'

const posts=[
    {name:'one',text:'hellovifdoivldfvld',},
    {name:'two',text:'hellovifdoivldfvld',},
    {name:'three',text:'hellovifdoivldfvld',},
    {name:'four',text:'hellovifdoivldfvld',},
    {name:'three',text:'hellovifdoivldfvld',},
    {name:'four',text:'hellovifdoivldfvld',},
    {name:'three',text:'hellovifdoivldfvld',},
    {name:'four',text:'hellovifdoivldfvld',}
]

const HomePosts = () => {
    console.log(logo)
  return (

    <div className="card_posts">
      {posts.map(p=>(
         <Card style={{display:'flex'}} bg={'#212529'}  shadow="sm" p={35}  >
              <Card.Section>
                <Group gap={25} align='flex-start' >
                <Image src={logo.src} 
              style={{objectFit: "cover"}} width={30}  height={30} alt='avatar'/> 
                <Stack> 
            <Text c={'rgb(255 255 255)'} fw={500}>{p.name}</Text>
             <Text c={'rgb(255 255 255)'} fw={500}>{p.text}</Text>
         </Stack>
                </Group>
           
             </Card.Section>
         </Card>
      ))}
    </div>
 
    
  )
}

export default HomePosts