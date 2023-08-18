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
import { format } from "date-fns";
import { DateInput } from "@mantine/dates";
import { IconChevronLeft } from "@tabler/icons-react";

import IconAction from "../../components/IconAction";

import { getOtherSupply, updateOtherSupply } from "../../api/othersuppliest";
import { updateStock } from "../../api/stocks";

const UpdateSupply: React.FC = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm({
    initialValues: {
      name: "",
      description: "",
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

  const { data: othersupply, isSuccess } = useQuery("othersupply", () =>
    getOtherSupply(id)
  );

  useEffect(() => {
    if (isSuccess && othersupply) {
      form.setValues({
        name: othersupply?.name,
        description: othersupply?.description,
        expiry: othersupply?.expiry ? new Date(othersupply?.expiry) : null,
        price: othersupply?.price ? parseFloat(othersupply?.price) : 0,
      });
    }
  }, [isSuccess, othersupply]);

  const handleUpdate = async (values: any) => {
    setLoading(true); // Set laoding
    values.name = values.name.trim(); // Remove trailing spaces
    const { name } = values;

    if (name !== othersupply?.name) {
      await updateStock(othersupply?.name, name);
      await queryClient.invalidateQueries("stocks");
    }

    // Formate date value
    let newExpiry;
    if (!!values.expiry) {
      const expiry = new Date(values.expiry);
      newExpiry = format(expiry, "yyyy-MMMM-dd");
    }

    if (values.expiry === null) {
      newExpiry = "";
    }

    const isUpdateOtherSupplySuccess = await updateOtherSupply(id, {
      name: values.name,
      description: values.description,
      price: values.price,
      expiry: newExpiry,
    });


    if (isUpdateOtherSupplySuccess) {
      notifications.show({
        message: "Successfully updated.",
        color: "green",
      });
      await queryClient.invalidateQueries("othersupplies");
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
        <Text>Update Other Supply</Text>
      </Flex>
      <Center mt={20}>
        <form onSubmit={form.onSubmit((values) => handleUpdate(values))}>
          <Stack align="stretch" w={350}>
            <TextInput
              label="Name"
              placeholder="Enter name"
              {...form.getInputProps("name")}
            />
            <TextInput
              label="Description"
              placeholder="Enter description"
              {...form.getInputProps("description")}
            />
            <DateInput
              label="Expiry date"
              valueFormat="YYYY MMM DD"
              placeholder="Set expiry date"
              {...form.getInputProps("expiry")}
              clearable
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
      </Center>
    </>
  );
};

export default UpdateSupply;
