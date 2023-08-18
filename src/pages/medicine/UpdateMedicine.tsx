import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import { notifications } from "@mantine/notifications";
import {
  Flex,
  Text,
  Center,
  Stack,
  TextInput,
  NumberInput,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import { format } from "date-fns";
import { IconChevronLeft } from "@tabler/icons-react";

import IconAction from "../../components/IconAction";
import SkeletonTable from "../../components/skeleton/SkeletonTable";

import { getMedicine, updateMedicine } from "../../api/medicine";
import { updateStock } from "../../api/stocks";

const UpdateMedicine: React.FC = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm({
    initialValues: {
      batchno: "",
      name: "",
      specification: "",
      expiry: null as Date | null | "",
      price: 0,
    },

    validate: {
      name: (value) => (value.length === 0 ? "Name is required" : null),
      price: (value) => {
        if (value.toString.length === 0) {
          return "Price is required";
        }
        return null;
      },
    },
  });

  const {
    data: medicine,
    isSuccess,
    isLoading,
  } = useQuery("medicine", () => getMedicine(id));

  useEffect(() => {
    if (isSuccess && medicine) {
      form.setValues({
        batchno: medicine?.batchno,
        name: medicine?.name,
        specification: medicine?.specification,
        expiry: medicine?.expiry ? new Date(medicine?.expiry) : null,
        price: medicine?.price ? parseFloat(medicine?.price) : 0,
      });
    }
  }, [isSuccess, medicine]);

  const handleUpdate = async (values: any) => {
    setLoading(true); // Set laoding
    values.name = values.name.trim(); // Remove trailing spaces
    const { name } = values;

    if (name !== medicine?.name) {
      await updateStock(medicine?.name, name);
      await queryClient.invalidateQueries("stocks");
    }

    // Formate date value
    let newExpiry;
    if (values.expiry !== "") {
      const expiry = new Date(values.expiry);
      newExpiry = format(expiry, "yyyy-MMMM-dd");
    }

    const isUpdateMedSuccess = await updateMedicine(id, {
      batchno: values.batchno,
      name: values.name,
      specification: values.specification,
      price: values.price,
      expiry: newExpiry,
    });

    if (isUpdateMedSuccess) {
      notifications.show({
        message: "Successfully updated.",
        color: "green",
      });
      await queryClient.invalidateQueries("medicines");
      setLoading(false);
    }
  };
  return (
    <>
      <Flex align="center">
        <IconAction
          color="dark"
          variant="transparent"
          icon={<IconChevronLeft />}
          onClick={() => navigate(-1)}
        />
        <Text>Update Medicine</Text>
      </Flex>
      <Center mt={20}>
        {isLoading ? (
          <SkeletonTable />
        ) : (
          <form onSubmit={form.onSubmit((values) => handleUpdate(values))}>
            <Stack align="stretch" w={350}>
              <TextInput
                label="Batch no"
                placeholder="Enter batch no"
                {...form.getInputProps("batchno")}
              />
              <TextInput
                label="Name"
                placeholder="Enter name"
                {...form.getInputProps("name")}
              />
              <TextInput
                label="Specification"
                placeholder="Enter specification"
                {...form.getInputProps("specification")}
              />
              <DateInput
                label="Expiry"
                valueFormat="YYYY-MMMM-DD"
                placeholder="Set expiry date"
                clearable
                {...form.getInputProps("expiry")}
              />
              <NumberInput
                label="Price"
                placeholder="Enter price"
                precision={2}
                min={1}
                {...form.getInputProps("price")}
              />
              <Button color="green" type="submit" loading={loading}>
                Update
              </Button>
            </Stack>
          </form>
        )}
      </Center>
    </>
  );
};

export default UpdateMedicine;
