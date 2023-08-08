import React from "react";
import { ActionIcon } from "@mantine/core";

interface Props {
  color: "red" | "green" | "blue";
  icon: React.ReactNode;
  onClick?: () => void;
}
const IconAction: React.FC<Props> = ({ color, icon, onClick }) => {
  return (
    <ActionIcon color={color} onClick={onClick}>
      {icon}
    </ActionIcon>
  );
};

export default IconAction;
