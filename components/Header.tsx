 "use client"
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/assets/logo.svg";
import { useSession } from "next-auth/react";
import { Button, Group, Text } from "@mantine/core";
 import { signIn } from "next-auth/react"; 
  import MyMenu from "./HeadersModal/Menu";
 import logout from "@/public/assets/logout.svg";
 import { signOut } from "next-auth/react";
  import SignUp from "./signUp";
import { IconUserCircle, IconUserPlus, IconLogin2 } from "@tabler/icons-react";
import { useState } from "react";
const Header = () => {
  const { data: session, status } = useSession();
  return (
    <>
      <Link href={"/"} className="link_header">
        <Image src={logo} width={28} height={28} alt="logo" />
        <Text visibleFrom='xs'>Threads</Text>
      </Link>
      {status === "authenticated" ? (
        <div className="conteiner_log">
          <div onClick={() =>  signOut()} className="header_logout">
            <Image src={logout} width={24} height={24} alt="logout" />
          </div>
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
              <Text fw={500} size="sm">
                {session?.user?.name}
              </Text>
            </div>
          </MyMenu>
        </div>
      ) : (
       <NoAuth/>
      )}
    </>
  );
};

export default Header;

const NoAuth=()=>{
  const [open, setOpen] = useState(false)
  return(
    <Group gap={25}>
      <SignUp open={open} close={setOpen}/>
    <Button onClick={()=>setOpen(true)}
      leftSection={<IconUserPlus color="rgb(255 255 255)" size={24} />}
      variant="transparent"
    >
      <Text visibleFrom="md" size="lg" fw={600}  c={"rgb(255 255 255)"}>Sign up</Text>
    </Button>

    <Button
      onClick={() => signIn()}
      leftSection={<IconLogin2 color="rgb(255 255 255)" size={24} />}
      variant="transparent"
    >
      <Text visibleFrom="md" size="lg" fw={600} c={"rgb(255 255 255)"}>Log in</Text>
    </Button>
  </Group>
  )
}