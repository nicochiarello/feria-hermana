import axios from "axios";
import { authCookie } from "../getAuthCookie";

export const getWithdrawals = (setLoader, setWithdrawals, cb) => {
  axios
    .get(`${process.env.NEXT_PUBLIC_API_URI}/api/withdrawals`)
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

export const createWithDrawals = async (
  withdrawals,
  setWithdrawals,
  setErrors,
  setLoader,
  cb,
  redirect
) => {
  setLoader(true);
  axios
    .post(
      `${process.env.NEXT_PUBLIC_API_URI}/api/withdrawals/create`,
      withdrawals,
      {
        headers: {
          token: await authCookie(),
        },
      }
    )
    .then(() => getWithdrawals(setLoader, setWithdrawals, cb))
    .catch((err) => {
      let tokenErr = err.response?.data?.message?.name;
      if (tokenErr === "JsonWebTokenError") {
        return redirect();
      }

      setLoader(false);
      setErrors(err.response.data);
    });
};

export const updateWithdrawal = async (
  id,
  updatedWithdrawal,
  setWithdrawals,
  setLoader,
  cb,
  redirect
) => {
  setLoader(true);
  axios
    .put(
      `${process.env.NEXT_PUBLIC_API_URI}/api/withdrawals/update/${id}`,
      updatedWithdrawal,
      {
        headers: {
          token: await authCookie(),
        },
      }
    )
    .then(() => getWithdrawals(setLoader, setWithdrawals, cb))
    .catch((err) => {
      let tokenErr = err.response?.data?.message?.name;
      if (tokenErr === "JsonWebTokenError") {
        return redirect();
      }
    });
};

export const deleteWithdrawal = async (
  id,
  setWithdrawals,
  setLoader,
  cb,
  redirect
) => {
  axios
    .delete(`${process.env.NEXT_PUBLIC_API_URI}/api/withdrawals/delete/${id}`, {
      headers: {
        token: await authCookie(),
      },
    })
    .then((res) => getWithdrawals(setLoader, setWithdrawals, cb))
    .catch((err) => {
      let tokenErr = err.response?.data?.message?.name;
      if (tokenErr === "JsonWebTokenError") {
        return redirect();
      }
    });
};
