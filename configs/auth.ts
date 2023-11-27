import type { NextAuthConfig } from "next-auth"
import NextAuth, { User } from "next-auth";
import GoogleProviders from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { createClient } from "@supabase/supabase-js";
import { searchUserName } from "@/configs/postsConfigs";

type UserData = {
  password: string;
  type: string;
};
type CommynityData = {
  name: string;
  email: string;
  password: string;
  type: string;
};
type UserType = User & UserData;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const config = {
  providers: [
    GoogleProviders({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "username", type: "text", placeholder: "jsmith" },
        password: { label: "password", type: "password" },
        email: { label: "email", type: "email" },
      },
      async authorize(credentials, req) {
        const { name, password, email } = credentials as {
          name: string;
          password: string;
          email: string;
        };
        const currentUser = await searchUserName(name);
        console.log(currentUser);
        const searchCurrentCommynity = async (name: string) => {
          const { data: community, error } = await supabase
            .from("communities")
            .select("*")
            .eq("name", name);
          return community![0];
        };
        if (!currentUser) {
          const myCommunity = await searchCurrentCommynity(name);
          if (!myCommunity) return null;
          if (
            myCommunity.email === email &&
            myCommunity.password === password
          ) {
            const { name, email, password } = myCommunity;
            const community = {
              name: name,
              email: email,
              password: password,
              type: "community",
            };
            return community as unknown as UserType;
          }
          return null;
        }
        if (
          name === currentUser.name &&
          currentUser.email === email &&
          currentUser.password === password
        ) {
          const currentUser = {
            name: name,
            email: email,
            password: password,
            type: "user",
          };

          return currentUser as unknown as UserType;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log(profile)
      try {
        if (profile?.sub) {
          await supabase
            .from("table_users")
            .insert([
              { name: user?.name||profile?.name, email: user?.email||profile?.email, image: user?.image||profile?.picture },
            ]);
          return true;
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
} satisfies NextAuthConfig ;


export const { handlers, auth, signIn, signOut } = NextAuth(config)