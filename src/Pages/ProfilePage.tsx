import {
  GithubOutlined,
  LineChartOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Avatar } from "antd";
import LineCharts from "../Components/Charts/LineCharts";
const img = <img src="https://avatars.githubusercontent.com/u/52257523?v=4" />;

const ProfilePage = () => {
  return (
    <div className="profileBody">
      <div className="leftSideBar">
        <Avatar
          size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
          icon={img}
        />
        <div className="info">
          <h2 className="name">Sirajis Salekin Sajon</h2>
          <h2 className="phone">
            <PhoneOutlined /> {"    "}
            01723451762
          </h2>
          <h2 className="email">
            {" "}
            <MailOutlined /> SirajisSalekin@Sajon.com
          </h2>
          <h2 className="ghUserName">
            {" "}
            <GithubOutlined /> SirajisSaj
          </h2>
          <h2 className="student ">
            {" "}
            <LineChartOutlined /> Alumni
          </h2>
        </div>
      </div>
      <div className="content">
        <div className="row">
          <LineCharts /> <LineCharts />
        </div>
        <div className="row">
          <LineCharts /> <LineCharts />
        </div>
      </div>
      <div className="rightSideBar">Right</div>
    </div>
  );
};

export default ProfilePage;
