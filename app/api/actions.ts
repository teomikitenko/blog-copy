"use server"
import {auth} from '@/configs/auth'
import { revalidatePath } from "next/cache"
import { createPost,createCommunityPost, searchUserName } from "@/configs/postsConfigs";


export  async function create(formData: FormData){
     const session = await auth() 
    const user = await searchUserName(session?.user?.name!)
    const {text} = Object.fromEntries(formData);
    if(user) await createPost(session?.user?.name!,text)
    else await createCommunityPost(session?.user?.name!,text)
    revalidatePath('/') 
    }

 