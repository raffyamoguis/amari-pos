import React from "react";
import { Text } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IconCalendarDue } from "@tabler/icons-react";

import ListRequest from "../components/request/ListRequest";
import { useRequestStore } from "../store/useRequestStore";
import { format } from "date-fns";

const Request: React.FC = () => {
  const [dateFilter, setDateFilter, setActivePage] = useRequestStore(
    (state) => [state.dateFilter, state.setDateFilter, state.setActivePage]
  );

  function handleDateFilterChange(value: Date | null | "") {
    let newExpiry;
    if (!!value) {
      const expiry = new Date(value);
      newExpiry = format(expiry, "yyyy-MMMM-dd");
    } else {
      setActivePage(1);
    }
    setDateFilter(newExpiry);
  }

  return (
    <>
      <Text mb={10}>Manage Request</Text>
      <DateInput
        placeholder="Set the date"
        maw={300}
        icon={<IconCalendarDue size="0.80rem" />}
        value={dateFilter ? new Date(dateFilter) : null}
        onChange={(value) => handleDateFilterChange(value)}
        clearable
      />

      <ListRequest />
    </>
  );
};

export default Request;
