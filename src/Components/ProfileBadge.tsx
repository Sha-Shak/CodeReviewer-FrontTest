import { Col, Row, Skeleton, Space } from "antd";
import avatar from "../assets/defaultavatar.png";
import { IProspect } from "../interfaces/prospects/prospects.interface";

const ProfileBadge = ({ profile }: { profile: IProspect }) => {
  console.log("badge", profile);
  const handleStage = (stage: string) => {
    switch (stage) {
      case "motivational-interview":
        return "Motivational Interview";
      case "tech-interview":
        return "Technical Interview";
      case "failed-tech-interview":
        return "Failed Technical Interview";
      case "coding-assignment":
        return "Coding Assignment";
      case "coding-assignment-passed":
        return "Coding Assignment Passed";
      default:
        break;
    }
  };

  return (
    <div style={{ border: "1px solid #d9d9d9", padding: "15px" }}>
      {!profile.first_name && !profile.last_name ? (
        <Skeleton active />
      ) : (
        <Space align="center">
          <Row gutter={50}>
            <Col span={6}>
              <img className="w-24" src={avatar} alt="avatar" />
            </Col>
            <Col span={18}>
              <Row gutter={100}>
                <Col>
                  <h2>{profile.first_name + " " + profile.last_name}</h2>
                  <h5>Stage: {handleStage(profile.stage)}</h5>
                </Col>
                <Col>
                  <div>
                    <h2>Interview Attempts {profile.interviewAttempts.map(ia=> <p>{ia.name.replace('-', " ")} : {ia.count}</p>)}</h2>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Space>
      )}
    </div>
  );
};

export default ProfileBadge;
