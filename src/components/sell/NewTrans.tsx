import React from "react";
import {
  Text,
  TextInput,
  NumberInput,
  Table,
  ActionIcon,
  Group,
  Divider,
  Button,
} from "@mantine/core";
import { IconSearch, IconTrash } from "@tabler/icons-react";

const NewTrans: React.FC = () => {
  return (
    <>
      <Text mb={10}>New Transactions</Text>
      <TextInput
        mb={4}
        w={300}
        placeholder="Enter product name"
        icon={<IconSearch size="0.8rem" />}
      />
      <Table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Medicol</td>
            <td>100</td>
            <td>5.00</td>
            <td>
              <NumberInput sx={{ width: "70px" }} defaultValue={0} />
            </td>
            <td>35.00</td>
            <td>
              <ActionIcon color="red" size="sm">
                <IconTrash size="0.875rem" />
              </ActionIcon>
            </td>
          </tr>
          <tr>
            <td>Trust</td>
            <td>500</td>
            <td>5.00</td>
            <td>
              <NumberInput sx={{ width: "70px" }} defaultValue={0} />
            </td>
            <td>50.00</td>
            <td>
              <ActionIcon color="red" size="sm">
                <IconTrash size="0.875rem" />
              </ActionIcon>
            </td>
          </tr>
          <tr>
            <td>Lorem Ipsom</td>
            <td>500</td>
            <td>5.00</td>
            <td>
              <NumberInput sx={{ width: "70px" }} defaultValue={0} />
            </td>
            <td>50.00</td>
            <td>
              <ActionIcon color="red" size="sm">
                <IconTrash size="0.875rem" />
              </ActionIcon>
            </td>
          </tr>
        </tbody>
      </Table>
      <Divider />
      <Group mt={6} position="right">
        <NumberInput label="Total" defaultValue={0} hideControls disabled />
        <NumberInput label="Change" defaultValue={0} hideControls disabled />
        <NumberInput label="Amount" defaultValue={0} hideControls />
      </Group>
      <Group mt={10} mb={4} position="right">
        <Button>Proceed</Button>
      </Group>
    </>
  );
};

export default NewTrans;
