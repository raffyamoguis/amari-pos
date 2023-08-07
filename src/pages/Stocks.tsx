import React from "react";
import { Box, Card, TextInput, Text } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

import ListStocks from "../components/stocks/ListStocks";

const Stocks: React.FC = () => {
  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.colors.gray[0],
      })}
    >
      <Card mih="80vh">
        <Text mb={10}>Manage stocks</Text>
        <TextInput
          placeholder="Enter stock name"
          maw={300}
          icon={<IconSearch size="0.80rem" />}
        />
        <ListStocks />
      </Card>
    </Box>
  );
};

export default Stocks;
