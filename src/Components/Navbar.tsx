import {
  CheckOutlined,
  GithubOutlined,
  LogoutOutlined,
  NumberOutlined,
  SlidersOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
  
} from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const { SubMenu } = Menu;
const items: MenuProps["items"] = [
  {
    label: <Link to="/leads">Leads</Link>,
    key: "leads",
    icon: <UsergroupAddOutlined />,
  },
  {
    label: <Link to="/prospects">Prospects</Link>,
    key: "prospects",
    icon: <UsergroupAddOutlined />,
  },
  {
    label: <Link to="/deals">Deals</Link>,
    key: "deals",
    icon: <UsergroupAddOutlined />,
  },

  {
    label: <Link to="/students">Students</Link>,
    key: "students",
    icon: <TeamOutlined />,
  },
  {
    label: <Link to="/softskills">Marking</Link>,
    key: "marks",
    icon: <NumberOutlined />,
  },
  {
    label: (
      <a
        href="https://github.com/Project-Code-Bd"
        target="_blank"
        rel="noopener noreferrer"
      >
        Github
      </a>
    ),
    key: "github",
    icon: <GithubOutlined />,
  },
  {
    label: "Logout",
    key: "logout",
    icon: <LogoutOutlined />,
    danger: true
  },
];

const Navbar = () => {
  const [current, setCurrent] = useState("students");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setCurrent(location.pathname.split('/')[1]);
  }, [location])
  

  const onClick = (e: { key: string }) => {
    setCurrent(e.key);
    if (e.key === "logout") {
      localStorage.removeItem('github-access-token');
      navigate('/login');
    }
  };

  return (
    <>
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
    </>
  );
};

export default Navbar;
