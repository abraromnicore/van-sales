import { type ColumnDef } from '@tanstack/react-table';
import { 
  DollarSign, 
  MapPin, 
  User, 
  Banknote,
  Receipt,
  Clock,
  Calendar,
  Eye,
  FileText
} from 'lucide-react';
import { DataTable } from '../../../components/tables/data-table';

// Types for Daily Summary
export interface DailySummaryData {
  id: number;
  repName: string;
  region: string;
  salesAmount: number;
  collections: {
    cash: number;
    cheque: number;
    pending: number;
    total: number;
  };
}

// Types for Settlements
export interface Settlement {
  id: string;
  repId: string;
  repName: string;
  region: string;
  date: string;
  salesAmount: number;
  collections: {
    cash: number;
    cheque: number;
    pending: number;
    total: number;
  };
  returns: number;
  netAmount: number;
  status: 'pending' | 'approved' | 'correction_pending' | 'rejected';
  proofs: string[];
  notes: string;
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
}

// Header formatting utility
const headerFormatting = (title: string) => (
  <div className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
    {title}
  </div>
);

// Currency formatting utility
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Status badge utility
const getStatusBadge = (status: string) => {
  const statusConfig = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    correction_pending: 'bg-orange-100 text-orange-800',
    rejected: 'bg-red-100 text-red-800',
  };
  
  const statusLabels = {
    pending: 'Pending',
    approved: 'Approved',
    correction_pending: 'Correction Pending',
    rejected: 'Rejected',
  };
  
  return (
    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusConfig[status as keyof typeof statusConfig]}`}>
      {statusLabels[status as keyof typeof statusLabels]}
    </span>
  );
};

// Daily Summary Columns
export const dailySummaryColumns: ColumnDef<DailySummaryData>[] = [
  {
    accessorKey: 'repName',
    header: () => headerFormatting('Rep Name'),
    cell: ({ getValue }) => (
      <div className="flex items-center gap-2">
        <User className="w-4 h-4 text-gray-400" />
        <span className="font-medium text-gray-900">{getValue() as string}</span>
      </div>
    ),
  },
  {
    accessorKey: 'region',
    header: () => headerFormatting('Region'),
    cell: ({ getValue }) => (
      <div className="flex items-center gap-2">
        <MapPin className="w-4 h-4 text-gray-400" />
        <span className="text-gray-600">{getValue() as string}</span>
      </div>
    ),
  },
  {
    accessorKey: 'salesAmount',
    header: () => headerFormatting('Sales Amount'),
    cell: ({ getValue }) => (
      <div className="flex items-center gap-2">
        <DollarSign className="w-4 h-4 text-gray-500" />
        <span className="font-medium text-gray-900">
          {formatCurrency(getValue() as number)}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'collections.cash',
    header: () => headerFormatting('Cash'),
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Banknote className="w-4 h-4 text-green-500" />
        <span className="text-green-600 font-medium">
          {formatCurrency(row.original.collections.cash)}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'collections.cheque',
    header: () => headerFormatting('Cheque'),
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Receipt className="w-4 h-4 text-blue-500" />
        <span className="text-blue-600 font-medium">
          {formatCurrency(row.original.collections.cheque)}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'collections.pending',
    header: () => headerFormatting('Pending'),
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-orange-500" />
        <span className="text-orange-600 font-medium">
          {formatCurrency(row.original.collections.pending)}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'collections.total',
    header: () => headerFormatting('Total Collections'),
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <DollarSign className="w-4 h-4 text-gray-500" />
        <span className="font-semibold text-gray-900">
          {formatCurrency(row.original.collections.total)}
        </span>
      </div>
    ),
  },
];

// Settlements Columns
export const settlementsColumns: ColumnDef<Settlement>[] = [
  {
    accessorKey: 'id',
    header: () => headerFormatting('Settlement ID'),
    cell: ({ getValue }) => (
      <div className="flex items-center gap-2">
        <FileText className="w-4 h-4 text-blue-500" />
        <span className="font-medium text-blue-600">{getValue() as string}</span>
      </div>
    ),
  },
  {
    accessorKey: 'repName',
    header: () => headerFormatting('Rep Details'),
    cell: ({ row }) => (
      <div>
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-gray-400" />
          <span className="font-medium text-gray-900">{row.original.repName}</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <MapPin className="w-3 h-3 text-gray-400" />
          <span className="text-sm text-gray-500">{row.original.region}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'date',
    header: () => headerFormatting('Date'),
    cell: ({ getValue }) => (
      <div className="flex items-center gap-2">
        <Calendar className="w-4 h-4 text-gray-400" />
        <span className="text-gray-600">{getValue() as string}</span>
      </div>
    ),
  },
  {
    accessorKey: 'salesAmount',
    header: () => headerFormatting('Sales Amount'),
    cell: ({ getValue }) => (
      <div className="flex items-center gap-2">
        <DollarSign className="w-4 h-4 text-gray-500" />
        <span className="font-medium text-gray-900">
          {formatCurrency(getValue() as number)}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'collections.total',
    header: () => headerFormatting('Collections'),
    cell: ({ row }) => (
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-900">
            {formatCurrency(row.original.collections.total)}
          </span>
        </div>
        <div className="flex gap-2 text-xs">
          <span className="text-green-600">C: {formatCurrency(row.original.collections.cash)}</span>
          <span className="text-blue-600">Ch: {formatCurrency(row.original.collections.cheque)}</span>
          <span className="text-orange-600">P: {formatCurrency(row.original.collections.pending)}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'returns',
    header: () => headerFormatting('Returns'),
    cell: ({ getValue }) => (
      <span className="text-red-600 font-medium">
        {formatCurrency(getValue() as number)}
      </span>
    ),
  },
  {
    accessorKey: 'netAmount',
    header: () => headerFormatting('Net Amount'),
    cell: ({ getValue }) => (
      <div className="flex items-center gap-2">
        <DollarSign className="w-4 h-4 text-green-500" />
        <span className="font-semibold text-green-700">
          {formatCurrency(getValue() as number)}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: () => headerFormatting('Status'),
    cell: ({ getValue }) => (
      <div className="flex justify-center">
        {getStatusBadge(getValue() as string)}
      </div>
    ),
  },
  {
    id: 'actions',
    header: () => headerFormatting('Actions'),
    cell: ({ row }) => (
      <div className="flex justify-center">
        <button
          onClick={() => {
            console.log("View settlement:", row.original.id);
          }}
          className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Eye className="w-3 h-3" />
          View
        </button>
      </div>
    ),
  },
];

// Daily Summary Table Component
interface DailySummaryTableProps {
  data: DailySummaryData[];
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
  limit: number;
  setLimit: (limit: number) => void;
}

export const DailySummaryTable: React.FC<DailySummaryTableProps> = ({
  data,
  page,
  setPage,
  totalPages,
  limit,
  setLimit,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <DollarSign className="w-6 h-6 text-green-500" />
          <h3 className="text-lg font-semibold text-gray-900">Daily Sales Summary</h3>
        </div>
      </div>
      <DataTable
        columns={dailySummaryColumns}
        data={data}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        limit={limit}
        setLimit={setLimit}
      />
    </div>
  );
};

// Settlements Table Component
interface SettlementsTableProps {
  data: Settlement[];
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
  limit: number;
  setLimit: (limit: number) => void;
}

export const SettlementsTable: React.FC<SettlementsTableProps> = ({
  data,
  page,
  setPage,
  totalPages,
  limit,
  setLimit,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Receipt className="w-6 h-6 text-purple-500" />
          <h3 className="text-lg font-semibold text-gray-900">Settlement Details</h3>
        </div>
      </div>
      <DataTable
        columns={settlementsColumns}
        data={data}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        limit={limit}
        setLimit={setLimit}
      />
    </div>
  );
};

// Mock data for testing
export const mockDailySummaryData: DailySummaryData[] = [
  {
    id: 1,
    repName: 'Ahmed Khan-1',
    region: 'North',
    salesAmount: 125000,
    collections: {
      cash: 85000,
      cheque: 45000,
      pending: 25000,
      total: 155000
    }
  },
  {
    id: 2,
    repName: 'Sarah Ali-1',
    region: 'South',
    salesAmount: 98000,
    collections: {
      cash: 72000,
      cheque: 38000,
      pending: 18000,
      total: 128000
    }
  },
  {
    id: 3,
    repName: 'Muhammad Asif-1',
    region: 'East',
    salesAmount: 115000,
    collections: {
      cash: 65000,
      cheque: 42000,
      pending: 22000,
      total: 129000
    }
  },
  {
    id: 4,
    repName: 'Fatima Sheikh-1',
    region: 'West',
    salesAmount: 87000,
    collections: {
      cash: 58000,
      cheque: 35000,
      pending: 28000,
      total: 121000
    }
  },
  {
    id: 5,
    repName: 'Hassan Malik-1',
    region: 'Central',
    salesAmount: 92000,
    collections: {
      cash: 52000,
      cheque: 31000,
      pending: 24000,
      total: 107000
    }
  },
  {
    id: 10,
    repName: 'Ahmed1 Khan-1',
    region: 'North',
    salesAmount: 125000,
    collections: {
      cash: 85000,
      cheque: 45000,
      pending: 25000,
      total: 155000
    }
  },
  {
    id: 20,
    repName: 'Sarah1 Ali-1',
    region: 'South',
    salesAmount: 98000,
    collections: {
      cash: 72000,
      cheque: 38000,
      pending: 18000,
      total: 128000
    }
  },
  {
    id: 30,
    repName: 'Muhammad Asif-1',
    region: 'East',
    salesAmount: 115000,
    collections: {
      cash: 65000,
      cheque: 42000,
      pending: 22000,
      total: 129000
    }
  },
  {
    id: 40,
    repName: 'Fatima Sheikh-1',
    region: 'West',
    salesAmount: 87000,
    collections: {
      cash: 58000,
      cheque: 35000,
      pending: 28000,
      total: 121000
    }
  },
  {
    id: 50,
    repName: 'Hassan Malik-1',
    region: 'Central',
    salesAmount: 92000,
    collections: {
      cash: 52000,
      cheque: 31000,
      pending: 24000,
      total: 107000
    }
  }
];

// Mock Data
export const mockSettlements: Settlement[] = [
  {
    id: 'STL-001',
    repId: 'REP-001',
    repName: 'John Smith',
    region: 'North',
    date: '2025-09-25',
    salesAmount: 15000,
    collections: { cash: 8000, cheque: 5000, pending: 2000, total: 15000 },
    returns: 500,
    netAmount: 14500,
    status: 'pending',
    proofs: ['receipt1.jpg', 'invoice1.pdf', 'collection_slip1.jpg'],
    notes: 'Regular settlement - all collections verified',
    submittedAt: '2025-09-25T10:30:00'
  },
  {
    id: 'STL-002',
    repId: 'REP-002',
    repName: 'Sarah Johnson',
    region: 'South',
    date: '2025-09-25',
    salesAmount: 12500,
    collections: { cash: 7500, cheque: 3000, pending: 2000, total: 12500 },
    returns: 200,
    netAmount: 12300,
    status: 'approved',
    proofs: ['receipt2.jpg', 'invoice2.pdf'],
    notes: 'Approved - all documentation complete',
    submittedAt: '2025-09-25T09:15:00',
    reviewedAt: '2025-09-25T14:00:00',
    reviewedBy: 'Manager A'
  },
  {
    id: 'STL-003',
    repId: 'REP-003',
    repName: 'Mike Davis',
    region: 'East',
    date: '2025-09-24',
    salesAmount: 18000,
    collections: { cash: 10000, cheque: 6000, pending: 2000, total: 18000 },
    returns: 800,
    netAmount: 17200,
    status: 'correction_pending',
    proofs: ['receipt3.jpg'],
    notes: 'Missing collection slip for cheque payment',
    submittedAt: '2025-09-24T16:45:00',
    reviewedAt: '2025-09-25T11:30:00',
    reviewedBy: 'Manager B'
  },
  {
    id: 'STL-004',
    repId: 'REP-004',
    repName: 'Lisa Wilson',
    region: 'West',
    date: '2025-09-24',
    salesAmount: 9500,
    collections: { cash: 5500, cheque: 2000, pending: 2000, total: 9500 },
    returns: 150,
    netAmount: 9350,
    status: 'rejected',
    proofs: ['receipt4.jpg'],
    notes: 'Discrepancy in cash collection amount',
    submittedAt: '2025-09-24T14:20:00',
    reviewedAt: '2025-09-24T17:00:00',
    reviewedBy: 'Manager C'
  }
];