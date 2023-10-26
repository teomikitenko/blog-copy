import NextAuth, { User } from "next-auth"
import GoogleProviders  from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

type UserData={
  username:string,  
  email:string,
    password:string
  }
  const user=[
    {
      username:'Julia',
      email:'julia@gmail.com',  
      password:'1111'
      },{
        username:'Dante',
        email:'dante@gmail.com',  
        password:'2222'
        },{
          username:'Olexa',
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
                    username: { label: "username", type: "text", placeholder: "jsmith" },
                    password: { label: "password", type: "password" },
                    email: { label: "email", type: "email" }
                  },
                  async authorize(credentials, req){
                    console.log(credentials)
                    console.log(req)
                    const { username, password } = credentials as { username: string; password: string; };
                    const currentUser:UserData|undefined=user.find(u=>username === credentials?.username)
                    if(!currentUser){
                        return null
                    }
                   if(username === credentials?.username&&currentUser.email == credentials?.email){
                    const currentUser={name:username}
                    return currentUser  as User
                   }
                   return null
                    
                  }
            })

            
        ],
        secret:process.env.NEXTAUTH_SECRET
       
    }
)
  
export { handler as GET, handler as POST }


