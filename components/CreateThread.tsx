"use client";
import { Textarea, Button, Stack, Text } from "@mantine/core";
import { useState } from "react";
import { createPost } from "@/configs/postsConfigs";
import { useSession } from "next-auth/react";

const CreateThread = () => {
  const [text, setText] = useState<string>("");
  const { data: session, status } = useSession();
  const submit = () => {
    createPost(session?.user?.name, text);
    setText("");
  };
  return (
    <>
      <Text
        style={{ fontSize: "30px", lineHeight: "140%" }}
        c="rgb(255 255 255)"
        fw={700}
      >
        Create Thread
      </Text>
      {status === "authenticated" && (
        <Stack gap={20}>
          <Textarea
            mt={20}
            style={{ backgroundColor: "rgb(18, 20, 23)" }}
            value={text}
            onChange={(e) => setText(e.currentTarget.value)}
            autosize
            minRows={17}
          />
          <Button
            onClick={submit}
            variant="filled"
            size="md"
            color="rgb(135 126 255)"
            fullWidth
          >
            Post Thread
          </Button>
        </Stack>
      )}
    </>
  );
};

export default CreateThread;
