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

const Profile: React.FC = () => {
  return (
    <>
      <Text>Profile</Text>
      <Center>
        <Card miw={400}>
          <Group align="center" position="center">
            <Avatar radius="xl" size="lg" src="/admin1.png" />
            <Text>Super Admin</Text>
          </Group>
          <TextInput
            mt={80}
            label="Username"
            placeholder="Enter new username"
          />
          <PasswordInput
            mt={20}
            label="Old password"
            placeholder="Enter old password"
          />
          <PasswordInput
            mt={20}
            label="New Password"
            placeholder="Enter new password"
          />
          <PasswordInput
            mt={20}
            label="Confirm"
            placeholder="Confirm new password"
          />
          <Button mt={20} fullWidth>
            Update Profile
          </Button>
        </Card>
      </Center>
    </>
  );
};

export default Profile;
