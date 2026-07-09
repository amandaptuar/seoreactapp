import { Routes, Route, Navigate } from "react-router-dom"
import AdminLayout from "./components/layout/AdminLayout"
import './index.css'

// Pages
import Dashboard from "./pages/Dashboard"
import Users from "./pages/Users"
import UserDetail from "./pages/UserDetail"
import Subscriptions from "./pages/Subscriptions"
import Reports from "./pages/Reports"
import Enquiries from "./pages/Enquiries"
import Login from "./pages/Login"

function DashboardApp() {
  return (
    <div className="dashbaord-root">
      <Routes>
        <Route path="/" element={<Navigate to={sessionStorage.getItem("isAuthenticated") === "true" ? "/admin-panel/admin" : "/admin-panel/login"} replace />} />
        <Route path="login" element={<Login />} />
        
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="users/:id" element={<UserDetail />} />
          <Route path="subscriptions" element={<Subscriptions />} />
          <Route path="reports" element={<Reports />} />
          <Route path="enquiries" element={<Enquiries />} />
        </Route>
      </Routes>
    </div>
  )
}

export default DashboardApp
