'use client'
import { Textarea,Button } from '@mantine/core';


const CreateThread = () => {
  return (
    <>
     <Textarea
     mt={20} style={{backgroundColor:'rgb(18, 20, 23)'}}
        autosize
        minRows={17}
      />
   <Button variant='filled' size='md'  color='rgb(135 126 255)' fullWidth>Post Thread</Button>
    </>
  )
}

export default CreateThread