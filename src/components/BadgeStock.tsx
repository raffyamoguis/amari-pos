import React from "react";
import { Badge } from "@mantine/core";

interface Props {
  color: "red" | "green" | "yellow";
  text: "No Stock" | "In Stock" | "Low Stock";
}
const BadgeStock: React.FC<Props> = ({ color, text }) => {
  return <Badge color={color}>{text}</Badge>;
};

export default BadgeStock;
