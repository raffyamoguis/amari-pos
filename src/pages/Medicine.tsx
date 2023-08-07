import React from "react";
import { Box, Card } from "@mantine/core";

import NewMedicine from "../components/medicine/NewMedicine";
import ListMedicine from "../components/medicine/ListMedicine";

const Medicine: React.FC = () => {
  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.colors.gray[0],
      })}
    >
      <Card mih="80vh">
        <NewMedicine />
        <ListMedicine />
      </Card>
    </Box>
  );
};

export default Medicine;
