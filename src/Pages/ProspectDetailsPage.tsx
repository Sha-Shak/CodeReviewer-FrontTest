import { Menu } from "antd";
import { useState } from "react";
import ProspectSoftSkill from "../Components/Prospect/ProspectSoftSkill";
import ProspectHardSkill from "../Components/Prospect/ProspectHardSkill";
import ProspectAssignment from "../Components/Prospect/ProspectAssignment";
import RadarChartComponent from "../Components/Charts/Prospect/ProspectRadarChart";
import conf from "../config";
import { useParams } from "react-router-dom";

const ProspectDetailsPage = () => {
  const [selectedTab, setSelectedTab] = useState<string>("soft"); 
 let { id } = useParams();
  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <div className="tableBody">
      <div className="flex">
        <RadarChartComponent
          url={`${conf.API_BASE_URL}/prospect/assignment/interview/${id}/coding-assignment`}
          title="Coding Assignment"
        />
        <RadarChartComponent
          url={`${conf.API_BASE_URL}/prospect/hard-skills/interview/${id}/tech-interview`}
          title="Tech Interview"
        />
        <RadarChartComponent
          url={`${conf.API_BASE_URL}/prospect/soft-skills/interview/${id}`}
          title="Motivation Interview"
        />
      </div>
      <Menu
        onClick={(e) => handleTabClick(e.key)}
        selectedKeys={[selectedTab]}
        mode="horizontal"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Menu.Item key="soft">Motivation Interview</Menu.Item>
        <Menu.Item key="tech">Tech Interview</Menu.Item>
        <Menu.Item key="assignment">Coding Assignment</Menu.Item>
      </Menu>
      <br />
      {selectedTab === "soft" && <ProspectSoftSkill />}
      {selectedTab === "tech" && <ProspectHardSkill />}
      {selectedTab === "assignment" && <ProspectAssignment />}
    </div>
  );
};

export default ProspectDetailsPage;
