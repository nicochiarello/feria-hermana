import { useEffect } from "react";
import axios from "axios";

const Fetcher = ({ setData, setLoader, url, page, setNbPages }) => {
  useEffect(() => {
    setLoader(true)
    let source = axios.CancelToken.source();
    const loadData = async () => {
      try {
        const response = await axios.get(url, {
          params: { page: page, items: 25 },
          cancelToken: source.token,
        });
        setData(response.data.products);
        setNbPages(response.data.nbPages);
        setLoader(false);
      } catch (err) {
        console.log("Canceled");
      }
    };
    loadData();

    return () => {
      source.cancel();
    };
  }, [page]);
};

export default Fetcher;
