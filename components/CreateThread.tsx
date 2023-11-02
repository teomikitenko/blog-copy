'use client'
import { Textarea,Button } from '@mantine/core';
import { useState } from 'react';
import { createPost } from '@/configs/postsConfigs';
import { useSession } from "next-auth/react"



const CreateThread = () => {
  const [text, setText] = useState<string>('')
  const { data: session, status } = useSession()
  return (
    status==='authenticated'&&(
      <>
<Textarea
mt={20}
 style={{backgroundColor:'rgb(18, 20, 23)'}}
 value={text}
 onChange={(e)=>setText(e.currentTarget.value)}
   autosize
   minRows={17}
 />
<Button  onClick={()=>{createPost(session?.user?.name,text )}}
variant='filled'
 size='md' 
  color='rgb(135 126 255)'
   fullWidth>Post Thread</Button>
</>
    )
  )
  
  
}

export default CreateThread


