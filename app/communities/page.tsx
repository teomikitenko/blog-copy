import Communities from '@/components/Communities'
import { Text } from '@mantine/core'
import { takeAllCommunities } from '@/configs/postsConfigs'

const CommunitiesPage = async() => {
  const communities=await takeAllCommunities()
  return (
    <>
     <Text style={{fontSize:'30px',lineHeight:'140%'}} c='rgb(255 255 255)' fw={700}>Communities</Text>
     {communities&&(
        <Communities  communities={communities}/>
     )}
     
    </>
    
  )
}

export default CommunitiesPage