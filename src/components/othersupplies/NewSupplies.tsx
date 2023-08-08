import React from "react";
import { Text, Group, TextInput, NumberInput, Button } from "@mantine/core";
import { DateInput } from "@mantine/dates";

const NewSupplies: React.FC = () => {
  return (
    <>
      <Text mb={4}>Add new other supplies</Text>
      <Group align="end">
        <TextInput placeholder="Enter name" maw={180} />
        <TextInput placeholder="Enter description" maw={200} />
        <DateInput
          valueFormat="YYYY MMM DD"
          placeholder="Set expiry date"
          maw={140}
          clearable
        />
        <NumberInput placeholder="Enter price" maw={130} />
        <Button>Add</Button>
      </Group>
    </>
  );
};

export default NewSupplies;
