import { Group, Modal, ThemeIcon,Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import MyForm from "./MyForm";


const ItemAdd = ({ openMenu }) => {
    const [opened, setOpened] = useState(false);
    const closeAll = () => {
      setOpened(false);
      openMenu(false);
    };
    return (
      <>
        <Group onClick={() => setOpened(true)} mb={20} gap={40} ml={20}>
          <ThemeIcon size="sm" color="transparent">
            <IconPlus stroke={3} color="rgba(255, 255, 255, 0.65)" />
          </ThemeIcon>
          <Text c="rgba(255, 255, 255, 0.65)">Create Organization</Text>
        </Group>
        <Modal
        size='md'
         padding='lg'
          title="Create communities"
          opened={opened}
          onClose={closeAll}
          centered
        >
          <MyForm closeAll={closeAll} />
        </Modal>
      </>
    );
  };
  export default ItemAdd