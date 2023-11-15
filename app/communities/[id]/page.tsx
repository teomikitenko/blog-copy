
import { SearchCommunity } from "@/configs/postsConfigs";
import CommunityProfile from "@/components/CommunityProfile";
import { supabase,searchUserName,searchMembersData } from "@/configs/postsConfigs";

export const revalidate = 0

const ComunitiesPage = async({params}:{params:{id:string}}) => {
 const community=await SearchCommunity(params.id)
 const admin=await searchUserName(community.creator)
 const members= await searchMembersData()
 const imageUrl = supabase
 .storage
 .from('Clone_Blog')
 .getPublicUrl(`logo_communities/${community.name}`)
  return (
    <>
    <CommunityProfile members={members} admin={admin} imageUrl={imageUrl} community={community}/>
    </>
  )
}

export default ComunitiesPage