import axios from "axios";
import { IHandleRequestConfig } from "../interfaces/VITE/HandleRequestConfig";
export const serverFetch = async<T> (
  method: string,
  url: string,
  data?: any
): Promise<T> => {
  const token = localStorage.getItem("github-access-token");

  if (!token) {
    console.warn("Token not found");
  }

  console.log(method, url)
  const config: IHandleRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios({
      method,
      url,
      data,
      ...config,
    });

    console.warn("Response from the server", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
