import { Divider, Stack, Text } from "@mantine/core";
import { searchCommentData } from "@/configs/postsConfigs";
import Post from "@/components/Post";
import Link from "next/link";
import { CommentsType } from "@/types/types";
import Comment from "@/components/CommentsAnswer/Comment";
import CommentPageForm from "@/components/CommentPageForm";

const CommentsPage = async ({ params }: { params: { id: string } }) => {
  const data: CommentsType[] | null = await searchCommentData(params.id);
  const answer = data![0].user_comments 
 /* const sortedAnswer =  */
 console.log(answer)
  return (
    <>
      <Text
        style={{
          fontSize: "30px",
          lineHeight: "140%",
          marginBottom: "2.25rem",
        }}
        c="rgb(255 255 255)"
        fw={700}
      >
        Comments
      </Text>
      <Post p={data![0]} />
      <Divider my="sm" />
      <CommentPageForm comment_id={params.id} />
      <Divider my="sm" />
      <Stack>
         {answer.map((c: CommentsType) => (
          <Link key={c.id} href={`/comment/${c.id}`}>
            <Comment key={c.id} c={c} />
          </Link>
        ))} 
      </Stack>
    </>
  );
};
export default CommentsPage;
