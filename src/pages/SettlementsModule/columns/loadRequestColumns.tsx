import { type ColumnDef } from '@tanstack/react-table';
import {
  Calendar,
  User,
  Eye,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react';

export interface LoadRequest {
  id: string;
  vanRepName: string;
  date: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  priority: 'Normal' | 'High' | 'Urgent';
  items: StockItem[];
  notes?: string;
  complianceNotes?: string;
}

export interface StockItem {
  id: string;
  name: string;
  requestedQty: number;
  availableQty: number;
  unit: string;
}

// Header formatting utility
const headerFormatting = (title: string) => (
  <div className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
    {title}
  </div>
);

// Status color utility
const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'Approved':
      return 'bg-green-100 text-green-800';
    case 'Rejected':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Priority color utility
const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case 'Normal':
      return 'bg-gray-100 text-gray-700';
    case 'High':
      return 'bg-orange-100 text-orange-800';
    case 'Urgent':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

// Load Request columns definition - accepts onViewRequest callback
export const createLoadRequestColumns = (
  onViewRequest: (request: LoadRequest) => void,
): ColumnDef<LoadRequest>[] => [
  {
    accessorKey: 'id',
    header: () => headerFormatting('Request'),
    cell: ({ row }) => (
      <div>
        <div className="font-semibold text-gray-900">{row.original.id}</div>
        <div className="flex items-center gap-1 mt-1">
          <User className="w-3 h-3 text-gray-400" />
          <span className="text-xs text-gray-600">
            {row.original.vanRepName}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'date',
    header: () => headerFormatting('Date'),
    cell: ({ getValue }) => (
      <div className="flex items-center gap-2">
        <Calendar className="w-4 h-4 text-gray-500" />
        <span className="text-sm text-gray-900">
          {new Date(getValue() as string).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'items',
    header: () => headerFormatting('Requested Stock'),
    cell: ({ getValue }) => {
      const items = getValue() as StockItem[];
      const totalQty = items.reduce((sum, item) => sum + item.requestedQty, 0);
      return (
        <div>
          <div className="flex items-center gap-1">
            <Package className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-semibold text-gray-900">
              {items.length} items
            </span>
          </div>
          <div className="text-xs text-gray-500 mt-0.5">
            Total: {totalQty} units
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'priority',
    header: () => headerFormatting('Priority'),
    cell: ({ getValue }) => {
      const priority = getValue() as string;
      return (
        <span
          className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full ${getPriorityBadge(
            priority,
          )}`}
        >
          {priority === 'Urgent' && <AlertCircle className="w-3 h-3" />}
          {priority}
        </span>
      );
    },
  },
  {
    accessorKey: 'status',
    header: () => headerFormatting('Status'),
    cell: ({ getValue }) => {
      const status = getValue() as string;
      return (
        <div className="flex items-center gap-2">
          {status === 'Pending' && (
            <Clock className="w-4 h-4 text-yellow-600" />
          )}
          {status === 'Approved' && (
            <CheckCircle className="w-4 h-4 text-green-600" />
          )}
          {status === 'Rejected' && (
            <XCircle className="w-4 h-4 text-red-600" />
          )}
          <span
            className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadge(
              status,
            )}`}
          >
            {status}
          </span>
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: () => headerFormatting('Actions'),
    cell: ({ row }) => (
      <button
        className="p-2 hover:bg-blue-50 rounded-lg transition-colors group"
        onClick={(e) => {
          e.stopPropagation();
          onViewRequest(row.original);
        }}
      >
        <Eye className="w-4 h-4 text-gray-600 group-hover:text-blue-600" />
      </button>
    ),
  },
];
