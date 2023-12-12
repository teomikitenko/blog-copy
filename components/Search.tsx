import { Text } from "@mantine/core";
import UserCard from "./UserCards/UserCard";
import type { U } from "@/types/types";
export type Users = {
  users: U[] | null;
};
export type User = {
  user: U | undefined;
};

const Search = ({ users }: Users) => {
  return (
    <>
      <Text
        style={{ fontSize: "30px", lineHeight: "140%" }}
        c="rgb(255 255 255)"
        fw={700}
      >
        Search
      </Text>
      {users?.map((u: U) => (
        <UserCard key={u.id} user={u} />
      ))}
    </>
  );
};

export default Search;
