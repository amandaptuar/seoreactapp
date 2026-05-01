import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import ScrollToTop from './components/ScrollToTop';
import Question from './components/Question';
import Payment from './components/Payment';
import PaymentSuccess from './components/PaymentSuccess';
import AdminLogin from './components/AdminLogin';
import Admin from './components/Admin';
import FloatingCTA from './components/FloatingCTA';
import FloatingWhatsApp from './components/FloatingWhatsApp';

const ProtectedRoute = ({ children }) => {
// ... existing code ...
  const userEmail = localStorage.getItem('userEmail');
  if (!userEmail) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const AdminProtectedRoute = ({ children }) => {
  const adminLoggedIn = localStorage.getItem('adminLoggedIn');
  if (adminLoggedIn !== 'true') {
    return <Navigate to="/admin-login" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <FloatingCTA />
      <FloatingWhatsApp />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        
        {/* Protected User Routes */}
        <Route path="/question" element={
          <ProtectedRoute>
            <Question />
          </ProtectedRoute>
        } />
        <Route path="/payment" element={
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        } />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        
        {/* Protected Admin Routes */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={
          <AdminProtectedRoute>
            <Admin />
          </AdminProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
