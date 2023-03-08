import axios from "axios";

export const getCategories = (setLoader, setCategories, cb) => {
  axios
    .get(
      `${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT}/api/categories`
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

export const createCategory = (
  category,
  setCategories,
  setErrors,
  setLoader,
  cb
) => {
  setLoader(true);
  axios
    .post(
      `${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT}/api/categories/create`,
      category
    )
    .then(() => getCategories(setLoader, setCategories, cb))
    .catch((err) => {
      setLoader(false);
      setErrors(err.response.data.errors);
    });
};

export const deleteCategory = (id, setCategories, setLoader, cb) => {
  axios
    .delete(
      `${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT}/api/categories/delete/${id}`
    )
    .then((res) => getCategories(setLoader, setCategories, cb));
};
