import React from "react";
import { Text, Group, TextInput, NumberInput, Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { DateInput } from "@mantine/dates";

const NewMedicine: React.FC = () => {
  return (
    <>
      <Text mb={4}>Add new medicine</Text>
      <Group align="end">
        <TextInput placeholder="Enter batch no" maw={140} />
        <TextInput placeholder="Enter name" maw={180} />
        <TextInput placeholder="Enter specification" maw={200} />
        <DateInput
          valueFormat="YYYY MMM DD"
          placeholder="Set expiry date"
          maw={140}
          clearable
        />
        <NumberInput placeholder="Enter price" maw={130} />
        <Button
          onClick={() =>
            notifications.show({
              message: "Successfully added.",
              color: "blue",
            })
          }
        >
          Add
        </Button>
      </Group>
    </>
  );
};

export default NewMedicine;
