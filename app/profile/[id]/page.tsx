import Profile from "@/components/Profile";
import { searchUser } from "@/configs/postsConfigs";



const ProfileUser = async({params}:{params: { id: string}} ) => {
    const user=await searchUser(params.id)
  return (
    <Profile user={user![0]}/>
  )
}

export default ProfileUser