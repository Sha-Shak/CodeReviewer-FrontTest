import { BellOutlined, ReloadOutlined } from '@ant-design/icons'
import { Button, FloatButton, Modal } from 'antd'
import NotificationCard from './NotificationCard'
import { useState, useEffect } from 'react';
import { INotification } from '../interfaces/notification/notification.interface';
import conf from '../config';
import { serverFetch } from '../utils/handleRequest';

function NotificationModal() {

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState<INotification[]>([]);

  useEffect(() => {
    fetchNotifications();
  }, []);


  async function fetchNotifications () {
    try {
      setLoading(true);
      const url = `${conf.API_BASE_URL}/notification/all`;
      const res : INotification[] = await serverFetch('get', url);
      setNotifications(res);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  async function convertUnseenNotifications () {
    const unSeenNotifications = notifications.filter(notification => !notification.seen);
    const idsOfUnseenNotifications = unSeenNotifications.reduce((arr: string[], notification: INotification) => [...arr, notification._id], []);

    try {
      const url = `${conf.API_BASE_URL}/notification/seen/all`;
      const res : INotification[] = await serverFetch('put', url, {ids: idsOfUnseenNotifications});

      const newNotifications = [...notifications];
      res.forEach(notification => {
        const index = newNotifications.findIndex(not => not._id === notification._id);
        newNotifications[index].seen = true;
      })

      setNotifications(newNotifications);
    } catch (error) {
      console.log(error);
    }
  }
  
  
  async function convertOneNotificationToSeen (id: string) {
    try {
      const url = `${conf.API_BASE_URL}/notification/seen/${id}`;
      const res : INotification = await serverFetch('put', url);
      const newNotifications = notifications.map(notification => notification._id === res._id ? res : notification);
      setNotifications(newNotifications);
    } catch (error) {
      console.log(error);
    }
  }

  const handleCancel = () => {
    convertUnseenNotifications();
    setShowModal(false);
  };

  const closeModal = (id: string) => {
    convertOneNotificationToSeen(id);
    setShowModal(false);
  };

  return (
    <>
      <FloatButton
        icon={<BellOutlined />}
        badge={{ count: notifications.reduce((count, not) => not.seen ? count : (count + 1), 0) }}
        onClick={() => setShowModal(true)}
      ></FloatButton>

      <Modal 
        title="Notifications"
        open={showModal} 
        onCancel={handleCancel}
        footer={null}
      >
        <Button 
          ghost 
          icon={<ReloadOutlined />}
          onClick={fetchNotifications}
          style={{ marginBottom: 10}}
          loading={loading}
        >Refresh</Button>

        {notifications.map((notification) => <NotificationCard key={"notification-" + notification._id} notification={notification} closeModal={closeModal} />)}
      </Modal>
    </>
  )
}

export default NotificationModal