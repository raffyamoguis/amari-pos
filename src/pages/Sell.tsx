import React from "react";
import { Box, Card, Grid } from "@mantine/core";

import NewTrans from "../components/sell/NewTrans";
import TransHistory from "../components/sell/TransHistory";

const Sell: React.FC = () => {
  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.colors.gray[0],
        maxHeight: "70vh",
      })}
    >
      <Card>
        <Grid>
          <Grid.Col span={4}>
            <NewTrans />
          </Grid.Col>
          <Grid.Col span={8}>
            <TransHistory />
          </Grid.Col>
        </Grid>
      </Card>
    </Box>
  );
};

export default Sell;
