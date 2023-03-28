import axios from "axios";
import { authCookie } from "../getAuthCookie";

export const getCategories = (setLoader, setCategories, cb) => {
  axios
    .get(
      `${process.env.NEXT_PUBLIC_API_URI}/api/categories`
    )
    .then((res) => {
      if (setLoader) {
        setLoader(false);
      }
      setCategories(res.data.categories);
      if (cb) {
        cb();
      }
    })
    .catch((err) => console.log(err));
};

export const createCategory = async (
  category,
  setCategories,
  setErrors,
  setLoader,
  cb,
  redirect
) => {
  setLoader(true);
  axios
    .post(
      `${process.env.NEXT_PUBLIC_API_URI}/api/categories/create`,
      category,
      {
        headers: {
          token: await authCookie(),
        },
      }
    )
    .then(() => getCategories(setLoader, setCategories, cb))
    .catch((err) => {
      let tokenErr = err.response?.data?.message?.name;
      if (tokenErr === "JsonWebTokenError") {
        return redirect();
      }
      setLoader(false);
      setErrors(err.response.data.errors);
    });
};

export const deleteCategory = async (id, setCategories, setLoader, cb, redirect) => {
  axios
    .delete(
      `${process.env.NEXT_PUBLIC_API_URI}/api/categories/delete/${id}`,     {
        headers: {
          token: await authCookie(),
        },
      }
    )
    .then((res) => getCategories(setLoader, setCategories, cb))
    .catch((err) => {
      let tokenErr = err.response?.data?.message?.name;
      if (tokenErr === "JsonWebTokenError") {
        return redirect();
      }
      setLoader(false);
    });
};
