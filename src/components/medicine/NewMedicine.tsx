import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { toast } from "sonner";
import { Text, Group, TextInput, NumberInput, Button } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { format } from "date-fns";

import { addMedicine, checkMedicine } from "../../api/medicine";
import { createStock } from "../../api/stocks";

const NewMedicine: React.FC = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm({
    initialValues: {
      batchno: "",
      name: "",
      specification: "",
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

  async function handleAddMedicine(medicine: any) {
    // Set the loading
    setLoading(true);

    let newExpiry;
    if (medicine.expiry !== "") {
      const expiry = new Date(medicine.expiry);
      newExpiry = format(expiry, "yyyy-MMMM-dd");
    }

    const formattedName = medicine.name.replace(/\s+/g, " ").trim();
    const newMedicine = {
      batchno: medicine.batchno,
      name: formattedName,
      specification: medicine.specification,
      expiry: newExpiry,
      price: medicine.price,
    };

    const resCheckMedicine = await checkMedicine(formattedName);

    if (resCheckMedicine.isRedundant) {
      toast.error(
        `${medicine.name} is already present on ${resCheckMedicine.type} update the stock instead.`
      );
      setLoading(false);
    } else {
      const isAddMedicineSuccess = await addMedicine(newMedicine);

      if (isAddMedicineSuccess) {
        const isAddStockSuccess = await createStock(formattedName);

        if (isAddStockSuccess) {
          toast.success("Medicine successfully added.");
          setLoading(false);
          await queryClient.invalidateQueries("medicines");
          await queryClient.invalidateQueries("stocks");
          form.reset();
        }
      }
    }
  }
  return (
    <>
      <Text mb={4}>Add new medicine</Text>
      <form onSubmit={form.onSubmit((values) => handleAddMedicine(values))}>
        <Group align="start">
          <TextInput
            placeholder="Enter batch no"
            maw={140}
            {...form.getInputProps("batchno")}
          />
          <TextInput
            placeholder="Enter name"
            maw={180}
            {...form.getInputProps("name")}
          />
          <TextInput
            placeholder="Enter specification"
            maw={200}
            {...form.getInputProps("specification")}
          />
          <DateInput
            valueFormat="YYYY-MMMM-DD"
            placeholder="Set expiry date"
            maw={200}
            clearable
            {...form.getInputProps("expiry")}
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

export default NewMedicine;
