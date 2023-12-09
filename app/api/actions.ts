"use server"
import {auth} from '@/configs/auth'
import { revalidatePath } from "next/cache"
import { createPost,createCommunityPost, searchUserName,UpdatePost } from "@/configs/postsConfigs";
import { redirect } from 'next/navigation';
import { supabase } from '@/configs/postsConfigs';


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

 