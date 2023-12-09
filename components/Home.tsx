"use client";
import Post from "./Post";
import type { P } from "@/types/types";
import { Divider, Transition } from "@mantine/core";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { supabase } from "@/configs/postsConfigs";
import { useRouter } from "next/navigation";

const HomePosts = ({
  posts,
  allPosts,
}: {
  allPosts: P[] | any;
  posts?: P[] | any;
}) => {
  const [to, setTo] = useState(4);
  const [open, setOpen] = useState(false);
  const [listPosts, setListPosts] = useState(posts);
  const router = useRouter();
  const { ref, inView, entry } = useInView({
    threshold: 0,
  });
  useEffect(() => {
    setOpen(true);
  }, []);

  useEffect(() => {
    if (inView) setTo(to + 5);
  }, [inView]);
  useEffect(() => {
    if (to > 4) {
      const changeRange = async () => {
        const { data: posts, error } = await supabase
          .from("posts_users")
          .select()
          .order("id_order", { ascending: false })
          .range(0, to);
        return posts;
      };
      changeRange().then((res) => setListPosts(res));
    }
  }, [to]);

  return (
    <div style={{ minHeight: "600px", position: "relative" }}>
      <Transition
        mounted={open}
        transition="fade"
        duration={600}
        timingFunction="ease"
        keepMounted
      >
        {(styles) => (
          <div style={styles} className="card_posts">
            {listPosts?.map((p: P) => (
              <Post key={p.created_at} p={p} posts={allPosts} />
            ))}
          </div>
        )}
      </Transition>
      <Divider
        my="lg"
        ref={ref}
        style={{
          position: "absolute",
          bottom: "0px",
        }}
      />
    </div>
  );
};

export default HomePosts;
