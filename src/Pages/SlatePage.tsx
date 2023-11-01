import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import NotificationModal from "../Components/NotificationModal";

const SlatePage = () => {

  return (
    <div className="slateBody">
      <Navbar />
      <Outlet />
      <NotificationModal />
    </div>
  );
};

export default SlatePage;
