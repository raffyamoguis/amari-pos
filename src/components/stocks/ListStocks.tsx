import React, { useEffect } from "react";
import { shallow } from "zustand/shallow";
import { useQuery, useQueryClient } from "react-query";
import {
  Table,
  NumberInput,
  Center,
  Pagination,
  Text,
  Group,
  Flex,
  Select,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";
import { IconTrash } from "@tabler/icons-react";

import {
  fetchStocks,
  updateStockQuantity,
  deleteStock,
  checkType,
} from "../../api/stocks";
import { deleteMedicine } from "../../api/medicine";
import { deleteOtherSupply } from "../../api/othersuppliest";
import { useStockListStore } from "../../store/useStockListStore";
import { StockTypes } from "../../types";

import BadgeStock from "../BadgeStock";
import SkeletonTable from "../skeleton/SkeletonTable";
import IconAction from "../IconAction";

interface Props {
  total: number;
  items: StockTypes[];
}

const ListStocks: React.FC = () => {
  const queryClient = useQueryClient();
  const [activePage, offset, search, filter, setActivePage, setFilter] =
    useStockListStore(
      (state) => [
        state.activePage,
        state.offset,
        state.search,
        state.filter,
        state.setActivePage,
        state.setFilter,
      ],
      shallow
    );

  const { data: stocks, isLoading } = useQuery<Props, Error>(
    ["stocks", offset, search, filter],
    () => fetchStocks(offset, search, filter),
    { keepPreviousData: true }
  );

  useEffect(() => {
    if (search !== "") {
      setActivePage(1);
    }

    if (!!filter) {
      setActivePage(1);
    }
  }, [search, filter]);

  async function handleQuantityChange(
    id: number,
    value: number | "",
    name: string
  ) {
    const isUpdateStockQuantitySuccess = await updateStockQuantity(
      id,
      value !== "" ? value : 0
    );
    if (isUpdateStockQuantitySuccess) {
      notifications.show({
        message: `${name} updated quantity.`,
        color: "green",
      });
      await queryClient.invalidateQueries("stocks");
    } else {
      notifications.show({
        message: `There is an error updating quantity of ${name}.`,
        color: "red",
      });
    }
  }

  const openDeleteModal = (name: string) =>
    modals.openConfirmModal({
      title: "Confirm delete",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete{" "}
          <Text component="span" fw={700}>
            {name}
          </Text>
          ? All of its data associated with the system will also be deleted.
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: async () => {
        const delStock = await deleteStock(name);

        if (!!delStock.result) {
          notifications.show({
            message: `Successfully deleted ${name}.`,
            color: "green",
          });
          await queryClient.invalidateQueries("stocks");
        } else {
          notifications.show({
            message: `Error deleting ${name}.`,
            color: "red",
          });
        }

        const result = await checkType(name);

        if (result.type === "medicine") {
          // Delete medicine
          const medicine = result.item;
          const delMedicine = await deleteMedicine(medicine.id);

          if (!!delMedicine.result) {
            notifications.show({
              message: `Successfully deleted ${name}. on medicine`,
              color: "green",
            });
            await queryClient.invalidateQueries("medicines");
          } else {
            notifications.show({
              message: `Error deleting ${name}. on medicine`,
              color: "red",
            });
          }
        }

        if (result.type === "othersupplies") {
          // Delete other supplies
          const other = result.item;
          const delOtherSupply = await deleteOtherSupply(other.id);

          if (!!delOtherSupply.result) {
            notifications.show({
              message: `Successfully deleted ${name}. on othersupply`,
              color: "green",
            });
            await queryClient.invalidateQueries("stocks");
          } else {
            notifications.show({
              message: `Error deleting ${name}. on othersupply`,
              color: "red",
            });
          }
        }
      },
    });

  return (
    <>
      {isLoading ? (
        <SkeletonTable />
      ) : (
        <>
          <Group align="center" position="apart" mt={20}>
            <Flex align="center" gap="xs">
              <Text fz="xs" fw={700}>
                Filter by:
              </Text>
              <Select
                maw={130}
                value={filter}
                onChange={setFilter}
                data={[
                  { label: "No filter", value: "" },
                  { label: "In Stock", value: "in" },
                  { label: "Low Stocks", value: "low" },
                  { label: "No Stocks", value: "no" },
                ]}
                variant="unstyled"
              />
            </Flex>
            <Text fz="xs">
              <Text component="span" fw={700}>
                Total:
              </Text>{" "}
              {stocks?.total}
            </Text>
          </Group>
          {stocks?.total === 0 ? (
            <Center mt={20}>
              <Text fz="sm">No results..</Text>
            </Center>
          ) : (
            <>
              <Table mt={10} fontSize="xs">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Quantity</th>
                    <th>Action</th>
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
                        <NumberInput
                          value={!!stock.quantity ? stock.quantity : 0}
                          maw={100}
                          min={0}
                          onChange={(value) =>
                            handleQuantityChange(
                              stock.id,
                              value,
                              stock.stockfor
                            )
                          }
                        />
                      </td>
                      <td>
                        <IconAction
                          color="red"
                          icon={<IconTrash size="1.125rem" />}
                          onClick={() => openDeleteModal(stock.stockfor)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
          <Center mt={12}>
            <Pagination
              size="sm"
              total={stocks?.total ? Math.ceil(stocks.total / 15) : 0}
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
