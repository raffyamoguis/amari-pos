import React, { useRef } from "react";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { Flex, Text, Table, Group, Button } from "@mantine/core";
import { useReactToPrint } from "react-to-print";
import { IconChevronLeft, IconPrinter } from "@tabler/icons-react";

import IconAction from "../../components/IconAction";

import { viewTransactionInfo } from "../../api/payments";

const ViewTransaction: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const componentRef = useRef(null);

  const { data } = useQuery("transactions", () => viewTransactionInfo(id));

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: data?.payment.orderdate,
  });

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

      <Group position="right" align="center" mt={20} mb={10}>
        <Button
          leftIcon={<IconPrinter size="0.80rem" />}
          size="xs"
          onClick={handlePrint}
        >
          Print
        </Button>
      </Group>

      <div ref={componentRef} style={{ padding: "10px", margin: "20px" }}>
        <Text fz="sm" ta="center">
          Amari Angels Pharmacy
        </Text>
        <Text fz="xs" ta="center" mb={10}>
          Guinsularan, Guindulman, Bohol
        </Text>
        <Text fz="xs" ta="end" mb={15}>
          {data?.payment.orderdate}
        </Text>
        <Table fontSize="xs" captionSide="bottom">
          <caption>
            <Group position="center" spacing={20}>
              <Text fz="xs">
                <Text fw={700} span>
                  Total:
                </Text>{" "}
                {data?.payment.overalltotal}
              </Text>
              <Text fz="xs">
                <Text fw={700} span>
                  Amount:
                </Text>{" "}
                {data?.payment.amount}
              </Text>
              <Text fz="xs">
                <Text fw={700} span>
                  Change:
                </Text>{" "}
                {data?.payment.change}
              </Text>
            </Group>
          </caption>
          <thead>
            <tr>
              <th>No</th>
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
      </div>
    </>
  );
};

export default ViewTransaction;
