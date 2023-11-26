import NextAuth, { User } from "next-auth"
import GoogleProviders  from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { createClient } from '@supabase/supabase-js';
import { AuthOptions } from "next-auth";
import { searchUserName } from "@/configs/postsConfigs";


type UserData={
  password:string
  type:string
  }
  type CommynityData={
    name:string,  
    email:string,
    password:string,
    type:string
  }
  type UserType=User&UserData


  const supabase=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

  const authOptions:AuthOptions={
    providers:[
        GoogleProviders({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                name: { label: "username", type: "text", placeholder: "jsmith" },
                password: { label: "password", type: "password" },
                email: { label: "email", type: "email" }
              },
              async authorize(credentials, req){
                const { name, password,email } = credentials as { name: string; password: string;email:string };
                const currentUser = await searchUserName(name)
                console.log(currentUser)
                const searchCurrentCommynity=async(name:string)=>{
                  const { data: community, error } = await supabase
                  .from('communities')
                  .select("*")
                  .eq('name',name)
                  return community![0]
                }
                if(!currentUser){
                  const myCommunity = await searchCurrentCommynity(name)
                  if(!myCommunity)return null
                    if(myCommunity.email === email&&myCommunity.password === password){
                      const{name,email,password}=myCommunity
                      const community={name:name,email:email,password:password,type:'community'}
                      return community  as unknown  as UserType 
                    }
                    return null
                   
                  
                }
               if(name === currentUser.name&&currentUser.email === email&&currentUser.password === password){
                const currentUser={name:name,email:email,password:password,type:'user'}
                
                return currentUser as unknown  as UserType
               }
               return null
                
              }
        })

        
    ],
     callbacks:{
      async signIn({user, account, profile, email, credentials}){
        console.log(profile) 
        try {
          if(profile?.sub){
            await supabase
            .from('table_users')
            .insert([
              { name: user.name, email: user.email, image:user.image }
            ])
            return true
          }
            /*  if(user.type === 'user'){ */
              /* const { data:userExist, error } = await supabase
              .from('table_users')
              .select('*')
              .eq('name', user.name) */
                /* if(userExist?.length===0){ */
                
               /*  }  */
           /*      return true
          } */  return true
       
        } catch (error) {
          console.log(error)
          return false
        }
      }
    }
    
   
}


 const handler = NextAuth(authOptions)
  
export { handler as GET, handler as POST,authOptions }


