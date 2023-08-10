import React from "react";
import { Badge } from "@mantine/core";

interface Props {
  value: number;
}
const BadgeStock: React.FC<Props> = ({ value }) => {
  if (value >= 20) {
    return <Badge color="green">IN STOCK</Badge>;
  }

  if (value <= 20 && value !== 0) {
    return <Badge color="yellow">LOW STOCK</Badge>;
  }

  return <Badge color="red">NO STOCK</Badge>;
};

export default BadgeStock;
