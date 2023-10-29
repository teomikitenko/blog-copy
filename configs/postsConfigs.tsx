import { createClient } from '@supabase/supabase-js';
const supabase=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)


export const updateBd=async()=>{
 
}
export const createPost= async(creater:any,text:string)=>{
   await supabase
  .from('posts_users')
  .insert({created_by:creater, post_text: text })
}
export const takePost=async()=>{

}
export const takeAllPosts=async()=>{
    const{data:posts,error}=await supabase
    .from('posts_users')
    .select('*')
    return posts
}
   