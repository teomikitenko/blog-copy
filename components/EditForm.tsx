"use client";
import { edit } from "@/app/api/actions";
import { P } from "@/types/types";
import { Textarea, Button, Stack, Group } from "@mantine/core";

import { useState } from "react";

const EditForm = ({ post }: { post: P | null }) => {
  const [value, setValue] = useState(post?.text);
  const [action, setAction] = useState<string>();

  return (
    <form action={(e) => edit(e, post?.id!, action!)}>
      <Stack gap={20}>
        <Textarea
          name="text"
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          mt={20}
          style={{ backgroundColor: "rgb(18, 20, 23)" }}
          autosize
          minRows={17}
        />
        <Group justify="space-between" grow>
          <Button
            color="red"
            type="submit"
            onClick={() => setAction("delete")}
            size="md"
            variant="filled"
          >
            Delete thread
          </Button>
          <Button
            onClick={() => setAction("edit")}
            type="submit"
            variant="filled"
            size="md"
            color={"rgb(135 126 255)"}
          >
            Edit thread
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default EditForm;
