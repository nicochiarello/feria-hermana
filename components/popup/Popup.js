import { useState } from "react";
import InputsTypesHandler from "./InputsTypesHandler";

const Popup = ({ onClose, data, onSubmit, initialState, label ,errors = {},}) => {
  const [stateData, setStateData] = useState(initialState);
  return (
    <div className="w-full h-[100vh] absolute z-50 top-0 left-0 bg-black flex items-center justify-center">
      <div
        className="w-full h-full  bg-red-600 
       md:rounded-xl overflow-scroll"
      >
        <div className="w-full h-[4.5rem] bg-gray-600 px-2 text-xl flex justify-between items-center">
          <p className="font-semibold">{label}</p>
          <i onClick={() => onClose()} className="bx bx-x text-[30px]"></i>
        </div>
        <div className="w-full min-h-[calc(100vh-9rem)] flex flex-col gap-3 py-3 bg-orange-300 text-lg px-1">
          {data.inputs.map((i, key) => {
            return (
              <InputsTypesHandler
                key={key}
                input={i}
                setStateData={setStateData}
                stateData={stateData}
                errors = {errors}
              />
            );
          })}
        </div>
        {data.buttons.map((i, key) => {
          console.log(i);
          return (
            <div
              key={key}
              onClick={() => i.onSubmit(stateData)}
              className="w-full flex items-center justify-center h-[4.5rem] bg-gray-300 text-lg font-semibold"
            >
              <p>{i.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Popup;
