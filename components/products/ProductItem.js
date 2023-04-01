import React from "react";

const ProductItem = ({ product, onUpdate, onDelete }) => {
  return (
    <div className="w-full h-fit py-8 border-y flex flex-col gap-5 px-1 relative">
      <div className="flex gap-2 h-fit">
        <div className="w-[8rem] h-full bg-white">
          {product.images[0] && (
            <img
              className="w-full h-full object-cover"
              src={process.env.NEXT_PUBLIC_IMAGE_URL +
                "/" +
                product.images[0].secureUrl
              }
            ></img>
          )}
        </div>
        <div className="flex flex-col h-full justify-between">
          <div>
            <p className="font-bold">{product.name}</p>
            <p>{product.description}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p>Talle: {product.size}</p>
            <p>Precio: ${product.price}</p>
          </div>
        </div>
      </div>
      <div className="w-full h-full flex gap-3 text-white font-semibold sm:absolute sm:right-0 sm:flex-col sm:w-fit top-0 sm:mx-4">
        <div
          onClick={() => onUpdate(product)}
          className="cursor-pointer w-full bg-blue-600 py-3 text-center rounded-lg sm:w-[5rem]"
        >
          <p>Editar</p>
        </div>
        <div
          onClick={() => onDelete(product)}
          className="cursor-pointer w-full text-center bg-red-600 py-3 rounded-lg sm:w-[5rem]"
        >
          <p>Eliminar</p>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
