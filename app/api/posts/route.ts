import { supabase } from "@/configs/postsConfigs"
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    try {
        const{data:users,error}=await supabase
        .from('posts_users')
        .select()
            return  NextResponse.json(users) 
        
    } catch (error) {
        /* return NextResponse.json({ message: 'error' }, { status: 500 }) */
    }

     
}
