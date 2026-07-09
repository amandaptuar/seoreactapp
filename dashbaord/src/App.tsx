import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import AdminLayout from "./components/layout/AdminLayout"

// Pages
import Dashboard from "./pages/Dashboard"
import Users from "./pages/Users"
import UserDetail from "./pages/UserDetail"
import Subscriptions from "./pages/Subscriptions"
import Reports from "./pages/Reports"
import Login from "./pages/Login"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={localStorage.getItem("isAuthenticated") === "true" ? "/admin" : "/login"} replace />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="users/:id" element={<UserDetail />} />
          <Route path="subscriptions" element={<Subscriptions />} />
          <Route path="reports" element={<Reports />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
