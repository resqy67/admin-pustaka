import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Perubahan di sini
import { AppProviders } from "./services/context/appProvider";
import LoginAdmin from "./pages/login";
import { ProtectRoutes } from "./services/context/protectRoute";
import Dashboard from "./pages/dashboard";
import ListData from "./pages/list-data";
import InputData from "./pages/input-data";

function App() {
  return (
    <Router>
      <AppProviders>
        <Routes>
          <Route index element={<LoginAdmin />} />
          <Route element={<ProtectRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/list-data" element={<ListData />} />
            <Route path="/input-data" element={<InputData />} />
          </Route>
        </Routes>
      </AppProviders>
    </Router>
  );
}

export default App;
