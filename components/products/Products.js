import { useState } from "react";
import Fetcher from "./Fetcher";
import { useRouter } from "next/router";
import ProductsPagination from "./ProductsPagination";
import ProductItem from "./ProductItem";

const Products = () => {
  const router = useRouter();
  let { page } = router.query;
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(false);
  const [nbPages, setNbPages] = useState();

  console.log({ nbPages });
  console.log({ products });

  return (
    <div className="w-full h-full">
      <Fetcher
        setData={setProducts}
        setLoader={setLoader}
        page={page}
        setNbPages={setNbPages}
        url={`${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT}/api/products`}
      />
      <ProductsPagination pages={nbPages}/>
      <div className="w-full flex flex-col gap-4">
        {products.map((i)=>{
            return(
                <ProductItem key={i._id} product={i}/>
            )
        })}
      </div>
    </div>
  );
};

export default Products;
