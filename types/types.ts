export type U = {
    id: string|number,
    created_at: string,
    name: string,
    email: string,
    image: string|null,
    password: string|number,
    total_likes: number
  };
  export type P = {
    id: number;
    created_at: string;
    created_by: string;
    text: string | number;
    like:number
  };
  export type CommunityType = {
    id: number;
    creator: string | null | undefined;
    name: string;
    image: string;
    bio: string;
    email: string;
    community_id: string;
    members:MembersType[]
  };
  
  export type MembersType={
    created_at:string,
    community_id:string|number,
    name:string,
    image?:string,
    email: string;
    table_users:U[]
  }
  export type CommentsType={
    created_at: string;
    created_by: string;
    id: number;
    id_post: number;
    text: string;
    like:number
  }
export  type DefaultUserSession =
  | {
      name?: string | null | undefined;
      email?: string | null | undefined;
      image?: string | null | undefined;
    }
  | undefined;

  export type L={
    id: number,
    created_at: string,
    post_id: number,
    post_creator: string,
    who_liked: string,
    like: number
  }
