import {
  CheckOutlined,
  DashboardOutlined,
  GithubOutlined,
  LogoutOutlined,
  NumberOutlined,
  SlidersOutlined,
  TeamOutlined,
  UsergroupAddOutlined,

} from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Navbar = () => {
  const [current, setCurrent] = useState("students");
  const navigate = useNavigate();
  
  const onClick = (e: { key: string }) => {
    setCurrent(e.key);
  };
  
  const logout = () => {
    localStorage.removeItem('github-access-token');
    navigate('/login');
  }
  
  const items : MenuProps['items'] = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      title:"Dashboard",
      label: "Dashboard",
      children: [
        {
          label: <Link to="dashboard/sourcing">Sourcing</Link>,
          key: "sourcing",
        },
        {
          label: <Link to="dashboard/training">Training</Link>,
          key: "training",
        }
      ]
    },
    {
      key: "candidate",
      icon: <UsergroupAddOutlined />,
      title: "Candidate",
      label: "Candidate",
      children: [
        {
          key: "prospects",
          icon: <SlidersOutlined />,
          label: <Link to="/prospects">Prospects</Link>
        },
        {
          key: "deals",
          icon: <CheckOutlined />,
          label: <Link to="/deals">Deals</Link>
        },
        {
          key: "leads",
          icon: <UsergroupAddOutlined />,
          label: <Link to="/leads">Leads</Link>
        }
      ]
    },
    {
      key: "student",
      icon: <TeamOutlined />,
      title: "Student",
      label: "Student",
      children: [
        {
          key: "junior",
          label: <Link to="/students/junior">Junior</Link>
        },
        {
          key: "senior",
          label: <Link to="/students/senior">Senior</Link>
        }
      ]
    },
    {
      key: "marks",
      icon: <NumberOutlined />,
      label: <Link to="/softskills">Marking</Link>
    },
    {
      key: "github",
      icon: <GithubOutlined />,
      label: "Github",
      onClick: () => {
        window.open("https://github.com/Project-Code-Bd");
      }
    },
    {
      key: "logout",
      label: "Logout",
      icon: <LogoutOutlined />,
      danger: true,
      onClick: logout
    }
  ]
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
      >
      </Menu>
  );
};

export default Navbar;
