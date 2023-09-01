import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import { shallow } from "zustand/shallow";
import {
  Group,
  Table,
  TextInput,
  Flex,
  Text,
  Center,
  Pagination,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";
import { IconSearch, IconEdit, IconTrash, IconX } from "@tabler/icons-react";

import {
  fetchOtherSupplies,
  deleteOtherSupply,
} from "../../api/othersuppliest";
import { deleteStock } from "../../api/stocks";
import { useOtherSuppliesListStore } from "../../store/useOtherSuppliesListStore";
import { OtherSupplyTypes } from "../../types";

import IconAction from "../IconAction";
import SkeletonTable from "../skeleton/SkeletonTable";

interface Props {
  total: number;
  items: OtherSupplyTypes[];
}

const ListNewSupplies: React.FC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [activePage, offset, search, setActivePage, setSearch] =
    useOtherSuppliesListStore(
      (state) => [
        state.activePage,
        state.offset,
        state.search,
        state.setActivePage,
        state.setSearch,
      ],
      shallow
    );

  const { data: othersupplies, isLoading } = useQuery<Props, Error>(
    ["othersupplies", offset, search],
    () => fetchOtherSupplies(offset, search),
    { keepPreviousData: true }
  );

  useEffect(() => {
    if (search !== "") {
      setActivePage(1);
    }
  }, [search]);

  const openDeleteModal = (id: number, name: string) =>
    modals.openConfirmModal({
      title: "Confirm delete",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete this item? This action cannot be
          reverted once the data is deleted it cannot be restored again.
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: async () => {
        // Delete the supply
        const delMedicine = await deleteOtherSupply(id);

        if (!!delMedicine.result) {
          notifications.show({
            message: `Successfully deleted ${name}.`,
            color: "green",
          });
          await queryClient.invalidateQueries("othersupplies");
        } else {
          notifications.show({
            message: `There is an error deleting ${name}.`,
            color: "red",
          });
        }

        //Remove the stock
        const delStock = await deleteStock(name);

        if (!!delStock.result) {
          notifications.show({
            message: `Successfully deleted ${name} stocks`,
            color: "green",
          });
          await queryClient.invalidateQueries("stocks");
        } else {
          notifications.show({
            message: `There is an error deleting ${name} stocks.`,
            color: "red",
          });
        }
      },
    });
  return (
    <>
      <Group mt={20}>
        <TextInput
          placeholder="Enter supply name"
          icon={<IconSearch size="0.8rem" />}
          rightSection={
            search !== "" && (
              <IconX
                size="0.8rem"
                onClick={() => {
                  setSearch("");
                  setActivePage(1);
                }}
              />
            )
          }
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Group>
      {isLoading ? (
        <SkeletonTable />
      ) : (
        <>
          <Group position="right">
            <Text fz="xs">
              <Text component="span" fw={700}>
                Total:
              </Text>{" "}
              {othersupplies?.total}
            </Text>
          </Group>
          {othersupplies?.total === 0 ? (
            <Center mt={20}>
              <Text fz="sm">No results..</Text>
            </Center>
          ) : (
            <Table fontSize="xs" highlightOnHover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Expiry</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {othersupplies?.items.map((othersupply: OtherSupplyTypes) => (
                  <tr key={othersupply.id}>
                    <td>{othersupply.name}</td>
                    <td>{othersupply.description}</td>
                    <td>{othersupply.price}</td>
                    <td>{othersupply.expiry}</td>
                    <td>
                      <Flex>
                        <IconAction
                          color="green"
                          icon={<IconEdit size="1.125rem" />}
                          onClick={() =>
                            navigate(`/othersupplies/${othersupply.id}`)
                          }
                        />
                        <IconAction
                          color="red"
                          icon={<IconTrash size="1.125rem" />}
                          onClick={() =>
                            openDeleteModal(othersupply.id, othersupply.name)
                          }
                        />
                      </Flex>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          <Center mt={12}>
            <Pagination
              size="sm"
              total={
                othersupplies?.total ? Math.ceil(othersupplies.total / 15) : 0
              }
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

export default ListNewSupplies;
