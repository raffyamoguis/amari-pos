import React from "react";
import { Box, Card } from "@mantine/core";

import NewTrans from "../components/sell/NewTrans";
import TransHistory from "../components/sell/TransHistory";

const Sell: React.FC = () => {
  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.colors.gray[0],
      })}
    >
      <Card mih="80vh">
        <NewTrans />
        <TransHistory />
      </Card>
    </Box>
  );
};

export default Sell;
