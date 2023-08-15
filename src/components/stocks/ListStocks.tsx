import React from "react";
import { shallow } from "zustand/shallow";
import { useQuery } from "react-query";
import { Table, NumberInput, Center, Pagination } from "@mantine/core";

import { fetchStocks } from "../../api/stocks";
import { useStockListStore } from "../../store/useStockListStore";
import { StockTypes } from "../../types";

import BadgeStock from "../BadgeStock";
import SkeletonTable from "../skeleton/SkeletonTable";

interface Props {
  total: number;
  items: StockTypes[];
}

const ListStocks: React.FC = () => {
  const [activePage, offset, setActivePage] = useStockListStore(
    (state) => [state.activePage, state.offset, state.setActivePage],
    shallow
  );

  const { data: stocks, isLoading } = useQuery<Props, Error>(
    ["medicines", offset],
    () => fetchStocks(offset),
    { keepPreviousData: true }
  );

  return (
    <>
      {isLoading ? (
        <SkeletonTable />
      ) : (
        <>
          <Table mt={10} fontSize="xs">
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {stocks?.items.map((stock: StockTypes) => (
                <tr key={stock.id}>
                  <td>{stock.stockfor}</td>
                  <td>
                    <BadgeStock value={stock.quantity} />
                  </td>
                  <td>
                    <NumberInput value={stock.quantity} maw={100} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Center mt={12}>
            <Pagination
              size="sm"
              total={Math.ceil(stocks?.total / 15)}
              siblings={1}
              value={activePage}
              onChange={setActivePage}
            />
          </Center>
        </>
      )}
    </>
  );
};

export default ListStocks;
