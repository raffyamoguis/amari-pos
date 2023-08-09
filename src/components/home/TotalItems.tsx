import React from "react";
import { Card, Text, Center, RingProgress, Group, Stack } from "@mantine/core";

const TotalItems: React.FC = () => {
  return (
    <Card
      mih={300}
      sx={(theme) => ({
        background:
          theme.colorScheme === "dark"
            ? theme.colors.dark[7]
            : theme.colors.gray[0],
        borderRadius: theme.radius.md,
      })}
    >
      <Text fw={700}>Total Items</Text>

      <Center mt={10}>
        <RingProgress
          size={150}
          thickness={14}
          label={
            <Center>
              <Text fz="xl" fw={700}>
                70
              </Text>
            </Center>
          }
          roundCaps
          sections={[
            { value: 40, color: "cyan", tooltip: "Transactions" },
            { value: 15, color: "orange", tooltip: "Medicine" },
            { value: 15, color: "grape", tooltip: "Others" },
          ]}
        />
      </Center>

      <Group mt={10} position="apart" spacing={0}>
        <Stack spacing={0} align="center">
          <Text fw={700}>40</Text>
          <Text color="cyan">Transactions</Text>
        </Stack>
        <Stack spacing={0} align="center">
          <Text fw={700}>15</Text>
          <Text color="orange">Medicine</Text>
        </Stack>
        <Stack spacing={0} align="center">
          <Text fw={700}>15</Text>
          <Text color="grape">Others</Text>
        </Stack>
      </Group>
    </Card>
  );
};

export default TotalItems;
