import { supabase } from "@/configs/postsConfigs"
import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
    try {
        const{data:users,error}=await supabase
        .from('posts_users')
        .select()
            return  NextResponse.json(users) 
        
    } catch (error:any) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }

     
}
