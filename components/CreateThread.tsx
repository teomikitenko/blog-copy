"use client";
import { Textarea, Button, Stack, Text } from "@mantine/core";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { create } from "@/app/api/actions";

const CreateThread = () => {
  const [text, setText] = useState<string>("");
  const { data: session, status } = useSession();

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
        <form action={create}>
          <Stack gap={20}>
            <Textarea
              name="text"
              mt={20}
              style={{ backgroundColor: "rgb(18, 20, 23)" }}
              value={text}
              onChange={(e) => setText(e.currentTarget.value)}
              autosize
              minRows={17}
            />
            <Button
              type="submit"
              variant="filled"
              size="md"
              color="rgb(135 126 255)"
              fullWidth
            >
              Post Thread
            </Button>
          </Stack>
        </form>
      )}
    </>
  );
};

export default CreateThread;
