import React from "react";

import NewSupplies from "../components/othersupplies/NewSupplies";
import ListNewSupplies from "../components/othersupplies/ListNewSupplies";

const OtherSupplies: React.FC = () => {
  return (
    <>
      <NewSupplies />
      <ListNewSupplies />
    </>
  );
};

export default OtherSupplies;
