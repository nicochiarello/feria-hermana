import axios from "axios";

export const getWithdrawals = (setLoader, setWithdrawals, cb) => {
  axios
    .get(
      `${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT}/api/withdrawals`
    )
    .then((res) => {
      if (setLoader) {
        setLoader(false);
      }
      setWithdrawals(res.data.withdrawals);
      if (cb) {
        cb();
      }
    })
    .catch((err) => console.log(err));
};

export const createWithDrawals = (
  withdrawals,
  setWithdrawals,
  setErrors,
  setLoader,
  cb
) => {
  setLoader(true);
  axios
    .post(
      `${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT}/api/withdrawals/create`,
      withdrawals
    )
    .then(() => getWithdrawals(setLoader, setWithdrawals, cb))
    .catch((err) =>{
        setLoader(false)
        console.log(err.response)
         setErrors(err.response.data)
        });
};

export const updateWithdrawal = async (
  id,
  updatedWithdrawal,
  setWithdrawals,
  setLoader,
  cb
) => {
  setLoader(true);
  console.log(updatedWithdrawal)
  axios
    .put(
      `${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT}/api/withdrawals/update/${id}`,
      updatedWithdrawal
    )
    .then(() => getWithdrawals(setLoader, setWithdrawals, cb))
    .catch((err) => console.log(err.response));
};

export const deleteWithdrawal = (id, setWithdrawals, setLoader, cb) => {
  axios
    .delete(
      `${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT}/api/withdrawals/delete/${id}`
    )
    .then((res) => getWithdrawals(setLoader, setWithdrawals, cb));
};
