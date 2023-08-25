import React from "react";
import { useQuery } from "react-query";
import { Card, SimpleGrid, Group, Text } from "@mantine/core";
import {
  IconActivityHeartbeat,
  IconReportMoney,
  IconFirstAidKit,
  IconBrandDeliveroo,
} from "@tabler/icons-react";

import { getTotalTransactionToday } from "../../api/payments";
import { getAddedToday, getSalesToday } from "../../api/home";

const HomeCards: React.FC = () => {
  const { data: totalTransactionToday } = useQuery(
    "totaltrans",
    getTotalTransactionToday
  );

  const { data: addedToday } = useQuery("addedToday", getAddedToday);
  const { data: salesToday } = useQuery("salesToday", getSalesToday);
  return (
    <SimpleGrid
      mt={40}
      cols={4}
      breakpoints={[
        { maxWidth: "lg", cols: 3, spacing: "md" },
        { maxWidth: "md", cols: 2, spacing: "md" },
        { maxWidth: "sm", cols: 1, spacing: "sm" },
      ]}
    >
      <Card
        sx={(theme) => ({
          background:
            theme.colorScheme === "dark"
              ? theme.colors.blue[8]
              : theme.colors.blue[0],
          borderRadius: theme.radius.md,
        })}
      >
        <Group position="apart">
          <Text fw="bold">Transactions</Text>
          <IconActivityHeartbeat />
        </Group>
        <Text ta="center" fz={50} fw="bold">
          +{totalTransactionToday?.length}
        </Text>
      </Card>
      <Card
        sx={(theme) => ({
          background:
            theme.colorScheme === "dark"
              ? theme.colors.green[8]
              : theme.colors.green[0],
          borderRadius: theme.radius.md,
        })}
      >
        <Group position="apart">
          <Text fw="bold">Sales</Text>
          <IconReportMoney />
        </Group>
        {!!salesToday?.sales ? (
          <Text ta="center" fz={50} fw="bold">
            ₱{salesToday.sales}
          </Text>
        ) : (
          <Text ta="center" fz={50} fw="bold">
            0
          </Text>
        )}
      </Card>
      <Card
        sx={(theme) => ({
          background:
            theme.colorScheme === "dark"
              ? theme.colors.yellow[8]
              : theme.colors.yellow[0],
          borderRadius: theme.radius.md,
        })}
      >
        <Group position="apart">
          <Text fw="bold">Medicines</Text>
          <IconFirstAidKit />
        </Group>
        <Text ta="center" fz={50} fw="bold">
          +{addedToday?.medicineTotal}
        </Text>
      </Card>
      <Card
        sx={(theme) => ({
          background:
            theme.colorScheme === "dark"
              ? theme.colors.pink[8]
              : theme.colors.pink[0],
          borderRadius: theme.radius.md,
        })}
      >
        <Group position="apart">
          <Text fw="bold">Other</Text>
          <IconBrandDeliveroo />
        </Group>
        <Text ta="center" fz={50} fw="bold">
          +{addedToday?.otherSuppliesTotal}
        </Text>
      </Card>
    </SimpleGrid>
  );
};

export default HomeCards;
