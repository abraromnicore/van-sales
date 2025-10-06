import { type ColumnDef } from '@tanstack/react-table';
import { Package, CheckCircle, XCircle, Hash, Info } from 'lucide-react';


interface ReturnData {
  id?: number;
  item: string;
  quantity: number;
  reason: string;
  salesRep: string;
  isValid: boolean;
}

// Header formatting utility
const headerFormatting = (title: string) => (
  <div className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
    {title}
  </div>
);

// Return reason color utility
const getReasonColor = (reason: string) => {
  switch (reason.toLowerCase()) {
    case 'damaged':
      return 'bg-red-100 text-red-800';
    case 'expired':
      return 'bg-orange-100 text-orange-800';
    case 'wrong item':
      return 'bg-yellow-100 text-yellow-800';
    case 'customer refusal':
      return 'bg-purple-100 text-purple-800';
    case 'fake claim':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-blue-100 text-blue-800';
  }
};

// Quantity color utility
const getQuantityColor = (quantity: number) => {
  if (quantity >= 15) return 'text-red-600';
  if (quantity >= 10) return 'text-orange-600';
  if (quantity >= 5) return 'text-yellow-600';
  return 'text-green-600';
};

// Return Detail columns definition
export const returnDetailColumns: ColumnDef<ReturnData>[] = [
  {
    accessorKey: 'item',
    header: () => headerFormatting('Item'),
    cell: ({ getValue }) => (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
          <Package className="w-4 h-4 text-indigo-600" />
        </div>
        <span className="font-medium text-gray-900">{getValue() as string}</span>
      </div>
    ),
  },
  {
    accessorKey: 'quantity',
    header: () => headerFormatting('Quantity'),
    cell: ({ getValue }) => {
      const quantity = getValue() as number;
      return (
        <div className="flex items-center gap-2">
          <Hash className="w-4 h-4 text-gray-500" />
          <span className={`font-semibold ${getQuantityColor(quantity)}`}>
            {quantity}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'reason',
    header: () => headerFormatting('Reason'),
    cell: ({ getValue }) => {
      const reason = getValue() as string;
      return (
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-gray-400" />
          <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getReasonColor(reason)}`}>
            {reason}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'salesRep',
    header: () => headerFormatting('Sales Rep'),
    cell: ({ getValue }) => {
      const rep = getValue() as string;
      return (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-semibold text-sm">
              {rep.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <span className="font-medium text-gray-900">{rep}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'isValid',
    header: () => headerFormatting('Status'),
    cell: ({ getValue }) => {
      const isValid = getValue() as boolean;
      return (
        <div className="flex items-center gap-2">
          {isValid ? (
            <CheckCircle className="w-4 h-4 text-green-500" />
          ) : (
            <XCircle className="w-4 h-4 text-red-500" />
          )}
          <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
            isValid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {isValid ? 'Valid' : 'Invalid'}
          </span>
        </div>
      );
    },
  },
  {
    id: 'impact',
    header: () => headerFormatting('Impact Level'),
    cell: ({ row }) => {
      const quantity = row.original.quantity;
      const isValid = row.original.isValid;
      const impactScore = isValid ? quantity : 0;
      const maxImpact = 20;
      const percentage = Math.min((impactScore / maxImpact) * 100, 100);
      
      return (
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  !isValid ? 'bg-gray-400' :
                  percentage > 75 ? 'bg-red-500' :
                  percentage > 50 ? 'bg-orange-500' :
                  percentage > 25 ? 'bg-yellow-500' :
                  'bg-green-500'
                }`}
                style={{ width: `${isValid ? Math.max(percentage, 5) : 0}%` }}
              ></div>
            </div>
          </div>
          <span className="text-xs text-gray-500 font-medium min-w-fit">
            {isValid ? `${percentage.toFixed(0)}%` : 'N/A'}
          </span>
        </div>
      );
    },
  },
];

// Mock data for Returns - More realistic data
  export const returnsByItem: ReturnData[] = [
    { id: 1, item: 'Premium Widget A', quantity: 18, reason: 'Damaged', salesRep: 'John Smith', isValid: true },
    { id: 2, item: 'Standard Kit B', quantity: 12, reason: 'Customer Refusal', salesRep: 'Sarah Johnson', isValid: false },
    { id: 3, item: 'Deluxe Package C', quantity: 22, reason: 'Expired', salesRep: 'Mike Chen', isValid: true },
    { id: 4, item: 'Basic Unit D', quantity: 8, reason: 'Wrong Item', salesRep: 'Emma Davis', isValid: true },
    { id: 5, item: 'Pro Series E', quantity: 15, reason: 'Fake Claim', salesRep: 'David Wilson', isValid: false },
    { id: 6, item: 'Standard Widget F', quantity: 14, reason: 'Damaged', salesRep: 'John Smith', isValid: true },
    { id: 7, item: 'Economy Kit G', quantity: 6, reason: 'Customer Refusal', salesRep: 'Sarah Johnson', isValid: false },
    { id: 8, item: 'Premium Package H', quantity: 19, reason: 'Expired', salesRep: 'Mike Chen', isValid: true },
    { id: 9, item: 'Basic Widget I', quantity: 11, reason: 'Wrong Item', salesRep: 'Emma Davis', isValid: true },
    { id: 10, item: 'Deluxe Unit J', quantity: 9, reason: 'Damaged', salesRep: 'John Smith', isValid: true },
    { id: 11, item: 'Standard Package K', quantity: 7, reason: 'Expired', salesRep: 'David Wilson', isValid: true },
    { id: 12, item: 'Pro Widget L', quantity: 13, reason: 'Wrong Item', salesRep: 'Sarah Johnson', isValid: true },
    { id: 13, item: 'Economy Unit M', quantity: 5, reason: 'Fake Claim', salesRep: 'Mike Chen', isValid: false },
    { id: 14, item: 'Premium Series N', quantity: 16, reason: 'Damaged', salesRep: 'Emma Davis', isValid: true },
    { id: 15, item: 'Deluxe Kit O', quantity: 10, reason: 'Customer Refusal', salesRep: 'John Smith', isValid: false },
  ];


