// utils/handleRequest.ts
import axios from "axios";

import { IHandleRequestConfig } from "../interfaces/VITE/HandleRequestConfig";

//future server 
const token = localStorage.getItem("token");

export const serverFetch = async (method: string, url: string, data?: any): Promise<any> => {
  console.warn(method, url)
  // const token = localStorage.getItem("token");
  console.log("test",method, url)
   if (!token) {
    // throw new Error("Token not found in localStorage");
    console.warn("token not found")
  }
  const config: IHandleRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios({
      method,
      url, data, ...config
    });
    console.warn(response.data)
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
