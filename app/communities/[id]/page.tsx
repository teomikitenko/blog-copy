
import { SearchCommunity } from "@/configs/postsConfigs";
import CommunityProfile from "@/components/CommunityProfile";
import { supabase } from "@/configs/postsConfigs";
export const revalidate = 0

const ComunitiesPage = async({params}:{params:{id:string}}) => {
 const community=await SearchCommunity(params.id)
 const imageUrl = supabase
 .storage
 .from('Clone_Blog')
 .getPublicUrl(`logo_communities/${community.name}`)
 console.log(imageUrl)
  return (
    <>
    <CommunityProfile imageUrl={imageUrl} community={community}/>
    </>
  )
}

export default ComunitiesPage