import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
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
        <Route path="/" element={<AccountSettings />} />
        <Route path="/authentication" element={<Authentication />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/credit-purchase" element={<CreditPurchase />} />
        <Route path="/generated-images-gallery" element={<GeneratedImagesGallery />} />
        <Route path="/account-settings" element={<AccountSettings />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
