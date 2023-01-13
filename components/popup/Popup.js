import { useState } from "react";

const Popup = ({ onClose, data, onSubmit, initialState }) => {
  console.log({ data });
  const [stateData, setStateData] = useState(initialState);
  console.log({ stateData });
  return (
    <div className="w-full h-[100vh] absolute z-50 top-0 left-0 bg-black flex items-center justify-center">
      <div className="w-full h-full  bg-red-600 
       md:rounded-xl overflow-scroll">
        <div className="w-full h-[4.5rem] bg-gray-600 px-2 text-xl flex justify-between items-center">
          <p className="font-semibold">Crear producto</p>
          <i onClick={() => onClose()} className="bx bx-x text-[30px]"></i>
        </div>
        <div className="w-full min-h-[calc(100vh-9rem)] flex flex-col gap-3 py-3 bg-orange-300 text-lg px-1">
          {data.inputs.map((i, key) => {
            return (
              <div key={key} className="flex flex-col">
                <label>{i.label}</label>
                <input
                  onChange={(e) =>
                    setStateData({
                      ...stateData,
                      [i.stateName]: e.target.value,
                    })
                  }
                  placeholder={i.label}
                  className="w-full py-1 px-2 rounded-lg"
                />
              </div>
            );
          })}
        </div>
        <div
          onClick={() => onSubmit(stateData)}
          className="w-full flex items-center justify-center h-[4.5rem] bg-gray-300"
        >
          <p>Crear</p>
        </div>
      </div>
    </div>
  );
};

export default Popup;
