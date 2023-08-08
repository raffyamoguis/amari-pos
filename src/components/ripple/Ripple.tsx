import React from "react";
import { Flex, Loader } from "@mantine/core";

const Ripple: React.FC = () => {
  return (
    <Flex justify="center" align="center" style={{ height: "100vh" }}>
      <Loader variant="bars" />;
    </Flex>
  );
};

export default Ripple;
