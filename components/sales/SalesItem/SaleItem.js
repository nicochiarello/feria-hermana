import React from "react";
import formatDate from "../../../utils/formatDate";

const SaleItem = ({ item }) => {
  return (
    <div className="w-full py-4 border-y px-4 flex flex-col gap-2">
      <p>Estado: {item.payment_status === 1 ? "Aprobado" : "Denegado / En espera"}</p>
      <p>Comprador: {item.name}</p>
      <p>Email: {item.email}</p>
      <p>Dni: {item.dni}</p>
      <p>Telefono: {item.phone}</p>
      <div>
        <p>Productos:</p>
        <div>
          {item.products.map((i) => (
            <div className="flex gap-3" key={i._id}>
                <p>- {i.name}: </p>
                <p>${i.price}</p>
            </div>
          ))}
        </div>
      </div>

      <p>Total: ${item.total}</p>
      {formatDate(item.createdAt)}
    </div>
  );
};

export default SaleItem;
