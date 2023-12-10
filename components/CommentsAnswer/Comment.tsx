'use client'
import { CommentsType } from "@/types/types";
import { Card, Group, Stack, Badge } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import { Text } from "@mantine/core";
import reply from "@/public/assets/reply.svg";
import heartGray from "@/public/assets/heart-gray.svg";
import heartFilled from "@/public/assets/heart-filled.svg";
import logo from "@/public/assets/logo.svg";


const Comment = ({ c }: { c: CommentsType }) => {
    const [like, setLike] = useState(false);
    const [pushedLike, setPushedLike] = useState(false);
    const [pushedComment, setPushedComment] = useState(false);
    const session = useSession();
    const likeHandler = () => {
      setPushedLike(!pushedLike);
    };

    return (
      <Card style={{ display: "flex"}} bg="rgb(0 0 0)" shadow="sm" p={25}>
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
                    {c?.created_by || c?.c_created_by}
                  </Text>
                  {c?.c_created_by && <Badge visibleFrom="sm">Group</Badge>}
                </Group>
                <Text c={"rgb(255 255 255)"} fw={400}>
                  {c?.text}
                </Text>
                <Group mt={10} align="flex-start">
                  <Group align="center" justify="center" gap={5}>
                    <Image
                      style={{ cursor: "pointer" }}
                      onClick={likeHandler}
                      src={pushedLike ? heartFilled : heartGray.src}
                      width={27}
                      height={27}
                      alt="heart-gray"
                    />
                    <span>{like}</span>
                  </Group>
  
                  <Image
                    src={reply.src}
                    width={27}
                    height={27}
                    onClick={() => setPushedComment(!pushedComment)}
                    alt="reply"
                  />
                </Group>
              </Stack>
            </Group>
          </Group>
        </Card.Section>
        
       {/*  {c.comments_answer.map(a=><CommentsAnswer a={a}/>)}
        {pushedComment && <Answer c={c} />} */}
      </Card>
    );
  };
  export default Comment