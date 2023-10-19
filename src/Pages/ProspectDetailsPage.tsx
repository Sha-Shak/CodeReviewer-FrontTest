import { Menu } from "antd";
import { useState } from "react";
import ProspectSoftSkill from "../Components/Prospect/ProspectSoftSkill";
import ProspectHardSkill from "../Components/Prospect/ProspectHardSkill";
import ProspectAssignment from "../Components/Prospect/ProspectAssignment";
import RadarChartComponent from "../Components/Charts/Prospect/ProspectRadarChart";

const ProspectDetailsPage = () => {
  const [selectedTab, setSelectedTab] = useState<string>("soft"); // Default to "soft" tab

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <div className="tableBody">
      <RadarChartComponent />
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
