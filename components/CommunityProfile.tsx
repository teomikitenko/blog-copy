'use client'
import { Avatar, Divider, Group, Stack, Tabs,Text } from "@mantine/core"
import Image from "next/image"
import type { CommunityType } from "./Communities"
import logo from '@/public/assets/logo.svg'
import reply from '@/public/assets/reply.svg'
import members from '@/public/assets/members.svg'
import request from '@/public/assets/request.svg'



const CommunityProfile = ({community,imageUrl}:
  {community:CommunityType,imageUrl:{data:{publicUrl:string}}}) => {
  const tab = [
    { text: "threads", icon: reply },
    { text: "members", icon: members },
    { text: "requests", icon: request },
  ];
  console.log(imageUrl)
  return (
    <Stack>
    <Group mt={20}>
      <Avatar src={imageUrl.data.publicUrl} size="xl" alt="avatar" />
      <Stack gap={1}>
        <Text style={{ fontSize: "24px" }} c={"rgb(255 255 255)"} fw={700}>
          {community?.name}
        </Text>
        <Text size="md" c={"rgb(105 124 137)"} fw={500}>
          {community?.email}
        </Text>
      </Stack>
    </Group>
    <Divider my="sm" />
    <Tabs
    
      color="rgb(14 14 18)"
      variant="pills"
      defaultValue="threads"
      orientation="horizontal"
    >
      <Tabs.List
        mb={30}
        h={50}
        style={{ backgroundColor: "rgb(18 20 23)" }}
        justify="center"
        grow={true}
      >
        {tab.map((t,index) => (
          <Tabs.Tab key={index} value={t.text}>
            <Group>
              <Image src={t.icon} width={24} height={24} alt="icon" />
              <Text tt="capitalize" size="lg" fw={500} c={"rgb(239 239 239)"}>
                {t.text}
              </Text>
            {/*   {t.text === "threads" && (
                <p className="counter_threads">{threads?.length}</p>
              )} */}
            </Group>
          </Tabs.Tab>
        ))}
      </Tabs.List>
      <Tabs.Panel value="threads">
    {/*     <Stack>
        {
        threads?.map(t=>(
          <Post key={t.id} p={t}/> 
        ))
      }
          </Stack> */}
          </Tabs.Panel>

      <Tabs.Panel value="replies">0</Tabs.Panel>

      <Tabs.Panel value="tagged">0</Tabs.Panel>
    </Tabs>
  </Stack>
  )
}

export default CommunityProfile