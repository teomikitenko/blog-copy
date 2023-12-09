import { supabase } from "@/configs/postsConfigs"
import { NextResponse } from 'next/server'
import { searchUserName } from "@/configs/postsConfigs";
 

export const dynamic = 'force-dynamic'
 
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const name = searchParams.get('name')
    try {
        const user = await searchUserName(name as string);
        const { data, error } = await supabase
          .from("likes_post")
          .select()
          .eq(user? "who_liked":'c_liked', name).select(`*,
        posts_users(
          *
          )'`);
          return  NextResponse.json({ data }, { status: 200 })
          
        
    } catch (error) {
         return NextResponse.json({ error: 'error' }, { status: 500 }) 
    }

     
}
