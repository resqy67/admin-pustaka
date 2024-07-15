import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Perubahan di sini
import { AppProviders } from "./services/context/appProvider";
import LoginAdmin from "./pages/login";
import { ProtectRoutes } from "./services/context/protectRoute";
import Dashboard from "./pages/dashboard";
import ListData from "./pages/list-data";
import InputData from "./pages/input-data";
import AddCategory from "./pages/category";
import Loans from "./pages/loans";

function App() {
  return (
    <Router>
      <AppProviders>
        <Routes>
          <Route index element={<LoginAdmin />} />
          <Route element={<ProtectRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/list-data" element={<ListData />} />
            <Route path="/list-user" element={<InputData />} />
            <Route path="/add-category" element={<AddCategory />} />
            <Route path="/list-loans" element={<Loans />} />
          </Route>
        </Routes>
      </AppProviders>
    </Router>
  );
}

export default App;
