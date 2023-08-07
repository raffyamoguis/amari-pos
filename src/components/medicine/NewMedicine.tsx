import React from "react";
import { Text, Group, TextInput, NumberInput, Button } from "@mantine/core";
import { DateInput } from "@mantine/dates";

const NewMedicine: React.FC = () => {
  return (
    <>
      <Text mb={4}>Add new medicine</Text>
      <Group align="end">
        <TextInput label="Batch no" placeholder="Enter batch no" />
        <TextInput label="Name" placeholder="Enter name" />
        <TextInput label="Specification" placeholder="Enter specification" />
        <DateInput
          valueFormat="YYYY MMM DD"
          label="Expiry Date"
          placeholder="Set expiry date"
          clearable
        />
        <NumberInput label="Price" placeholder="Enter price" />
        <Button>Add</Button>
      </Group>
    </>
  );
};

export default NewMedicine;
