"use client";
import { P } from "@/types/types";
import { Card, Text, Group, Stack, Badge, Box } from "@mantine/core";
import Image from "next/image";
import logo from "@/public/assets/logo.svg";
import heartGray from "@/public/assets/heart-gray.svg";
import { useEffect, useState } from "react";

export const dynamic = "force-dynamic";

type PostList = {
  created_at: string;
  id: number;
  like: number;
  who_liked: string;
  post_creator: string;
  post_id: number | string;
  posts_users: P;
};
const FavoredCard = ({
  p,postList
}: {
  p: { post_id: number | string; posts_users: P },
  postList:PostList[];
}) => {
  const [totalLike, setTotalLike] = useState(
     postList.filter(post=>post.post_id === p.post_id).
     reduce((acc,current)=>acc + current.like,0) 
  )
  return (
    <>
     <Card
        key={p.posts_users.id}
        style={{ display: "flex" }}
        bg="#212529"
        shadow="sm"
        p={35}
      >
        <Card.Section>
          <Group gap={25} align="flex-start">
            <Box visibleFrom="xs">
            <Image
              src={logo.src}
              style={{ objectFit: "cover" }}
              width={30}
              height={30}
              alt="avatar"
            />
            </Box>
            <Stack>
              <Text c={"rgb(255 255 255)"} fw={600}>
                {p?.posts_users.created_by}
              </Text>
              <Text c={"rgb(255 255 255)"} fw={400}>
                {p?.posts_users.text}
              </Text>
              <Group gap={0} >
                <Image
                  src={heartGray.src}
                  width={30}
                  height={30}
                  alt="avatar"
                />
                <Badge p={5} variant="transparent" size="xl" color="violet">{totalLike}</Badge>
              </Group>
            </Stack>
          </Group>
        </Card.Section>
      </Card>
    </>
  );
};
export default FavoredCard;
