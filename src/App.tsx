import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./util/AuthContext";
import ProtectedRoutes from "./util/ProtectedRoutes";
import AuthRoute from "./util/AuthRoute";

// Pages
import Home from "./pages/Home";
import Sell from "./pages/Sell";
import Medicine from "./pages/Medicine";
import ViewMedicine from "./pages/medicine/UpdateMedicine";
import Stocks from "./pages/Stocks";
import OtherSupplies from "./pages/OtherSupplies";
import Request from "./pages/Request";
import Login from "./pages/auth/Login";

export default function App() {
  return (
    <MantineProvider
      theme={{
        fontFamily: "Inter, sans-serif",
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Notifications position="top-right" />
      <ModalsProvider>
        <Router>
          <AuthProvider>
            <Routes>
              <Route element={<AuthRoute />}>
                <Route path="login" element={<Login />} />
              </Route>
              <Route element={<ProtectedRoutes />}>
                <Route path="/" element={<Home />} />
                <Route path="/sell" element={<Sell />} />
                <Route path="/medicine" element={<Medicine />} />
                <Route path="/medicine/:id" element={<ViewMedicine />} />
                <Route path="/othersupplies" element={<OtherSupplies />} />
                <Route path="/stocks" element={<Stocks />} />
                <Route path="/request" element={<Request />} />
              </Route>
            </Routes>
          </AuthProvider>
        </Router>
      </ModalsProvider>
    </MantineProvider>
  );
}
