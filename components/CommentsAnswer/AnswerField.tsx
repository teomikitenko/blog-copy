
import { answer } from "@/app/api/actions";
import { CommentsType, IdObj } from "@/types/types";
import { Group, TextInput, Button,Text } from "@mantine/core";
import { useParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import logo from "@/public/assets/logo.svg";




const AnswerField = ({c}:{c:CommentsType}) => {
    return (
      <form action={(e) => answer(e,c.id)}>
        <Group w={"100%"} my={25}>
          <Image src={logo} width={23} height={23} alt="avatar" />
          <TextInput
             /* value='hello' */
            name="answer"
           /*  onChange={(e) => setValue(e.currentTarget.value)} */
            style={{ flexGrow: 1 }}
            placeholder="Comment..."
          />
          <Button type="submit" size="xs" variant="filled" radius={"lg"}>
            <Text py={"md"} px={"sm"} size="md">
              Reply
            </Text>
          </Button>
        </Group>
      </form>
    );
  };
  export default AnswerField