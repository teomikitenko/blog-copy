import type { CommentsAnswer } from "@/types/types";
import { Card, Group, Stack } from "@mantine/core";
import Image from "next/image";
import { Text } from "@mantine/core";
import reply from "@/public/assets/reply.svg";
import heartGray from "@/public/assets/heart-gray.svg";
import heartFilled from "@/public/assets/heart-filled.svg";
import logo from "@/public/assets/logo.svg";

const CommentsAnswer = ({ a }: { a: CommentsAnswer }) => {
  return (
    <Card
      style={{ display: "flex" }}
      bg="rgb(0 0 0)"
      shadow="sm"
      mt={10}
      p={25}
    >
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
              <Text c={"rgb(255 255 255)"} fs="" fw={300}>
                {a?.text}
              </Text>
              <Group mt={10} align="flex-start">
                <Group align="center" justify="center" gap={5}>
                  <Image
                    style={{ cursor: "pointer" }}
                    /*  onClick={likeHandler} */
                    src={/* pushedLike ?  */ /* heartFilled : */ heartGray.src}
                    width={23}
                    height={23}
                    alt="heart-gray"
                  />
                  {/*  <span>{like}</span> */}
                </Group>

                <Image src={reply.src} width={23} height={23} alt="reply" />
              </Group>
            </Stack>
          </Group>
        </Group>
      </Card.Section>
    </Card>
  );
};
