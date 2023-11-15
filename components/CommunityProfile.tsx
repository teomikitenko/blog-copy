"use client";
import {
  Avatar,
  Button,
  Card,
  Divider,
  Group,
  Stack,
  Tabs,
  Text,
  Badge,
} from "@mantine/core";
import Image from "next/image";
import type { CommunityType, MembersType } from "./Communities";
import type { UserType } from "./Search";
import { UserCard } from "./Search";
import reply from "@/public/assets/reply.svg";
import members from "@/public/assets/members.svg";
import request from "@/public/assets/request.svg";
import { useState } from "react";
import { IconSend } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { addMembers } from "@/configs/postsConfigs";
import Link from "next/link";
import logo from "@/public/assets/logo.svg";

const CommunityProfile = ({
  community,
  imageUrl,
  admin,
  members,
}: {
  community: CommunityType;
  imageUrl: { data: { publicUrl: string } };
  admin: any;
  members:  MembersType[];
}) => {
  const tab = [
    { text: "threads", icon: reply },
    { text: "members", icon: members },
    { text: "requests", icon: request },
  ];
  return (
    <Stack>
      <ProfileHeader imageUrl={imageUrl} community={community} />
      <Divider my="sm" />
      <Tabs
        color="rgb(14 14 18)"
        variant="pills"
        defaultValue="threads"
        orientation="horizontal"
      >
        <Tabs.List
          mb={20}
          h={50}
          style={{ backgroundColor: "rgb(18 20 23)" }}
          justify="center"
          grow={true}
        >
          {tab.map((t, index) => (
            <Tabs.Tab key={index} value={t.text}>
              <Group>
                <Image src={t.icon} width={24} height={24} alt="icon" />
                <Text tt="capitalize" size="lg" fw={500} c={"rgb(239 239 239)"}>
                  {t.text}
                </Text>
                {/*   {t.text === "threads" && (
                <p className="counter_threads">{threads?.length}</p>
              )} */}
              </Group>
            </Tabs.Tab>
          ))}
        </Tabs.List>
        <Tabs.Panel value="threads">
          {/*     <Stack>
        {
        threads?.map(t=>(
          <Post key={t.id} p={t}/> 
        ))
      }
          </Stack> */}
        </Tabs.Panel>

        <Tabs.Panel value="members">
          <Stack gap={30}>
            <UserCard user={admin} admin />
            {community.members.map((u) => {
              const member = members.filter(m=>m.name === u.name)[0].table_users
             return  <Member key={u.name} members={member} user={u} />
            }
            )}
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="requests">0</Tabs.Panel>
      </Tabs>
    </Stack>
  );
};

export default CommunityProfile;

const ProfileHeader = ({
  imageUrl,
  community,
}: {
  community: CommunityType;
  imageUrl: { data: { publicUrl: string } };
}) => {
  const [subscribe, setSubscribe] = useState(false);
  const { data: session, status } = useSession();

  const add = () => {
    setSubscribe(true);
    addMembers(
      session?.user?.name!,
      community.community_id,
      session?.user?.image!
    );
  };

  return (
    <Group mt={20}>
      <Avatar src={imageUrl.data.publicUrl} size="xl" alt="avatar" />
      <Stack gap={1}>
        <Group>
          <Text style={{ fontSize: "24px" }} c={"rgb(255 255 255)"} fw={700}>
            {community?.name}
          </Text>
          {session?.user?.name === community.creator ? (
            <Badge>Administrator</Badge>
          ) : community.members.find(
              (m) => m.name === session?.user?.name
            ) ? null : (
            <Button
              leftSection={!subscribe && <IconSend size={18} />}
              onClick={add}
              disabled={subscribe}
              size="xs"
              color="rgb(135 126 255)"
            >
              {subscribe ? "Request sended" : "Send Request"}
            </Button>
          )}
        </Group>

        <Text size="md" c={"rgb(105 124 137)"} fw={500}>
          {community?.email}
        </Text>
      </Stack>
    </Group>
  );
};


const Member = ({ user, members }: { user: MembersType; members: any}) => {
  console.log(members)
  return (
    <Card bg="rgb(0 0 0)">
      <Card.Section>
        <Group>
          <Image src={logo} width={48} height={48} alt="avatar" />
          <Group w="90%" justify="space-between">
            <Stack gap={5}>
              <Group>
                <Text
                  c="rgb(255 255 255)"
                  style={{ fontSize: "16px", lineHeight: "140%" }}
                  fw={700}
                >
                  {user?.name}
                </Text>
              </Group>

              <Text
                c="rgb(105 124 137)"
                style={{ fontSize: "14px", lineHeight: "140%" }}
                fw={500}
              >
                {user?.email}
              </Text>
            </Stack>
              <Link href={`/profile/${members.id}`}> 
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
