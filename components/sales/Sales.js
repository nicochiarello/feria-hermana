import { useState, useEffect } from "react";
import SalesFetcher from "./SalesFetcher";
import { ClipLoader } from "react-spinners";
import SaleItem from "./SalesItem/SaleItem";
import { useRouter } from "next/router";

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [loader, setLoader] = useState(true);
  const [page, setPage] = useState(1);
  const [nbPages, setNbPages] = useState(1);
  const router = useRouter();

  useEffect(() => {
    if (router.query.page) {
      setPage(+router.query.page);
    }
  }, [router.query]);

  return (
    <div>
      <SalesFetcher
        setData={setSales}
        setLoader={setLoader}
        page={page}
        setNbPages={setNbPages}
        url={`${process.env.NEXT_PUBLIC_API_URI}/api/orders/all`}
      />

      <div className="w-full h-full flex flex-col gap-8 py-4">
        <div className="flex gap-4 justify-end items-center">
          <i className="bx bx-chevron-left"></i>
          <div className="flex gap-2">
            {Array.from({ length: nbPages }, (i, key) => (
              <p
                onClick={() =>
                  router.push({
                    pathname: router.pathname,
                    query: { ...router.query, page: key + 1 },
                  })
                }
                className={`${page === key + 1 && "text-btn"} cursor-pointer`}
                key={key}
              >
                {key + 1}
              </p>
            ))}
          </div>
          <i className="bx bx-chevron-right"></i>
        </div>
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
