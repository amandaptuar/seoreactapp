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
import AdminUserDetail from './components/AdminUserDetail';
import FloatingCTA from './components/FloatingCTA';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import FeedbackCTA from './components/FeedbackCTA';
import Dashboard from './components/Dashboard';
import RegistrationSuccess from './components/RegistrationSuccess';
import SampleDashboard from './pages/SampleDashboard';
import Features from './pages/Features';
import Benefits from './pages/Benefits';
import HowItWorksPage from './pages/HowItWorksPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import JoinUsPage from './pages/JoinUsPage';
import PricingPage from './pages/PricingPage';
import DashboardApp from './dashbaord-app/App';
import PremiumLoader from './components/PremiumLoader';


const ProtectedRoute = ({ children }) => {
// ... existing code ...
  const userEmail = sessionStorage.getItem('userEmail');
  if (!userEmail) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const AdminProtectedRoute = ({ children }) => {
  const adminLoggedIn = sessionStorage.getItem('adminLoggedIn');
  if (adminLoggedIn !== 'true') {
    return <Navigate to="/admin-login" replace />;
  }
  return children;
};

const GlobalComponents = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const isDashboard = location.pathname.startsWith('/dashboard');
  
  if (isAdmin) return null;

  return (
    <>
      <FloatingCTA />
      <FloatingWhatsApp />
      {!isDashboard && <FeedbackCTA />}
    </>
  );
};

function App() {
  return (
    <Router>
      <PremiumLoader />
      <ScrollToTop />
      <GlobalComponents />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/benefits" element={<Benefits />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/join-us" element={<JoinUsPage />} />
        <Route path="/pricing" element={<PricingPage />} />

        
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
        <Route path="/registration-success" element={<RegistrationSuccess />} />
        <Route path="/sample-report" element={<SampleDashboard />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        {/* Protected Admin Routes */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={
          <AdminProtectedRoute>
            <Admin />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/user/:id" element={
          <AdminProtectedRoute>
            <AdminUserDetail />
          </AdminProtectedRoute>
        } />

        {/* Dashboard App Integration */}
        <Route path="/admin-panel/*" element={<DashboardApp />} />
      </Routes>
    </Router>
  );
}

export default App;
