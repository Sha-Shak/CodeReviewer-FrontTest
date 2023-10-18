import {
  GithubOutlined,
  NumberOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

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
];

const Navbar = () => {
  const [current, setCurrent] = useState("deals");

  const onClick: MenuProps["onClick"] = (e) => {
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
      items={items}
    />
  );
};

export default Navbar;
