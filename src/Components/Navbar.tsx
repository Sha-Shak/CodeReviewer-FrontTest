import {
  GithubOutlined,
  LogoutOutlined,
  NumberOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
  const [current, setCurrent] = useState("deals");
  const navigate = useNavigate();

  const onClick: MenuProps["onClick"] = (e) => {
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
      items={items}
    />
    </>
  );
};

export default Navbar;
