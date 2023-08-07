import React from "react";
import "./ripple.css";
import { Flex } from "@mantine/core";

const Ripple: React.FC = () => {
  return (
    <Flex justify="center" align="center" style={{ height: "100vh" }}>
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </Flex>
  );
};

export default Ripple;
