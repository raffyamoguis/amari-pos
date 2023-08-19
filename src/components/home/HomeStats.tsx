import React from "react";
import { useQuery } from "react-query";

import { Grid, Group, Text, Card } from "@mantine/core";
import { IconActivityHeartbeat } from "@tabler/icons-react";

import { fetchFilteredStocks } from "../../api/home";

import TotalItems from "./TotalItems";

const HomeStats: React.FC = () => {
  const { data } = useQuery("filteredStocks", fetchFilteredStocks);
  return (
    <Grid mt={60}>
      <Grid.Col md={4} lg={4}>
        <Card
          mih={300}
          sx={(theme) => ({
            background:
              theme.colorScheme === "dark"
                ? theme.colors.teal[8]
                : theme.colors.teal[0],
            borderRadius: theme.radius.md,
          })}
        >
          <Group position="apart">
            <Text fw="bold">Low Stocks</Text>
            <IconActivityHeartbeat />
          </Group>
          <Text ta="center" fz={90} fw="bold" mt={50}>
            {data?.lowstocks}
          </Text>
        </Card>
      </Grid.Col>
      <Grid.Col md={4} lg={4}>
        <Card
          mih={300}
          sx={(theme) => ({
            background:
              theme.colorScheme === "dark"
                ? theme.colors.orange[8]
                : theme.colors.orange[0],
            borderRadius: theme.radius.md,
          })}
        >
          <Group position="apart">
            <Text fw="bold">No Stocks</Text>
            <IconActivityHeartbeat />
          </Group>
          <Text ta="center" fz={90} fw="bold" mt={50}>
            {data?.nostocks}
          </Text>
        </Card>
      </Grid.Col>
      <Grid.Col md={4} lg={4}>
        <TotalItems />
      </Grid.Col>
    </Grid>
  );
};

export default HomeStats;
