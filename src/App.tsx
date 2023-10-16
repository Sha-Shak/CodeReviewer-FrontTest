import DealsPage from "./Pages/DealsPage";

import { Route, Routes } from "react-router-dom";
import LeadsPage from "./Pages/LeadsPage";
import SlatePage from "./Pages/SlatePage";
import StudentsPage from "./Pages/StudentsPage";
import ProfilePage from "./Pages/ProfilePage";
import { ConfigProvider } from "antd";

const App = () => (
  <>
  <ConfigProvider
    theme={{
      components: {
        Button: {
          colorPrimary: '#8884d8',
          algorithm: true, // Enable algorithm
          colorBgContainer: '#8884d8'
        },
      },
      token: {
        // Seed Token
        colorPrimary: '#8884d8',
        borderRadius: 2,

        // Alias Token
        // colorBgContainer: '#f6ffed',
      },
    }}
  >
    <Routes>
      <Route path="/" element={<SlatePage />}>
        <Route path="deals" element={<DealsPage />} />
        <Route path="leads" element={<LeadsPage />} />
        <Route path="students" element={<StudentsPage />}></Route>
        <Route path="profile/:id" element={<ProfilePage />}></Route>
      </Route>
    </Routes>
  </ConfigProvider>
  </>
);

export default App;
