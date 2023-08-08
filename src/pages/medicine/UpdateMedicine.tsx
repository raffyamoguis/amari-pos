import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Flex,
  Text,
  Center,
  Stack,
  TextInput,
  NumberInput,
  Button,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IconChevronLeft } from "@tabler/icons-react";

import IconAction from "../../components/IconAction";

const UpdateMedicine: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();

  console.log(params.id);
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
        <Stack align="stretch" w={350}>
          <TextInput
            label="Batch no"
            placeholder="Enter batch no"
            defaultValue="1112"
          />
          <TextInput
            label="Name"
            placeholder="Enter name"
            defaultValue="Neozep"
          />
          <TextInput
            label="Specification"
            placeholder="Enter specification"
            defaultValue="N/A"
          />
          <DateInput
            label="Expiry date"
            valueFormat="YYYY MMM DD"
            placeholder="Set expiry date"
            clearable
          />
          <NumberInput
            label="Price"
            placeholder="Enter price"
            defaultValue={100}
          />
          <Button color="green">Update</Button>
        </Stack>
      </Center>
    </>
  );
};

export default UpdateMedicine;
