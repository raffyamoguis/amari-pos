import React from "react";
import { useNavigate } from "react-router-dom";
import { Group, Table, TextInput, Flex } from "@mantine/core";
import { IconSearch, IconEdit, IconTrash } from "@tabler/icons-react";

import IconAction from "../IconAction";

const ListMedicine: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Group mt={30}>
        <TextInput
          placeholder="Enter medicine name"
          icon={<IconSearch size="0.8rem" />}
        />
      </Group>
      <Table fontSize="xs">
        <thead>
          <tr>
            <th>Batch no</th>
            <th>Name</th>
            <th>Specification</th>
            <th>Price</th>
            <th>Expiry</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1112</td>
            <td>Neozep</td>
            <td>N/A</td>
            <td>100</td>
            <td>Jun 20, 2025</td>
            <td>
              <Flex>
                <IconAction
                  color="green"
                  icon={<IconEdit size="1.125rem" />}
                  onClick={() => navigate(`/medicine/${10}`)}
                />
                <IconAction color="red" icon={<IconTrash size="1.125rem" />} />
              </Flex>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default ListMedicine;
