import { message } from "antd";
import React, { useEffect, useState } from "react";
import { serverFetch } from "../utils/handleRequest";

const useFetchData = <T,>(url: string, dataType: string) => {
  const [data, setData] = useState<T | null>(null);
  const [messageApi, contextHolder] = message.useMessage();

  const displayErrorMessage = (message: string) => {
    messageApi.error(message);
  };

  const fetchData = async () => {
    try {
      const result = await serverFetch("get", url);
      setData(result);
    } catch (error) {
      displayErrorMessage(`Error while fetching ${dataType}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return [data, setData, contextHolder] ;
};

export default useFetchData;
