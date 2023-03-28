import { useEffect, useState } from "react";
import Fetcher from "./Fetcher";
import { useRouter } from "next/router";
import ProductsPagination from "./ProductsPagination";
import ProductItem from "./ProductItem";
import { ClipLoader } from "react-spinners";
import CreatorHandler from "./CreatorHandler";
import { Toaster, toast } from "react-hot-toast";
import Warning from "../warning/Warning";
import { deleteProduct } from "../../utils/api/product.routes";
import { getCategories } from "../../utils/api/categories.routes";
import Cookies from "universal-cookie";

const Products = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(false);
  const [nbPages, setNbPages] = useState();
  const [popup, setPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [type, setType] = useState(0);
  const [warningPopup, setWarningPopup] = useState(false);
  const [categories, setCategories] = useState([])

  useEffect(()=>{
    getCategories(null, setCategories)
  },[])

  useEffect(() => {
    if (router.query.page) {
      setPage(+router.query.page);
    }
  }, [router.query]);


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
          product={selectedItem}
          type={type}
          setProducts={setProducts}
          setLoader={setLoader}
          loader={loader}
          options={{categories}}
          redirect={()=>{
            toast.error("La sesión caducó")
            let cookies = new Cookies()
            cookies.remove(process.env.NEXT_PUBLIC_FH_KEY)
            router.push("/")}}
        />
      )}

      {warningPopup && (
        <Warning
          onClose={() => setWarningPopup(false)}
          data={{
            title: `Eliminar producto`,
            info: `Eliminar este producto permanentemente? No puedes rehacer esto`,
          }}
          onSubmit={() => {
            setWarningPopup(false);
            setLoader(true);
            deleteProduct(selectedItem._id, setProducts, setLoader, () => {
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
        setData={setProducts}
        setLoader={setLoader}
        page={page}
        setNbPages={setNbPages}
        url={`${process.env.NEXT_PUBLIC_API_URI}/api/products`}
      />

      <ProductsPagination pages={nbPages} page={page}/>
      
      <div className="w-full h-full flex flex-col gap-4">
        {loader ? (
          <div className="w-full h-full flex items-center justify-center">
            <ClipLoader size={150} />
          </div>
        ) : products.length > 0 ? (
          products.map((i) => {
            return (
              <ProductItem
                key={i._id}
                product={i}
                onUpdate={(product) => {
                  setType(1);
                  setSelectedItem(product);
                  setPopup(true);
                }}
                onDelete={(product)=>{
                  setSelectedItem(product);
                  setWarningPopup(true)
                }}
              />
            );
          })
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p>No se han encontrado productos</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
