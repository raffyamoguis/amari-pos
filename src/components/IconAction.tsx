import React from "react";
import { ActionIcon } from "@mantine/core";

interface Props {
  color: "red" | "green" | "blue";
  icon: React.ReactNode;
}
const IconAction: React.FC<Props> = ({ color, icon }) => {
  return <ActionIcon color={color}>{icon}</ActionIcon>;
};

export default IconAction;
