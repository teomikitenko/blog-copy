import Profile from "@/components/Profile";
import { searchUser, takeAllUserPost } from "@/configs/postsConfigs";

 export const revalidate = 0; 

const ProfileUser = async ({ params }: { params: { id: string } }) => {
  const user = await searchUser(params.id);
   const posts = await takeAllUserPost(user![0].name); 
  console.log(user)
  return  <Profile user={user![0]} threads={posts} /> 
};

export default ProfileUser;
