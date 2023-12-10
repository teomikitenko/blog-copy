"use server"
import {auth} from '@/configs/auth'
import { revalidatePath } from "next/cache"
import { createPost,createCommunityPost, searchUserName,UpdatePost,searchCommunityByName } from "@/configs/postsConfigs";
import { redirect } from 'next/navigation';
import { supabase } from '@/configs/postsConfigs';
import type { IdObj } from '@/types/types';


export  async function create(formData: FormData){
     const session = await auth() 
    const user = await searchUserName(session?.user?.name!)
    const {text} = Object.fromEntries(formData);
    if(user) await createPost(session?.user?.name!,text)
    else await createCommunityPost(session?.user?.name!,text)
    revalidatePath('/') 
    }

    export async function edit(formData:FormData,id:string|number,type:string) {
     if(type === 'delete'){
          const { error } = await supabase
          .from('posts_users')
          .delete()
          .eq('id', id)
           revalidatePath('/') 
           redirect('/')
     }if(type === 'edit'){
          const text = formData.get('text')
          if(text)await UpdatePost(id,text)
          revalidatePath('/')
          redirect('/')
     }
    }
    export async function answer(formData:FormData,id:string|number){
     const session = await auth() 
     const user = await searchUserName(session?.user?.name!)
     const community = await searchCommunityByName(session?.user?.name!)
     const text = formData.get('answer')
     if(user) {await supabase
          .from('user_comments')
          .insert([
            { comment_id: id,
               text:text,
               user_id:user![0].id,  
                 },])
          .select()
     }if(community){
        await supabase
          .from('user_comments')
          .insert([{comment_id: id,
               text:text,
               comm_id:community![0].id,  
                 }, ])
          .select()}
   revalidatePath(`/comment/${id}`)  
    }
    
    export async function comment(formData:FormData,answerId:string){
     const session = await auth() 
     const text = formData.get('text')
     const user = await searchUserName(session?.user?.name!)
     const community = await searchCommunityByName(session?.user?.name!)
     if(user) {await supabase
          .from('user_comments')
          .insert([
            {  
               created_by:session?.user?.name,
               answer_for:answerId, 
               text:text,
               user_id:user![0].id,  
                 },])
          .select()
     }if(community){
        await supabase
          .from('user_comments')
          .insert([{
               created_by:session?.user?.name,
               answer_for:answerId,
               text:text,
               comm_id:community![0].id,  
                 }, ])
          .select()}
           revalidatePath(`/comment/${answerId}`) 
        
    }

 