import React from "react";
import { Text } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IconCalendarDue } from "@tabler/icons-react";

import ListRequest from "../components/request/ListRequest";

const Request: React.FC = () => {
  return (
    <>
      <Text mb={10}>Create request</Text>
      <DateInput
        placeholder="Set the date"
        maw={300}
        icon={<IconCalendarDue size="0.80rem" />}
        clearable
      />

      <ListRequest />
    </>
  );
};

export default Request;
