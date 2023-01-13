import React from "react";

const ProductItem = ({ product }) => {
  return (
    <div className="w-full py-4 bg-red-600 flex flex-col gap-5 px-1">
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
    </div>
  );
};

export default ProductItem;
