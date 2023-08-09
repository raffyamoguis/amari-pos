import React from "react";
import { Card, SimpleGrid, Group, Text } from "@mantine/core";
import {
  IconActivityHeartbeat,
  IconReportMoney,
  IconFirstAidKit,
  IconBrandDeliveroo,
} from "@tabler/icons-react";

const HomeCards: React.FC = () => {
  return (
    <SimpleGrid
      cols={4}
      breakpoints={[
        { maxWidth: "lg", cols: 3, spacing: "md" },
        { maxWidth: "md", cols: 2, spacing: "md" },
        { maxWidth: "sm", cols: 1, spacing: "sm" },
      ]}
    >
      <Card
        sx={(theme) => ({
          background: theme.colors.blue[0],
          borderRadius: theme.radius.md,
        })}
      >
        <Group position="apart">
          <Text fw="bold">Transactions</Text>
          <IconActivityHeartbeat />
        </Group>
        <Text ta="center" fz={50} fw="bold">
          +500
        </Text>
      </Card>
      <Card
        sx={(theme) => ({
          background: theme.colors.green[0],
          borderRadius: theme.radius.md,
        })}
      >
        <Group position="apart">
          <Text fw="bold">Sales</Text>
          <IconReportMoney />
        </Group>
        <Text ta="center" fz={50} fw="bold">
          ₱1700
        </Text>
      </Card>
      <Card
        sx={(theme) => ({
          background: theme.colors.yellow[0],
          borderRadius: theme.radius.md,
        })}
      >
        <Group position="apart">
          <Text fw="bold">Medicines</Text>
          <IconFirstAidKit />
        </Group>
        <Text ta="center" fz={50} fw="bold">
          +50
        </Text>
      </Card>
      <Card
        sx={(theme) => ({
          background: theme.colors.pink[0],
          borderRadius: theme.radius.md,
        })}
      >
        <Group position="apart">
          <Text fw="bold">Other</Text>
          <IconBrandDeliveroo />
        </Group>
        <Text ta="center" fz={50} fw="bold">
          +10
        </Text>
      </Card>
    </SimpleGrid>
  );
};

export default HomeCards;
