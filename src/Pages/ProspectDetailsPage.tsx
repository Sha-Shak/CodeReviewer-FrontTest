import { Menu, MenuProps } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RadarChartComponent from "../Components/Charts/Prospect/ProspectRadarChart";
import ProfileBadge from "../Components/ProfileBadge";
import ProspectAssignment from "../Components/Prospect/ProspectAssignment";
import ProspectSoftSkill from "../Components/Prospect/ProspectSoftSkill";
import ProspectTechInterview from "../Components/Prospect/ProspectTechInterview";
import conf from "../config";
import { IProspect } from "../interfaces/prospects/prospects.interface";
import { serverFetch } from "../utils/handleRequest";
import PersonalityTagsContainer from "../Components/Personality/PersonalityTagsContainer";
import ProspectPersonalityTagsContainer from "../Components/Prospect/Personality/ProspectPersonalityTagsContainer";

const ProspectDetailsPage = () => {
  const [selectedTab, setSelectedTab] = useState<string>("soft");
  const [profile, setProfile] = useState<IProspect>({} as IProspect);
  let { id } = useParams();
  const profileUrl = conf.API_BASE_URL + `/prospect/${id}`;
  const getProfile = async () => {
    try {
      
      const result = await serverFetch<IProspect>("get", profileUrl);
      await setProfile(result);
    } catch (error) {
      console.warn("profile error", error)
    }
  };
  useEffect(() => {
    getProfile();
  }, []);
  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };


  const items : MenuProps['items'] = [
    {
      key: 'soft',
      label: 'Motivational Interview'
    },
    {
      key: 'tech',
      label: 'Technical Interview'
    },
    {
      key: 'assignment',
      label: 'Coding Assignment'
    }
  ];

  return (
    <div className="tableBody">
      <ProfileBadge profile={profile} />
      <div className="flex">
        <RadarChartComponent
          skillUrl={`${conf.API_BASE_URL}/prospect/soft-skills/${id}`}
          avgMarksUrl={`${conf.API_BASE_URL}/prospect/get/softskill/avgmarks`}
          title="Motivational Interview"
        />
        <RadarChartComponent
          skillUrl={`${conf.API_BASE_URL}/prospect/interview/tech-interview/${id}`}
          avgMarksUrl={`${conf.API_BASE_URL}/prospect/get/avgmarks/tech-interview`}
          title="Tech Interview"
        />
        <RadarChartComponent
          skillUrl={`${conf.API_BASE_URL}/prospect/interview/coding-assignment/${id}`}
          avgMarksUrl={`${conf.API_BASE_URL}/prospect/get/avgmarks/coding-assignment`}
          title="Coding Assignment"
        />
      </div>
      <Menu
        onClick={(e) => handleTabClick(e.key)}
        selectedKeys={[selectedTab]}
        mode="horizontal"
        style={{ display: "flex", justifyContent: "center" }}
        items={items}
      />
      <br />
      {selectedTab === "soft" && (
        <ProspectSoftSkill
          currentStage={profile.stage}
          report={"motivational-interview"}
        />
      )}
      {selectedTab === "tech" && <ProspectTechInterview />}
      {selectedTab === "assignment" && <ProspectAssignment currentStage = {profile.stage}/>}
      {profile?.stage === "interview-done" && <div>No form will be shown.</div>}
      <br />
      {
        profile._id && <ProspectPersonalityTagsContainer id={profile._id} />
      }
    </div>
  );
};

export default ProspectDetailsPage;
