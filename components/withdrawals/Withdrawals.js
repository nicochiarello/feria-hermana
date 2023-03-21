import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Warning from "../warning/Warning";
import Fetcher from "./Fetcher";
import { ClipLoader } from "react-spinners";
import Withdrawalitem from "./Withdrawalitem";
import CreatorHandler from "./CreatorHandler";
import { deleteWithdrawal } from "../../utils/api/withdrawals.routes";

const Withdrawals = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loader, setLoader] = useState(false);
  const [popup, setPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [type, setType] = useState(0);
  const [warningPopup, setWarningPopup] = useState(false);

  return (
    <div className="w-full h-full overflow-y-scroll">
      <Toaster />
      {popup && (
        <CreatorHandler
          onClose={() => {
            setType(0);
            setPopup(false);
            setSelectedItem(null);
          }}
          withdrawal={selectedItem}
          type={type}
          setWithdrawals={setWithdrawals}
          setLoader={setLoader}
          loader={loader}
        />
      )}

      {warningPopup && (
        <Warning
          onClose={() => setWarningPopup(false)}
          data={{
            title: `Eliminar retiro`,
            info: `Eliminar este retiro permanentemente? No puedes rehacer esto`,
          }}
          onSubmit={() => {
            setWarningPopup(false);
            setLoader(true);
            deleteWithdrawal(selectedItem._id, setWithdrawals, setLoader, () => {
              setWarningPopup(false);
              toast.success("Eliminado exitosamente");
            });
          }}
        />
      )}

      <div
        onClick={() => setPopup(true)}
        className="fixed bottom-4 right-2 w-[4rem] z-20 h-[4rem] rounded-full bg-blue-400 flex items-center justify-center cursor-pointer"
      >
        <i className="bx bx-plus text-3xl"></i>
      </div>

      <Fetcher
        setData={setWithdrawals}
        setLoader={setLoader}
        url={`${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT}/api/withdrawals`}
      />
      <div className="w-full h-full flex flex-col gap-4">
        {loader ? (
          <div className="w-full h-full flex items-center justify-center">
            <ClipLoader size={150} />
          </div>
        ) : withdrawals.length > 0 ? (
          withdrawals.map((i) => {
            return (
              <Withdrawalitem
                key={i._id}
                withdrawal={i}
                onUpdate={(withdrawal) => {
                  setType(1);
                  setSelectedItem(withdrawal);
                  setPopup(true);
                }}
                onDelete={(withdrawal) => {
                  setSelectedItem(withdrawal);
                  setWarningPopup(true);
                }}
              />
            );
          })
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p>No se han encontrado retiros</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Withdrawals;
