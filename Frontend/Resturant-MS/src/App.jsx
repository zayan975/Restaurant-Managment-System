import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from "react-router-dom";
import { Home, Auth, Orders, Tables, Menu } from "./pages";
import Login from "./components/auth/Login";
import Dashboard from "./pages/Dashboard"
import Header from "./components/shared/Header";
import BottomNav from "./components/shared/BottomNav";

function Layout() {
  const location = useLocation();
  const hideLayout = ["/auth", "/login"].includes(location.pathname);

  return (
    <>
      {!hideLayout && <Header />}
      {!hideLayout && <BottomNav />}

      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tables"
          element={
            <ProtectedRoute>
              <Tables />
            </ProtectedRoute>
          }
        />

        <Route
          path="/menu"
          element={
            <ProtectedRoute>
              <Menu />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />


        <Route path="/auth" element={<Auth />} />
        <Route path="/login" element={<Login />} />


        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </>
  );
}




const ProtectedRoute = ({ children }) => {
  const [token, setToken] = React.useState(localStorage.getItem("token"));

  React.useEffect(() => {
    const handle = () => setToken(localStorage.getItem("token"));


    window.addEventListener("tokenUpdated", handle);
    window.addEventListener("storage", handle);

    return () => {
      window.removeEventListener("tokenUpdated", handle);
      window.removeEventListener("storage", handle);
    };
  }, []);

  if (!token) return <Navigate to="/auth" replace />;

  return children;
};


function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
