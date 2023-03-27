import { useEffect } from "react";
import { authCookie } from "../../utils/getAuthCookie";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

const SalesFetcher = ({ setData, setLoader, url, page, setNbPages }) => {
  const router = useRouter();
  useEffect(() => {
    setLoader(true);
    let source = axios.CancelToken.source();
    const loadData = async () => {
      try {
        const response = await axios.get(url, {
          params: { page: page, items: 25 },
          headers: {
            token: await authCookie(),
          },
          cancelToken: source.token,
        });
        setData(response.data.orders);
        setNbPages(response.data.nbPages);
        setLoader(false);
      } catch (err) {
        let tokenErr = err.response?.data?.message?.name;
        if (tokenErr === "JsonWebTokenError") {
          router.push("/");
          toast.error("La sesión caducó");
        }
      }
    };
    loadData();

    return () => {
      source.cancel();
    };
  }, [page]);
};

export default SalesFetcher;
