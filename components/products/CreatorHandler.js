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
            { label: "Descripción", stateName: "description" },
            { label: "Categoría", stateName: "category" },
            { label: "Talle", stateName: "size" },
            { label: "Reserved", stateName: "reserved" },
            { label: "Sale", stateName: "sale" },
            { label: "Visible", stateName: "view" },
          ],
          buttons: [
            {label: "Crear", onSubmit: (product) => console.log("EL product a crear es", product)}
          ],
        },
        initialState: {},
      };
    }
    if (type === 1) {
      return {
        data: {
          inputs: [
            { label: "Nombre", stateName: "name" },
            { label: "Precio", stateName: "price" },
            { label: "Descripción", stateName: "description" },
            { label: "Categoría", stateName: "category" },
            { label: "Talle", stateName: "size" },
            { label: "Reserved", stateName: "reserved" },
            { label: "Sale", stateName: "sale" },
            { label: "Visible", stateName: "view" },
          ],
          buttons: [
            {label: "Editar", onSubmit: (product) => console.log("EL product a editar es", product)}
          ],
        },
        initialState: { ...product },
      };
    }
  };

  const [props, setProps] = useState(propsCreator(type, product));
  return (
    <Popup
      label={type === 0 ? "Crear Producto" : "Editar Producto"}
      onClose={() => onClose()}
      data={props.data}
      onSubmit={(data) => console.log("Data to send", data)}
      initialState={props.initialState}
    />
  );
};

export default CreatorHandler;
