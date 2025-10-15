import { useMetadata } from '@hooks/common/useMetadata.ts';
import { DASHBOARD_ROUTE } from '@utils/constant/app-route.constants.ts';
import { PageLayout } from '@layouts/Pagelayout.tsx';
import { useState } from 'react';
import { CardBody } from '@components/app-cards/card/CardBody.tsx';
import { CustomTable } from '@components/tables/CustomTable.tsx';
import { Card } from '@components/app-cards/card/Card.tsx';
import type { MenuItem } from 'primereact/menuitem';
import { Eye } from 'lucide-react';


export const VanLoadAuditLogs = () => {
  useMetadata({
    pageTitle: 'Van Load Audit Logs',
    breadcrumbs: [
      {
        label: 'Dashboard',
        route: DASHBOARD_ROUTE,
      },
      {
        label: 'Van Representative',
        route: '',
      },
      {
        label: 'Van Load Audit Logs',
        route: '',
        active: true,
      },
    ],
  });
  const tieredMenu: MenuItem[] = [
    {
      label: 'View Van Details',
      icon: <Eye size={16} />,
      command: () => {},
    },
    {
      label: 'View Load Details',
      icon: <Eye size={16} />,
      command: () => {},
    },
  ];
  const [setSelectedItem] = useState<any>(null);

  const vanLoadAuditLogs = [
    {
      id: 5010,
      timestamp: '2025-10-14T09:15:00Z',
      action: 'Load Request Created',
      vanId: 'VAN-1023',
      performedBy: 'Ali Raza',
      role: 'Van Representative',
      status: 'Pending Approval',
      details: 'Requested load for route #A23 (12 items, 2 pallets).',
    },
    {
      id: 5009,
      timestamp: '2025-10-14T10:05:00Z',
      action: 'Load Approved',
      vanId: 'VAN-1023',
      performedBy: 'Sarah Khan',
      role: 'Supervisor',
      status: 'Approved',
      details: 'Approved van load request for route #A23.',
    },
    {
      id: 5008,
      timestamp: '2025-10-14T12:30:00Z',
      action: 'Load Adjustment',
      vanId: 'VAN-1023',
      performedBy: 'Ali Raza',
      role: 'Van Representative',
      status: 'Adjusted',
      details: 'Adjusted product quantity: “Coca-Cola 1.5L” from 50 → 45 due to stock limit.',
    },
    {
      id: 5007,
      timestamp: '2025-10-14T15:00:00Z',
      action: 'Load Unloaded',
      vanId: 'VAN-1023',
      performedBy: 'Ali Raza',
      role: 'Van Representative',
      status: 'Completed',
      details: 'Unload completed at warehouse return point. All items verified.',
    },
    {
      id: 5006,
      timestamp: '2025-10-13T16:45:00Z',
      action: 'Load Request Created',
      vanId: 'VAN-2041',
      performedBy: 'Bilal Ahmed',
      role: 'Van Representative',
      status: 'Pending Approval',
      details: 'Requested load for route #B18 (15 items).',
    },
    {
      id: 5005,
      timestamp: '2025-10-13T17:10:00Z',
      action: 'Load Rejected',
      vanId: 'VAN-2041',
      performedBy: 'Omar Siddiqui',
      role: 'Supervisor',
      status: 'Rejected',
      details: 'Load request rejected — stock not available for “Nestlé Water 500ml”.',
    },
    {
      id: 5004,
      timestamp: '2025-10-13T18:30:00Z',
      action: 'Load Request Re-Submitted',
      vanId: 'VAN-2041',
      performedBy: 'Bilal Ahmed',
      role: 'Van Representative',
      status: 'Pending Approval',
      details: 'Re-submitted load request with updated items (reduced quantity).',
    },
    {
      id: 5003,
      timestamp: '2025-10-12T09:40:00Z',
      action: 'Load Approved',
      vanId: 'VAN-1108',
      performedBy: 'Asma Javed',
      role: 'Supervisor',
      status: 'Approved',
      details: 'Approved morning load request for route #C05.',
    },
    {
      id: 5002,
      timestamp: '2025-10-12T15:10:00Z',
      action: 'Load Unloaded',
      vanId: 'VAN-1108',
      performedBy: 'Adeel Khan',
      role: 'Van Representative',
      status: 'Completed',
      details: 'Unload completed — 1 missing carton reported for “Pepsi 500ml”.',
    },
    {
      id: 5001,
      timestamp: '2025-10-11T08:55:00Z',
      action: 'Load Adjustment',
      vanId: 'VAN-1108',
      performedBy: 'Adeel Khan',
      role: 'Van Representative',
      status: 'Adjusted',
      details: 'Adjusted “Lay’s Chips 50g” count from 60 → 58 (damaged items).',
    },
  ];

  const vanLoadAuditLogColumns = [
    {
      field: 'timestamp',
      header: 'Date & Time',
      style: { minWidth: '180px', width: '180px' },
      body: (rowData:any) => {
        const date = new Date(rowData.timestamp);
        return (
          <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-900">
            {date.toLocaleDateString()}
          </span>
            <span className="text-xs text-gray-500">
            {date.toLocaleTimeString()}
          </span>
          </div>
        );
      },
    },
    {
      field: 'action',
      header: 'Action',
      style: { minWidth: '140px', width: '140px' },
    },
    {
      field: 'performedBy',
      header: 'PerformedBy',
      style: { minWidth: '150px', width: '150px' },
    },
    {
      field: 'role',
      header: 'Role',
      style: { minWidth: '120px', width: '120px' },
    },
    {
      field: 'status',
      header: 'Status',
      style: { minWidth: '130px', width: '130px' },
      body: (rowData:any) => {
        const status = rowData.status || '';
        const statusColor =
          status.toLowerCase() === 'approved'
            ? 'text-green-600'
            : status.toLowerCase() === 'rejected'
              ? 'text-red-600'
              : 'text-gray-700';
        return (
          <span className={`font-medium ${statusColor}`}>
          {status}
        </span>
        );
      },
    },
    {
      field: 'details',
      header: 'Details',
      style: { minWidth: '300px', width: '300px' },
      body: (rowData:any) => (
        <div className="text-sm text-gray-800 whitespace-pre-wrap">
          {rowData.details || '-'}
        </div>
      ),
    },
  ];


  return (
    <PageLayout>
      <Card>
        <CardBody>
            <CustomTable
              data={vanLoadAuditLogs}
              columns={vanLoadAuditLogColumns}
              setSelectedItem={setSelectedItem}
              menuModel={tieredMenu}
            />
        </CardBody>
      </Card>
    </PageLayout>

  );
};