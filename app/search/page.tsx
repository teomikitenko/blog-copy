import React from "react";
import Search from "@/components/Search";
import { takeAllUsers, takeAllCommunities } from "@/configs/postsConfigs";
import type { CommunityType, U } from "@/types/types";

export const dynamic = "force-dynamic";

export default async function SearchPage() {
  const users = await takeAllUsers();

  return <Search users={users} />;
}
