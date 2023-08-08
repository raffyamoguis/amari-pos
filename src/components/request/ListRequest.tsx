import React from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "@mantine/core";
import { IconEye } from "@tabler/icons-react";

import IconAction from "../IconAction";

const ListRequest: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Table mt={10} fontSize="xs">
      <thead>
        <tr>
          <th>Date</th>
          <th>Total</th>
          <th>Amount</th>
          <th>Change</th>
          <th>View</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>January 10, 1998</td>
          <td>100</td>
          <td>200</td>
          <td>100</td>
          <td>
            <IconAction color="blue" icon={<IconEye />} />
          </td>
        </tr>
        <tr>
          <td>December 25, 1990</td>
          <td>300</td>
          <td>500</td>
          <td>200</td>
          <td>
            <IconAction color="blue" icon={<IconEye />} />
          </td>
        </tr>
        <tr>
          <td>January 10, 2007</td>
          <td>50</td>
          <td>50</td>
          <td>0</td>
          <td>
            <IconAction
              color="blue"
              icon={<IconEye />}
              onClick={() => navigate(`/request/${10}`)}
            />
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default ListRequest;
