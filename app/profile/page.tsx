import React from "react";
import { auth } from "@/configs/auth";
import Profile from "@/components/Profile";
import { takeAllUserPost } from "@/configs/postsConfigs";

export default async function ProfilePage() {
  const userObject = await auth();
  const {user}=userObject!
  console.log(user);
  const threads = await takeAllUserPost(user?.name!);
  return (
    <section className="profile_container">
      {user && <Profile threads={threads} user={user} />}
    </section>
  );
}
