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
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconSearch, IconEdit, IconTrash, IconX } from "@tabler/icons-react";

import { fetchMedicines, deleteMedicine } from "../../api/medicine";
import { deleteStock } from "../../api/stocks";
import { useMedicineListStore } from "../../store/useMedicineListStore";
import { MedicineType } from "../../types";

import IconAction from "../IconAction";
import SkeletonTable from "../skeleton/SkeletonTable";

interface Props {
  total: number;
  items: MedicineType[];
}

const ListMedicine: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [activePage, offset, search, setActivePage, setSearch] =
    useMedicineListStore(
      (state) => [
        state.activePage,
        state.offset,
        state.search,
        state.setActivePage,
        state.setSearch,
      ],
      shallow
    );

  const { data: medicines, isLoading } = useQuery<Props, Error>(
    ["medicines", offset, search],
    () => fetchMedicines(offset, search),
    { keepPreviousData: true }
  );

  useEffect(() => {
    if (search !== "") {
      setActivePage(1);
    }
  }, [search]);

  const openDeleteModal = (id: number | undefined, name: string) =>
    modals.openConfirmModal({
      title: "Confirm delete",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete{" "}
          <Text component="span" fw={700}>
            {name}
          </Text>
          ? All of its stocks will also be deleted.
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: async () => {
        const isDeleteMedSuccess = await deleteMedicine(id);

        if (isDeleteMedSuccess) {
          //Remove the stock
          const isRemoveStockSuccess = await deleteStock(name);

          if (isRemoveStockSuccess) {
            notifications.show({
              message: "Successfully deleted.",
              color: "success",
            });

            // Invalidate queries
            await queryClient.invalidateQueries("medicines");
            await queryClient.invalidateQueries("stocks");
          } else {
            notifications.show({
              message: "There is an error deleting this data.",
              color: "red",
            });
          }
        } else {
          notifications.show({
            message: "There is an error deleting this data.",
            color: "red",
          });
        }
      },
    });
  return (
    <>
      <Group mt={30}>
        <TextInput
          placeholder="Enter medicine name"
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
          {medicines?.total === 0 ? (
            <Center mt={20}>
              <Text fz="sm">No results..</Text>
            </Center>
          ) : (
            <Table fontSize="xs">
              <thead>
                <tr>
                  <th>Batch no</th>
                  <th>Name</th>
                  <th>Specification</th>
                  <th>Price</th>
                  <th>Expiry</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {medicines?.items.map((medicine: MedicineType) => (
                  <tr key={medicine.id}>
                    <td>{medicine.batchno}</td>
                    <td>{medicine.name}</td>
                    <td>{medicine.specification}</td>
                    <td>{medicine.price}</td>
                    <td>{medicine.expiry}</td>
                    <td>
                      <Flex>
                        <IconAction
                          color="green"
                          icon={<IconEdit size="1.125rem" />}
                          onClick={() => navigate(`/medicine/${medicine.id}`)}
                        />

                        <IconAction
                          color="red"
                          icon={<IconTrash size="1.125rem" />}
                          onClick={() =>
                            openDeleteModal(medicine?.id, medicine.name)
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
              total={medicines?.total ? Math.ceil(medicines.total / 15) : 0}
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

export default ListMedicine;
