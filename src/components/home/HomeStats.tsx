import React from "react";
import { Grid } from "@mantine/core";
import TotalItems from "./TotalItems";
import Stocks from "./Stocks";

const HomeStats: React.FC = () => {
  return (
    <Grid mt={10}>
      <Grid.Col md={4} lg={3}>
        <TotalItems />
      </Grid.Col>
      <Grid.Col md={8} lg={9}>
        <Stocks />
      </Grid.Col>
    </Grid>
  );
};

export default HomeStats;
