import { type ColumnDef } from '@tanstack/react-table';
import { TrendingUp, DollarSign, Package, Building2 } from 'lucide-react';

interface CustomerData {
    id?: number;
    name: string;
    sales: number;
    orders: number;
}

// Header formatting utility
const headerFormatting = (title: string) => (
    <div className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
        {title}
    </div>
);

// Sales status color utility
const getSalesStatusColor = (sales: number) => {
    if (sales >= 15000) return 'bg-green-100 text-green-800';
    if (sales >= 12000) return 'bg-blue-100 text-blue-800';
    if (sales >= 10000) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
};

// Top Customers columns definition
export const topCustomersColumns: ColumnDef<CustomerData>[] = [
    {
        accessorKey: 'name',
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
        accessorKey: 'sales',
        header: () => headerFormatting('Sales'),
        cell: ({ getValue }) => {
            const sales = getValue() as number;
            return (
                <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-500" />
                    <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getSalesStatusColor(sales)}`}>
                        ${sales.toLocaleString()}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: 'orders',
        header: () => headerFormatting('Orders'),
        cell: ({ getValue }) => (
            <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-blue-500" />
                <span className="text-blue-600 font-medium">
                    {getValue() as number}
                </span>
            </div>
        ),
    },
    {
        id: 'avgOrderValue',
        header: () => headerFormatting('Avg Order Value'),
        cell: ({ row }) => {
            const sales = row.original.sales;
            const orders = row.original.orders;
            const avgOrderValue = Math.round(sales / orders);
            
            return (
                <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-purple-500" />
                    <span className="font-medium text-gray-900">
                        ${avgOrderValue.toLocaleString()}
                    </span>
                </div>
            );
        },
    },
    {
        id: 'performance',
        header: () => headerFormatting('Performance'),
        cell: ({ row }) => {
            const sales = row.original.sales;
            const maxSales = 20000; // You can adjust this based on your data
            const percentage = Math.min((sales / maxSales) * 100, 100);
            
            return (
                <div className="flex items-center gap-3">
                    <div className="flex-1">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                                className="h-2.5 rounded-full transition-all duration-300 bg-gradient-to-r from-blue-500 to-green-500"
                                style={{ width: `${percentage}%` }}
                            ></div>
                        </div>
                    </div>
                    <span className="text-xs text-gray-500 font-medium min-w-fit">
                        {percentage.toFixed(0)}%
                    </span>
                </div>
            );
        },
    },
];


export const topCustomers: CustomerData[] = [
                        { id: 1, name: 'TechCorp Solutions', sales: 18500, orders: 12 },
                        { id: 2, name: 'Global Industries', sales: 15200, orders: 8 },
                        { id: 3, name: 'Metro Enterprises', sales: 12800, orders: 15 },
                        { id: 4, name: 'Alpha Systems', sales: 11300, orders: 9 },
                        { id: 5, name: 'Beta Corporation', sales: 9600, orders: 11 },
                        { id: 6, name: 'Gamma Solutions', sales: 8900, orders: 7 },
                        { id: 7, name: 'Delta Tech', sales: 8200, orders: 10 },
                        { id: 8, name: 'Epsilon Corp', sales: 7500, orders: 6 },
                    ];