import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AppLayout from '@layouts/AppLayout';
import LoginPage from '@pages/LoginPage';
import { DriverUsers } from '@pages/users/drivers/driversUsers.tsx';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* Dashboard Layout */}
        <Route element={<AppLayout />}>
          {/*<Route path="/profile" element={<SupervisorProfile />} />
          <Route path="/loaders" element={<LoaderUsers />} />
          <Route path="/vans" element={<VanTracker />} />*/}
          <Route path="/drivers" element={<DriverUsers />} />
          {/*<Route path="/sales" element={<SalesLeaderboard />} />
          <Route path="/collections" element={<CollectionsLeaderboard />} />
          <Route path="/journey" element={<PlannedVsActualJourney />} />
          <Route path="/settlements" element={<SettlementsModule />} />
          <Route path="/sales-analytics" element={<SalesAnalytics />} />
          <Route path="/collections-reports" element={<CollectionReports />} />
          <Route path="/returns-adjustments" element={<ReturnAdjustments />} />
          <Route path="/promotions" element={<PromotionsManager />} />
          <Route path="/targets" element={<ManageTargetsScreen />} />
          <Route path="/van-load-requests" element={<LoadRequestPortal />} />*/}
        </Route>
        {/* Fallback Route */}
      </Routes>
    </Router>
  );
}
