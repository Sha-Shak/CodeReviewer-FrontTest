import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";

const SlatePage = () => {
  return (
    <div className="slateBody">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default SlatePage;
