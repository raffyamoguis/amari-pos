import React from "react";
import { useQuery } from "react-query";
import { Table, Text } from "@mantine/core";

import { PaymentTypes } from "../../types";
import { fetchPayments } from "../../api/payments";

const TransHistory: React.FC = () => {
  const { data: payments } = useQuery<PaymentTypes[], Error>(
    "payments",
    fetchPayments
  );

  return (
    <>
      <Text mb={10}>Transaction History</Text>
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
    </>
  );
};

export default TransHistory;
