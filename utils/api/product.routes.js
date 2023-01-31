import axios from "axios";

export const getProducts = (setLoader, setProducts, cb) => {
  axios
    .get(
      `${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT}/api/products`
    )
    .then((res) => {
      if (setLoader) {
        setLoader(false);
      }
      setProducts(res.data.products);
      if (cb) {
        cb();
      }
      console.log(res.data);
    })
    .catch((err) => setErrors(err.response.data));
};

export const createProduct = (
  product,
  setProducts,
  setErrors,
  setLoader,
  cb
) => {
  setLoader(true);
  axios
    .post(
      `${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT}/api/product/create`,
      product
    )
    .then((res) => getProducts(setLoader, setProducts, cb))
    .catch((err) => setErrors(err.response.data));
};

export const deleteProduct = (id, setProducts, setLoader, cb) => {
  axios
    .delete(
      `${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT}/api/product/delete/${id}`
    )
    .then((res) => getProducts(setLoader, setProducts, cb));
};
