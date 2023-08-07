import React from "react";
import { Text, Group, TextInput, NumberInput, Button } from "@mantine/core";
import { DateInput } from "@mantine/dates";

const NewSupplies: React.FC = () => {
  return (
    <>
      <Text mb={4}>Add new other supplies</Text>
      <Group align="end">
        <TextInput label="Name" placeholder="Enter name" />
        <TextInput label="Description" placeholder="Enter description" />
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

export default NewSupplies;
