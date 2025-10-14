import * as React from 'react';
import {
  User,
  Phone,
  Mail,
  MapPin,
  Activity,
  Eye,
  Package2,
  Gauge,
  CheckCircle,
  Pin,
  Truck,
} from 'lucide-react';
import { Card } from '@components/app-cards/card/Card';
import { CardHeader } from '@components/app-cards/card/CardHeader.tsx';
import { CardBody } from '@components/app-cards/card/CardBody.tsx';
import { CustomTable } from '@components/tables/CustomTable.tsx';
import { VIEW_LOAD_REQ_ROUTE } from '@utils/constant/app-route.constants.ts';
import { useNavigate } from 'react-router-dom';
import { Button } from '@components/button/Button.tsx';
import { useAppToast } from '@hooks/common/useAppToast.ts';
import { useConfirmationDialog } from '@hooks/dialog/useConfirmationDialog.ts';
import { RejectionDialog } from '@components/dialog/RejectionDialog.tsx';
import { TerritoryChangeDialog } from '@components/dialog/TerritoryChangeDialog.tsx';
import { VanAssignmentDialog } from '@components/dialog/VanAssignmentDialog.tsx';
import { CardFooter } from '@components/app-cards/card/CardFooter.tsx';
import MapView from '@components/MapView.tsx';
import PerformanceDashboard from '@components/PerformanceDashboard.tsx';

const vanRepDetail = {
  personalInfo: {
    repId: 'REP-001',
    employeeId: 'EMP-2024-089',
    name: 'Muhammad Ali',
    phone: '+92-301-1111111',
    email: 'm.ali@company.com',
    territory: 'Gulberg',
    status: 'on_route',
  },
  vanDetails: {
    vanId: 'VAN-LHR-01',
    registrationNumber: 'LES-2024-001',
    capacity: 300000,
    currentLoad: 150000,
    odometerStart: 45230,
    odometerCurrent: 45300,
    distanceTraveled: 70,
    isAssigned: false, // New field to track if van is assigned - Set to false to test empty state
  },
  stockDetails: {
    currentStockValue: 150000,
    utilizationRate: 50.0,
    topProducts: [
      { sku: 'SKU-001', name: 'Premium Tea 500g', qty: 50, value: 50000 },
      { sku: 'SKU-002', name: 'Milk Powder 1kg', qty: 30, value: 45000 },
      { sku: 'SKU-003', name: 'Biscuits Pack', qty: 100, value: 30000 },
    ],
    damagedGoods: 2,
    expiredGoods: 0,
  },
  cashCreditDetails: {
    today: {
      cashCollected: 95000,
      creditSales: 90000,
      cheques: 20000,
      bankTransfer: 15000,
      totalCollection: 220000,
    },
    splitPercent: {
      cash: 52,
      credit: 43,
      others: 5,
    },
  },
  loadRequests: [
    {
      id: 'REQ-2025-1001',
      date: '2025-10-09',
      repId: 'REP-001',
      vanId: 'VAN-LHR-01',
      requestedValue: 300000,
      approvedValue: 0,
      status: 'pending',
      totalItems: 3,
      items: [
        {
          sku: 'SKU-001',
          name: 'Premium Tea 500g',
          requestedQty: 50,
          approvedQty: 0,
          unitPrice: 1000,
        },
        {
          sku: 'SKU-002',
          name: 'Milk Powder 1kg',
          requestedQty: 30,
          approvedQty: 0,
          unitPrice: 1500,
        },
        {
          sku: 'SKU-003',
          name: 'Biscuits Pack',
          requestedQty: 100,
          approvedQty: 0,
          unitPrice: 300,
        },
      ],
      rejectionReason: null,
      supervisorActionBy: null,
      lastUpdated: '2025-10-09T10:30:00Z',
    },
    {
      id: 'REQ-2025-1000',
      date: '2025-10-08',
      repId: 'REP-002',
      vanId: 'VAN-LHR-02',
      requestedValue: 250000,
      approvedValue: 250000,
      status: 'approved',
      totalItems: 2,
      items: [
        {
          sku: 'SKU-010',
          name: 'Cooking Oil 5L',
          requestedQty: 80,
          approvedQty: 80,
          unitPrice: 2000,
        },
        {
          sku: 'SKU-012',
          name: 'Rice Basmati 10kg',
          requestedQty: 40,
          approvedQty: 40,
          unitPrice: 2500,
        },
      ],
      rejectionReason: null,
      supervisorActionBy: 'SUP-001',
      lastUpdated: '2025-10-08T09:15:00Z',
    },
    {
      id: 'REQ-2025-0999',
      date: '2025-10-07',
      repId: 'REP-003',
      vanId: 'VAN-LHR-03',
      requestedValue: 200000,
      approvedValue: 150000,
      status: 'approved_partial',
      totalItems: 2,
      items: [
        {
          sku: 'SKU-020',
          name: 'Soft Drink 1.5L',
          requestedQty: 100,
          approvedQty: 60,
          unitPrice: 500,
        },
        {
          sku: 'SKU-022',
          name: 'Chips Large Pack',
          requestedQty: 150,
          approvedQty: 120,
          unitPrice: 200,
        },
      ],
      rejectionReason: 'Partial approval due to stock shortage',
      supervisorActionBy: 'SUP-001',
      lastUpdated: '2025-10-07T16:40:00Z',
    },
    {
      id: 'REQ-2025-0998',
      date: '2025-10-06',
      repId: 'REP-004',
      vanId: 'VAN-LHR-04',
      requestedValue: 280000,
      approvedValue: 0,
      status: 'rejected',
      totalItems: 4,
      items: [
        {
          sku: 'SKU-030',
          name: 'Detergent 2kg',
          requestedQty: 60,
          approvedQty: 0,
          unitPrice: 800,
        },
        {
          sku: 'SKU-031',
          name: 'Shampoo 400ml',
          requestedQty: 40,
          approvedQty: 0,
          unitPrice: 600,
        },
        {
          sku: 'SKU-032',
          name: 'Soap Bar',
          requestedQty: 100,
          approvedQty: 0,
          unitPrice: 100,
        },
        {
          sku: 'SKU-033',
          name: 'Toothpaste 150g',
          requestedQty: 50,
          approvedQty: 0,
          unitPrice: 250,
        },
      ],
      rejectionReason: 'Exceeded daily load limit',
      supervisorActionBy: 'SUP-002',
      lastUpdated: '2025-10-06T11:20:00Z',
    },
    {
      id: 'REQ-2025-0997',
      date: '2025-10-05',
      repId: 'REP-005',
      vanId: 'VAN-LHR-05',
      requestedValue: 220000,
      approvedValue: 0,
      status: 'pending',
      totalItems: 2,
      items: [
        {
          sku: 'SKU-040',
          name: 'Juice Pack 1L',
          requestedQty: 120,
          approvedQty: 0,
          unitPrice: 150,
        },
        {
          sku: 'SKU-041',
          name: 'Water Bottle 500ml',
          requestedQty: 200,
          approvedQty: 0,
          unitPrice: 60,
        },
      ],
      rejectionReason: null,
      supervisorActionBy: null,
      lastUpdated: '2025-10-05T14:10:00Z',
    },
  ],
  alerts: [
    {
      type: 'missed_visit',
      severity: 'medium',
      message: '2 visits missed today',
    },
    {
      type: 'route_deviation',
      severity: 'high',
      message: 'Van deviated 3km from planned route',
    },
  ],
};

export const VanRepDetailPage = () => {
  const { personalInfo, loadRequests } = vanRepDetail;
  const navigate = useNavigate();
  const { showSuccess, showError } = useAppToast();

  // Dynamic van details state - Start with no van assigned
  const [vanDetails, setVanDetails] = React.useState({
    vanId: '',
    registrationNumber: '',
    capacity: 0,
    currentLoad: 0,
    odometerStart: 0,
    odometerCurrent: 0,
    distanceTraveled: 0,
    isAssigned: false,
  });
  const [selectedItem, setSelectedItem] = React.useState<any>();
  const [visibleReject, setVisibleReject] = React.useState(false);
  const [showTerritory, setShowTerritory] = React.useState(false);
  const [showVanAssignment, setShowVanAssignment] = React.useState(false);
  const [vanAssignmentMode, setVanAssignmentMode] = React.useState<'assign' | 'update'>('assign');
  const tieredMenu = [
    {
      label: 'View',
      icon: <Eye />,
      command: () => onView(),
    },
    {
      label: 'Approve',
      icon: <CheckCircle />,
      command: () => handleApprove(),
    },
    {
      label: 'Reject',
      icon: <CheckCircle />,
      command: () => handleReject(),
    },
  ];
  const columns = [
    {
      field: 'id',
      header: 'Request ID',
    },
    {
      field: 'date',
      header: 'Date',
    },
    {
      field: 'repId',
      header: 'Rep ID',
    },
    {
      field: 'vanId',
      header: 'Van ID',
    },
    {
      field: 'totalItems',
      header: 'Total Items',
    },
    {
      field: 'status',
      header: 'Status',
    },
  ];

  const onView = () => {
    navigate(VIEW_LOAD_REQ_ROUTE);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on_route':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'idle':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'off_duty':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const formatStatus = (status: string) => {
    return status
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  ;
  const { showConfirmation } = useConfirmationDialog();

  const handleApprove = () => {
    showConfirmation({
      message: 'Are You Sure to Approve the Load Request?',
      header: 'Approve Confirmation',
      onConfirm: () => {
        showSuccess('Load Request', 'Load Request Accept Successfully');
      },
    });
  };

  const handleReject = () => {
    setVisibleReject(true);
  };

  const handleRejectSubmit = (data: string) => {
    showConfirmation({
      message: 'Are You Sure to Reject the Load Request?',
      header: 'Reject Confirmation',
      onConfirm: () => {
        setVisibleReject(false)
        showError('Load Request', 'Load Request Accept Failure.');
      },
    });
  };

  const handleTerritorySubmit = (data: { country: string; city: string; area: string }) => {
    showConfirmation({
      message: 'Are You Sure to Change the Territory?',
      header: 'Approve Confirmation',
      onConfirm: () => {
        showSuccess('Change Territory', 'Territory Changed Successfully');
        setShowTerritory(false);
        // Here you would typically make an API call with the territory value
        console.log('Selected territory:', data);
      },
    });
  };
  const onChangeTerritory = () => {
    setShowTerritory(true);
  };

  const handleVanAssignment = () => {
    if (vanDetails.isAssigned) {
      setVanAssignmentMode('update');
    } else {
      setVanAssignmentMode('assign');
    }
    setShowVanAssignment(true);
  };

  const handleVanAssignmentSubmit = (data: { driverName: string; vanId: string }) => {
    showConfirmation({
      message: `Are you sure you want to ${vanAssignmentMode === 'assign' ? 'assign' : 'update'} this van?`,
      header: `${vanAssignmentMode === 'assign' ? 'Assign' : 'Update'} Van Confirmation`,
      onConfirm: () => {
        // Update van details based on the selected van
        const selectedVan = getVanDetailsById(data.vanId);
        if (selectedVan) {
          setVanDetails({
            ...selectedVan,
            isAssigned: true,
          });
        }

        setShowVanAssignment(false);
        showSuccess(
          'Van Assignment',
          `Van ${vanAssignmentMode === 'assign' ? 'assigned' : 'updated'} successfully`
        );
        // Here you would typically make an API call to update the van assignment
        console.log('Van assignment data:', data);
      },
    });
  };

  // Helper function to get van details by ID
  const getVanDetailsById = (vanId: string) => {
    const vanData = {
      'VAN-LHR-01': {
        vanId: 'VAN-LHR-01',
        registrationNumber: 'LES-2024-001',
        brand: 'Toyota',
        model: 'Hiace',
        capacity: 300000,
        currentLoad: 150000,
        odometerStart: 45230,
        odometerCurrent: 45300,
        distanceTraveled: 70,
      },
      'VAN-LHR-02': {
        vanId: 'VAN-LHR-02',
        registrationNumber: 'LES-2024-002',
        brand: 'Ford',
        model: 'Transit',
        capacity: 350000,
        currentLoad: 200000,
        odometerStart: 45250,
        odometerCurrent: 45320,
        distanceTraveled: 90,
      },
      'VAN-LHR-03': {
        vanId: 'VAN-LHR-03',
        registrationNumber: 'LES-2024-003',
        brand: 'Mercedes',
        model: 'Sprinter',
        capacity: 280000,
        currentLoad: 120000,
        odometerStart: 45180,
        odometerCurrent: 45250,
        distanceTraveled: 45,
      },
      'VAN-LHR-04': {
        vanId: 'VAN-LHR-04',
        registrationNumber: 'LES-2024-004',
        brand: 'Nissan',
        model: 'NV200',
        capacity: 320000,
        currentLoad: 180000,
        odometerStart: 45300,
        odometerCurrent: 45380,
        distanceTraveled: 110,
      },
      'VAN-LHR-05': {
        vanId: 'VAN-LHR-05',
        registrationNumber: 'LES-2024-005',
        brand: 'Isuzu',
        model: 'NPR',
        capacity: 290000,
        currentLoad: 140000,
        odometerStart: 45200,
        odometerCurrent: 45270,
        distanceTraveled: 60,
      },
      'VAN-LHR-06': {
        vanId: 'VAN-LHR-06',
        registrationNumber: 'LES-2024-006',
        brand: 'Hyundai',
        model: 'H350',
        capacity: 310000,
        currentLoad: 160000,
        odometerStart: 45260,
        odometerCurrent: 45340,
        distanceTraveled: 85,
      },
      'VAN-LHR-07': {
        vanId: 'VAN-LHR-07',
        registrationNumber: 'LES-2024-007',
        brand: 'Mitsubishi',
        model: 'L300',
        capacity: 270000,
        currentLoad: 100000,
        odometerStart: 45150,
        odometerCurrent: 45220,
        distanceTraveled: 35,
      },
      'VAN-LHR-08': {
        vanId: 'VAN-LHR-08',
        registrationNumber: 'LES-2024-008',
        brand: 'Volkswagen',
        model: 'Crafter',
        capacity: 330000,
        currentLoad: 220000,
        odometerStart: 45320,
        odometerCurrent: 45400,
        distanceTraveled: 125,
      },
    };

    return vanData[vanId as keyof typeof vanData];
  };

  return (
    <>
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-6`}>

        <div className={`md:col-span-2 flex flex-col gap-6`}>
          <div>
            <Card>
              <CardHeader title={'Personal Information'} />
              <CardBody>
                <div className="bg-white rounded-xl">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                      <User className="w-12 h-12 text-gray-600" />
                    </div>
                    {/* Info Section */}
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900">
                        {personalInfo.name}
                      </h2>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                          {personalInfo.employeeId}
                        </span>

                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                          {personalInfo.repId}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getStatusColor(
                            personalInfo.status,
                          )}`}
                        >
                          <Activity className="w-3 h-3" />
                          {formatStatus(personalInfo.status)}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getStatusColor(
                            personalInfo.status,
                          )}`}
                        >
                          <MapPin className="w-3 h-3" />
                          {personalInfo.territory}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
              <CardFooter>
                <div className={`flex justify-end w-full`}>
                  <Button className={`outline-none focus-none`} icon={<Pin className={'w-5 h-5'}/>} variant={`ghost`} onClick={onChangeTerritory} label={`Change Territory`} />
                  <TerritoryChangeDialog
                    visible={showTerritory}
                    onHide={() => setShowTerritory(false)}
                    onSubmit={handleTerritorySubmit}
                  />
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
        <div>
          <Card>
            <CardHeader title={`Contact Information`} />
            <CardBody>
              <div className="space-y-3">
                <div className="flex items-center text-gray-700">
                  <Phone className="w-5 h-5 mr-3 text-gray-400" />
                  <span>{personalInfo.phone}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Mail className="w-5 h-5 mr-3 text-gray-400" />
                  <span>{personalInfo.email}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <MapPin className="w-5 h-5 mr-3 text-gray-400" />
                  <span>{personalInfo.territory}</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
        {/*<div>*/}
        {/*  <Card>*/}
        {/*    <CardHeader title="Alerts" />*/}
        {/*    <CardBody>*/}
        {/*      <div className="p-4 max-h-96 overflow-y-auto">*/}
        {/*        <div className="space-y-3">*/}
        {/*          {notifications.slice(0, 6).map((notification) => (*/}
        {/*            <div key={notification.id}>*/}
        {/*              <div className="flex-1 min-w-0">*/}
        {/*                <p className="text-sm font-medium text-slate-900 leading-relaxed">*/}
        {/*                  {notification.message}*/}
        {/*                </p>*/}
        {/*                <div className="flex items-center justify-between mt-2">*/}
        {/*                  <p className="text-xs text-slate-500 font-medium">*/}
        {/*                    {notification.time}*/}
        {/*                  </p>*/}
        {/*                  <span*/}
        {/*                    className={`text-xs px-2 py-1 rounded-full font-medium ${*/}
        {/*                      notification.priority === 'high'*/}
        {/*                        ? 'bg-red-100 text-red-700'*/}
        {/*                        : notification.priority === 'medium'*/}
        {/*                          ? 'bg-amber-100 text-amber-700'*/}
        {/*                          : 'bg-slate-100 text-slate-600'*/}
        {/*                    }`}*/}
        {/*                  >*/}
        {/*                    {notification.priority}*/}
        {/*                  </span>*/}
        {/*                </div>*/}
        {/*              </div>*/}
        {/*            </div>*/}
        {/*          ))}*/}
        {/*        </div>*/}

        {/*        <div className="mt-4 pt-4 border-t border-slate-200">*/}
        {/*          <button className="w-full flex items-center justify-center space-x-2 text-sm text-indigo-600 hover:text-indigo-800 font-semibold py-2 px-4 rounded-lg hover:bg-indigo-50 transition-colors">*/}
        {/*            <Eye className="h-4 w-4" />*/}
        {/*            <span>View All Notifications</span>*/}
        {/*          </button>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    </CardBody>*/}
        {/*  </Card>*/}
        {/*</div>*/}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 mt-6 gap-6">
        <div className="md:col-span-2 ">
          <MapView title={"Van Rep Tracking"}/>
        </div>
        <div>
          <Card>
            <CardHeader title={'Van Details'}>
              <Button
                variant="primary"
                icon={<Truck className="w-4 h-4" />}
                onClick={handleVanAssignment}
                label={vanDetails.isAssigned ? 'Update Van' : 'Assign Van'}
              />
            </CardHeader>
            <CardBody>
              {vanDetails.isAssigned ? (
                <>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6">
                {/* Info Section */}
                <div className="flex-1">
                  <h2 className="text-base font-bold text-gray-900">
                    {vanDetails.registrationNumber}
                  </h2>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm ">
                      {vanDetails.vanId}
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                      Load:{' '}
                      {(
                        (vanDetails.currentLoad / vanDetails.capacity) *
                        100
                      ).toFixed(0)}
                      %
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                      {vanDetails.distanceTraveled} km traveled
                    </span>
                  </div>
                </div>
              </div>
                  <div className="space-y-3 lg:grid grid-cols-2 gap-x-6 gap-y-3">
                <div className="flex items-center text-gray-700">
                  <Package2 className="w-5 h-5 mr-3 text-gray-400" />
                  <span>
                    Capacity: {vanDetails.capacity.toLocaleString()} units
                  </span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Package2 className="w-5 h-5 mr-3 text-gray-400" />
                  <span>
                    Current Load: {vanDetails.currentLoad.toLocaleString()}{' '}
                    units
                  </span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Gauge className="w-5 h-5 mr-3 text-gray-400" />
                  <span>
                    Odometer Start: {vanDetails.odometerStart.toLocaleString()}{' '}
                    km
                  </span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Gauge className="w-5 h-5 mr-3 text-gray-400" />
                  <span>
                    Odometer Current:{' '}
                    {vanDetails.odometerCurrent.toLocaleString()} km
                  </span>
                </div>
              </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Truck className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No Van Assigned
                  </h3>
                  <p className="text-gray-500 mb-4">
                    This driver doesn't have a van assigned yet.
                  </p>
                  <Button
                    variant="primary"
                    icon={<Truck className="w-4 h-4" />}
                    onClick={handleVanAssignment}
                    label="Assign Van"
                  />
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
      <div className={`mt-6`}>
        <Card>
          <CardHeader title={`Load Requests`}/>
          <CardBody>
            <CustomTable
              setSelectedItem={setSelectedItem}
              columns={columns}
              data={loadRequests}
              menuModel={tieredMenu}
            />
            {/*<CustomDialog size={'sm'} onHide={() => setVisibleReject(false)} visible={visibleReject}>*/}
            {/*  <CustomDialogBody>*/}
            {/*    <InputControl*/}
            {/*      control={control}*/}
            {/*      label={'Rejection Reason'}*/}
            {/*      name="reasonOfRejection"*/}
            {/*      placeholder={'Write a Reason of Rejection'}*/}
            {/*      type="text"*/}
            {/*      disabled={false}*/}
            {/*      className="py-2"*/}
            {/*    />*/}
            {/*  </CustomDialogBody>*/}
            {/*  <CustomDialogBody>*/}
            {/*    <div className={'flex flex-row gap-4'}>*/}
            {/*      <Button label={'Close'} onClick={() => setVisibleReject(false)} />*/}
            {/*      <Button label={'Submit'} onClick={() => {*/}
            {/*        setVisibleReject(false);*/}
            {/*        confirmReject()*/}
            {/*      }} />*/}
            {/*    </div>*/}
            {/*  </CustomDialogBody>*/}
            {/*</CustomDialog>*/}
            <RejectionDialog
              visible={visibleReject}
              onHide={() => setVisibleReject(false)}
              onSubmit={handleRejectSubmit}
            />
            <VanAssignmentDialog
              visible={showVanAssignment}
              onHide={() => setShowVanAssignment(false)}
              onSubmit={handleVanAssignmentSubmit}
              mode={vanAssignmentMode}
              currentDriver={{
                name: personalInfo.name,
                repId: personalInfo.repId,
              }}
              currentVan={vanDetails.isAssigned ? {
                vanId: vanDetails.vanId,
                registrationNumber: vanDetails.registrationNumber,
              } : undefined}
            />
          </CardBody>
        </Card>
      </div>
      <div className={`mt-6`}>
        <PerformanceDashboard/>
      </div>
    </>
  );
};