import React from "react";
import Ripple from "../components/ripple/Ripple";
import { Flex, Text, Stack, Image, Center } from "@mantine/core";

interface Props {
  isLoading: boolean;
  isServerReady: boolean;
  children: React.ReactNode;
}

export default function CheckContext({
  isLoading,
  isServerReady,
  children,
}: Props) {
  if (isLoading) {
    return <Ripple />;
  }

  if (!isServerReady) {
    return (
      <Flex justify="center" align="center" style={{ height: "100vh" }}>
        <Stack>
          <Center>
            <Image
              src="https://img.icons8.com/ios/100/database-error.png"
              width={70}
              alt="Server not ready image"
            />
          </Center>
          <Text fz="xl">Server not found.</Text>
        </Stack>
      </Flex>
    );
  }

  return children;
}
