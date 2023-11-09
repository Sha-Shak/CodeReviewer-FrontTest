import { useEffect, useState } from "react";
import FunnelChart from "../Components/Charts/Prospect/FunnelChart";
import PositionChart from "../Components/Charts/Prospect/PositionChart";
import conf from "../config";
import { serverFetch } from "../utils/handleRequest";

interface IPositionData {
  prospectId: string;
  prospectName: string;
  softSkillAverage: string;
  hardSkillAverage: string;
}

export interface IFunnelData {
  stage: string;
  count: number;
  name: string;
}

const SourceDashboardPage = () => {
  const positionUrl = conf.API_BASE_URL + "/prospect/get/all/position";
  const funnelUrl = conf.API_BASE_URL + "/prospect/all/sortbystage/count";

  const [positionData, setPositionData] = useState<IPositionData[]>([]);
  const [funnelData, setFunnelData] = useState<IFunnelData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const positionData = await serverFetch<IPositionData[]>(
          "get",
          positionUrl
        );
        setPositionData(positionData);

        const funnelData = await serverFetch<Record<string, number>>(
          "get",
          funnelUrl
        );
        console.log("funnel", funnelData);

        const funnelDataArray: IFunnelData[] = Object.entries(funnelData).map(
          ([stage, count]) => ({
            stage,
            count,
            name: stage,
          })
        );

        setFunnelData(funnelDataArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex">
      {positionData.length > 0 && <PositionChart data={positionData} />}
      {funnelData.length > 0 && (
        <FunnelChart data={funnelData.filter((item) => item.count > 0).sort((item1,item2)=> item2.count - item1.count)} />
      )}
    </div>
  );
};

export default SourceDashboardPage;
