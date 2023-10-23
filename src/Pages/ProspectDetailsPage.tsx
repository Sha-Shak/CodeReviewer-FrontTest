import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RadarChartComponent from "../Components/Charts/Prospect/ProspectRadarChart";
import ProfileBadge from "../Components/ProfileBadge";
import ProspectAssignment from "../Components/Prospect/ProspectAssignment";
import ProspectHardSkill from "../Components/Prospect/ProspectHardSkill";
import ProspectSoftSkill from "../Components/Prospect/ProspectSoftSkill";
import conf from "../config";
import { IProspect } from "../interfaces/prospects/prospects.interface";
import { serverFetch } from "../utils/handleRequest";

const ProspectDetailsPage = () => {
  const [selectedTab, setSelectedTab] = useState<string>("soft");
  const [profile, setProfile] = useState<IProspect>({} as IProspect);
  let { id } = useParams();
  const profileUrl = conf.API_BASE_URL + `/prospect/${id}`;
  const getProfile = async () => {
    const result = await serverFetch("get", profileUrl);
    await setProfile(result);
    console.log("profile", result);
  };
  useEffect(() => {
    getProfile();
  }, []);
  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <div className="tableBody">
      <ProfileBadge profile={profile} />
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
      {profile?.stage === "interview-done" && <div>No form will be shown.</div>}
    </div>
  );
};

export default ProspectDetailsPage;
