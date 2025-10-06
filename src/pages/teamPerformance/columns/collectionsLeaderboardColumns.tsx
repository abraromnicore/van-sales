import { type ColumnDef } from '@tanstack/react-table';
import { 
  DollarSign, 
  CreditCard, 
  Clock, 
  TrendingUp, 
  Target,
  Banknote,
  Receipt
} from 'lucide-react';
import { DataTable } from '../../../components/tables/data-table';

// Types
export interface CollectionData {
  id: number;
  name: string;
  cash: number;
  cheque: number;
  pending: number;
  total: number;
  target: number;
  achievement: number;
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

// Achievement color utility
const getAchievementColor = (achievement: number) => {
  if (achievement >= 110) return 'bg-green-100 text-green-800';
  if (achievement >= 100) return 'bg-blue-100 text-blue-800';
  if (achievement >= 90) return 'bg-yellow-100 text-yellow-800';
  return 'bg-red-100 text-red-800';
};

// Collections Leaderboard columns definition
export const collectionsLeaderboardColumns: ColumnDef<CollectionData>[] = [
  {
    accessorKey: 'name',
    header: () => headerFormatting('Sales Rep'),
    cell: ({ getValue }) => (
      <div className="flex items-center gap-2">
        <span className="font-medium text-gray-900">{getValue() as string}</span>
      </div>
    ),
  },
  {
    accessorKey: 'cash',
    header: () => headerFormatting('Cash'),
    cell: ({ getValue }) => (
      <div className="flex items-center gap-2">
        <Banknote className="w-4 h-4 text-green-500" />
        <span className="text-green-600 font-medium">
          {formatCurrency(getValue() as number)}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'cheque',
    header: () => headerFormatting('Cheque'),
    cell: ({ getValue }) => (
      <div className="flex items-center gap-2">
        <Receipt className="w-4 h-4 text-blue-500" />
        <span className="text-blue-600 font-medium">
          {formatCurrency(getValue() as number)}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'pending',
    header: () => headerFormatting('Pending'),
    cell: ({ getValue }) => (
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-amber-500" />
        <span className="text-amber-600 font-medium">
          {formatCurrency(getValue() as number)}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'total',
    header: () => headerFormatting('Total'),
    cell: ({ getValue }) => (
      <div className="flex items-center gap-2">
        <DollarSign className="w-4 h-4 text-gray-500" />
        <span className="text-gray-900 font-semibold">
          {formatCurrency(getValue() as number)}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'target',
    header: () => headerFormatting('Target'),
    cell: ({ getValue }) => (
      <div className="flex items-center gap-2">
        <Target className="w-4 h-4 text-gray-400" />
        <span className="text-gray-500 font-medium">
          {formatCurrency(getValue() as number)}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'achievement',
    header: () => headerFormatting('Achievement'),
    cell: ({ getValue }) => {
      const achievement = getValue() as number;
      return (
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-gray-400" />
          <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getAchievementColor(achievement)}`}>
            {achievement.toFixed(1)}%
          </span>
        </div>
      );
    },
  },
];

// Collections Leaderboard Table Component
interface CollectionsLeaderboardTableProps {
  collectionsData: CollectionData[];
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
  limit: number;
  setLimit: (limit: number) => void;
}

export const CollectionsLeaderboardTable: React.FC<CollectionsLeaderboardTableProps> = ({
  collectionsData,
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
          <CreditCard className="w-6 h-6 text-purple-500" />
          <h3 className="text-lg font-semibold text-gray-900">Collections Leaderboard</h3>
        </div>
      </div>
      <DataTable
        columns={collectionsLeaderboardColumns}
        data={collectionsData}
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
export const mockCollectionsData: CollectionData[] = [
  { id: 1, name: 'Ahmed Khan', cash: 85000, cheque: 45000, pending: 25000, total: 155000, target: 140000, achievement: 110.7 },
  { id: 2, name: 'Sarah Ali', cash: 72000, cheque: 38000, pending: 18000, total: 128000, target: 120000, achievement: 106.7 },
  { id: 3, name: 'Muhammad Asif', cash: 65000, cheque: 42000, pending: 22000, total: 129000, target: 125000, achievement: 103.2 },
  { id: 4, name: 'Fatima Sheikh', cash: 58000, cheque: 35000, pending: 28000, total: 121000, target: 130000, achievement: 93.1 },
  { id: 5, name: 'Hassan Malik', cash: 52000, cheque: 31000, pending: 24000, total: 107000, target: 115000, achievement: 93.0 },
  { id: 6, name: 'Zara Qureshi', cash: 48000, cheque: 29000, pending: 21000, total: 98000, target: 105000, achievement: 93.3 },
  { id: 7, name: 'Omar Farooq', cash: 45000, cheque: 26000, pending: 19000, total: 90000, target: 100000, achievement: 90.0 },
  { id: 8, name: 'Aisha Malik', cash: 42000, cheque: 24000, pending: 17000, total: 83000, target: 95000, achievement: 87.4 },
  { id: 9, name: 'Bilal Ahmed', cash: 38000, cheque: 22000, pending: 15000, total: 75000, target: 90000, achievement: 83.3 },
  { id: 10, name: 'Nadia Khan', cash: 35000, cheque: 20000, pending: 13000, total: 68000, target: 85000, achievement: 80.0 },
];