"use client";
import { Text, Tabs, Group, Stack, Avatar, Divider } from "@mantine/core";
import reply from "@/public/assets/reply.svg";
import members from "@/public/assets/members.svg";
import tag from "@/public/assets/tag.svg";
import Image from "next/image";
import logo from "@/public/assets/logo.svg";
import Post from "./Post";
import { DefaultUserSession } from "@/types/types";

const Profile = ({
  user,
  threads,
}: {
  user: DefaultUserSession;
  threads: any[] | null;
}) => {
  const tab = [
    { text: "threads", icon: reply },
    { text: "replies", icon: members },
    { text: "tagged", icon: tag },
  ];
  return (
    <Stack>
      <Group mt={20}>
        <Avatar src={user?.image ? user?.image : logo} size="xl" alt="avatar" />
        <Stack gap={1}>
          <Text style={{ fontSize: "24px" }} c={"rgb(255 255 255)"} fw={700}>
            {user?.name}
          </Text>
          <Text size="md" c={"rgb(105 124 137)"} fw={500}>
            {user?.email}
          </Text>
        </Stack>
      </Group>
      <Divider my="sm" />
      <Tabs
        color="rgb(14 14 18)"
        variant="pills"
        defaultValue="threads"
        orientation="horizontal"
      >
        <Tabs.List
          mb={30}
          h={50}
          style={{ backgroundColor: "rgb(18 20 23)" }}
          justify="center"
          grow={true}
        >
          {tab.map((t, index) => (
            <Tabs.Tab key={index} value={t.text}>
              <Group>
                <Image src={t.icon} width={24} height={24} alt="icon" />
                <Text visibleFrom="md" tt="capitalize" size="lg" fw={500} c={"rgb(239 239 239)"}>
                  {t.text}
                </Text>
                {t.text === "threads" && (
                  <p className="counter_threads">{threads?.length}</p>
                )}
              </Group>
            </Tabs.Tab>
          ))}
        </Tabs.List>
        <Tabs.Panel value="threads">
          <Stack>
            {threads?.map((t) => (
              <Post key={t.id} p={t} />
            ))}
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="replies">0</Tabs.Panel>

        <Tabs.Panel value="tagged">0</Tabs.Panel>
      </Tabs>
    </Stack>
  );
};

export default Profile;
