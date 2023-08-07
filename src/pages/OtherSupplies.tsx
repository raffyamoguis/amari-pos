import React from "react";
import { Box, Card } from "@mantine/core";

import NewSupplies from "../components/othersupplies/NewSupplies";
import ListNewSupplies from "../components/othersupplies/ListNewSupplies";

const OtherSupplies: React.FC = () => {
  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.colors.gray[0],
      })}
    >
      <Card mih="80vh">
        <NewSupplies />
        <ListNewSupplies />
      </Card>
    </Box>
  );
};

export default OtherSupplies;
