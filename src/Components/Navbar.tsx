import {
  GithubOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
// import logo from '../assets/old-logo.png'

const logo = <img src="../assets/old-logo.png" alt="1Logo" />;

const items: MenuProps["items"] = [
  // { key: "logo", label: <img src="../assets/old-logo.png" alt="1Logo" /> },
  {
    label: <Link to="/candidates/deals">Candidates</Link>,
    key: "mail",
    icon: <UsergroupAddOutlined />,
  },

  {
    label: "Studnets",
    key: "SubMenu",
    icon: <TeamOutlined />,
    children: [
      {
        label: <Link to="/students"> Junior</Link>,
        key: "junior",
      },
      {
        label: "Senior",
        key: "senior",
      },
    ],
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

const Navbar: React.FC = () => {
  const [current, setCurrent] = useState("mail");

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
