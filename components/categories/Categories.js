import { useState, useEffect } from "react";
import {
  createCategory,
  deleteCategory,
  getCategories,
} from "../../utils/api/categories.routes";
import Popup from "../popup/Popup";
import { Toaster, toast } from "react-hot-toast";
import Warning from "../warning/Warning";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/router";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loader, setLoader] = useState(true);
  const [popup, setPopup] = useState(false);
  const [warningPopup, setWarningPopup] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const router = useRouter();

  useEffect(() => {
    getCategories(setLoader, setCategories);
  }, []);

  return (
    <div className="w-full h-full overflow-y-scroll flex flex-col gap-6 py-4 ">
      <Toaster />
      {popup && (
        <Popup
          label={"Crear Categoria"}
          onClose={() => setPopup(false)}
          loader={loader}
          data={{
            inputs: [{ type: 0, label: "Nombre", stateName: "name" }],
            buttons: [
              {
                label: "Crear",
                onSubmit: (category) => {
                  createCategory(
                    category,
                    setCategories,
                    setErrors,
                    setLoader,
                    () => {
                      setPopup(false);
                      toast.success("Creado exitosamente");
                    },
                    () => {
                      toast.error("La sesión caducó");
                      router.push("/");
                    }
                  );
                },
              },
            ],
          }}
          initialState={{ name: null }}
          errors={errors}
        />
      )}

      {warningPopup && (
        <Warning
          onClose={() => setWarningPopup(false)}
          data={{
            title: `Eliminar categoria`,
            info: `Eliminar esta categoria permanentemente? No puedes rehacer esto`,
          }}
          onSubmit={() => {
            setWarningPopup(false);
            setLoader(true);
            deleteCategory(
              selectedItem,
              setCategories,
              setLoader,
              () => {
                setWarningPopup(false);
                toast.success("Eliminado exitosamente");
              },
              () => {
                toast.error("La sesión caducó");
                router.push("/");
              }
            );
          }}
        />
      )}

      <div
        onClick={() => setPopup(true)}
        className="fixed bottom-4 right-2 w-[4rem] h-[4rem] rounded-full bg-blue-400 flex items-center justify-center cursor-pointer"
      >
        <i className="bx bx-plus text-3xl"></i>
      </div>

      {loader ? (
        <div className="w-full h-full flex items-center justify-center">
          <ClipLoader size={150} />
        </div>
      ) : categories.length ? (
        categories.map((i) => (
          <div
            className="w-full py-4 px-4 border-y flex items-center justify-between"
            key={i._id}
          >
            <p>{i.name}</p>
            <div
              onClick={() => {
                setWarningPopup(true);
                setSelectedItem(i._id);
              }}
              className="rounded-full w-[2.5rem] h-[2.5rem] border flex items-center justify-center cursor-pointer"
            >
              <i className="bx bxs-trash-alt"></i>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <p>No se encontraron categorias</p>
        </div>
      )}
    </div>
  );
};

export default Categories;
