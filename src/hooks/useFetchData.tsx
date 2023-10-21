import { useEffect, useState } from "react";
import { serverFetch } from "../utils/handleRequest";

const useFetchData = <T,>(
  url: string,
  dataType: string,
  notify: (message: string) => void,
  handleLoader: (data: any) => void
) => {
  const [data, setData] = useState<T | null>(null);

  const fetchData = async () => {
    try {
      const result = (await serverFetch("get", url)) as T;
      setData(result);
      if (result) handleLoader(false);
    } catch (error) {
      notify(`Error while fetching ${dataType}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return [data, setData];
};

export default useFetchData;
