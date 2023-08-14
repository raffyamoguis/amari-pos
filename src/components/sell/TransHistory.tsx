import React from "react";
import { useQuery } from "react-query";
import { shallow } from "zustand/shallow";
import { Table, Text, Pagination, Center } from "@mantine/core";

import SkeletonTable from "../skeleton/SkeletonTable";

import { PaymentTypes } from "../../types";
import { fetchPayments } from "../../api/payments";
import { useTransactionHistoryStore } from "../../store/useTransactionHistoryStore";

interface Props {
  total: number;
  items: PaymentTypes[];
}

const TransHistory: React.FC = () => {
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
      <Text mb={10}>Transaction History</Text>
      {isLoading ? (
        <SkeletonTable />
      ) : isSuccess ? (
        <>
          <Table fontSize="xs">
            <thead>
              <tr>
                <th>Purchase Date</th>
                <th>Total</th>
                <th>Amount</th>
                <th>Change</th>
              </tr>
            </thead>
            <tbody>
              {payments?.items.map((transaction: PaymentTypes) => (
                <tr key={transaction.id}>
                  <td>{transaction.orderdate}</td>
                  <td>{transaction.overalltotal}</td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.change}</td>
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
