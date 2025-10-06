import { type ColumnDef } from '@tanstack/react-table';
import {DollarSign, Building2, FileText, Calendar, AlertCircle } from 'lucide-react';



interface OverdueData {
  id?: number;
  customer: string;
  amount: number;
  daysPastDue: number;
  invoiceNumber: string;
}

// Header formatting utility
const headerFormatting = (title: string) => (
  <div className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
    {title}
  </div>
);

// Status color utility
const getOverdueStatusColor = (daysPastDue: number) => {
  if (daysPastDue > 30) return 'bg-red-100 text-red-800';
  if (daysPastDue > 15) return 'bg-yellow-100 text-yellow-800';
  return 'bg-orange-100 text-orange-800';
};

const getOverdueStatusText = (daysPastDue: number) => {
  if (daysPastDue > 30) return 'Critical';
  if (daysPastDue > 15) return 'Warning';
  return 'Overdue';
};

// Amount color utility
const getAmountColor = (amount: number) => {
  if (amount >= 10000) return 'text-red-600';
  if (amount >= 5000) return 'text-yellow-600';
  return 'text-orange-600';
};

// Overdue Accounts columns definition
export const overdueAccountsColumns: ColumnDef<OverdueData>[] = [
  {
    accessorKey: 'customer',
    header: () => headerFormatting('Customer'),
    cell: ({ getValue }) => (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <Building2 className="w-4 h-4 text-blue-600" />
        </div>
        <span className="font-medium text-gray-900">{getValue() as string}</span>
      </div>
    ),
  },
  {
    accessorKey: 'invoiceNumber',
    header: () => headerFormatting('Invoice #'),
    cell: ({ getValue }) => (
      <div className="flex items-center gap-2">
        <FileText className="w-4 h-4 text-gray-500" />
        <span className="text-gray-900 font-mono text-sm">
          {getValue() as string}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'amount',
    header: () => headerFormatting('Amount'),
    cell: ({ getValue }) => {
      const amount = getValue() as number;
      return (
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-green-500" />
          <span className={`font-semibold ${getAmountColor(amount)}`}>
            ${amount.toLocaleString()}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'daysPastDue',
    header: () => headerFormatting('Days Past Due'),
    cell: ({ getValue }) => {
      const days = getValue() as number;
      return (
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <span className="text-gray-900 font-medium">
            {days} days
          </span>
        </div>
      );
    },
  },
  {
    id: 'status',
    header: () => headerFormatting('Status'),
    cell: ({ row }) => {
      const daysPastDue = row.original.daysPastDue;
      return (
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-gray-400" />
          <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getOverdueStatusColor(daysPastDue)}`}>
            {getOverdueStatusText(daysPastDue)}
          </span>
        </div>
      );
    },
  },
  {
    id: 'urgency',
    header: () => headerFormatting('Urgency'),
    cell: ({ row }) => {
      const daysPastDue = row.original.daysPastDue;
      const amount = row.original.amount;
      const urgencyScore = (daysPastDue / 10) + (amount / 10000);
      const percentage = Math.min(urgencyScore * 10, 100);
      
      return (
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  percentage > 80 ? 'bg-red-500' :
                  percentage > 60 ? 'bg-yellow-500' :
                  'bg-orange-500'
                }`}
                style={{ width: `${Math.min(percentage, 100)}%` }}
              ></div>
            </div>
          </div>
          <span className="text-xs text-gray-500 font-medium min-w-fit">
            {Math.min(percentage, 100).toFixed(0)}%
          </span>
        </div>
      );
    },
  },
];

export const overdueData: OverdueData[] = [
    { id: 1, customer: 'TechCorp Solutions', amount: 8500, daysPastDue: 15, invoiceNumber: 'INV-2024-001' },
    { id: 2, customer: 'Metro Enterprises', amount: 5200, daysPastDue: 32, invoiceNumber: 'INV-2024-023' },
    { id: 3, customer: 'Delta Systems', amount: 3800, daysPastDue: 8, invoiceNumber: 'INV-2024-045' },
    { id: 4, customer: 'Omega Corp', amount: 12300, daysPastDue: 45, invoiceNumber: 'INV-2024-012' },
    { id: 5, customer: 'Beta Solutions', amount: 6700, daysPastDue: 22, invoiceNumber: 'INV-2024-056' },
    { id: 6, customer: 'Gamma Industries', amount: 9100, daysPastDue: 18, invoiceNumber: 'INV-2024-067' },
    { id: 7, customer: 'Alpha Corp', amount: 4200, daysPastDue: 38, invoiceNumber: 'INV-2024-078' },
    { id: 8, customer: 'Zeta Enterprises', amount: 7800, daysPastDue: 12, invoiceNumber: 'INV-2024-089' },
  ];