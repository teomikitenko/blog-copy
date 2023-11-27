"use server"
import {auth} from '@/configs/auth'
import { revalidatePath } from "next/cache"
import { createPost } from "@/configs/postsConfigs";


export  async function create(formData: FormData){
    const session = await auth()
    const {text} = Object.fromEntries(formData);
     await createPost(session?.user?.name,text)
    revalidatePath('/')
    }

 