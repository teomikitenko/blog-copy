"use client";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import {
  FileButton,
  Button,
  Text,
  Textarea,
  Stack,
  Group,
  Modal,
} from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import { useState } from "react";
import { createUser } from "@/configs/postsConfigs";

const SignUp = ({ open, close }: { open: boolean; close: any }) => {
  return (
    <>
      <Modal
        centered
        opened={open}
        onClose={() => close(false)}
        title="Sign up"
      >
        <SignUpForm />
      </Modal>
    </>
  );
};

export default SignUp;

const SignUpForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const { handleSubmit, reset, control } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  type FormValues = {
    name: string;
    email: string;
    password: string | number;
  };
  const submitForm: SubmitHandler<FormValues> = async (data) => {
    console.log("send");
    await createUser(data);
    reset();
  };
  return (
    <form onSubmit={handleSubmit(submitForm)}>
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
        <Button type="submit" mt={20} style={{ alignSelf: "center" }} w={"50%"}>
          Confirm
        </Button>
      </Stack>
    </form>
  );
};
