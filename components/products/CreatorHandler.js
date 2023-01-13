import { useState } from "react";
import Popup from "../popup/Popup";

const CreatorHandler = ({ type, product, onClose }) => {
  const propsCreator = (type, product) => {
    if (type === 0) {
      return {
        data: {
          inputs: [
            { label: "Nombre", stateName: "name" },
            { label: "Precio", stateName: "price" },
          ],
          buttons: [],
        },
        initialState: {},
      };
    }
    if (type === 1) {
    }
  };

  const [props, setProps] = useState(propsCreator(type, product));
  return (
    <Popup
      onClose={() => onClose()}
      data={props.data}
      onSubmit={(data) => console.log("Data to send", data)}
      initialState={props.initialState}
    />
  );
};

export default CreatorHandler;
