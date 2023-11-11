import { Menu, Button } from "@mantine/core";
import { Session } from "next-auth";
import { useState } from "react";
import Item from "./Item";

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
  export default MyMenu