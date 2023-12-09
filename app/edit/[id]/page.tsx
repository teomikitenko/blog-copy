import { takePost } from "@/configs/postsConfigs";
import type { P } from "@/types/types";
import EditForm from "@/components/EditForm";
import {Text} from '@mantine/core'

export const dynamic = "force-dynamic";

const Edit = async ({ params }: { params: { id: string } }) => {
  const post: P[] | null = await takePost(params.id);
  return (
    <>
      <Text
        style={{ fontSize: "30px", lineHeight: "140%" }}
        c="rgb(255 255 255)"
        fw={700}
      >
        Edit Thread
      </Text>
    <EditForm post={post![0]} />
    </>
  )
};

export default Edit;
