import React, { useEffect, useState } from "react";
import conf from "../config";
import { serverFetch } from "../utils/handleRequest";
import PositionChart from "../Components/Charts/Prospect/PositionChart";

export interface IPositionData {
  prospectId: string;
  prospectName: string;
  softSkillAverage: string;
  HardSkillAverage: string;
}

const SourceDashboardPage = () => {
  const url = conf.API_BASE_URL + `/prospect/get/all/position`;
  const [positionData, setPositionData] = useState<IPositionData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await serverFetch<IPositionData[]>("get", url);
        console.log("position data", data)
        setPositionData(data);
      } catch (error) {
        // Handle any errors here
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); 

  return <div className= "flex">
    
   <PositionChart data={positionData} />
  </div>
};

export default SourceDashboardPage;
