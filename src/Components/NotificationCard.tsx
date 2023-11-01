import { Card, Typography } from "antd"
import { INotification } from "../interfaces/notification/notification.interface"
import { useNavigate } from "react-router-dom"

function NotificationCard({ notification, closeModal }: { notification: INotification, closeModal: (id: string) => void }) {

  const { Link } = Typography

  const navigate = useNavigate();

  const goToStudentProfile = () => {
    closeModal(notification._id);
    navigate('/profile/' + notification.studentId);
  }

  return (
    <Card
      title={notification.title}
      style={{ marginBottom: 10, borderColor: notification.seen ? "#e7deff" : "#bc98fa" }}
      extra={<Link onClick={goToStudentProfile}>View Profile</Link>}
    >
      <>{notification.description}</>
    </Card>
  )
}

export default NotificationCard