import React from "react";
import { Group, Table, TextInput, Flex } from "@mantine/core";
import { IconSearch, IconEye, IconEdit, IconTrash } from "@tabler/icons-react";

import IconAction from "../IconAction";

const ListNewSupplies: React.FC = () => {
  return (
    <>
      <Group mt={20}>
        <TextInput
          placeholder="Enter supply name"
          icon={<IconSearch size="0.8rem" />}
        />
      </Group>
      <Table fontSize="xs">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Expiry</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Bear brand</td>
            <td>N/A</td>
            <td>100</td>
            <td>Jun 20, 2025</td>
            <td>
              <Flex>
                <IconAction color="blue" icon={<IconEye size="1.125rem" />} />
                <IconAction color="green" icon={<IconEdit size="1.125rem" />} />
                <IconAction color="red" icon={<IconTrash size="1.125rem" />} />
              </Flex>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default ListNewSupplies;
