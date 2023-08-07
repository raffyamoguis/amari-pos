import React from "react";
import { Table, Text } from "@mantine/core";

const TransHistory: React.FC = () => {
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
          <tr>
            <td>January 12, 2001</td>
            <td>300</td>
            <td>500</td>
            <td>200</td>
          </tr>
          <tr>
            <td>January 12, 2001</td>
            <td>300</td>
            <td>500</td>
            <td>200</td>
          </tr>
          <tr>
            <td>January 12, 2001</td>
            <td>300</td>
            <td>500</td>
            <td>200</td>
          </tr>
          <tr>
            <td>January 12, 2001</td>
            <td>300</td>
            <td>500</td>
            <td>200</td>
          </tr>
          <tr>
            <td>January 12, 2001</td>
            <td>300</td>
            <td>500</td>
            <td>200</td>
          </tr>
          <tr>
            <td>January 12, 2001</td>
            <td>300</td>
            <td>500</td>
            <td>200</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default TransHistory;
