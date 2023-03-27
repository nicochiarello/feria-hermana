import React from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import Sales from "../../components/sales/Sales";

const ventas = () => {
  return (
    <DashboardLayout section={"Ventas"}>
      <Sales />
    </DashboardLayout>
  );
};

export default ventas;
