import React from "react";
import { useQuery } from "react-query";
import { Card, Text, SimpleGrid } from "@mantine/core";
import { fetchFilteredStocks } from "../../api/home";

const Stocks: React.FC = () => {
  const { data } = useQuery("filteredStocks", fetchFilteredStocks);

  console.log(data);
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
      <Text fw={700}>Stocks</Text>

      <SimpleGrid mt={30} cols={2}></SimpleGrid>
    </Card>
  );
};

export default Stocks;
