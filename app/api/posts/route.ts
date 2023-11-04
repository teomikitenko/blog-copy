import { supabase } from "@/configs/postsConfigs"
import { NextResponse } from 'next/server'





export async function GET(request: Request) {
   const{data:users,error}=await supabase
    .from('posts_users')
    .select()
        return  NextResponse.json(users) 
     
}
