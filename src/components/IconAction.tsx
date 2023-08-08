import React from "react";
import { ActionIcon } from "@mantine/core";

interface Props {
  color: "red" | "green" | "blue" | "dark";
  variant?: "transparent";
  icon: React.ReactNode;
  onClick?: () => void;
}
const IconAction: React.FC<Props> = ({ color, variant, icon, onClick }) => {
  return (
    <ActionIcon color={color} variant={variant} onClick={onClick}>
      {icon}
    </ActionIcon>
  );
};

export default IconAction;
