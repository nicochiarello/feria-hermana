import { useState } from "react";
import Popup from "../popup/Popup";
import { createProduct } from "../../utils/api/product.routes";
import { toast } from "react-hot-toast";

const CreatorHandler = ({ type, product, onClose, setProducts, setLoader }) => {
  const propsCreator = (type, product) => {
    if (type === 0) {
      return {
        data: {
          inputs: [
            { type: 0, label: "Nombre", stateName: "name" },
            { type: 1, label: "Precio", stateName: "price" },
            { type: 3, label: "Nombre", stateName: "name" },
            { type: 0, label: "Descripción", stateName: "description" },
            {
              type: 2,
              label: "Categoría",
              stateName: "category",
              options: [
                { label: "Categoria 1", value: "cat1" },
                { label: "Categoria 2", value: "cat2" },
              ],
            },
            { type: 0, label: "Talle", stateName: "size" },
            {
              type: 2,
              label: "Sale",
              stateName: "sale",
              options: [
                { value: true, label: "Si" },
                { value: false, label: "No" },
              ],
            },
            { label: "Visible", stateName: "view" },
          ],
          buttons: [
            {
              label: "Crear",
              onSubmit: (product) => {
                let formData = new FormData();

                for (let item in product) {
                  if (item !== "images") formData.append(item, product[item]);
                }

                for (let image of product.images) {
                  formData.append("images", image);
                }

                createProduct(
                  formData,
                  setProducts,
                  setErrors,
                  setLoader,
                  () => {
                    onClose();
                    toast.success("Creado exitosamente");
                  }
                );
              },
            },
          ],
        },
        initialState: { images: {} },
      };
    }
    if (type === 1) {
      return {
        data: {
          inputs: [
            { type: 0, label: "Nombre", stateName: "name" },
            { type: 3, label: "Nombre", stateName: "name" },
            { type: 1, label: "Precio", stateName: "price" },
            { type: 0, label: "Descripción", stateName: "description" },
            {
              type: 2,
              label: "Categoría",
              stateName: "category",
              options: [
                { label: "Categoria 1", value: "cat1" },
                { label: "Categoria 2", value: "cat2" },
              ],
            },
            { type: 0, label: "Talle", stateName: "size" },
            {
              type: 2,
              label: "Sale",
              stateName: "sale",
              options: [
                { value: true, label: "Si" },
                { value: false, label: "No" },
              ],
            },
            {
              type: 2,
              label: "Visible",
              stateName: "view",
              options: [
                { value: true, label: "Si" },
                { value: false, label: "No" },
              ],
            },
          ],
          buttons: [
            {
              label: "Editar",
              onSubmit: (product) =>
                console.log("EL product a editar es", product),
            },
          ],
        },
        initialState: { ...product },
      };
    }
  };

  const [props, setProps] = useState(propsCreator(type, product));
  const [errors, setErrors] = useState({});
  return (
    <Popup
      label={type === 0 ? "Crear Producto" : "Editar Producto"}
      onClose={() => onClose()}
      data={props.data}
      onSubmit={(data) => console.log("Data to send", data)}
      initialState={props.initialState}
      errors={errors}
    />
  );
};

export default CreatorHandler;
