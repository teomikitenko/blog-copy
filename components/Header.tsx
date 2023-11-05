"use client";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/assets/logo.svg";
import { useSession } from "next-auth/react";
import { IconUserCircle } from "@tabler/icons-react";
import {
  Text,
  Menu,
  Button,
  Group,
  Stack,
  Divider,
  ThemeIcon,
  Modal,
} from "@mantine/core";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { IconPlus } from "@tabler/icons-react";
import { Session } from "next-auth";

const Header = () => {
  const { data: session, status } = useSession();
  return (
    <>
      <Link href={"/"} className="link_header">
        <Image src={logo} width={28} height={28} alt="logo" />
        <p>Threads</p>
      </Link>
      {status === "authenticated" ? (
        <MyMenu session={session}>
          <div style={{ cursor: "pointer" }} className="sighin_container">
            {session.user?.image ? (
              <Image
                style={{ alignItems: "center" }}
                src={session?.user?.image}
                width={25}
                height={25}
                alt="avatar"
              />
            ) : (
              <IconUserCircle
                style={{ width: "25px", height: "25px" }}
                color="var(--mantine-color-blue-filled)"
              />
            )}
            <p style={{ display: "inline-flex", alignItems: "center" }}>
              {session?.user?.name}
            </p>{" "}
          </div>
        </MyMenu>
      ) : (
        <Text
          style={{ cursor: "pointer" }}
          onClick={() => signIn()}
          size="lg"
          c="rgb(255 255 255)"
        >
          Log in
        </Text>
      )}
    </>
  );
};

export default Header;

const MyMenu = ({
  children,
  session,
}: {
  children: any;
  session: Session | null;
}) => {
  const [opened, setOpened] = useState(false);
  return (
    <Menu
      opened={opened}
      radius={15}
      width={350}
      position="top-end"
      offset={10}
    >
      <Menu.Target>
        <Button onClick={() => setOpened(!opened)} variant="transparent">
          {children}
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item p={0} color="rgb(25, 25, 26)">
          <Item openMenu={setOpened} session={session} />
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
const Item = ({ session,openMenu }: { session: Session | null,openMenu:any }) => {
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
      <ItemAdd openMenu={openMenu} />
    </Stack>
  );
};
const ItemAdd = ({openMenu}) => {
  const [opened, setOpened] = useState(false);
  const closeAll=()=>{
    setOpened(false)
    openMenu(false)
  }
  return (
    <>
      <Group onClick={() => setOpened(true)} mb={20} gap={40} pl={20}>
        <ThemeIcon size="sm" color="transparent">
          <IconPlus stroke={3} color="rgba(255, 255, 255, 0.65)" />
        </ThemeIcon>
        <Text c="rgba(255, 255, 255, 0.65)">Create Organization</Text>
      </Group>
      <Modal
        title="Create communities"
        opened={opened}
        onClose={closeAll}
        centered
      >
        <MyForm closeAll={closeAll}/>
       {/*  <Button onClick={closeAll}>Create</Button> */}
      </Modal>
    </>
  );
};
const MyForm=({closeAll})=>{
  const { register, handleSubmit,reset } = useForm({
    defaultValues:{
      NameCommunities:'',
      EmailCommunities:''
    }
  });
  const submitForm=(data,e)=>{
    console.log(data,e)
    reset()
    closeAll()
    
  }
return(
  <form onSubmit={handleSubmit((data,e)=>submitForm(data,e))}>
    <input {...register("NameCommunities")} />
    <input {...register("EmailCommunities")} />
    <button type="submit">Submit</button>
  </form>
)
}
