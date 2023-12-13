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
  Badge,
  Box,
} from "@mantine/core";
import Image from "next/image";
import "@mantine/core/styles/Card.css";
import logo from "@/public/assets/logo.svg";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { createComment, searchComment } from "@/configs/postsConfigs";

import type { P, CommentsType, CommentsAnswer } from "@/types/types";
import {  useRouter } from "next/navigation";
import Link from "next/link";
import Comment from "./CommentsAnswer/Comment";
type CommentsProps = {
  post: P | any;
  comments: CommentsType[] | any;
};

const Comments = ({ post, comments }: CommentsProps) => {
  const [value, setValue] = useState("");
  const [comment, setComment] = useState(comments);
  const [postUser, setPostUser] = useState(post);
  const { data: session, status } = useSession();
  const router = useRouter();
  const addComment = async () => {
    await createComment(session?.user?.name, value, postUser[0].id);
    const updateComments = await searchComment(postUser[0].id);
    setComment(updateComments);
    setValue("");
    router.refresh();
  };
   return (
    <>
      <Post key={postUser[0].id}  p={postUser[0]} />

      <Divider my="sm" />
      <Group w={"100%"} my={25}>
        <Box visibleFrom="sm">
        <Image src={logo} width={48} height={48} alt="avatar" />
        </Box>
        
        <TextInput
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          style={{ flexGrow: 1,minWidth:'200px'}}
          placeholder="Comment..."
        />
        <Button visibleFrom="xs"  onClick={addComment} variant="filled" radius={"lg"}>
          <Text py={"md"} px={"sm"} size="md">
            Reply
          </Text>
        </Button>
         <Button hiddenFrom="xs" fullWidth onClick={addComment} variant="filled" radius={"lg"}>
          <Text py={"md"} px={"sm"} size="md">
            Reply
          </Text>
        </Button> 
      </Group>
      <Divider my="sm" />
      <Stack>
        {comment.map((c:CommentsType)=>(
          <Link key={c.id} href={`/comment/${c.id}`}>
          <Comment  c={c} />
          </Link>
          
        ))}
      </Stack>
    </>
  );
};

export default Comments;
