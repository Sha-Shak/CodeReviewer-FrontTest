import DealsPage from "./Pages/DealsPage";

import { Route, Routes } from "react-router-dom";
import LeadsPage from "./Pages/LeadsPage";
import SlatePage from "./Pages/SlatePage";
import StudentsPage from "./Pages/StudentsPage";
import ProfilePage from "./Pages/ProfilePage";

const App = () => (
  <>
    <Routes>
      <Route path="/" element={<SlatePage />}>
        <Route path="deals" index element={<DealsPage />} />
        <Route path="leads" element={<LeadsPage />} />
        <Route path="students" element={<StudentsPage />}></Route>
        <Route path="profile" element={<ProfilePage />}></Route>
      </Route>
    </Routes>
  </>
);

export default App;
