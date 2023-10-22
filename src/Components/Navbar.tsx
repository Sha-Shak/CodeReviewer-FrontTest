import {
  CheckOutlined,
  GithubOutlined,
  NumberOutlined,
  SlidersOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
  
} from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;

const Navbar = () => {
  const [current, setCurrent] = useState("leads");

  const onClick = (e: { key: string }) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <Menu
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        padding: "0.5rem",
        borderBottom: "1px solid lightgray",
        marginBottom: "1rem",
      }}
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
    >
      <SubMenu
        key="candidate"
        icon={<UsergroupAddOutlined />}
        title="Candidate"
      >
        <Menu.Item key="prospects" icon={<SlidersOutlined />}>
          <Link to="/prospects">Prospects</Link>
        </Menu.Item>
        <Menu.Item key="deals" icon={<CheckOutlined />}>
          <Link to="/deals">Deals</Link>
        </Menu.Item>
        <Menu.Item key="leads" icon={<UsergroupAddOutlined />}>
          <Link to="/leads">Zendesk Leads</Link>
        </Menu.Item>
      </SubMenu>
      <SubMenu key="student" icon={<TeamOutlined />} title="Student">
        <Menu.Item key="junior">
          <Link to="students/junior">Junior</Link>
        </Menu.Item>
        <Menu.Item key="senior">
          <Link to="students/senior">Senior</Link>
        </Menu.Item>
      </SubMenu>
      <Menu.Item key="marks" icon={<NumberOutlined />}>
        <Link to="/softskills">Marking</Link>
      </Menu.Item>
      <Menu.Item
        key="github"
        icon={<GithubOutlined />}
        onClick={(e) => {
          window.open("https://github.com/Project-Code-Bd");
        }}
      >
        Github
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;
