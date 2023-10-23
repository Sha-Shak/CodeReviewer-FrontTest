import DealsPage from "./Pages/DealsPage";

import { ConfigProvider } from "antd";
import { Route, Routes } from "react-router-dom";
import LeadsPage from "./Pages/LeadsPage";
import ProfilePage from "./Pages/ProfilePage";
import SlatePage from "./Pages/SlatePage";
import StudentsPage from "./Pages/StudentsPage";
import ProspectPage from "./Pages/ProspectPage";
import ProspectDetailsPage from "./Pages/ProspectDetailsPage";
import LoginPage from "./Pages/LoginPage";
import RedirectLoginPage from "./Pages/RedirectLoginPage";

const App = () => (
  <>
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: "#8884d8",
            algorithm: true, // Enable algorithm
            colorBgContainer: "#8884d8",
          },
        },
        token: {
          // Seed Token
          colorPrimary: "#8884d8",
          borderRadius: 2,

          // Alias Token
          // colorBgContainer: '#f6ffed',
        },
      }}
    >
      <Routes>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/redirect/oauth" element={<RedirectLoginPage/>} />
        <Route path="/" element={<SlatePage />}>
          <Route path="deals" element={<DealsPage />} />
          <Route path="leads" element={<LeadsPage />} />
          <Route path="students" element={<StudentsPage />} />
          <Route path="profile/:id" element={<ProfilePage />} />
          {/* <Route path="softskills" element={<SoftSkillsPage />} /> */}
          <Route path="prospects" element={<ProspectPage />} />
          <Route path="prospect/:id" element={<ProspectDetailsPage />} />
        </Route>
      </Routes>
    </ConfigProvider>
  </>
);

export default App;
