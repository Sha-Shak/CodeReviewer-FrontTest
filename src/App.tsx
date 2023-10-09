import DealsPage from "./Pages/DealsPage";

import { Route, Routes } from "react-router-dom";
import LeadsPage from "./Pages/LeadsPage";
import SlatePage from "./Pages/SlatePage";
import StudentsPage from "./Pages/StudentsPage";

const App = () => (
  <Routes>
    <Route path="/" element={<SlatePage />}>
      <Route path="candidates" element={<DealsPage />}>
        <Route path="deals" index element={<DealsPage />} />
        <Route path="leads" element={<LeadsPage />} />
      </Route>
      <Route path="students" element={<StudentsPage />}></Route>
    </Route>
  </Routes>
);

export default App;
