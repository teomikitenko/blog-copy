'use client'
import { Text,Card,Stack,Button } from '@mantine/core'
import Image from 'next/image'

type CommunityType={
  creator:string|null|undefined,
  name:string,
  image:string,
  bio:string,
  email:string 
 }
const Communities = ({communities}:{communities:CommunityType[] | null | undefined}) => {
  return (
    communities?.map((c,index)=><CommunityCard key={index} data={c}/>)
  )
}

export default Communities
const CommunityCard=({data}:{data:CommunityType})=>{
  return(
<Card>
  <Card.Section>
   <Image src={data.image} width={48} height={48} alt='logo_community'/>
   <Stack>
   <Text c='rgb(255 255 255)' style={{fontSize:'16px',lineHeight:'140%'}} fw={700}>{data.name}</Text>
   <Text c='rgb(105 124 137)' style={{fontSize:'14px',lineHeight:'140%'}} fw={500}>{data.email}</Text>
   </Stack>
  </Card.Section>
  <Card.Section>
  <Text c='rgb(105 124 137)' style={{fontSize:'13px',lineHeight:'140%'}} fw={500}>{data.bio}</Text>
  </Card.Section>
  <Card.Section>
   <Button>

   </Button>
  </Card.Section>
 </Card>
  )
  

}

