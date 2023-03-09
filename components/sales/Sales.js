import { useState } from "react";
import SalesFetcher from "./SalesFetcher";
import { ClipLoader } from "react-spinners";
import SaleItem from "./SalesItem/SaleItem";

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [loader, setLoader] = useState(true);
  const [page, setPage] = useState(1);
  const [nbPages, setNbPages] = useState(1);

  return (
    <div>
      <SalesFetcher
        setData={setSales}
        setLoader={setLoader}
        page={page}
        setNbPages={setNbPages}
        url={`${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT}/api/orders/all`}
      />

      <div className="w-full h-full flex flex-col gap-4 py-4">
        {loader ? (
          <div className="w-full h-full flex items-center justify-center">
            <ClipLoader size={150} />
          </div>
        ) : sales.length > 0 ? (
          sales.map((i) => {
            return (
              <SaleItem
                key={i._id}
                item={i}
                onUpdate={(product) => {
                  setType(1);
                  setSelectedItem(product);
                  setPopup(true);
                }}
                onDelete={(product) => {
                  setSelectedItem(product);
                  setWarningPopup(true);
                }}
              />
            );
          })
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p>No se han encontrado ventas</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sales;
