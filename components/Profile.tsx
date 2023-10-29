'use client'
import { Text,Tabs,Group} from '@mantine/core';
import reply from '@/public/assets/reply.svg'
import members from '@/public/assets/members.svg'
import tag from '@/public/assets/tag.svg'
import Image from 'next/image';

import {useState} from 'react'

const Profile = () => {
    const [threads, setThreads] = useState(0)
    const tab=[
        {text:'threads',icon:reply},
        {text:'replies',icon:members},
        {text:'tagged',icon:tag}
       ]
  return (
    
    <Tabs  color="rgb(14 14 18)" variant="pills" defaultValue="threads" orientation='horizontal'>
        
        <Tabs.List h={50} style={{backgroundColor:'rgb(18 20 23)'}} justify='center' grow={true}>
            {tab.map(t=>(
                
                    <Tabs.Tab value={t.text}>
                    <Group>
                    <Image src={t.icon} width={24} height={24} alt='icon'/>
                   <Text tt='capitalize' size="lg" fw={500} c={'rgb(239 239 239)'}>{t.text}</Text>
                    {t.text === 'threads'&&<p className='counter_threads'>{threads}</p>}  
                    </Group>
                    
                </Tabs.Tab>
                
                
            ))}
    </Tabs.List>
    <Tabs.Panel value="threads">
0
</Tabs.Panel>

<Tabs.Panel value="replies">
0
</Tabs.Panel>

<Tabs.Panel value="tagged">
0
</Tabs.Panel>
   </Tabs>
  )
}

export default Profile