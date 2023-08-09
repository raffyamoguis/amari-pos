import React from "react";
import { Card, Text, Group, Select, Table, NumberInput } from "@mantine/core";

import BadgeStock from "../BadgeStock";

const Stocks: React.FC = () => {
  return (
    <Card
      mih={300}
      sx={(theme) => ({
        background:
          theme.colorScheme === "dark"
            ? theme.colors.dark[7]
            : theme.colors.gray[0],
        borderRadius: theme.radius.md,
      })}
    >
      <Group position="apart">
        <Text fw={700}>Stocks</Text>
        <Select
          maw={150}
          variant="filled"
          placeholder="Filter"
          data={[
            { value: "react", label: "Low Stock" },
            { value: "ng", label: "No Stock" },
          ]}
        />
      </Group>

      <Table mt={10} fontSize="xs">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Status</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Neozep</td>
            <td>
              <BadgeStock color="green" text="In Stock" />
            </td>
            <td>
              <NumberInput defaultValue={110} maw={90} />
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Milk</td>
            <td>
              <BadgeStock color="red" text="No Stock" />
            </td>
            <td>
              <NumberInput defaultValue={0} maw={90} />
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Choco Drink</td>
            <td>
              <BadgeStock color="yellow" text="Low Stock" />
            </td>
            <td>
              <NumberInput defaultValue={8} maw={90} />
            </td>
          </tr>
        </tbody>
      </Table>
    </Card>
  );
};

export default Stocks;
