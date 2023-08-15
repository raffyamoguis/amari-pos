import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
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
import { IconSearch, IconEdit, IconTrash } from "@tabler/icons-react";

import { fetchMedicines } from "../../api/medicine";
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

  const [activePage, offset, setActivePage] = useMedicineListStore(
    (state) => [state.activePage, state.offset, state.setActivePage],
    shallow
  );

  const { data: medicines, isLoading } = useQuery<Props, Error>(
    ["medicines", offset],
    () => fetchMedicines(offset),
    { keepPreviousData: true }
  );

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: "Confirm delete",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete this medicine? This action cannot be
          reverted once the data is deleted it cannot be restored again.
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => {
        notifications.show({
          message: "Successfully deleted.",
          color: "red",
        });
      },
    });
  return (
    <>
      <Group mt={30}>
        <TextInput
          placeholder="Enter medicine name"
          icon={<IconSearch size="0.8rem" />}
        />
      </Group>
      {isLoading ? (
        <SkeletonTable />
      ) : (
        <>
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
                  <td>{medicine.spefication}</td>
                  <td>{medicine.price}</td>
                  <td>{medicine.expiry}</td>
                  <td>
                    <Flex>
                      <IconAction
                        color="green"
                        icon={<IconEdit size="1.125rem" />}
                        onClick={() => navigate(`/medicine/${10}`)}
                      />
                      <IconAction
                        color="red"
                        icon={<IconTrash size="1.125rem" />}
                        onClick={openDeleteModal}
                      />
                    </Flex>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Center mt={12}>
            <Pagination
              size="sm"
              total={Math.ceil(medicines.total / 15)}
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
