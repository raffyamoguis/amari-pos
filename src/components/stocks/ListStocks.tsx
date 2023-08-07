import React from "react";
import { Table, NumberInput, Badge } from "@mantine/core";

import BadgeStock from "../BadgeStock";

const ListStocks: React.FC = () => {
  return (
    <Table mt={10}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Neozep</td>
          <td>
            <BadgeStock color="green" text="In Stock" />
          </td>
          <td>
            <NumberInput defaultValue={110} maw={100} />
          </td>
        </tr>
        <tr>
          <td>Milk</td>
          <td>
            <BadgeStock color="red" text="No Stock" />
          </td>
          <td>
            <NumberInput defaultValue={0} maw={100} />
          </td>
        </tr>
        <tr>
          <td>Choco Drink</td>
          <td>
            <BadgeStock color="yellow" text="Low Stock" />
          </td>
          <td>
            <NumberInput defaultValue={8} maw={100} />
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default ListStocks;
