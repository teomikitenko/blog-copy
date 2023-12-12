import React from "react";
import { auth } from "@/configs/auth";
import Profile from "@/components/Profile";
import {takeAndDefinePosts } from "@/configs/postsConfigs";



export default async function ProfilePage() {
  const session = await auth();
  const threads = await takeAndDefinePosts(session?.user?.name!)
  return (
    <section className="profile_container">
       {session?.user && <Profile threads={threads} user={session?.user} />} 
    </section>
  );
}
