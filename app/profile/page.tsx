import React from "react";
import { auth } from "@/configs/auth";
import Profile from "@/components/Profile";
import { takeAllUserPost,takeCommunityPostsByName } from "@/configs/postsConfigs";



export default async function ProfilePage() {
  const userObject = await auth();
  const {user}=userObject!
  const threads = await takeAllUserPost(user?.name!);
  const c_threads=await takeCommunityPostsByName(user?.name!)
  const currentList=threads?.length!>0?threads:c_threads
  return (
    <section className="profile_container">
      {user && <Profile threads={currentList} user={user} />}
    </section>
  );
}
