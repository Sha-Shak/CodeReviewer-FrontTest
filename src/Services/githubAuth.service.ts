import conf from "../config";
import { serverFetch } from "../utils/handleRequest";

export async function getAccessToken (code: string) {
  try {
    const url = conf.API_BASE_URL + '/github/github-access';
    const res : string = await serverFetch("post", url, {code});
    return res;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    else throw new Error('Unexpected error.')
  }
}

export async function checkIfStaff (token: string) {
  try {
    const url =  conf.API_BASE_URL + '/github/role/staff';
    const res : boolean = await serverFetch("post", url, {token});
    return res;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    else throw new Error('Unexpected error.')
  }
}