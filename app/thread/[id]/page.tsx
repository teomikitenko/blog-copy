import Post from "@/components/Post";
import { takePost,searchComment } from "@/configs/postsConfigs";
import Comments from "@/components/Comments";
import { Text } from "@mantine/core";

export const dynamic = 'force-dynamic'


export default async function ThreadPage({params}:{params:{id:number}}){
     const post=await takePost(params.id)
     const comments=await searchComment(params.id)
    return(
    <>
    <Text
        style={{ fontSize: "30px", lineHeight: "140%",marginBottom:'2.25rem' }}
        c="rgb(255 255 255)"
        fw={700}
      >
        Thread
      </Text>
        <Comments post={post} comments={comments}/>
    </>
        
    )
}