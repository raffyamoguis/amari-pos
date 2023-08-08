import React from "react";
import { useParams } from "react-router-dom";

const ViewMedicine: React.FC = () => {
  const params = useParams();
  return <div>{params.id}</div>;
};

export default ViewMedicine;
