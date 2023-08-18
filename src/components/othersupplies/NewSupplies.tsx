import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { Text, Group, TextInput, NumberInput, Button } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { notifications } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import { format } from "date-fns";

import { checkOtherSupply, addOtherSupply } from "../../api/othersuppliest";
import { createStock } from "../../api/stocks";

const NewSupplies: React.FC = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm({
    initialValues: {
      name: "",
      descripttion: "",
      expiry: "",
      price: "",
    },

    validate: {
      name: (value) => (value.length === 0 ? "Name is required" : null),
      price: (value) => {
        if (value.length === 0) {
          return "Price is required";
        }
        return null;
      },
    },
  });

  async function handleAddOtherSupply(othersupply: any) {
    // Set the loading
    setLoading(true);

    let newExpiry = "";
    if (othersupply.expiry !== "") {
      const expiry = new Date(othersupply.expiry);
      newExpiry = format(expiry, "yyyy-MMMM-dd");
    }

    const formattedName = othersupply.name.trim();
    const newOtherSupply = {
      name: formattedName,
      description: othersupply.description,
      expiry: newExpiry,
      price: othersupply.price,
    };

    const resCheckOtherSupply = await checkOtherSupply(formattedName);

    if (resCheckOtherSupply.isRedundant) {
      notifications.show({
        message: `${othersupply.name} is already present update the stock instead.`,
        color: "yellow",
      });
      setLoading(false);
    } else {
      const isAddMedicineSuccess = await addOtherSupply(newOtherSupply);

      if (isAddMedicineSuccess) {
        const isAddStockSuccess = await createStock(formattedName);

        if (isAddStockSuccess) {
          notifications.show({
            message: "Medicine successfully added.",
            color: "green",
          });
          setLoading(false);
          await queryClient.invalidateQueries("othersupplies");
          await queryClient.invalidateQueries("stocks");
          form.reset();
        }
      }
    }
  }
  return (
    <>
      <Text mb={4}>Add new other supplies</Text>
      <form onSubmit={form.onSubmit((values) => handleAddOtherSupply(values))}>
        <Group align="end">
          <TextInput
            placeholder="Enter name"
            maw={180}
            {...form.getInputProps("name")}
          />
          <TextInput
            placeholder="Enter description"
            maw={200}
            {...form.getInputProps("description")}
          />
          <DateInput
            valueFormat="YYYY MMM DD"
            placeholder="Set expiry date"
            maw={140}
            {...form.getInputProps("expiry")}
            clearable
          />
          <NumberInput
            placeholder="Enter price"
            maw={130}
            precision={2}
            min={1}
            {...form.getInputProps("price")}
          />
          <Button type="submit" loading={loading}>
            Add
          </Button>
        </Group>
      </form>
    </>
  );
};

export default NewSupplies;
