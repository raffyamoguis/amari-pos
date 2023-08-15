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
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";
import { IconSearch, IconEdit, IconTrash } from "@tabler/icons-react";

import { fetchOtherSupplies } from "../../api/othersuppliest";
import { useOtherSuppliesListStore } from "../../store/useOtherSuppliesListStore";
import { OtherSupplyTypes } from "../../types";

import IconAction from "../IconAction";
import SkeletonTable from "../skeleton/SkeletonTable";

interface Props {
  total: number;
  items: OtherSupplyTypes[];
}

const ListNewSupplies: React.FC = () => {
  const navigate = useNavigate();

  const [activePage, offset, setActivePage] = useOtherSuppliesListStore(
    (state) => [state.activePage, state.offset, state.setActivePage],
    shallow
  );

  const { data: othersupplies, isLoading } = useQuery<Props, Error>(
    ["medicines", offset],
    () => fetchOtherSupplies(offset),
    { keepPreviousData: true }
  );

  console.log(othersupplies);

  const openDeleteModal = () =>
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
      onConfirm: () => {
        notifications.show({
          message: "Successfully deleted.",
          color: "red",
        });
      },
    });
  return (
    <>
      <Group mt={20}>
        <TextInput
          placeholder="Enter supply name"
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
              total={Math.ceil(othersupplies?.total / 15)}
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
