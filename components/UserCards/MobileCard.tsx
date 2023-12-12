import { Card,Text, Stack, Group, Button } from "@mantine/core";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/assets/logo.svg";
import type { U } from "@/types/types";

const MobileCard = ({ user }: { user: U | undefined }) => {
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
  export default MobileCard