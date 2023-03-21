import React from "react";

const Withdrawalitem = ({ withdrawal, onUpdate, onDelete }) => {
  return (
    <div className="w-full py-4 border-y flex flex-col gap-5 px-1 relative">
      <div className="flex gap-2 h-[6rem]">
        <div className="flex flex-col h-full justify-between">
          <div>
            <p className="font-bold">{withdrawal.day}</p>
            <p>{withdrawal.description}</p>
          </div>
        </div>
      </div>
      <div className="w-full py-2 flex gap-3 text-white font-semibold sm:absolute sm:right-0 sm:flex-col sm:w-fit top-0 sm:mx-4">
        <div onClick={()=> onUpdate(withdrawal)} className="cursor-pointer w-full bg-blue-600 py-3 text-center rounded-lg sm:w-[5rem]">
          <p>Editar</p>
        </div>
        <div onClick={()=> onDelete(withdrawal)} className="cursor-pointer w-full text-center bg-red-600 py-3 rounded-lg sm:w-[5rem]">
          <p>Eliminar</p>
        </div>
      </div>
    </div>
  );
};

export default Withdrawalitem;
