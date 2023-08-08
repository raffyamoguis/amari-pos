import React from "react";

import NewTrans from "../components/sell/NewTrans";
import TransHistory from "../components/sell/TransHistory";

const Sell: React.FC = () => {
  return (
    <>
      <NewTrans />
      <TransHistory />
    </>
  );
};

export default Sell;
