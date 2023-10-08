import { useEffect, useState } from "react";
import TableComponent from "../Components/TableComponent";
import {
  IDeals,
  IDealsDataList,
} from "../interfaces/zendesk/deals/deals.interface";
import { IDealsMeta } from "../interfaces/zendesk/deals/deals.meta.interface";
import { serverFetch } from "../utils/handleRequest";

const DealsPage = () => {
  const [deals, setDeals] = useState({} as IDeals[]);
  const [meta, setMeta] = useState({} as IDealsMeta);
  const apiUrl = import.meta.env.VITE_SERVER_URL;
  const url = "http://localhost:3331/zen/getdata/deals"; //`${apiUrl}/zen/deals`;
  const fetchData = async () => {
    const data: IDealsDataList = await serverFetch("get", url);

    setDeals(data.items);
    // console.log("meta", data.meta)
    setMeta(data.meta);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="dealBody">
      <TableComponent deals={deals} />
    </div>
  );
};

export default DealsPage;
