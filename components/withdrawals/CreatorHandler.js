import { useState } from "react";
import Popup from "../popup/Popup";
import { createProduct, updateProduct } from "../../utils/api/product.routes";
import { toast } from "react-hot-toast";
import { createWithDrawals, updateWithdrawal } from "../../utils/api/withdrawals.routes";

const CreatorHandler = ({
  type,
  withdrawal,
  onClose,
  setWithdrawals,
  setLoader,
  loader,
  redirect
}) => {
  const propsCreator = (type, withdrawal) => {
    if (type === 0) {
      return {
        data: {
          inputs: [
            { type: 0, label: "Dia", stateName: "day" },
            { type: 0, label: "Descripcion", stateName: "description" },
          ],
          buttons: [
            {
              label: "Crear",
              onSubmit: (withdrawal) => {
                createWithDrawals(
                  withdrawal,
                  setWithdrawals,
                  setErrors,
                  setLoader,
                  () => {
                    onClose();
                    toast.success("Creado exitosamente");
                  },
                  redirect
                );
              },
            },
          ],
        },
        initialState: { day: null, description: null },
      };
    }
    if (type === 1) {
      return {
        data: {
          inputs: [
            { type: 0, label: "Dia", stateName: "day" },
            { type: 0, label: "Descripcion", stateName: "description" },
          ],
          buttons: [
            {
              label: "Editar",
              onSubmit: (updatedWithdrawal) => {
                updateWithdrawal(
                  updatedWithdrawal._id,
                  updatedWithdrawal,
                  setWithdrawals,
                  setLoader,
                  () => {
                    onClose();
                    toast.success("Editado exitosamente");
                  },
                  redirect
                );
              },
            },
          ],
        },
        initialState: { ...withdrawal },
      };
    }
  };

  const [props, setProps] = useState(propsCreator(type, withdrawal));
  const [errors, setErrors] = useState({});
  return (
    <Popup
      label={type === 0 ? "Crear Retiro" : "Editar Retiro"}
      onClose={() => onClose()}
      loader={loader}
      data={props.data}
      initialState={props.initialState}
      errors={errors}
    />
  );
};

export default CreatorHandler;
