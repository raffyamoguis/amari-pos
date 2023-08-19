import React from "react";
import {
  Center,
  Card,
  Text,
  Avatar,
  Group,
  TextInput,
  PasswordInput,
  Button,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useForm } from "@mantine/form";

import { updateAccount } from "../api/home";
import { useAuth } from "../util/AuthContext";

const Profile: React.FC = () => {
  const { handleUserLogout } = useAuth();

  const form = useForm({
    initialValues: {
      username: "",
      newpassword: "",
      confirmpassword: "",
    },
    validate: {
      username: (value) => {
        if (value.length === 0) {
          return "Username is required";
        }
        if (value.length < 4) {
          return "Username should be atleast 4 characters";
        }
        return null;
      },
      newpassword: (value) => {
        if (value.length === 0) {
          return "This fied is required";
        }
        if (value.length < 4) {
          return "Username should be atleast 4 characters";
        }
        return null;
      },
      confirmpassword: (value, values) => {
        if (value.length === 0) {
          return "This field is required";
        }
        if (value.length < 4) {
          return "Username should be atleast 4 characters";
        }
        if (value !== values.newpassword) {
          return "Passwords do not match";
        }
        return null;
      },
    },
  });

  async function handleUpdate(values: any) {
    const result = await updateAccount({
      username: values.username,
      password: values.newpassword,
    });

    if (!!result.account[0]) {
      form.reset();
      notifications.show({
        message: "Successfully updated account.",
        color: "green",
      });
      handleUserLogout();
    } else {
      notifications.show({
        message: "Error updating account.",
        color: "red",
      });
    }
  }
  return (
    <>
      <Text>Profile</Text>
      <Center>
        <Card miw={400}>
          <Group align="center" position="center">
            <Avatar radius="xl" size="lg" src="/admin1.png" />
            <Text>Super Admin</Text>
          </Group>
          <form onSubmit={form.onSubmit((values) => handleUpdate(values))}>
            <TextInput
              mt={80}
              label="Username"
              placeholder="Enter new username"
              {...form.getInputProps("username")}
            />
            <PasswordInput
              mt={20}
              label="New Password"
              placeholder="Enter new password"
              {...form.getInputProps("newpassword")}
            />
            <PasswordInput
              mt={20}
              label="Confirm Password"
              placeholder="Confirm new password"
              {...form.getInputProps("confirmpassword")}
            />
            <Button type="submit" mt={20} fullWidth>
              Update Profile
            </Button>
          </form>
        </Card>
      </Center>
    </>
  );
};

export default Profile;
