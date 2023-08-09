import React from "react";
import { Text } from "@mantine/core";
import HomeCards from "../components/home/HomeCards";
import HomeStats from "../components/home/HomeStats";

const Home: React.FC = () => {
  return (
    <>
      <Text mb={20}>Overview</Text>
      <HomeCards />
      <HomeStats />
    </>
  );
};

export default Home;
