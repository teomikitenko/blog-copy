"use client";
import { comment } from "@/app/api/actions";
import { Group, TextInput, Button, Text } from "@mantine/core";
import Image from "next/image";
import logo from "@/public/assets/logo.svg";
import { useState } from "react";

const CommentPageForm = ({ comment_id }: { comment_id: string }) => {
  const [value, setValue] = useState("");
  return (
    <form action={async(e) => {
      await comment(e, comment_id)
    setValue('')
    }
    }>
      <Group w={"100%"} my={25}>
        <Image src={logo} width={48} height={48} alt="avatar" />
        <TextInput
          name="text"
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          style={{ flexGrow: 1 }}
          placeholder="Comment..."
        />
        <Button 
          type="submit"
          variant="filled"
          radius={"lg"}
        >
          <Text py={"md"} px={"sm"} size="md">
            Reply
          </Text>
        </Button>
      </Group>
    </form>
  );
};

export default CommentPageForm;
