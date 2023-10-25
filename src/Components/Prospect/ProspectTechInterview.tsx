import { Menu } from "antd";
import { useState } from "react";
import ProspectHardSkill from "./ProspectHardSkill";
import ProspectSoftSKill from "./ProspectSoftSkill";

const ProspectTechInterview = () => {
  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };
  const [selectedTab, setSelectedTab] = useState<string>("soft");
  return (
    <>
      <Menu
        onClick={(e) => handleTabClick(e.key)}
        selectedKeys={[selectedTab]}
        mode="horizontal"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Menu.Item key="soft">Soft Skills</Menu.Item>
        <Menu.Item key="tech">Hard Skills</Menu.Item>
      </Menu>
      <br />
      {selectedTab === "soft" && <ProspectSoftSKill />}
      {selectedTab === "tech" && <ProspectHardSkill />}
    </>
  );
};

export default ProspectTechInterview;
