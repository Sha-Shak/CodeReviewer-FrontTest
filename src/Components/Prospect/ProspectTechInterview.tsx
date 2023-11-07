import { Menu } from "antd";
import { useState } from "react";
import ProspectHardSkill from "./ProspectHardSkill";
import ProspectSoftSKill from "./ProspectSoftSkill";
import conf from "../../config";
import { useParams } from "react-router-dom";

const ProspectTechInterview = () => {
  const {id} = useParams()
  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };
  const skillUrl = conf.API_BASE_URL + `/skill/hard-skill`;
  const submitMarkUrl = conf.API_BASE_URL+`/prospect/interview/add/tech-interview/${id}`
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
      {selectedTab === "soft" && <ProspectSoftSKill currentStage= {'tech-interview'} report= {'tech-interview'} />}
      {selectedTab === "tech" && id && <ProspectHardSkill submitMarkUrl={ submitMarkUrl} hardSkillUrl={skillUrl} id={id}/>}
    </>
  );
};

export default ProspectTechInterview;
