import React from "react";
import {
  Text,
  Flex,
  Card,
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Image,
  Center,
} from "@mantine/core";
import { useAuth } from "../../util/AuthContext";
import { useForm } from "@mantine/form";

import Footer from "../../components/footer/Footer";

const Login: React.FC = () => {
  const { handleUserLogin, isLoggingIn } = useAuth();
  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },

    validate: {
      username: (value) => (value.length === 0 ? "Username is required" : null),
      password: (value) => (value.length === 0 ? "Username is required" : null),
    },
  });
  return (
    <>
      <Flex justify="center" align="center" style={{ height: "100vh" }}>
        <Stack>
          <Center>
            <Image src="/android-chrome-192x192.png" width={90} />
          </Center>
          <Text ta="center" fz="lg" fw={700}>
            Amari Angels Pharmacy
          </Text>
          <Card padding="xl" py={40} miw={370} withBorder>
            <form onSubmit={form.onSubmit((values) => handleUserLogin(values))}>
              <Text fw={500}>Login</Text>
              <TextInput
                mt={10}
                label="Username"
                placeholder="Enter username"
                {...form.getInputProps("username")}
              />
              <PasswordInput
                mt={10}
                label="Password"
                placeholder="Enter password"
                {...form.getInputProps("password")}
              />
              <Button type="submit" mt={20} fullWidth loading={isLoggingIn}>
                Login
              </Button>
            </form>
          </Card>
        </Stack>
      </Flex>
      <Footer />
    </>
  );
};

export default Login;
