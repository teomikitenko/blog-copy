"use client";
import { Card, Text, Group, Stack, Badge, Box, ThemeIcon } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/assets/logo.svg";
import share from "@/public/assets/share.svg";
import repost from "@/public/assets/repost.svg";
import reply from "@/public/assets/reply.svg";
import heartGray from "@/public/assets/heart-gray.svg";
import heartFilled from "@/public/assets/heart-filled.svg";
import { useEffect, useState } from "react";
import {
  UpdateLike,
  UpdateTotalLikes,
  createUpdateLike,
  supabase,
} from "@/configs/postsConfigs";
import type { P } from "@/types/types";
import { useSession, signIn } from "next-auth/react";
import { IconEdit } from "@tabler/icons-react";
type PostProps = {
  p: P | null;
  back?: string;
  posts?: P[];
};
export const dynamic = "force-dynamic";
const Post = ({ p, back = "#212529", posts }: PostProps) => {
  const { data: session, status } = useSession();
  const [currentLikeId, setCurrentLikeId] = useState<number | string>();
  const [currentLike, setCurrentLike] = useState(0);
  const [like, setLike] = useState<number>(p?.like!);
  const [pushed, setPushed] = useState(false);
  const [click, setClick] = useState(false);
  const [total, setTotal] = useState(
    posts
      ?.filter((post) => post.created_by === p?.created_by)
      .reduce((sum, current) => sum + current.like, 0)
  );
  useEffect(() => {
    const changeLike = async () => {
      const creater = p?.created_by! || p?.c_created_by!;
      const result = await UpdateLike(p?.id!, like!);
      await createUpdateLike(
        currentLikeId!,
        p?.id!,
        session?.user?.name!,
        currentLike
      ).then((res) => {
        if (!currentLikeId) setCurrentLikeId(res![0].id);
      });
      const { data: allposts, error } = await supabase
        .from("posts_users")
        .select();
      return allposts;
    };
    if (click)
      changeLike().then((res) =>
        setTotal(
          res
            ?.filter((post: P) => post.created_by === p?.created_by)
            .reduce((sum: any, current: P) => sum + current.like, 0)
        )
      );
  }, [like]);

  useEffect(() => {
    const changeTotalLikes = async () => {
      const totalLikes = await UpdateTotalLikes(p?.created_by!, total!);
      return totalLikes;
    };
    if (click) changeTotalLikes();
  }, [total]);

  useEffect(() => {
    if (click) {
      setLike(pushed ? like + 1 : like - 1);
      setCurrentLike(pushed ? currentLike + 1 : currentLike - 1);
      setTotal(pushed ? (total as number) + 1 : (total as number) - 1);
    }
  }, [pushed]);
  const likeHandler = () => {
    if (status === "authenticated") {
      setClick(true);
      setPushed(!pushed);
    } else {
      signIn();
    }
  };

  return (
    <Card style={{ display: "flex" }} bg={back} shadow="sm" p={35}>
      <Card.Section style={{ position: "relative" }}>
        <Group justify="space-between">
          <Group gap={25} align="flex-start">
            <Image
              src={logo.src}
              style={{ objectFit: "cover" }}
              width={30}
              height={30}
              alt="avatar"
            />

            <Stack>
              <Group>
                <Text c={"rgb(255 255 255)"} fw={600}>
                  {p?.created_by || p?.c_created_by}
                </Text>
                {p?.c_created_by && <Badge visibleFrom="sm">Group</Badge>}
              </Group>
              <Text c={"rgb(255 255 255)"} fw={400}>
                {p?.text}
              </Text>
              <Group mt={10} align="flex-start">
                <Group align="center" justify="center" gap={5}>
                  <Image
                    style={{ cursor: "pointer" }}
                    onClick={likeHandler}
                    src={pushed ? heartFilled : heartGray.src}
                    width={27}
                    height={27}
                    alt="heart-gray"
                  />
                  <span>{like}</span>
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
          {session?.user?.name === p?.created_by ||
            (p?.c_created_by && status === "authenticated" && (
              <Link href={`/edit/${p?.id}`}>
                <Box
                  visibleFrom="lg"
                  style={{ position: "absolute", right: "0", top: "0" }}
                >
                  <Text size="sm">Edit</Text>
                </Box>
                <ThemeIcon
                  hiddenFrom="lg"
                  variant="transparent"
                  style={{ position: "absolute", right: "0", top: "0" }}
                >
                  <IconEdit color="white" />
                </ThemeIcon>
              </Link>
            ))}
        </Group>
      </Card.Section>
    </Card>
  );
};

export default Post;
