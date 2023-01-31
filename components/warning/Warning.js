import { useState, useRef } from "react";

const Warning = ({ data, onClose, onSubmit, action = "Eliminar" }) => {
  const popupRef = useRef();
  const handleClose = (e) => {
    if (e.target === popupRef.current) {
      onClose();
    }
  };
  return (
    <div
      onClick={(e) => handleClose(e)}
      ref={popupRef}
      className="absolute top-0 left-0 w-screen h-screen popup-bg flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-xl flex flex-col justify-between px-4 py-4 w-[35rem] h-[16rem] gap-6">
        <div>
          <p className="text-xl font-bold">{data.title}</p>
          <p className="mt-6">{data.info}</p>
        </div>
        <div className="flex w-full justify-end items-center gap-3">
          <div
            onClick={() => onClose()}
            className="px-8 py-[10px] border border-darkBg rounded-xl text-center text-black cursor-pointer"
          >
            <p>Cancelar</p>
          </div>
          <div
            onClick={() => onSubmit()}
            className="px-8 py-[10px] bg-red-600 rounded-xl text-center text-white cursor-pointer"
          >
            <p>{action}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Warning;
