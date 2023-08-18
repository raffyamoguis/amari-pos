import React from "react";
import { TextInput, Text } from "@mantine/core";
import { IconSearch, IconX } from "@tabler/icons-react";

import ListStocks from "../components/stocks/ListStocks";
import { useStockListStore } from "../store/useStockListStore";

const Stocks: React.FC = () => {
  const [search, setSearch, setActivePage] = useStockListStore((state) => [
    state.search,
    state.setSearch,
    state.setActivePage,
  ]);

  return (
    <>
      <Text mb={10}>Manage stocks</Text>
      <TextInput
        placeholder="Enter stock name"
        maw={300}
        icon={<IconSearch size="0.80rem" />}
        rightSection={
          search !== "" && (
            <IconX
              size="0.8rem"
              onClick={() => {
                setSearch("");
                setActivePage(1);
              }}
            />
          )
        }
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ListStocks />
    </>
  );
};

export default Stocks;
