import { searchComment, supabase } from "@/configs/postsConfigs"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { NextRequest, NextResponse } from 'next/server'
 
export async function POST(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    try {
         const id = searchParams.get('id') 
         const { error } = await supabase
                .from('posts_users')
                .delete()
                .eq('id', id)
                 revalidatePath('/','page') 
               
        return  NextResponse.json({message:'deleted'},{ status: 200 }) 
    } catch (error) {
         return NextResponse.json({ message: 'error' }, { status: 500 }) 
    }

     
}
