import * as React from 'react';
import {
  type ColumMeta,
  CustomTable,
} from '@components/tables/CustomTable.tsx';
import type { MenuItem } from 'primereact/menuitem';
import { Eye, Pin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DASHBOARD_ROUTE, VIEW_REP_ROUTE } from '@utils/constant/app-route.constants.ts';
import { useConfirmationDialog } from '@hooks/dialog/useConfirmationDialog.ts';
import { useAppToast } from '@hooks/common/useAppToast.ts';
import { TerritoryChangeDialog } from '@components/dialog/TerritoryChangeDialog.tsx';
import { useMetadata } from '@hooks/common/useMetadata.ts';

// Status Badge Component
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Occupied':
        return {
          backgroundColor: '#fef3c7',
          color: '#d97706',
          border: '1px solid #f59e0b',
          padding: '4px 8px',
          borderRadius: '6px',
          fontSize: '12px',
          fontWeight: '500',
          display: 'inline-block'
        };
      case 'Available':
        return {
          backgroundColor: '#d1fae5',
          color: '#059669',
          border: '1px solid #10b981',
          padding: '4px 8px',
          borderRadius: '6px',
          fontSize: '12px',
          fontWeight: '500',
          display: 'inline-block'
        };
      case 'Not Available':
        return {
          backgroundColor: '#fee2e2',
          color: '#dc2626',
          border: '1px solid #ef4444',
          padding: '4px 8px',
          borderRadius: '6px',
          fontSize: '12px',
          fontWeight: '500',
          display: 'inline-block'
        };
      default:
        return {
          backgroundColor: '#f3f4f6',
          color: '#6b7280',
          border: '1px solid #d1d5db',
          padding: '4px 8px',
          borderRadius: '6px',
          fontSize: '12px',
          fontWeight: '500',
          display: 'inline-block'
        };
    }
  };

  return (
    <span style={getStatusStyles(status)}>
      {status}
    </span>
  );
};

export const VanRepListPage = () => {
  useMetadata({
    pageTitle: 'Van Rep List',
    breadcrumbs: [
      { label: 'Dashboard', route: DASHBOARD_ROUTE },
      { label: 'Van Representative', route: '' },
      { label: 'Van Rep List', route: '', active: true },
    ],
  });

  const navigate = useNavigate();
  
  // Mock data - In a real app, this would come from an API call to db.json
  const vanRep = [
    {
      "repId": "VR001",
      "name": "Ali Khan",
      "van": "Van-12",
      "gender": "Male",
      "territory": "North Zone",
      "status": "Occupied",
      "orders": {
        "totalOrders": 18,
        "salesValue": 45000,
        "targetAchievedPercent": 72
      },
      "visits": {
        "planned": 12,
        "completed": 9,
        "missed": 1,
        "currentStatus": "On Route"
      },
      "stock": {
        "vanStockUtilization": "80%",
        "loadVariancePercent": 2
      },
      "collections": {
        "cashCollected": 15000,
        "creditExtended": 30000,
        "creditLimitFlag": false
      }
    },
    {
      "repId": "VR002",
      "name": "Ahmed Khan",
      "van": "Van-14",
      "gender": "Male",
      "territory": "South Zone",
      "status": "Available",
      "orders": {
        "totalOrders": 18,
        "salesValue": 45000,
        "targetAchievedPercent": 72
      },
      "visits": {
        "planned": 12,
        "completed": 9,
        "missed": 1,
        "currentStatus": "On Route"
      },
      "stock": {
        "vanStockUtilization": "80%",
        "loadVariancePercent": 2
      },
      "collections": {
        "cashCollected": 15000,
        "creditExtended": 30000,
        "creditLimitFlag": false
      }
    },
    {
      "repId": "VR003",
      "name": "Shayad Ali",
      "van": "Van-15",
      "gender": "Female",
      "territory": "East Zone",
      "status": "Not Available",
      "orders": {
        "totalOrders": 18,
        "salesValue": 45000,
        "targetAchievedPercent": 72
      },
      "visits": {
        "planned": 12,
        "completed": 9,
        "missed": 1,
        "currentStatus": "On Route"
      },
      "stock": {
        "vanStockUtilization": "80%",
        "loadVariancePercent": 2
      },
      "collections": {
        "cashCollected": 15000,
        "creditExtended": 30000,
        "creditLimitFlag": false
      }
    },
    {
      "repId": "VR004",
      "name": "Fatima Sheikh",
      "van": "Van-16",
      "gender": "Female",
      "territory": "West Zone",
      "status": "Available",
      "orders": {
        "totalOrders": 15,
        "salesValue": 38000,
        "targetAchievedPercent": 85
      },
      "visits": {
        "planned": 10,
        "completed": 8,
        "missed": 2,
        "currentStatus": "Available"
      },
      "stock": {
        "vanStockUtilization": "75%",
        "loadVariancePercent": 1
      },
      "collections": {
        "cashCollected": 12000,
        "creditExtended": 25000,
        "creditLimitFlag": false
      }
    },
    {
      "repId": "VR005",
      "name": "Hassan Ali",
      "van": "Van-17",
      "gender": "Male",
      "territory": "Central Zone",
      "status": "Occupied",
      "orders": {
        "totalOrders": 22,
        "salesValue": 52000,
        "targetAchievedPercent": 95
      },
      "visits": {
        "planned": 15,
        "completed": 14,
        "missed": 1,
        "currentStatus": "On Route"
      },
      "stock": {
        "vanStockUtilization": "90%",
        "loadVariancePercent": 3
      },
      "collections": {
        "cashCollected": 18000,
        "creditExtended": 35000,
        "creditLimitFlag": true
      }
    }
  ];
  const [selectedItem, setSelectedItem] = React.useState<any>();
  const [showTerritory, setShowTerritory] = React.useState(false);
  const { showConfirmation } = useConfirmationDialog();
  const { showSuccess } = useAppToast();

  const tieredMenu: MenuItem[] = [
    {
      label: 'View',
      icon: <Eye />,
      command: () => onView(),
    },
    {
      label: 'Change Territory',
      icon: <Pin />,
      command: () => onChangeTerritory(),
    },
  ];
  const columns: ColumMeta[] = [
    {
      field: 'repId',
      header: 'Rep ID',
    },
    {
      field: 'name',
      header: 'Name',
    },
    {
      field: 'gender',
      header: 'Gender',
    },
    {
      field: 'territory',
      header: 'Territory',
    },
    {
      field: 'status',
      header: 'Status',
      body: (rowData: any) => <StatusBadge status={rowData.status} />,
    },
  ];

  const onView = () => {
    navigate(VIEW_REP_ROUTE);
  };
  const onChangeTerritory = () => {
    setShowTerritory(true);
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

  return (
    <>
      <CustomTable
        setSelectedItem={setSelectedItem}
        columns={columns}
        data={vanRep}
        menuModel={tieredMenu}
      />

      <TerritoryChangeDialog
        visible={showTerritory}
        onHide={() => setShowTerritory(false)}
        onSubmit={handleTerritorySubmit}
      />
    </>
  );
};
