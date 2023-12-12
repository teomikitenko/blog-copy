'use client'
import { Text,Badge, Button, Card, Group, Stack } from "@mantine/core";
import Link from "next/link";
import type { U } from "@/types/types";
import Image from "next/image";
import logo from "@/public/assets/logo.svg";
import MobileCard from "./MobileCard";

 const UserCard = ({
    user,
    admin = false,
  }: {
    user: U | undefined;
    admin?: boolean;
  }) => {
    return (
      <Card w={"100%"} bg="rgb(0 0 0)">
        <Card.Section>
          <MobileCard user={user} />
          <Group visibleFrom="xs" w={"100%"} mt="60">
            <Image src={logo.src} width={48} height={48} alt="avatar" />
            <Group style={{ flexGrow: 1 }} justify="space-between">
              <Stack gap={5}>
                <Group>
                  <Text
                    c="rgb(255 255 255)"
                    style={{ fontSize: "16px", lineHeight: "140%" }}
                    fw={700}
                  >
                    {user?.name}
                  </Text>
                  {admin && (
                    <Badge size="sm" color="rgb(135 126 255)">
                      admin
                    </Badge>
                  )}
                </Group>
  
                <Text
                  c="rgb(105 124 137)"
                  style={{ fontSize: "14px", lineHeight: "140%" }}
                  fw={500}
                >
                  {user?.email}
                </Text>
              </Stack>
              <Link href={`/profile/${user?.id}`}>
                <Button variant="filled" bg="rgb(135 126 255)">
                  View
                </Button>
              </Link>
            </Group>
          </Group>
        </Card.Section>
      </Card>
    );
  };
  export default UserCard