import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Flex, Text, Table, Stack } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";

import IconAction from "../../components/IconAction";

const ViewTransaction: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();

  console.log(params.id);
  return (
    <>
      <Flex align="center">
        <IconAction
          color="dark"
          variant="transparent"
          icon={<IconChevronLeft />}
          onClick={() => navigate(-1)}
        />
        <Text>Transaction Info</Text>
      </Flex>

      <Flex justify="flex-end" align="center" mt={10}>
        <Text>
          <Text fw={700} span>
            Date:
          </Text>{" "}
          January 20, 1998
        </Text>
      </Flex>

      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Neozep</td>
            <td>12.00</td>
            <td>4</td>
            <td>48.00</td>
          </tr>
          <tr>
            <td>Trust</td>
            <td>30.00</td>
            <td>2</td>
            <td>60.00</td>
          </tr>
        </tbody>
      </Table>
      <Flex justify="flex-end" align="center">
        <Stack align="flex-end" spacing={1}>
          <Text fz="sm">
            <Text fw={700} span>
              Total:
            </Text>{" "}
            108.00
          </Text>
          <Text fz="sm">
            <Text fw={700} span>
              Amount:
            </Text>{" "}
            150.00
          </Text>
          <Text fz="sm">
            <Text fw={700} span>
              Change:
            </Text>{" "}
            42.00
          </Text>
        </Stack>
      </Flex>
    </>
  );
};

export default ViewTransaction;
