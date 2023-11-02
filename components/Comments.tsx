"use client";
import Post from "./Post";
import {
  Card,
  Text,
  Group,
  Stack,
  Divider,
  TextInput,
  Button,
} from "@mantine/core";
import Image from "next/image";
import "@mantine/core/styles/Card.css";
import logo from "@/public/assets/logo.svg";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { createComment, searchComment } from "@/configs/postsConfigs";

import { takeAllPosts, takePost } from "@/configs/postsConfigs";
import type { PostType } from "./Post";
type CommentsProps = {
  post: PostType | /* null */ any ;
  comments:Comm[] | any
};
export type Comm={
  created_at: string;
  created_by: string;
  id: number;
  id_post: number;
  text: string;
}
const Comments = ({ post, comments }: CommentsProps) => {
  const [value, setValue] = useState("");
  const [comment, setComment] = useState(comments);
  const [postUser, setPostUser] = useState(post);
console.log(comments)
  const { data: session, status } = useSession();
  const addComment = async() => {
    await createComment(session?.user?.name, value, postUser[0].id);
    const updateComments=await searchComment(postUser[0].id)
    setComment(updateComments)
    setValue('')

  };
  useEffect(()=>{
  setComment(comments)
 },[]) 
  return (
    <>
      <Post key={postUser[0].id} p={postUser[0]} />
   
      <Divider my="sm" />
      <Group w={"100%"} my={25}>
        <Image src={logo} width={48} height={48} alt="avatar" />
        <TextInput
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          style={{ flexGrow: 1 }}
          placeholder="Comment..."
        />
        <Button onClick={addComment} variant="filled" radius={"lg"}>
          <Text py={"md"} px={"sm"} size="md">
            Reply
          </Text>
        </Button>
      </Group>
      <Divider my="sm" />
       <Stack>
      {comment&&comment.map((c:Comm)=>(
        <Post key={c?.id} back='rgb(0 0 0)' p={c}/>
      )
        
      )} 
      </Stack> 
    
    </>
  );
};

export default Comments;
