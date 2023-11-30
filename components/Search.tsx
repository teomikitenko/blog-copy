"use client";
import { Card, Text, Badge, Button, Group, Stack } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/assets/logo.svg";

export type UserType = {
  id: number;
  created_at: string;
  name: string;
  email: string;
  image: string;
  password: null | string;
};
export type Users = {
  users: UserType[] | null;
};
export type User = {
  user: UserType | undefined;
};

const Search = ({ users }: Users) => {
  return (
    <>
      <Text
        style={{ fontSize: "30px", lineHeight: "140%" }}
        c="rgb(255 255 255)"
        fw={700}
      >
        Search
      </Text>
      {users?.map((u: UserType) => (
        <UserCard key={u.id} user={u} />
      ))}
    </>
  );
};

export const UserCard = ({
  user,
  admin = false,
}: {
  user: UserType | undefined;
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

const MobileCard = ({ user }: { user: UserType | undefined }) => {
  return (
    <Card hiddenFrom="xs" mt={10} bg="rgb(16 16 18)">
      <Card.Section p={16}>
        <Stack>
          <Group>
            <Image src={logo.src} width={48} height={48} alt="avatar" />
            <Text
              c="rgb(255 255 255)"
              style={{ fontSize: "16px", lineHeight: "140%" }}
              fw={700}
            >
              {user?.name}
            </Text>
            <Text
              c="rgb(105 124 137)"
              style={{ fontSize: "14px", lineHeight: "140%" }}
              fw={500}
            >
              {user?.email}
            </Text>
          </Group>

          <Link href={`/profile/${user?.id}`}>
            <Button w={"100%"} variant="filled" bg="rgb(135 126 255)">
              View
            </Button>
          </Link>
        </Stack>
      </Card.Section>
    </Card>
  );
};

export default Search;
