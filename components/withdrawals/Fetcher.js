import { useEffect } from "react";
import axios from "axios";

const Fetcher = ({ setData, setLoader, url}) => {
  useEffect(() => {
    setLoader(true)
    let source = axios.CancelToken.source();
    const loadData = async () => {
      try {
        const response = await axios.get(url, {
          cancelToken: source.token,
        });
        setData(response.data.withdrawals);
        setLoader(false);
      } catch (err) {
        console.log("Canceled");
      }
    };
    loadData();

    return () => {
      source.cancel();
    };
  }, []);
};

export default Fetcher;
