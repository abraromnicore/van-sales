import { type ColumnDef } from '@tanstack/react-table';
import { Calendar, Tag, Eye, Edit2, Archive, Package } from 'lucide-react';

export interface Promotion {
  id: string;
  name: string;
  type: 'Discount' | 'Bundle' | 'Freebie' | 'Cashback';
  startDate: string;
  endDate: string;
  skus: string[];
  status: 'Draft' | 'Active' | 'Closed' | 'Expired';
  progress: number;
  channel: string;
  description: string;
  benefits: string;
  eligibility: string;
  uptakeRate: number;
  salesUplift: number;
  factsheets: string[];
}

// Header formatting utility
const headerFormatting = (title: string) => (
  <div className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
    {title}
  </div>
);

// Status color utility
const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active': return 'bg-green-100 text-green-800';
    case 'Draft': return 'bg-gray-100 text-gray-800';
    case 'Expired': return 'bg-red-100 text-red-800';
    case 'Closed': return 'bg-blue-100 text-blue-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

// Type color utility
const getTypeColor = (type: string) => {
  switch (type) {
    case 'Discount': return 'bg-purple-100 text-purple-800';
    case 'Bundle': return 'bg-blue-100 text-blue-800';
    case 'Freebie': return 'bg-pink-100 text-pink-800';
    case 'Cashback': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

// Promotions columns definition
export const promotionsColumns: ColumnDef<Promotion>[] = [
  {
    accessorKey: 'name',
    header: () => headerFormatting('Promotion'),
    cell: ({ row }) => (
      <div>
        <div className="font-semibold text-gray-900">{row.original.name}</div>
        <div className="text-sm text-gray-500">{row.original.id}</div>
        <div className="flex items-center gap-1 mt-1">
          <Package className="w-3 h-3 text-gray-400" />
          <span className="text-xs text-gray-400">{row.original.skus.length} SKUs</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'type',
    header: () => headerFormatting('Type'),
    cell: ({ getValue }) => (
      <div className="flex items-center gap-2">
        <Tag className="w-4 h-4 text-gray-500" />
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(getValue() as string)}`}>
          {getValue() as string}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'startDate',
    header: () => headerFormatting('Duration'),
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Calendar className="w-4 h-4 text-gray-500" />
        <div className="text-sm">
          <div className="text-gray-900">{row.original.startDate}</div>
          <div className="text-gray-500">{row.original.endDate}</div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: () => headerFormatting('Status'),
    cell: ({ getValue }) => (
      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(getValue() as string)}`}>
        {getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: 'progress',
    header: () => headerFormatting('Progress'),
    cell: ({ getValue }) => {
      const progress = getValue() as number;
      return (
        <div className="flex items-center gap-3">
          <div className="flex-1 max-w-[100px]">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <span className="text-sm font-semibold text-gray-700 min-w-fit">{progress}%</span>
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: () => headerFormatting('Actions'),
    cell: ({ row }) => (
      <div className="flex gap-2">
        <button 
          className="p-1 hover:bg-gray-100 rounded transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            // Add your view logic here
          }}
        >
          <Eye className="w-4 h-4 text-gray-600" />
        </button>
        <button 
          className="p-1 hover:bg-gray-100 rounded transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            // Add your edit logic here
          }}
        >
          <Edit2 className="w-4 h-4 text-gray-600" />
        </button>
        <button 
          className="p-1 hover:bg-gray-100 rounded transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            // Add your archive logic here
          }}
        >
          <Archive className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    ),
  },
];