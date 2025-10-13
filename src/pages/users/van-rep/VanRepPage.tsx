import * as React from 'react';
import {
  type ColumMeta,
  CustomTable,
} from '@components/tables/CustomTable.tsx';
import type { MenuItem } from 'primereact/menuitem';
import { Eye, Pin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DASHBOARD_ROUTE, USERS_ROUTE, VIEW_REP_ROUTE } from '@utils/constant/app-route.constants.ts';
import { useConfirmationDialog } from '@hooks/dialog/useConfirmationDialog.ts';
import { useAppToast } from '@hooks/common/useAppToast.ts';
import { TerritoryChangeDialog } from '@components/dialog/TerritoryChangeDialog.tsx';
import { useMetadata } from '@hooks/common/useMetadata.ts';

export const VanRepPage = () => {
  useMetadata({
    pageTitle: 'Van Representatives',
  });

  const navigate =useNavigate()
  const vanRep = [
  {
    "repId": "VR001",
    "name": "Ali Khan",
    "van": "Van-12",
    "gender": "Male",
    "territory": "North Zone",
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

]
  const [selectedItem, setSelectedItem] = React.useState();
  const [showTerritory, setShowTerritory] = React.useState(false);
  const { showConfirmation } = useConfirmationDialog();
  const {showSuccess}=useAppToast()

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
      field:'territory',
      header: 'Territory',
    },

  ];

  const onView = () => {
    navigate(VIEW_REP_ROUTE)
  };
  const onChangeTerritory = (value: string) => {
    setShowTerritory(true);
  }

  const handleTerritorySubmit = (territory: string) => {
    showConfirmation({
      message: 'Are You Sure to Change the Territory?',
      header: 'Approve Confirmation',
      onConfirm: () => {
        showSuccess('Change Territory', 'Territory Changed Successfully');
        setShowTerritory(false);
        // Here you would typically make an API call with the territory value
        console.log('Selected territory:', territory);
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