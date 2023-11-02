import { createClient } from '@supabase/supabase-js';
export const supabase=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export const createPost= async(creater:any,text:string)=>{
   await supabase
  .from('posts_users')
  .insert({created_by:creater, text: text })
}
export const createComment=async(creater:any,text:any,id:number)=>{
  await supabase
  .from('user_comments')
  .insert({created_by:creater,text:text, id_post:id})
}
export const searchComment=async(id:number|string)=>{
  let { data: comments, error } = await supabase
  .from('user_comments')
  .select()
  .eq('id_post',id)
   .select() 
  return comments
}
export const takePost=async(id:number)=>{
  const { data:post, error } = await supabase
  .from('posts_users')
  .select()
  .eq('id', id)
  return post
}
export const takeAllPosts=async()=>{
    const{data:posts,error}=await supabase
    .from('posts_users')
    .select()
    return posts
}
   