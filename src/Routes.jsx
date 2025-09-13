import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ProtectedRoute from './components/ProtectedRoute';
import Authentication from './pages/authentication';
import AdminDashboard from './pages/admin-dashboard';
import CreditPurchase from './pages/credit-purchase';
import GeneratedImagesGallery from './pages/generated-images-gallery';
import AccountSettings from './pages/account-settings';
import Dashboard from './pages/dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/authentication" element={<Authentication />} />
        <Route path="/admin-dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/credit-purchase" element={<ProtectedRoute><CreditPurchase /></ProtectedRoute>} />
        <Route path="/generated-images-gallery" element={<ProtectedRoute><GeneratedImagesGallery /></ProtectedRoute>} />
        <Route path="/account-settings" element={<ProtectedRoute><AccountSettings /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
