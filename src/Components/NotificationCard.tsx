import { Card, Typography } from "antd"
import { INotification } from "../interfaces/notification/notification.interface"
import { useNavigate } from "react-router-dom"

function NotificationCard({ notification, closeModal }: { notification: INotification, closeModal: () => void }) {

  const { Link } = Typography

  const navigate = useNavigate();

  const goToStudentProfile = () => {
    closeModal();
    navigate('/profile/' + notification.studentId);
  }

  return (
    <Card
      title={notification.title}
      style={{ marginBottom: 10, borderColor: notification.seen ? "none" : "#bc98fa" }}
      extra={<Link onClick={goToStudentProfile}>View Profile</Link>}
    >
      <>{notification.description}</>
    </Card>
  )
}

export default NotificationCard