import { type ColumnDef } from '@tanstack/react-table';
import {
  Route,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Navigation,
} from 'lucide-react';
import { DataTable } from '../../../components/tables/data-table';

// Types
export interface JourneyData {
  id?: number;
  rep: string;
  planned: number;
  visited: number;
  completion: number;
  missed: number;
}

// Header formatting utility
const headerFormatting = (title: string) => (
  <div className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
    {title}
  </div>
);

// Completion status color utility
const getCompletionStatusColor = (completion: number) => {
  if (completion >= 95) return 'bg-green-100 text-green-800';
  if (completion >= 85) return 'bg-blue-100 text-blue-800';
  if (completion >= 75) return 'bg-yellow-100 text-yellow-800';
  return 'bg-red-100 text-red-800';
};

// Progress bar color utility
const getProgressBarColor = (completion: number) => {
  if (completion >= 95) return 'bg-green-500';
  if (completion >= 85) return 'bg-blue-500';
  if (completion >= 75) return 'bg-yellow-500';
  return 'bg-red-500';
};

// Journey Leaderboard columns definition
export const journeyLeaderboardColumns: ColumnDef<JourneyData>[] = [
  {
    accessorKey: 'rep',
    header: () => headerFormatting('Sales Rep'),
    cell: ({ getValue }) => (
      <div className="flex items-center gap-2">
        <span className="font-medium text-gray-900">
          {getValue() as string}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'planned',
    header: () => headerFormatting('Planned Routes'),
    cell: ({ getValue }) => (
      <div className="flex items-center gap-2">
        <Route className="w-4 h-4 text-gray-500" />
        <span className="text-gray-900 font-medium">
          {getValue() as number}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'visited',
    header: () => headerFormatting('Visited'),
    cell: ({ getValue }) => (
      <div className="flex items-center gap-2">
        <CheckCircle2 className="w-4 h-4 text-green-500" />
        <span className="text-green-600 font-medium">
          {getValue() as number}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'completion',
    header: () => headerFormatting('Completion %'),
    cell: ({ getValue }) => {
      const completion = getValue() as number;
      return (
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-gray-400" />
          <span
            className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getCompletionStatusColor(
              completion,
            )}`}
          >
            {completion.toFixed(1)}%
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'missed',
    header: () => headerFormatting('Missed'),
    cell: ({ getValue }) => {
      const missed = getValue() as number;
      return (
        <div className="flex items-center gap-2">
          <XCircle className="w-4 h-4 text-red-500" />
          <span
            className={`font-medium ${
              missed > 0 ? 'text-red-600' : 'text-gray-500'
            }`}
          >
            {missed}
          </span>
        </div>
      );
    },
  },
  {
    id: 'progress',
    header: () => headerFormatting('Progress'),
    cell: ({ row }) => {
      const completion = row.original.completion;
      const visited = row.original.visited;
      const planned = row.original.planned;

      return (
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full transition-all duration-300 ${getProgressBarColor(
                  completion,
                )}`}
                style={{ width: `${Math.min(completion, 100)}%` }}
              ></div>
            </div>
          </div>
          <span className="text-xs text-gray-500 font-medium min-w-fit">
            {visited}/{planned}
          </span>
        </div>
      );
    },
  },
];

// Journey Leaderboard Table Component
interface JourneyLeaderboardTableProps {
  journeyData: JourneyData[];
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
  limit: number;
  setLimit: (limit: number) => void;
}

export const JourneyLeaderboardTable: React.FC<
  JourneyLeaderboardTableProps
> = ({ journeyData, page, setPage, totalPages, limit, setLimit }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Navigation className="w-6 h-6 text-indigo-500" />
          <h3 className="text-lg font-semibold text-gray-900">
            Planned vs Actual Journey
          </h3>
        </div>
      </div>
      <DataTable
        columns={journeyLeaderboardColumns}
        data={journeyData}
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
export const mockJourneyData: JourneyData[] = [
  {
    id: 1,
    rep: 'Ahmed Khan',
    planned: 12,
    visited: 11,
    completion: 91.7,
    missed: 1,
  },
  {
    id: 2,
    rep: 'Sarah Ali',
    planned: 10,
    visited: 9,
    completion: 90.0,
    missed: 1,
  },
  {
    id: 3,
    rep: 'Muhammad Asif',
    planned: 14,
    visited: 12,
    completion: 85.7,
    missed: 2,
  },
  {
    id: 4,
    rep: 'Fatima Sheikh',
    planned: 11,
    visited: 8,
    completion: 72.7,
    missed: 3,
  },
  {
    id: 5,
    rep: 'Hassan Malik',
    planned: 13,
    visited: 10,
    completion: 76.9,
    missed: 3,
  },
  {
    id: 6,
    rep: 'Zara Qureshi',
    planned: 15,
    visited: 13,
    completion: 86.7,
    missed: 2,
  },
  {
    id: 7,
    rep: 'Omar Farooq',
    planned: 9,
    visited: 8,
    completion: 88.9,
    missed: 1,
  },
  {
    id: 8,
    rep: 'Aisha Malik',
    planned: 11,
    visited: 9,
    completion: 81.8,
    missed: 2,
  },
  {
    id: 9,
    rep: 'Bilal Ahmed',
    planned: 12,
    visited: 8,
    completion: 66.7,
    missed: 4,
  },
  {
    id: 10,
    rep: 'Nadia Khan',
    planned: 10,
    visited: 7,
    completion: 70.0,
    missed: 3,
  },
];
