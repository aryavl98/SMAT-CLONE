import { Routes, Route } from "react-router-dom";

import UserDashboard from "./Pages/user-dashboard/UserDashboard";
import InstagramLoginAndShare from "./Pages/Instagram/InstagramLoginAndShare";





function App() {
  return (
    <Routes>
      <Route path="/" element={<UserDashboard/>} />
      <Route path="/instagram" element={<InstagramLoginAndShare/>} />
    </Routes>
  );
}

export default App;
