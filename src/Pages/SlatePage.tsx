import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { BellOutlined } from "@ant-design/icons";
import { FloatButton, Modal } from "antd";
import { useState } from "react";
import NotificationCard from "../Components/NotificationCard";

const notifications = [
  {
    _id: "1",
    title: "Negative review for Samiya Kazi",
    description: "Communication, Work Ethic",
    studentId: "123456",
    seen: false
  },
  {
    _id: "2",
    title: "Negative review for Neol Alam",
    description: "Communication, Work Ethic",
    studentId: "123456",
    seen: false
  },
  {
    _id: "3",
    title: "Negative review for John Smith",
    description: "Communication, Work Ethic",
    studentId: "123456",
    seen: true
  },
  {
    _id: "4",
    title: "Negative review for Samiya Kazi",
    description: "Communication, Work Ethic",
    studentId: "123456",
    seen: true
  },
]

const SlatePage = () => {

  const [showModal, setShowModal] = useState(false);

  const handleCancel = () => {
    setShowModal(false);
  };

  const closeModal = () => setShowModal(false);

  return (
    <div className="slateBody">
      <Navbar />
      <Outlet />
      <FloatButton
        icon={<BellOutlined />}
        badge={{ count: notifications.reduce((count, not) => not.seen ? count : (count + 1), 0) }}
        onClick={() => setShowModal(true)}
      ></FloatButton>

      <Modal title="Notifications" open={showModal} onCancel={handleCancel}>
        {notifications.map((notification) => <NotificationCard notification={notification} closeModal={closeModal} />)}
      </Modal>
    </div>
  );
};

export default SlatePage;
