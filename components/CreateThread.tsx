"use client";
import { Textarea, Button, Stack, Text, Transition } from "@mantine/core";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { create } from "@/app/api/actions";

const CreateThread = () => {
  const [text, setText] = useState<string>("");
  const [send, setSend] = useState(false);
  const { data: session, status } = useSession();

  const createThread = () => {
    setSend(true);
  };
  useEffect(() => {
    if (send)
      setTimeout(() => {
        setSend(false), setText("");
      }, 2000);
  }, [send]);

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
        <form action={(e) => text.length > 0 && create(e)}>
          <Stack gap={20}>
            <Textarea
              name="text"
              mt={20}
              style={{ backgroundColor: "rgb(18, 20, 23)" }}
              value={text}
              onChange={(e) => setText(e.currentTarget.value)}
              autosize
              error = {text.length === 0&&send}
              minRows={17}
            />

            <Button
              className="change_status_background"
              onClick={() => setSend(true)}
              type="submit"
              variant="filled"
              size="md"
              color={send ? "green" : "rgb(135 126 255)"}
              fullWidth
            >
              {text.length === 0
                ? "Type some text..."
                : send
                ? "Post Created"
                : "Post Thread"}
            </Button>
          </Stack>
        </form>
      )}
    </>
  );
};

export default CreateThread;
