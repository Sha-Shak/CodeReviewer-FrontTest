import { Col, Row, Skeleton, Space } from "antd";
import avatar from "../assets/defaultavatar.png";
import { IProspect } from "../interfaces/prospects/prospects.interface";

const ProfileBadge = ({ profile }: { profile: IProspect }) => {
  console.log("first", profile);
  const handleStage = () => {
    switch (profile.stage) {
      case "motivational-interview":
        return "Motivational Interview";
      case "tech-interview":
        return "Technical Interview";
      case "coding-assignment":
        return "Coding Assignment";
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
          <Row gutter={100}>
            <Col span={6}>
              <img className="w-24" src={avatar} alt="avatar" />
            </Col>
            <Col span={18}>
              <h2>{profile.first_name + " " + profile.last_name}</h2>
              <h5>Stage: {handleStage()}</h5>
            </Col>
          </Row>
        </Space>
      )}
    </div>
  );
};

export default ProfileBadge;
