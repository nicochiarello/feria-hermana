import React from "react";
import ImagesHandler from "./images-handler/ImagesHandler";

const InputsTypesHandler = ({ input, setStateData, stateData, errors }) => {
  const textInput = (i) => {
    return (
      <div className="flex flex-col">
        <label>{i.label}</label>
        <input
          value={stateData[i.stateName]}
          onChange={(e) =>
            setStateData({
              ...stateData,
              [i.stateName]: e.target.value,
            })
          }
          placeholder={i.label}
          className={`w-full py-1 px-2 border rounded-lg ${
            errors[input.stateName] && "border border-red-600"
          }  `}
        />
        {errors[i.stateName] && (
          <span className="text-sm text-red-600">
            {errors[i.stateName].message}
          </span>
        )}
      </div>
    );
  };
  const numberInput = (i) => {
    return (
      <div className="flex flex-col">
        <label>{i.label}</label>
        <input
          value={stateData[i.stateName]}
          type="number"
          onChange={(e) =>
            setStateData({
              ...stateData,
              [i.stateName]: +e.target.value,
            })
          }
          placeholder={i.label}
          className={`w-full py-1 px-2 border rounded-lg ${
            errors[input.stateName] && "border border-red-600"
          }  `}
        />
        {errors[i.stateName] && (
          <span className="text-sm text-red-600">
            {errors[i.stateName].message}
          </span>
        )}
      </div>
    );
  };

  const selectInput = (i) => {
    return (
      <div className="flex flex-col">
        <label>{i.label}</label>
        <select
          value={stateData[i.stateName]}
          className="w-full py-1 px-2 rounded-lg border"
          onChange={(e) =>
            setStateData({
              ...stateData,
              [i.stateName]: e.target.value,
            })
          }
        >
          <option selected disabled>
            Seleccione una opcion
          </option>
          {i.options.map((i, key) => {
            return (
              <option value={i._id} key={key}>
                {i.label}
              </option>
            );
          })}
        </select>
      </div>
    );
  };

  switch (input.type) {
    case 0:
      return textInput(input);
    case 1:
      return numberInput(input);
    case 2:
      return selectInput(input);
    case 3:
      return (
        <ImagesHandler setStateData={setStateData} stateData={stateData} />
      );
  }
};

export default InputsTypesHandler;
