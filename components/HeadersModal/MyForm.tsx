import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { addNewCommunities, UploadLogo } from "@/configs/postsConfigs";
import { useSession } from "next-auth/react";
import {
  FileButton,
  Button,
  Text,
  Textarea,
  Stack,
  Group,
} from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
type CloseFunction=() => any;
const MyForm = ({ closeAll }:{closeAll:CloseFunction} ) => {
  const { data: session, status } = useSession();
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter()

  const { handleSubmit, reset, control } = useForm({
    defaultValues: {
      name: "",
      bio: "",
      email: "",
      password: "",
    },
  });

  type FormValues = {
    name: string;
    bio: string;
    email: string;
    password: string | number;
  };
  const submitForm: SubmitHandler<FormValues> = async (data) => {
   
    const { name, bio, email, password } = data;
    const objData = {
      creator: session?.user?.name,
      name: name,
      bio: bio,
      email: email,
      password: password,
      logo:file
    };
    await addNewCommunities(objData);
    closeAll();
    router.refresh()
  };
  return (
    <>
      <form  onSubmit={handleSubmit(submitForm)} >
        <Stack>
          <Group gap={15}>
            <IconDownload size={47} />
            <Stack gap={0}>
              <Text>Profile Image</Text>
              <FileButton onChange={setFile} accept="image/png,image/jpeg">
                {(props) => (
                  <Text style={{ cursor: "pointer" }} c={"blue"} {...props}>
                    Upload image
                  </Text>
                )}
              </FileButton>
            </Stack>
          </Group>

          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field }) => {
              return <Textarea variant="filled" label="Name" {...field} />;
            }}
          />

          <Controller
            name="bio"
            control={control}
            rules={{ required: true }}
            render={({ field }) => {
              return <Textarea {...field} variant="filled" label="Bio" />;
            }}
          />
          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            render={({ field }) => {
              return <Textarea {...field} variant="filled" label="Email" />;
            }}
          />
          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            render={({ field }) => {
              return <Textarea {...field} variant="filled" label="Password" />;
            }}
          />
        </Stack>
        <Group justify="flex-end">
          <Button mt={20} type="submit">
            Create Community
          </Button>
        </Group>
      </form>
    </>
  );
};
export default MyForm;
