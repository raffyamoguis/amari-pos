import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { shallow } from "zustand/shallow";
import { Table, Text, Pagination, Center, Group } from "@mantine/core";
import { IconEye } from "@tabler/icons-react";

import SkeletonTable from "../skeleton/SkeletonTable";
import IconAction from "../IconAction";

import { PaymentTypes } from "../../types";
import { fetchPayments } from "../../api/payments";
import { useTransactionHistoryStore } from "../../store/useTransactionHistoryStore";

interface Props {
  total: number;
  items: PaymentTypes[];
}

const TransHistory: React.FC = () => {
  const navigate = useNavigate();
  const [activePage, offset, setActivePage] = useTransactionHistoryStore(
    (state) => [state.activePage, state.offset, state.setActivePage],
    shallow
  );

  const {
    data: payments,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useQuery<Props, Error>(
    ["payments", offset],
    () => fetchPayments(offset),
    { keepPreviousData: true }
  );

  if (isError) {
    console.log(error);
  }

  return (
    <>
      <Group position="apart" align="center" mt={20}>
        <Text mb={10}>Transaction History</Text>
        <Text fz="xs">
          <Text component="span" fw={700}>
            Total:
          </Text>{" "}
          {payments?.total}
        </Text>
      </Group>
      {isLoading ? (
        <SkeletonTable />
      ) : isSuccess ? (
        <>
          <Table fontSize="xs" highlightOnHover>
            <thead>
              <tr>
                <th>Purchase Date</th>
                <th>Total</th>
                <th>Amount</th>
                <th>Change</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {payments?.items.map((transaction: PaymentTypes) => (
                <tr key={transaction.id}>
                  <td>{transaction.orderdate}</td>
                  <td>{parseFloat(transaction.overalltotal).toFixed(2)}</td>
                  <td>{parseFloat(transaction.amount).toFixed(2)}</td>
                  <td>{parseFloat(transaction.change).toFixed(2)}</td>
                  <td>
                    <IconAction
                      color="blue"
                      icon={<IconEye />}
                      onClick={() =>
                        navigate(`/request/${transaction.orderdate}`)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Center mt={12}>
            <Pagination
              size="sm"
              total={Math.ceil(payments.total / 15)}
              siblings={1}
              value={activePage}
              onChange={setActivePage}
            />
          </Center>
        </>
      ) : (
        <Text ta="center">{String(error)}</Text>
      )}
    </>
  );
};

export default TransHistory;
