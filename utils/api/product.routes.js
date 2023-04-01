import axios from "axios";
import { authCookie } from "../getAuthCookie";

export const getProducts = (setLoader, setProducts, cb) => {
  axios
    .get(`${process.env.NEXT_PUBLIC_API_URI}/api/products`)
    .then((res) => {
      if (setLoader) {
        setLoader(false);
      }
      setProducts(res.data.products);
      if (cb) {
        cb();
      }
    })
    .catch((err) => console.log(err));
};

export const createProduct = async (
  product,
  setProducts,
  setErrors,
  setLoader,
  cb,
  redirect
) => {
  setLoader(true);
  axios
    .post(`${process.env.NEXT_PUBLIC_API_URI}/api/product/create`, product, {
      headers: {
        token: await authCookie(),
      },
    })
    .then(() => getProducts(setLoader, setProducts, cb))
    .catch((err) => {
      let tokenErr = err.response?.data?.message?.name;
      if (tokenErr === "JsonWebTokenError" || tokenErr === "TokenExpiredError") {
        return redirect();
      }
      setErrors(err.response.data);
      setLoader(false);
      console.log(err.response)
    });
};

export const updateProduct = async (
  updatedProduct,
  setProducts,
  setLoader,
  cb
) => {
  for (var pair of updatedProduct.entries()) {
    console.log(pair[0]+ ', ' + pair[1]); 
}
  setLoader(true);
  const id = updatedProduct.get("_id");
  axios
    .put(
      `${process.env.NEXT_PUBLIC_API_URI}/api/product/update/${id}`,
      updatedProduct,
      {
        headers: {
          token: await authCookie(),
        },
      }
    )
    .then(() => getProducts(setLoader, setProducts, cb))
    .catch((err) => {
      let tokenErr = err.response?.data?.message?.name;
      if (tokenErr === "JsonWebTokenError" || tokenErr === "TokenExpiredError") {
        return redirect();
      }
    });
};

export const deleteProduct = async (id, setProducts, setLoader, cb) => {
  axios
    .delete(`${process.env.NEXT_PUBLIC_API_URI}/api/product/delete/${id}`, {
      headers: {
        token: await authCookie(),
      },
    })
    .then((res) => getProducts(setLoader, setProducts, cb));
};
