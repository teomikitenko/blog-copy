import { createClient } from '@supabase/supabase-js';
export const supabase=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
type CommunityType={
  creator:string|null|undefined,
  name:string,
  bio:string,
  email:string,
  password:string|number 
 }

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

export const searchUserName=async(name:string)=>{
  let { data: user, error } = await supabase
  .from('table_users')
  .select()
  .eq('name',name)
   .select() 
  return user![0]
}

 

export const addNewCommunities=async({creator,name,bio,email,password} :CommunityType)=>{
  let { error } = await supabase
  .from('communities')
  .insert({creator:creator,name:name,bio:bio,email:email,password:password })
}
export const takeAllCommunities=async()=>{
  const{data:communities,error}=await supabase
  .from('communities')
  .select()
  return communities
}

export const searchCommunityByCreater=async(creator:string)=>{
  const{data:community,error}=await supabase
  .from('communities')
  .select()
  .eq('creator',creator)
 return community
}
export const searchCommunityByName=async(name:string)=>{
  const{data:community,error}=await supabase
  .from('communities')
  .select()
  .eq('name',name)
 return community
}

  export const UploadLogo=async(name:any,logo:any)=>{
    const { data, error } = await supabase
  .storage
  .from('Clone_Blog')
  .upload(`logo_communities/${name}`, logo, {
    cacheControl: '3600',
    upsert: false
  })
  }

 

  export const addMembers=async(name:string,community_id:any,image:string)=>{
    const { data, error } = await supabase
  .from('members')
  .insert({community_id:community_id,name:name,image:image})
  .select()
  }
  export const checkAllMembers=async(name:any,community_id:any)=>{
    const { data, error } = await supabase
  .from('community')
  .insert({community_id:community_id,name:name})
  .select()
  }
 
  export const SearchCommunity=async(id:string|number)=>{
    const{data:community,error}=await supabase
    .from('communities')
    .select()
    .eq('id',id)
    .select(`
    *,
    members (
      *
    )
  `)
    
   return community![0]
  }
  export const searchMembersData=async(/* name:string */)=>{
    const{data:members,error}=await supabase
    .from('members')
    .select(`
    *,
    table_users (
      *
    )
  `)
    
   return members
  }