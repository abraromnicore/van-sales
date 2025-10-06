import { type ColumnDef } from '@tanstack/react-table';
import { Trophy, TrendingUp, Users, MapPin } from 'lucide-react';
import { DataTable } from '../../../components/tables/data-table';

// Types
export interface SalesRep {
  id: number;
  name: string;
  sales: number;
  target: number;
  region: string;
  team: string;
  achievement: number;
  rank: number;
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

// Rank badge color utility
const getRankBadgeColor = (index: number) => {
  switch (index) {
    case 0: // 1st place
      return 'bg-yellow-500 text-white';
    case 1: // 2nd place
      return 'bg-gray-400 text-white';
    case 2: // 3rd place
      return 'bg-amber-600 text-white';
    default:
      return 'bg-blue-100 text-blue-800';
  }
};

// Achievement color utility
const getAchievementColor = (achievement: number) => {
  if (achievement >= 120) return 'bg-green-100 text-green-800';
  if (achievement >= 100) return 'bg-blue-100 text-blue-800';
  if (achievement >= 80) return 'bg-yellow-100 text-yellow-800';
  return 'bg-red-100 text-red-800';
};

// Sales Leaderboard columns definition
export const salesLeaderboardColumns: ColumnDef<SalesRep>[] = [
  {
    accessorKey: 'rank',
    header: () => headerFormatting('Rank'),
    cell: ({ getValue, row }) => {
      const rank = getValue() as number;
      const index = rank - 1; // Convert rank to index for color function
      
      return (
        <div className="flex items-center">
          <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${getRankBadgeColor(index)}`}>
            {rank <= 3 && <Trophy className="w-3 h-3 mr-1" />}
            {rank}
          </span>
        </div>
      );
    },
  },
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
    accessorKey: 'sales',
    header: () => headerFormatting('Sales'),
    cell: ({ getValue }) => (
      <span className="font-semibold text-green-600">
        {formatCurrency(getValue() as number)}
      </span>
    ),
  },
  {
    accessorKey: 'target',
    header: () => headerFormatting('Target'),
    cell: ({ getValue }) => (
      <span className="text-gray-600">
        {formatCurrency(getValue() as number)}
      </span>
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
            {achievement}%
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'team',
    header: () => headerFormatting('Team'),
    cell: ({ getValue }) => (
      <div className="flex items-center gap-2">
        <Users className="w-4 h-4 text-gray-400" />
        <span className="text-gray-700">{getValue() as string}</span>
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
];

// Sales Leaderboard Table Component
interface SalesLeaderboardTableProps {
  salesData: SalesRep[];
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
  limit: number;
  setLimit: (limit: number) => void;
}

export const SalesLeaderboardTable: React.FC<SalesLeaderboardTableProps> = ({
  salesData,
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
          <Trophy className="w-6 h-6 text-yellow-500" />
          <h3 className="text-lg font-semibold text-gray-900">Sales Leaderboard</h3>
        </div>
      </div>
      <DataTable
        columns={salesLeaderboardColumns}
        data={salesData}
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
export const mockSalesData: SalesRep[] = [
  { id: 1, name: 'Ahmed Khan', sales: 245000, target: 200000, region: 'North', team: 'Alpha', achievement: 122.5, rank: 1 },
  { id: 2, name: 'Sarah Ali', sales: 198000, target: 180000, region: 'South', team: 'Beta', achievement: 110.0, rank: 2 },
  { id: 3, name: 'Muhammad Asif', sales: 176000, target: 160000, region: 'East', team: 'Alpha', achievement: 110.0, rank: 3 },
  { id: 4, name: 'Fatima Sheikh', sales: 165000, target: 170000, region: 'West', team: 'Gamma', achievement: 97.1, rank: 4 },
  { id: 5, name: 'Hassan Malik', sales: 142000, target: 150000, region: 'Central', team: 'Beta', achievement: 94.7, rank: 5 },
  { id: 6, name: 'Zara Qureshi', sales: 138000, target: 140000, region: 'North', team: 'Gamma', achievement: 98.6, rank: 6 },
  { id: 7, name: 'Omar Farooq', sales: 125000, target: 130000, region: 'South', team: 'Alpha', achievement: 96.2, rank: 7 },
  { id: 8, name: 'Aisha Malik', sales: 118000, target: 125000, region: 'East', team: 'Beta', achievement: 94.4, rank: 8 },
  { id: 9, name: 'Bilal Ahmed', sales: 102000, target: 120000, region: 'West', team: 'Gamma', achievement: 85.0, rank: 9 },
  { id: 10, name: 'Nadia Khan', sales: 95000, target: 110000, region: 'Central', team: 'Alpha', achievement: 86.4, rank: 10 },
];