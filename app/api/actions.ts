"use server"
import { authOptions } from "./auth/[...nextauth]/route";
import { revalidatePath } from "next/cache"
import { createPost } from "@/configs/postsConfigs";
import { getServerSession } from "next-auth";


export  async function create(formData: FormData){
    const session = await getServerSession(authOptions)
    const {text} = Object.fromEntries(formData);
     await createPost(session?.user?.name,text)
    revalidatePath('/')
    }

 