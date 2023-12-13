"use client";
import { Text, Card, Stack, Button, Group } from "@mantine/core";
import Image from "next/image";
import logo from "@/public/assets/logo.svg";
import { useEffect, useState } from "react";
import { supabase } from "@/configs/postsConfigs";
import Link from "next/link";
import type { CommunityType } from "@/types/types";

const Communities = ({
  communities,
}: {
  communities: CommunityType[] | null | undefined;
}) => {
  return (
    <>
      {communities?.map((c, index) => (
        <CommunityCard key={index} data={c} />
      ))}
    </>
  );
};

export default Communities;

const CommunityCard = ({ data }: { data: CommunityType }) => {
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    const publicUrl = supabase.storage
      .from("Clone_Blog")
      .getPublicUrl(`logo_communities/${data.name}`);
    setUrl(publicUrl?.data?.publicUrl);
  }, []);
  return (
    <>
      <Card className="card_community" radius="lg" padding="lg">
        <Group>
          <Image
            style={{ borderRadius: "100px" }}
            src={url ? url : logo}
            width={48}
            height={48}
            alt="logo_community"
          />
          <Stack gap={0}>
            <Text
              c="rgb(255 255 255)"
              style={{ fontSize: "16px", lineHeight: "140%" }}
              fw={700}
            >
              {data.name}
            </Text>
            <Text
              c="rgb(105 124 137)"
              style={{ fontSize: "14px", lineHeight: "140%" }}
              fw={500}
            >
              {data.email}
            </Text>
          </Stack>
        </Group>

        <Text
          mt={20}
          c="rgb(105 124 137)"
          style={{ fontSize: "13px", lineHeight: "140%" }}
          fw={500}
        >
          {data.bio}
        </Text>
        <Link href={`/communities/${data.id}`}>
          <Button fullWidth mt={20} color="rgb(135 126 255)">
            View
          </Button>
        </Link>
      </Card>
    </>
  );
};

