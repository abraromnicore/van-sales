import * as React from 'react';
import { type ColumMeta, CustomTable } from '@components/tables/CustomTable.tsx';
import type { MenuItem } from 'primereact/menuitem';
import { Eye, Pin, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DASHBOARD_ROUTE, VIEW_REP_ROUTE } from '@utils/constant/app-route.constants.ts';
import { useConfirmationDialog } from '@hooks/dialog/useConfirmationDialog.ts';
import { useAppToast } from '@hooks/common/useAppToast.ts';
import { TerritoryChangeDialog } from '@components/dialog/TerritoryChangeDialog.tsx';
import { UserLimitDialog } from './limit-dialog/UserLimitDialog.tsx';
import { useMetadata } from '@hooks/common/useMetadata.ts';
import { ListingLayout } from '@layouts/Listinglayout.tsx';
import { vanRepList } from '@/sample-data/van-rep-list.ts';
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
          display: 'inline-block',
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
          display: 'inline-block',
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
          display: 'inline-block',
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
          display: 'inline-block',
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

  const [selectedItem, setSelectedItem] = React.useState<any>();
  const [showTerritory, setShowTerritory] = React.useState(false);
  const [showLimitDialog, setShowLimitDialog] = React.useState(false);
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
    {
      label: 'Add/Edit Load Limit',
      icon: <Settings />,
      command: () => onAddEditLimit(),
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

  const onAddEditLimit = () => {
    setShowLimitDialog(true);
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

  const handleLimitSubmit = (data: any) => {
    showConfirmation({
      message: 'Are You Sure to Save This Limit Configuration?',
      header: 'Confirm Limit Configuration',
      onConfirm: () => {
        showSuccess('Limit Configuration', 'User limit configured successfully');
        setShowLimitDialog(false);
        // Here you would typically make an API call to save the limit
        console.log('Limit configuration:', data);
      },
    });
  };

  return (
    <ListingLayout>
      <CustomTable
        setSelectedItem={setSelectedItem}
        columns={columns}
        data={vanRepList}
        menuModel={tieredMenu}
      />

      <TerritoryChangeDialog
        visible={showTerritory}
        onHide={() => setShowTerritory(false)}
        onSubmit={handleTerritorySubmit}
      />

      <UserLimitDialog
        visible={showLimitDialog}
        onHide={() => setShowLimitDialog(false)}
        onSubmit={handleLimitSubmit}
        selectedUser={selectedItem}
      />
    </ListingLayout>
  );
};