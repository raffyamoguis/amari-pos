import React from "react";

import NewMedicine from "../components/medicine/NewMedicine";
import ListMedicine from "../components/medicine/ListMedicine";

const Medicine: React.FC = () => {
  return (
    <>
      <NewMedicine />
      <ListMedicine />
    </>
  );
};

export default Medicine;
