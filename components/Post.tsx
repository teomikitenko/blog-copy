"use client";
import { Card, Text, Group, Stack, Badge } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import "@mantine/core/styles/Card.css";
import logo from "@/public/assets/logo.svg";
import share from "@/public/assets/share.svg";
import repost from "@/public/assets/repost.svg";
import reply from "@/public/assets/reply.svg";
import heartGray from "@/public/assets/heart-gray.svg";
import heartFilled from "@/public/assets/heart-filled.svg";
import { useEffect, useState } from "react";
import type { Comm } from "./Comments";
import { UpdateLike } from "@/configs/postsConfigs";

export type PostType = {
  id: number;
  created_at: string;
  created_by: string;
  text: string | number;
  like: number;
};
type PostProps = {
  p: PostType | Comm | null;
  back?: string;
};

const Post = ({ p, back = "#212529" }: PostProps) => {
  const [like, setLike] = useState<number>(p?.like!);
  const [pushed, setPushed] = useState(false);
  const [click, setClick] = useState(false);

  useEffect(() => {
    const changeLike = async () => {
      const result = await UpdateLike(p?.id!, like!);
      return result;
    };
    if(click)changeLike().then((res) => console.log(res));
  }, [like]);
  useEffect(() => {
    if (click) {
      setLike(pushed ? like + 1 : like - 1);
    }
  }, [pushed]);
  const likeHandler = () => {
    setClick(true);
    setPushed(!pushed);
  };
  return (
    <Card key={p?.id} style={{ display: "flex" }} bg={back} shadow="sm" p={35}>
      <Card.Section>
        <Group gap={25} align="flex-start">
          <Image
            src={logo.src}
            style={{ objectFit: "cover" }}
            width={30}
            height={30}
            alt="avatar"
          />
          <Stack>
            <Text c={"rgb(255 255 255)"} fw={600}>
              {p?.created_by}
            </Text>
            <Text c={"rgb(255 255 255)"} fw={400}>
              {p?.text}
            </Text>
            <Group mt={10}  align="flex-start">
             <Group align="center"  justify="center" gap={5}>
             <Image
                style={{ cursor: "pointer" }}
                onClick={likeHandler}
                src={pushed ? heartFilled : heartGray.src}
                width={27}
                height={27}
                alt="heart-gray"
              /> <span>{like}</span>
              </Group> 
              <Link href={`/thread/${p?.id}`}>
                <Image src={reply.src} width={27} height={27} alt="reply" />
              </Link>
              <Image
                style={{ cursor: "pointer" }}
                src={repost.src}
                width={27}
                height={27}
                alt="repost"
              />
              <Image
                style={{ cursor: "pointer" }}
                src={share.src}
                width={27}
                height={27}
                alt="share"
              />
            </Group>
          </Stack>
        </Group>
      </Card.Section>
    </Card>
  );
};

export default Post;
