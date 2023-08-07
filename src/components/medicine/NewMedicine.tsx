import React from "react";
import { Text, Group, TextInput, NumberInput, Button } from "@mantine/core";
import { DateInput } from "@mantine/dates";

const NewMedicine: React.FC = () => {
  return (
    <>
      <Text mb={4}>Add new medicine</Text>
      <Group align="end">
        <TextInput label="Batch no" placeholder="Enter batch no" maw={140} />
        <TextInput label="Name" placeholder="Enter name" maw={180} />
        <TextInput
          label="Specification"
          placeholder="Enter specification"
          maw={200}
        />
        <DateInput
          valueFormat="YYYY MMM DD"
          label="Expiry Date"
          placeholder="Set expiry date"
          maw={140}
          clearable
        />
        <NumberInput label="Price" placeholder="Enter price" maw={130} />
        <Button>Add</Button>
      </Group>
    </>
  );
};

export default NewMedicine;
