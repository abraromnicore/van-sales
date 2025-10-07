import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ScrollToTop } from '@components/common/ScrollToTop';
import AppLayout from '@layouts/AppLayout';
import CollectionReports from '@pages/analyticsReporting/collectionReports';
import ReturnAdjustments from '@pages/analyticsReporting/returnAdjustments';
import SalesAnalytics from '@pages/analyticsReporting/salesAnalytics';
import LoginPage from '@pages/LoginPage';
import NotFound from '@pages/otherPages/NotFound';
import ManageTargetsScreen from '@pages/promotionsManager/manageTargetsScreen';
import PromotionsManager from '@pages/promotionsManager/PromotionsManager';
import LoadRequestPortal from '@pages/SettlementsModule/LoadRequestPortal';
import SettlementsModule from '@pages/SettlementsModule/SettlementsModule';
import CollectionsLeaderboard from '@pages/teamPerformance/CollectionsLeaderboard';
import PlannedVsActualJourney from '@pages/teamPerformance/JourneyAnalysis';
import SalesLeaderboard from '@pages/teamPerformance/SalesLeaderboard';
import DriverUsers from '@pages/users/drivers/driversUsers';
import LoaderUsers from '@pages/users/loaders/loadersUsers';
import VanTracker from '@pages/users/vans/Vans';
import SupervisorProfile from '@pages/profile/SupervisorProfile';

export default function AppRoutes() {
  return (
    <Router>
      <ScrollToTop />
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
