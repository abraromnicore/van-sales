import { Card } from '@components/app-cards/card/Card';
import { CardBody } from '@components/app-cards/card/CardBody';
import { CardHeader } from '@components/app-cards/card/CardHeader';
import { ReusableBarChart, useChartConfig } from '@components/charts/barCharts';
import { ReusablePieChart, usePieChartConfig } from '@components/charts/pieCharts';
import { Clock, DollarSign, Eye, Filter, MapPin, Package } from 'lucide-react';
import MapView from '@components/MapView.tsx';
import * as React from 'react';
import { useRef, useState, useMemo } from 'react';
import { useMetadata } from '@hooks/common/useMetadata.ts';
import { KPICard } from '@components/app-cards/KPICard.tsx';
import { PageLayout } from '@layouts/Pagelayout.tsx';
import { CustomTable } from '@components/tables/CustomTable.tsx';
import type { MenuItem } from 'primereact/menuitem';
import { VanDetailsModal } from '@pages/van-rep/assign-van/VanDetailsModal.tsx';
import { OverlayPanelBox } from '@components/overlayPanel/OverlayPanel.tsx';
import { Button } from '@components/button/Button.tsx';
import { SelectControl } from '@components/forms/SelectControl';
import { useForm } from 'react-hook-form';
import { collectionsData, dashboardData, notifications, salesData, vansData } from '@/sample-data/dashboard-data.ts';

// Main Dashboard Component
export const DashboardPage: React.FC = () => {
  useMetadata({
    pageTitle: 'Dashboard', breadcrumbs: [],
  });
  const [setSelectedItem] = useState<any>(null);
  const [showVanDetails, setShowVanDetails] = React.useState(false);
  const [selectedVanDetails] = React.useState<any>({
    vanId: 'VAN-LHR-04',
    registrationNumber: 'LES-2024-004',
    brand: 'Nissan',
    model: 'NV200',
    year: 2024,
    capacity: 320000,
    currentLoad: 180000,
    odometerStart: 45300,
    odometerCurrent: 45380,
    distanceTraveled: 110,
    fuelType: 'Diesel',
    lastServiceDate: '2024-09-05',
    status: 'available',
  });

  const [statusFilter, setStatusFilter] = useState<string>('');
  const methods = useForm({
    defaultValues: {
      filterByStatus: ''
    }
  });

  // Chart configuration using the hook
  const salesChartConfig = useChartConfig('sales', 'Sales vs Target of Van Rep', salesData, {
    height: 320, // You can add any custom overrides here
  });

  // Create chart config using the hook
  const chartConfig = usePieChartConfig('Collections by Payment Type', collectionsData);

  const totalApprovals = Object.values(dashboardData.pendingApprovals).reduce((a, b) => a + b, 0);

  const vanLoadLiveColumns = [{
    field: 'vanId', header: 'Van ID',
  }, {
    field: 'status', header: 'Status',
  }];
  const tieredMenu: MenuItem[] = [{
    label: 'View Van Detail', icon: <Eye />, command: () => handleViewVanDetails(),
  }];

  const handleViewVanDetails = () => {
    setShowVanDetails(true);
  };

  const productPanelRef = useRef<any>(null);

  const handleApplyFilter = () => {
    const filterValue = methods.getValues('filterByStatus');
    setStatusFilter(filterValue);
    productPanelRef.current?.hide();
  };

  const handleClearFilter = () => {
    methods.setValue('filterByStatus', '');
    setStatusFilter('');
    productPanelRef.current?.hide();
  };

  const filteredVansData = useMemo(() => {
    if (!statusFilter) {
      return vansData;
    }
    return vansData.filter(van => van.status === statusFilter);
  }, [statusFilter]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (statusFilter) count++;
    return count;
  }, [statusFilter]);

  return (<PageLayout>
    {/* KPI Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <KPICard
        labelText={`Today's Sales`}
        valueText={`PKR ${(dashboardData.salesAnalytics.today.totalSales / 1000000).toFixed(2)}M`}
        icon={<DollarSign />}
      />
      <KPICard
        labelText={`Orders Today`}
        valueText={dashboardData.salesAnalytics.today.ordersCount}
        icon={<Package />}
      />
      <KPICard
        labelText={`Active Vans`}
        valueText={`${dashboardData.liveTracking.onRoute}/${dashboardData.liveTracking.totalVans}`}
        icon={<MapPin />}
      />
      <KPICard
        labelText={`Pending Approvals`}
        valueText={totalApprovals}
        icon={<Clock />}
      />
    </div>

    <div className={`grid grid-cols-2 md:grid-cols-3 mt-6 gap-6`}>
      <div className={`col-span-2 relative`}>
        <Card>
          <CardHeader title={'Vans Tracking'}>
          </CardHeader>
          <CardBody>
            <MapView />
          </CardBody>
        </Card>
      </div>

      <div className={`relative`}>
        <OverlayPanelBox
          ref={productPanelRef}
          showCloseIcon={true}
          dismissable={true}
          style={{ width: '600px' }}
        >
          <div className="p-4">
            <SelectControl
              control={methods.control}
              name="filterByStatus"
              label="Filter by Status"
              options={[
                { label: 'Loading', value: 'Loading' },
                { label: 'In Transit', value: 'In Transit' },
                { label: 'Unloading', value: 'Unloading' },
                { label: 'Completed', value: 'Completed' },
                { label: 'Idle', value: 'Idle' }
              ]}
              placeholder="Select Van Status"
              required={false}
              className="!py-0"
            />
            <div className="flex gap-2 mt-4">
              <Button
                label="Apply Filter"
                onClick={handleApplyFilter}
                className="flex-1"
              />
              <Button
                label="Clear Filter"
                onClick={handleClearFilter}
                className="flex-1"
                variant="secondary"
              />
            </div>
          </div>
        </OverlayPanelBox>

        <Card styleClass={'h-full'}>
          <CardHeader title={'Active Vans'} children={<Button icon={<Filter size={14}/>} label={`Filter${activeFiltersCount > 0 ? `(${activeFiltersCount})` : ''}`} onClick={(e) => productPanelRef.current?.toggle(e)}/>}>
          </CardHeader>
          <CardBody>
            <div className="max-h-80 overflow-y-auto">
              <CustomTable
                data={filteredVansData}
                columns={vanLoadLiveColumns}
                setSelectedItem={setSelectedItem}
                menuModel={tieredMenu}
              />
            </div>

          </CardBody>
        </Card>
        {selectedVanDetails && (<VanDetailsModal
          visible={showVanDetails}
          onHide={() => setShowVanDetails(false)}
          vanDetails={selectedVanDetails}
        />)}
      </div>


    </div>


    <div className={`grid grid-cols-2 md:grid-cols-3 mt-6 gap-6`}>
      <div className={`col-span-2`}>
        <ReusableBarChart {...salesChartConfig} />
      </div>
      <div>
        <Card styleClass={'h-full'}>
          <CardHeader title="Alerts" />
          <CardBody>
            <div className="p-4 max-h-80 overflow-y-auto">
              <div className="space-y-3">
                {notifications.slice(0, 6).map((notification) => (<div key={notification.id}>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 leading-relaxed">
                      {notification.message}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-slate-500 font-medium">
                        {notification.time}
                      </p>
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${notification.priority === 'high' ? 'bg-red-100 text-red-700' : notification.priority === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}
                      >
                            {notification.priority}
                          </span>
                    </div>
                  </div>
                </div>))}
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200">
                <button
                  className="w-full flex items-center justify-center space-x-2 text-sm text-indigo-600 hover:text-indigo-800 font-semibold py-2 px-4 rounded-lg hover:bg-indigo-50 transition-colors">
                  <Eye className="h-4 w-4" />
                  <span>View All Notifications</span>
                </button>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>

    <div className="mt-6">
      {/* Collections by Type */}
      <ReusablePieChart
        data={collectionsData}
        config={chartConfig}
        showBreakdown={true}
      />
    </div>
  </PageLayout>);
};