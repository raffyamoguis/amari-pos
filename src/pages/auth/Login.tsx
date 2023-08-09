import React from "react";
import {
  Text,
  Flex,
  Card,
  TextInput,
  PasswordInput,
  Button,
  Stack,
} from "@mantine/core";
import { useAuth } from "../../util/AuthContext";

import Footer from "../../components/footer/Footer";

const Login: React.FC = () => {
  const { handleUserLogin, isLoggingIn } = useAuth();
  return (
    <>
      <Flex justify="center" align="center" style={{ height: "100vh" }}>
        <Stack>
          <Text ta="center" fz="lg" fw={700}>
            Amari Angels Pharmacy
          </Text>
          <Card padding="xl" py={40} miw={370} withBorder>
            <Text fw={500}>Login</Text>
            <TextInput mt={10} label="Username" placeholder="Enter username" />
            <PasswordInput
              mt={10}
              label="Password"
              placeholder="Enter password"
            />
            <Button
              mt={20}
              fullWidth
              onClick={handleUserLogin}
              loading={isLoggingIn}
            >
              Login
            </Button>
          </Card>
        </Stack>
      </Flex>
      <Footer />
    </>
  );
};

export default Login;
