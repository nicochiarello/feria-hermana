import React from "react";

const ProductItem = ({ product, onUpdate, onDelete }) => {
  return (
    <div className="w-full py-4 border-y flex flex-col gap-5 px-1">
      <div className="flex gap-2 h-[8rem]">
        <div className="w-[8rem] h-full bg-white">
          <img
            className="w-full h-full object-contain"
            src={product.images[0].secureUrl}
          ></img>
        </div>
        <div className="flex flex-col h-full justify-between">
          <div>
            <p className="font-bold">{product.name}</p>
            <p>{product.description}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p>Talle: {product.size}</p>
            <p>Precio: {product.price}</p>
          </div>
        </div>
      </div>
      <div className="w-full py-2 flex gap-3 text-white font-semibold">
        <div onClick={()=> onUpdate(product)} className="w-full bg-blue-600 py-3 text-center rounded-lg">
          <p>Editar</p>
        </div>
        <div onClick={()=> onDelete(product)} className="w-full text-center bg-red-600 py-3 rounded-lg">
          <p>Eliminar</p>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
