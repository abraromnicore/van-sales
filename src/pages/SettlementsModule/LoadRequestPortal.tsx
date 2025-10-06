import { useState, useEffect } from 'react';
import { Search, Filter, CheckCircle, XCircle, AlertCircle, ChevronLeft, TrendingUp, Calendar, User, Eye, Package, Clock } from 'lucide-react';
import { DataTable } from '../../components/tables/data-table';
import { createLoadRequestColumns } from './columns/loadRequestColumns';
import { ScrollToTop } from '../../components/common/ScrollToTop';
import PageLayout from '../layout/pageLayout';

// Mock DataTable Component (replace with your actual import)
// import { DataTable } from '../../components/tables/data-table';
// import { createLoadRequestColumns } from './columns/loadRequestColumns';

interface StockItem {
    id: string;
    name: string;
    requestedQty: number;
    availableQty: number;
    unit: string;
}

interface LoadRequest {
    id: string;
    vanRepName: string;
    date: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    priority: 'Normal' | 'High' | 'Urgent';
    items: StockItem[];
    notes?: string;
    complianceNotes?: string;
}

const getStatusBadge = (status: string) => {
    switch (status) {
        case 'Pending': return 'bg-yellow-100 text-yellow-800';
        case 'Approved': return 'bg-green-100 text-green-800';
        case 'Rejected': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

const getPriorityBadge = (priority: string) => {
    switch (priority) {
        case 'Normal': return 'bg-gray-100 text-gray-700';
        case 'High': return 'bg-orange-100 text-orange-800';
        case 'Urgent': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-700';
    }
};


const LoadRequestPortal = () => {
    const [selectedRequest, setSelectedRequest] = useState<LoadRequest | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('All');
    const [showConfirmDialog, setShowConfirmDialog] = useState<{ show: boolean; action: 'Approve' | 'Reject' | null }>({ show: false, action: null });
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);

    const [requests, setRequests] = useState<LoadRequest[]>([
        {
            id: 'REQ-2025-001',
            vanRepName: 'John Smith',
            date: '2025-09-30',
            status: 'Pending',
            priority: 'Urgent',
            items: [
                { id: '1', name: 'Product A', requestedQty: 50, availableQty: 120, unit: 'units' },
                { id: '2', name: 'Product B', requestedQty: 30, availableQty: 25, unit: 'units' },
                { id: '3', name: 'Product C', requestedQty: 20, availableQty: 40, unit: 'boxes' }
            ],
            notes: 'Urgent delivery needed for new client presentation',
            complianceNotes: 'Product B quantity exceeds available stock'
        },
        {
            id: 'REQ-2025-002',
            vanRepName: 'Sarah Johnson',
            date: '2025-09-29',
            status: 'Pending',
            priority: 'High',
            items: [
                { id: '4', name: 'Product D', requestedQty: 100, availableQty: 150, unit: 'units' },
                { id: '5', name: 'Product E', requestedQty: 75, availableQty: 80, unit: 'boxes' }
            ],
            notes: 'Regular weekly stock replenishment'
        },
        {
            id: 'REQ-2025-003',
            vanRepName: 'Mike Davis',
            date: '2025-09-28',
            status: 'Approved',
            priority: 'Normal',
            items: [
                { id: '6', name: 'Product F', requestedQty: 40, availableQty: 60, unit: 'units' }
            ]
        },
        {
            id: 'REQ-2025-004',
            vanRepName: 'Emily Wilson',
            date: '2025-09-30',
            status: 'Pending',
            priority: 'Normal',
            items: [
                { id: '7', name: 'Product G', requestedQty: 25, availableQty: 50, unit: 'units' },
                { id: '8', name: 'Product H', requestedQty: 15, availableQty: 30, unit: 'boxes' }
            ]
        },
        {
            id: 'REQ-2025-005',
            vanRepName: 'David Brown',
            date: '2025-09-27',
            status: 'Rejected',
            priority: 'Normal',
            items: [
                { id: '9', name: 'Product I', requestedQty: 200, availableQty: 50, unit: 'units' }
            ],
            complianceNotes: 'Insufficient stock to fulfill request'
        },
        {
            id: 'REQ-2025-006',
            vanRepName: 'Alice Cooper',
            date: '2025-09-30',
            status: 'Pending',
            priority: 'High',
            items: [
                { id: '10', name: 'Product J', requestedQty: 60, availableQty: 80, unit: 'units' }
            ]
        },
        {
            id: 'REQ-2025-007',
            vanRepName: 'Robert Lee',
            date: '2025-09-29',
            status: 'Approved',
            priority: 'Normal',
            items: [
                { id: '11', name: 'Product K', requestedQty: 35, availableQty: 50, unit: 'boxes' }
            ]
        }
    ]);

    // Reset page to 1 when filters or limit change
    useEffect(() => {
        setPage(1);
    }, [searchTerm, statusFilter, limit]);

    // Filter and sort requests
    const filteredRequests = requests.filter(req => {
        const matchesSearch = req.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.vanRepName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || req.status === statusFilter;
        return matchesSearch && matchesStatus;
    }).sort((a, b) => {
        const priorityOrder = { Urgent: 3, High: 2, Normal: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
    });

    // Calculate pagination - THIS IS THE KEY FIX
    const totalPages = Math.ceil(filteredRequests.length / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedRequests = filteredRequests.slice(startIndex, endIndex);

    const handleAction = (action: 'Approve' | 'Reject') => {
        if (selectedRequest) {
            setRequests(requests.map(req =>
                req.id === selectedRequest.id
                    ? { ...req, status: action === 'Approve' ? 'Approved' : 'Rejected' }
                    : req
            ));
            setShowConfirmDialog({ show: false, action: null });
            setSelectedRequest(null);
        }
    };

    const ConfirmDialog = () => {
        if (!showConfirmDialog.show || !showConfirmDialog.action) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
                    <h3 className="text-lg font-semibold mb-4">
                        {showConfirmDialog.action} Request
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Are you sure you want to {showConfirmDialog.action.toLowerCase()} request {selectedRequest?.id}?
                    </p>
                    <div className="flex gap-3 justify-end">
                        <button
                            onClick={() => setShowConfirmDialog({ show: false, action: null })}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => handleAction(showConfirmDialog.action!)}
                            className={`px-4 py-2 rounded-lg text-white transition-colors ${showConfirmDialog.action === 'Approve'
                                ? 'bg-green-600 hover:bg-green-700'
                                : 'bg-red-600 hover:bg-red-700'
                                }`}
                        >
                            {showConfirmDialog.action}
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    if (selectedRequest) {
        return (
            <div className="min-h-screen bg-gray-50 p-4 md:p-6">
                <ScrollToTop />
                <ConfirmDialog />
                <div className="max-w-6xl mx-auto">
                    <button
                        onClick={() => setSelectedRequest(null)}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
                    >
                        <ChevronLeft size={20} />
                        Back to Requests
                    </button>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                <div>
                                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">{selectedRequest.id}</h2>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(selectedRequest.status)}`}>
                                            {selectedRequest.status}
                                        </span>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityBadge(selectedRequest.priority)}`}>
                                            {selectedRequest.priority} Priority
                                        </span>
                                    </div>
                                    <div className="text-gray-600 space-y-1">
                                        <p><span className="font-medium">Van Rep:</span> {selectedRequest.vanRepName}</p>
                                        <p><span className="font-medium">Date:</span> {new Date(selectedRequest.date).toLocaleDateString()}</p>
                                    </div>
                                </div>

                                {selectedRequest.status === 'Pending' && (
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => setShowConfirmDialog({ show: true, action: 'Reject' })}
                                            className="flex items-center gap-2 px-6 py-2.5 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium"
                                        >
                                            <XCircle size={20} />
                                            Reject
                                        </button>
                                        <button
                                            onClick={() => setShowConfirmDialog({ show: true, action: 'Approve' })}
                                            className="flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                                        >
                                            <CheckCircle size={20} />
                                            Approve
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="p-6">
                            <h3 className="text-lg font-semibold mb-4">Requested Items</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-200">
                                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Item Name</th>
                                            <th className="text-right py-3 px-4 font-semibold text-gray-700">Requested</th>
                                            <th className="text-right py-3 px-4 font-semibold text-gray-700">Available</th>
                                            <th className="text-center py-3 px-4 font-semibold text-gray-700">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedRequest.items.map(item => {
                                            const isAvailable = item.requestedQty <= item.availableQty;
                                            return (
                                                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                                                    <td className="py-3 px-4">{item.name}</td>
                                                    <td className="py-3 px-4 text-right">{item.requestedQty} {item.unit}</td>
                                                    <td className="py-3 px-4 text-right">{item.availableQty} {item.unit}</td>
                                                    <td className="py-3 px-4 text-center">
                                                        {isAvailable ? (
                                                            <span className="inline-flex items-center gap-1 text-green-600 text-sm">
                                                                <CheckCircle size={16} />
                                                                Available
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center gap-1 text-red-600 text-sm">
                                                                <AlertCircle size={16} />
                                                                Insufficient
                                                            </span>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            {selectedRequest.notes && (
                                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                    <h4 className="font-semibold text-gray-900 mb-2">Notes</h4>
                                    <p className="text-gray-700">{selectedRequest.notes}</p>
                                </div>
                            )}

                            {selectedRequest.complianceNotes && (
                                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                    <div className="flex gap-2">
                                        <AlertCircle className="text-yellow-600 flex-shrink-0 mt-0.5" size={20} />
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-1">Compliance Alert</h4>
                                            <p className="text-gray-700">{selectedRequest.complianceNotes}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <PageLayout title='Van Load Requests' description='Review and manage pending load requests'>
                <div className="p-4">
                    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search by Request ID or Van Rep name..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div className="flex gap-2">
                                <div className="relative">
                                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="pl-10 pr-8 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white cursor-pointer"
                                    >
                                        <option value="All">All Status</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Approved">Approved</option>
                                        <option value="Rejected">Rejected</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center gap-2">
                                <TrendingUp className="w-6 h-6 text-blue-500" />
                                <h3 className="text-lg font-semibold text-gray-900">Load Requests</h3>
                            </div>
                        </div>

                        {/* Pass PAGINATED data to DataTable, not all filteredRequests */}
                        <DataTable
                            columns={createLoadRequestColumns(setSelectedRequest)}
                            data={paginatedRequests}
                            page={page}
                            setPage={setPage}
                            totalPages={totalPages}
                            limit={limit}
                            setLimit={setLimit}
                        />
                    </div>
                </div>
            </PageLayout>
        </div>
    );
};

export default LoadRequestPortal;