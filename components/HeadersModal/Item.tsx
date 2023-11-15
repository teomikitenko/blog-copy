import { Stack, Group, Divider, Text } from "@mantine/core";
import { IconUserCircle } from "@tabler/icons-react";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import Image from "next/image";
import ItemAdd from "./ItemAdd";
import { useEffect, useState } from "react";
import {
  searchCommunityByCreater,
  searchUserName,
  searchCommunityByName,
} from "@/configs/postsConfigs";
import logo from "@/public/assets/logo.svg";
type CommunityType = {
  bio: string;
  created_at: string;
  creator: string;
  email: string;
  id: string | number;
  members: null;
  name: string;
  password?: string;
};
type UserType = {
  created_at: string;
  email: string;
  id: number | string;
  image: null;
  name: string;
  password: null;
};

const Item = ({
  session,
  openMenu,
}: {
  session: Session | null;
  openMenu: any;
}) => {
  const [communities, setCommunities] = useState<CommunityType[] | any>([]);
  const [user, setUser] = useState<UserType>();
  const [type, setType] = useState<string>();
  console.log(user);

  useEffect(() => {
    const currentTypeUser = async () => {
      const communites = await searchCommunityByCreater(session?.user?.name!);
      if (communities) {
        setCommunities(communites);
        setType("user");
      }
      if (communities?.length === 0) {
        const communityName = await searchCommunityByName(session?.user?.name!);
        if (communityName && communityName?.length > 0) {
          const currentUser = await searchUserName(communityName![0].creator);
          setType("community");
          setUser(currentUser);
        }
      }
    };
   currentTypeUser();
  }, []);

  const signCommunity = (c: CommunityType) => {
    signIn("credentials", {
      name: c.name,
      email: c.email,
      password: c.password,
    });
    setType("community");
  };
  const signUser = () => {
    signIn();
    setType("user");
  };

  return (
    <Stack>
      <Group gap={15} p={20}>
        {session?.user?.image ? (
          <Image
            style={{ alignItems: "center" }}
            src={session?.user?.image}
            width={48}
            height={48}
            alt="avatar"
          />
        ) : (
          <IconUserCircle
            style={{ width: "25px", height: "25px" }}
            color="var(--mantine-color-blue-filled)"
          />
        )}
        <Text c={"rgb(255 255 255)"} fw={600}>
          {session?.user?.name}
        </Text>
      </Group>
      <Divider size="sm" />
      <Stack>
        {communities &&
          communities.map((c: CommunityType, index: any) => {
            return (
              <Group
                key={index}
                onClick={() => signCommunity(c)}
                pl={17}
                gap={33}
              >
                <Image src={logo} width={32} height={32} alt="logo" />
                <Text c="rgba(255, 255, 255, 0.65)">{c.name}</Text>
              </Group>
            );
          })}
        {user && (
          <Group onClick={signUser} pl={17} gap={33}>
            <Image
              style={{ borderRadius: "100%" }}
              src={user.image ? user.image : logo}
              width={32}
              height={32}
              alt="logo"
            />
            <Text c="rgba(255, 255, 255, 0.65)">{user?.name}</Text>
          </Group>
        )}

        <ItemAdd openMenu={openMenu} />
      </Stack>
    </Stack>
  );
};
export default Item;
