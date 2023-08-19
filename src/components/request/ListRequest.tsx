import React, { useEffect } from "react";
import { shallow } from "zustand/shallow";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { Table, Center, Pagination, Group, Text } from "@mantine/core";
import { IconEye } from "@tabler/icons-react";

import { useRequestStore } from "../../store/useRequestStore";
import { fetchPayments } from "../../api/payments";
import { PaymentTypes } from "../../types";
import IconAction from "../IconAction";
import SkeletonTable from "../skeleton/SkeletonTable";

interface Props {
  total: number;
  items: PaymentTypes[];
}

const ListRequest: React.FC = () => {
  const navigate = useNavigate();

  const [activePage, offset, dateFilter, setActivePage] = useRequestStore(
    (state) => [
      state.activePage,
      state.offset,
      state.dateFilter,
      state.setActivePage,
      state.setDateFilter,
    ],
    shallow
  );

  const {
    data: payments,
    isLoading,
    isSuccess,
    error,
  } = useQuery<Props, Error>(
    ["payments", offset, dateFilter],
    () => fetchPayments(offset, dateFilter),
    { keepPreviousData: true }
  );

  useEffect(() => {
    if (!!dateFilter) {
      setActivePage(1);
    }
  }, [dateFilter]);

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
          {payments?.total === 0 ? (
            <Center mt={20}>
              <Text fz="sm">No transaction on this date..</Text>
            </Center>
          ) : (
            <Table mt={10} fontSize="xs" highlightOnHover>
              <thead>
                <tr>
                  <th>Date</th>
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
                    <td>{transaction.overalltotal}</td>
                    <td>{transaction.amount}</td>
                    <td>{transaction.change}</td>
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
          )}
          <Center mt={12}>
            <Pagination
              size="sm"
              total={!!payments?.total ? Math.ceil(payments.total / 15) : 0}
              siblings={1}
              value={activePage}
              onChange={setActivePage}
            />
          </Center>{" "}
        </>
      ) : (
        <Text ta="center">{String(error)}</Text>
      )}
    </>
  );
};

export default ListRequest;
