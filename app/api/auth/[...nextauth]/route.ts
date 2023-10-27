import NextAuth, { User } from "next-auth"
import GoogleProviders  from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { createClient } from '@supabase/supabase-js';

type UserData={
  name:string,  
  email:string,
    password:string
  }

  const supabase=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
  const user=[
    {
      name:'Julia',
      email:'julia@gmail.com',  
      password:'1111'
      },{
        name:'Dante',
        email:'dante@gmail.com',  
        password:'2222'
        },{
          name:'Olexa',
          email:'olexa@gmail.com',  
          password:'3333'
          }
  ]

export const handler = NextAuth(
    {
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
                    console.log(credentials)
                    console.log(req)
                    const { name, password,email } = credentials as { name: string; password: string;email:string };
                    const currentUser:UserData|undefined=user.find(u=>name === credentials?.name)
                    if(!currentUser){
                        return null
                    }
                   if(name === credentials?.name&&currentUser.email == credentials?.email){
                    const currentUser={name:name,email:email}
                    return currentUser  as User
                   }
                   return null
                    
                  }
            })

            
        ],
        callbacks:{
          async signIn({user, account, profile, email, credentials}){
            console.log(user.name)
            try {
              const { data:userExist, error } = await supabase
            .from('table_users')
            .select('*')
            .eq('name', user.name)
              if(userExist?.length===0){
                await supabase
                .from('table_users')
                .insert([
                  { name: user.name, email: user.email, image:user.image },
                ])
              } 
              return true
            } catch (error) {
              console.log(error)
              return false
            }
          }
        }
       
       
    }
)
  
export { handler as GET, handler as POST }


