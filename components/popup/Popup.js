import { useState } from "react";
import { ClipLoader } from "react-spinners";
import InputsTypesHandler from "./InputsTypesHandler";
import { useRef } from "react";

const Popup = ({ onClose, data, initialState, label, errors = {}, loader }) => {
  const [stateData, setStateData] = useState(initialState);
  const popupRef = useRef();

  const handleClose = (e) => {
    if (e.target === popupRef.current) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleClose}
      ref={popupRef}
      className="w-full min-h-[100vh] absolute z-50 top-0 left-0 popup-bg flex items-center justify-center"
    >
      <div
        className="w-full h-full md:w-[700px] md:max-h-[700px] md:h-fit  bg-red-600 
       md:rounded-xl overflow-scroll"
      >
        <div className="w-full h-[4.5rem] bg-gray-600 px-2 text-xl flex justify-between items-center">
          <p className="font-semibold">{label}</p>
          <i onClick={() => onClose()} className="bx bx-x text-[30px]"></i>
        </div>
        <div className="w-full min-h-fit flex flex-col gap-3 py-3 bg-orange-300 text-lg px-1">
          {data.inputs.map((i, key) => {
            return (
              <InputsTypesHandler
                key={key}
                input={i}
                setStateData={setStateData}
                stateData={stateData}
                errors={errors}
              />
            );
          })}
        </div>
        {data.buttons.map((i, key) => {
          return (
            <div
              key={key}
              onClick={() => i.onSubmit(stateData)}
              className="w-full flex items-center justify-center h-[4.5rem] bg-gray-300 text-lg font-semibold"
            >
              <p>{loader ? <ClipLoader size={25} /> : i.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Popup;
