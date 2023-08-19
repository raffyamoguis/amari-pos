import React from "react";
import { useQuery } from "react-query";
import { Card, Text, Center, RingProgress, Group, Stack } from "@mantine/core";
import {
  IconBuildingStore,
  IconMedicineSyrup,
  IconBrandDeliveroo,
} from "@tabler/icons-react";
import { getAllTotal } from "../../api/home";

const TotalItems: React.FC = () => {
  const { data: total } = useQuery("allTotal", getAllTotal);

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

      <Group position="center" mt={10}>
        <RingProgress
          label={
            <Center mt={4}>
              <Text fz="xl" fw={700}>
                <IconBuildingStore size="2rem" />
              </Text>
            </Center>
          }
          roundCaps
          sections={[
            {
              value: total?.transactionsTotal,
              color: "cyan",
              tooltip: "Transactions",
            },
          ]}
        />
        <RingProgress
          label={
            <Center mt={4}>
              <Text fz="xl" fw={700}>
                <IconMedicineSyrup size="2rem" />
              </Text>
            </Center>
          }
          roundCaps
          sections={[
            {
              value: total?.medicineTotal,
              color: "red",
              tooltip: "Medicine",
            },
          ]}
        />
        <RingProgress
          label={
            <Center mt={4}>
              <Text fz="xl" fw={700}>
                <IconBrandDeliveroo size="2rem" />
              </Text>
            </Center>
          }
          roundCaps
          sections={[
            {
              value: total?.otherSuppliesTotal,
              color: "grape",
              tooltip: "Others",
            },
          ]}
        />
      </Group>

      <Group mt={10} position="apart" spacing={0}>
        <Stack spacing={0} align="center">
          <Text fw={700}>{total?.transactionsTotal}</Text>
          <Text color="cyan">Transactions</Text>
        </Stack>
        <Stack spacing={0} align="center">
          <Text fw={700}>{total?.medicineTotal}</Text>
          <Text color="red">Medicine</Text>
        </Stack>
        <Stack spacing={0} align="center">
          <Text fw={700}>{total?.otherSuppliesTotal}</Text>
          <Text color="grape">Others</Text>
        </Stack>
      </Group>
    </Card>
  );
};

export default TotalItems;
