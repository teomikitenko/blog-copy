import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
type CommunityType = {
  creator: string | null | undefined;
  name: string;
  bio: string;
  email: string;
  password: string | number;
  logo?: File | null;
};
type U = {
  email: string;
  name: string;
  image?: string;
  password: string | number;
};

export const createUser = async ({ email, name, password, image }: U) => {
  await supabase
    .from("table_users")
    .insert({ email: email, name: name, password: password, image: image });
};

export const createPost = async (
  creater: string | number,
  text: string | number | any
) => {
  await supabase
    .from("posts_users")
    .insert({ created_by: creater, text: text });
};
export const createCommunityPost = async (
  creater: string | number,
  text: string | number | any
) => {
  await supabase
    .from("posts_users")
    .insert([{ c_created_by: creater, text: text }])
    .select();
};
export const takeCommunityPosts=async()=>{
  let { data: posts, error } = await supabase
  .from('c_posts')
  .select('*')
  return posts
}
export const takePost = async (id: number) => {
  const { data: post, error } = await supabase
    .from("posts_users")
    .select()
    .eq("id", id);
  return post;
};
export const takeAllUserPost = async (name: string) => {
  const { data: posts, error } = await supabase
    .from("posts_users")
    .select()
    .eq("created_by", name);
  return posts;
};
export const takeAllPosts = async () => {
  const { data: posts, error } = await supabase.from("posts_users").select();
  return posts;
};

export const createComment = async (creater: any, text: any, id: number) => {
  await supabase
    .from("user_comments")
    .insert({ created_by: creater, text: text, id_post: id });
};
export const searchComment = async (id: number | string) => {
  let { data: comments, error } = await supabase
    .from("user_comments")
    .select()
    .eq("id_post", id)
    .select();
  return comments;
};

export const takeAllUsers = async () => {
  const { data: users, error } = await supabase.from("table_users").select();
  return users;
};
export const searchUser = async (id: number | string) => {
  let { data: user, error } = await supabase
    .from("table_users")
    .select()
    .eq("id", id)
    .select();
  return user;
};

export const searchUserName = async (name: string) => {
  const { data: user, error } = await supabase
    .from("table_users")
    .select()
    .eq("name", name)
    .select();
  return user![0];
};

export const addNewCommunities = async ({
  creator,
  name,
  bio,
  email,
  password,
  logo,
}: CommunityType) => {
  let { error } = await supabase.from("communities").insert({
    creator: creator,
    name: name,
    bio: bio,
    email: email,
    password: password,
  });

  await UploadLogo(name, logo as File);
};
export const takeAllCommunities = async () => {
  const { data: communities, error } = await supabase
    .from("communities")
    .select();
  return communities;
};

export const searchCommunityByCreater = async (creator: string) => {
  const { data: community, error } = await supabase
    .from("communities")
    .select()
    .eq("creator", creator);
  return community;
};
export const searchCommunityByName = async (name: string) => {
  const { data: community, error } = await supabase
    .from("communities")
    .select()
    .eq("name", name);
  return community;
};

export const UploadLogo = async (name: any, logo: File | undefined) => {
  const { data, error } = await supabase.storage
    .from("Clone_Blog")
    .upload(`logo_communities/${name}`, logo as File, {
      cacheControl: "3600",
      upsert: false,
    });
};

export const addMembers = async (
  name: string,
  community_id: any,
  image: string
) => {
  const { data, error } = await supabase
    .from("members")
    .insert({ community_id: community_id, name: name, image: image })
    .select();
};
export const SearchCommunity = async (id: string | number) => {
  const { data: community, error } = await supabase
    .from("communities")
    .select()
    .eq("id", id).select(`
    *,
    members (
      *
    )
  `);

  return community![0];
};
export const searchMembersData = async () => {
  const { data: members, error } = await supabase.from("members").select(`
    *,
    table_users (
      *
    )
  `);

  return members;
};
export const UpdateLike = async (
  id: string | number,
  count: string | number
) => {
  const { data, error } = await supabase
    .from("posts_users")
    .update({ like: count })
    .eq("id", id)
    .select();
  return data![0];
};
export const createUpdateLike = async (
  idLike: number | string | undefined,
  idPost: string | number,
  nameWhoLiked: string,
  postCreator: string,
  like: number
) => {
  if (idLike) {
    const { data, error } = await supabase
      .from("likes_post")
      .update({ like: like })
      .eq("id", idLike)
      .select();
    return data;
  } else {
    const { data, error } = await supabase
      .from("likes_post")
      .insert([
        {
          post_id: idPost,
          who_liked: nameWhoLiked,
          like: like,
          post_creator: postCreator,
        },
      ])
      .select();
    return data;
  }
};
export const takeLikePostList = async (name: string) => {
  const { data, error } = await supabase
    .from("likes_post")
    .select()
    .eq("who_liked", name).select(`*,
  posts_users(
    *
    )'`);
  return data;
};
export const takeLikeName = async (name: string) => {
  const { data, error } = await supabase
    .from("likes_post")
    .select()
    .eq("who_liked", name);

  return data;
};

export const takeLike = async (name: string | number) => {
  const { data, error } = await supabase
    .from("table_users")
    .select("total_likes")
    .eq("name", name);
  return data;
};
export const takeTotalLike = async (id: string | number) => {
  const { data, error } = await supabase
    .from("table_users")
    .select("like")
    .eq("id", id);
  return data;
};

export const UpdateTotalLikes = async (
  name: string,
  count: string | number
) => {
  const { data, error } = await supabase
    .from("table_users")
    .update({ total_likes: count })
    .eq("name", name)
    .select();
  return data![0];
};
