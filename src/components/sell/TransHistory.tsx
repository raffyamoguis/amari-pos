import React from "react";
import { useQuery } from "react-query";
import { Table, Text } from "@mantine/core";

import SkeletonTable from "../skeleton/SkeletonTable";

import { PaymentTypes } from "../../types";
import { fetchPayments } from "../../api/payments";

const TransHistory: React.FC = () => {
  const {
    data: payments,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useQuery<PaymentTypes[], Error>("payments", fetchPayments);

  if (isError) {
    console.log(error);
  }

  return (
    <>
      <Text mb={10}>Transaction History</Text>
      {isLoading ? (
        <SkeletonTable />
      ) : isSuccess ? (
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
            {payments?.map((transaction: PaymentTypes) => (
              <tr>
                <td>{transaction.orderdate}</td>
                <td>{transaction.overalltotal}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.change}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Text ta="center">{String(error)}</Text>
      )}
    </>
  );
};

export default TransHistory;
