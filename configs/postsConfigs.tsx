import { createClient } from '@supabase/supabase-js';
export const supabase=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export const createPost= async(creater:any,text:string)=>{
   await supabase
  .from('posts_users')
  .insert({created_by:creater, text: text })
}
export const takePost=async(id:number)=>{
  const { data:post, error } = await supabase
  .from('posts_users')
  .select()
  .eq('id', id)
  return post
}
export const takeAllUserPost=async(name:string)=>{
  const { data:posts, error } = await supabase
  .from('posts_users')
  .select()
  .eq('created_by', name)
  return posts
}
export const takeAllPosts=async()=>{
    const{data:posts,error}=await supabase
    .from('posts_users')
    .select()
    return posts
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

export const takeAllUsers=async()=>{
  const{data:users,error}=await supabase
  .from('table_users')
  .select()
  return users
}
export const searchUser=async(id:number|string)=>{
  let { data: user, error } = await supabase
  .from('table_users')
  .select()
  .eq('id',id)
   .select() 
  return user
}
 type CommunityType={
  creator:string|null|undefined,
  name:string,
  image:string,
  bio:string,
  email:string 
 }
 

export const addNewCommunities=async({creator,name,image,bio,email} :CommunityType)=>{
  let { error } = await supabase
  .from('communities')
  .insert({creator:creator,name:name, image: image,bio:bio,email:email })
}
export const takeAllCommunities=async()=>{
  const{data:communities,error}=await supabase
  .from('communities')
  .select()
  return communities
}

  export const UploadLogo=async(name:any,logo:any)=>{
    const { data, error } = await supabase
  .storage
  .from('Clone_Blog')
  .upload(name, logo, {
    cacheControl: '3600',
    upsert: false
  })
  }

 