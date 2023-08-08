import React from "react";
import { TextInput, Text } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

import ListStocks from "../components/stocks/ListStocks";

const Stocks: React.FC = () => {
  return (
    <>
      <Text mb={10}>Manage stocks</Text>
      <TextInput
        placeholder="Enter stock name"
        maw={300}
        icon={<IconSearch size="0.80rem" />}
      />
      <ListStocks />
    </>
  );
};

export default Stocks;
