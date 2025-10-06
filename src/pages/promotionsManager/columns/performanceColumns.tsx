import { type ColumnDef } from '@tanstack/react-table';
import { ChevronRight, Edit2, Lock, Unlock, Target, TrendingUp, Building2 } from 'lucide-react';

export interface TargetData {
  id: string;
  name: string;
  type: 'Region' | 'Territory' | 'Supervisor' | 'Salesman' | 'Outlet';
  target: number;
  achieved: number;
  unit: string;
  locked: boolean;
  children?: TargetData[];
}

// Utility functions
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-PK', { 
    style: 'currency', 
    currency: 'PKR', 
    minimumFractionDigits: 0 
  }).format(value);
};

const calculateAchievement = (target: number, achieved: number): number => {
  return target > 0 ? Math.round((achieved / target) * 100) : 0;
};

const getAchievementColor = (percentage: number): string => {
  if (percentage >= 90) return 'text-green-600 bg-green-50';
  if (percentage >= 70) return 'text-yellow-600 bg-yellow-50';
  return 'text-red-600 bg-red-50';
};

const getProgressBarColor = (percentage: number): string => {
  if (percentage >= 90) return 'bg-green-500';
  if (percentage >= 70) return 'bg-yellow-500';
  return 'bg-red-500';
};

const getStatusText = (percentage: number): string => {
  if (percentage >= 90) return 'On Target';
  if (percentage >= 70) return 'Below Target';
  return 'Underperforming';
};

const headerFormatting = (title: string) => (
  <div className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
    {title}
  </div>
);

// Performance Table columns definition
export const performanceColumns: ColumnDef<TargetData>[] = [
  {
    accessorKey: 'name',
    header: () => headerFormatting('Entity'),
    cell: ({ row }) => {
      const item = row.original;
      return (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Building2 className="w-4 h-4 text-blue-600" />
            </div>
            <span className="font-medium text-gray-900">{item.name}</span>
            {item.children && item.children.length > 0 && (
              <ChevronRight className="w-4 h-4 text-gray-400" />
            )}
          </div>
          <span className="text-xs text-gray-500 ml-10">{item.type}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'target',
    header: () => headerFormatting('Target'),
    cell: ({ getValue }) => (
      <div className="flex items-center gap-2">
        <Target className="w-4 h-4 text-blue-500" />
        <span className="font-semibold text-gray-900">
          {formatCurrency(getValue() as number)}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'achieved',
    header: () => headerFormatting('Achieved'),
    cell: ({ getValue }) => (
      <div className="flex items-center gap-2">
        <TrendingUp className="w-4 h-4 text-green-500" />
        <span className="font-semibold text-gray-900">
          {formatCurrency(getValue() as number)}
        </span>
      </div>
    ),
  },
  {
    id: 'achievement',
    header: () => headerFormatting('Achievement %'),
    cell: ({ row }) => {
      const achievement = calculateAchievement(row.original.target, row.original.achieved);
      return (
        <div className="flex flex-col items-center gap-2">
          <span className={`text-sm font-bold ${
            achievement >= 90 ? 'text-green-600' : 
            achievement >= 70 ? 'text-yellow-600' : 
            'text-red-600'
          }`}>
            {achievement}%
          </span>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className={`h-1.5 rounded-full transition-all ${getProgressBarColor(achievement)}`} 
              style={{ width: `${Math.min(achievement, 100)}%` }} 
            />
          </div>
        </div>
      );
    },
  },
  {
    id: 'variance',
    header: () => headerFormatting('Variance'),
    cell: ({ row }) => {
      const variance = row.original.achieved - row.original.target;
      return (
        <span className={`font-semibold ${variance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {variance >= 0 ? '+' : ''}{formatCurrency(variance)}
        </span>
      );
    },
  },
  {
    id: 'status',
    header: () => headerFormatting('Status'),
    cell: ({ row }) => {
      const achievement = calculateAchievement(row.original.target, row.original.achieved);
      return (
        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getAchievementColor(achievement)}`}>
          {getStatusText(achievement)}
        </span>
      );
    },
  },
  {
    id: 'actions',
    header: () => headerFormatting('Actions'),
    cell: ({ row }) => {
      const item = row.original;
      return (
        <div className="flex items-center justify-center gap-2">
          <button 
            className="p-1 hover:bg-gray-100 rounded transition-colors" 
            title="Edit Target"
            onClick={(e) => {
              e.stopPropagation();
              // Handle edit action
            }}
          >
            <Edit2 className="w-4 h-4 text-gray-600" />
          </button>
          <button 
            className="p-1 hover:bg-gray-100 rounded transition-colors" 
            title={item.locked ? 'Locked' : 'Unlocked'}
            onClick={(e) => {
              e.stopPropagation();
              // Handle lock/unlock action
            }}
          >
            {item.locked ? (
              <Lock className="w-4 h-4 text-gray-600" />
            ) : (
              <Unlock className="w-4 h-4 text-gray-600" />
            )}
          </button>
        </div>
      );
    },
  },
];

// Sample data
export const samplePerformanceData: TargetData[] = [
  {
    id: 'R1',
    name: 'North Region',
    type: 'Region',
    target: 1000000,
    achieved: 850000,
    unit: 'PKR',
    locked: true,
    children: [
      {
        id: 'T1',
        name: 'Lahore Territory',
        type: 'Territory',
        target: 600000,
        achieved: 520000,
        unit: 'PKR',
        locked: true,
      },
      {
        id: 'T2',
        name: 'Islamabad Territory',
        type: 'Territory',
        target: 400000,
        achieved: 330000,
        unit: 'PKR',
        locked: true,
      }
    ]
  },
  {
    id: 'R2',
    name: 'South Region',
    type: 'Region',
    target: 800000,
    achieved: 720000,
    unit: 'PKR',
    locked: true,
    children: [
      {
        id: 'T3',
        name: 'Karachi Territory',
        type: 'Territory',
        target: 500000,
        achieved: 460000,
        unit: 'PKR',
        locked: true,
      },
      {
        id: 'T4',
        name: 'Hyderabad Territory',
        type: 'Territory',
        target: 300000,
        achieved: 260000,
        unit: 'PKR',
        locked: true,
      }
    ]
  },
  {
    id: 'R3',
    name: 'Central Region',
    type: 'Region',
    target: 600000,
    achieved: 480000,
    unit: 'PKR',
    locked: false
  }
];