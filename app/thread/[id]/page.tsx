import Post from "@/components/Post";
import { takePost,searchComment } from "@/configs/postsConfigs";
import { createClient } from '@supabase/supabase-js';
import Comments from "@/components/Comments";

export const dynamic = 'force-dynamic'


export default async function Comment({params}:{params:{id:number}}){
     const post=await takePost(params.id)
     const comments=await searchComment(params.id)
    return(
        <Comments post={post} comments={comments}/>
    )
}