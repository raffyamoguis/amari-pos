import React from "react";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { Flex, Text, Table, Group } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";

import IconAction from "../../components/IconAction";

import { viewTransactionInfo } from "../../api/payments";

const ViewTransaction: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data } = useQuery("transactions", () => viewTransactionInfo(id));
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

      <Flex justify="flex-end" align="center" mt={10} mb={10}>
        <Text fz="sm">
          <Text fw={700} span>
            Date:
          </Text>{" "}
          {data?.payment.orderdate}
        </Text>
      </Flex>

      <Table fontSize="xs" captionSide="bottom">
        <caption>
          <Group position="center" spacing={20}>
            <Text fz="sm">
              <Text fw={700} span>
                Total:
              </Text>{" "}
              {data?.payment.overalltotal}
            </Text>
            <Text fz="sm">
              <Text fw={700} span>
                Amount:
              </Text>{" "}
              {data?.payment.amount}
            </Text>
            <Text fz="sm">
              <Text fw={700} span>
                Change:
              </Text>{" "}
              {data?.payment.change}
            </Text>
          </Group>
        </caption>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {data?.transactions.map((transaction: any, index: number) => (
            <tr key={transaction.id}>
              <td>{index + 1}</td>
              <td>{transaction.product}</td>
              <td>{transaction.price}</td>
              <td>{transaction.quantity}</td>
              <td>{transaction.total}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ViewTransaction;
