import { useState } from 'react';
import { Search, Filter, Plus, Edit2, Archive, Download, Upload, X, Calendar, TrendingUp, Package, FileText, Eye, ChevronDown } from 'lucide-react';
import * as React from 'react';
import PageLayout from '../layout/pageLayout';
import { DataTable } from '../../components/tables/data-table';
import { promotionsColumns, type Promotion } from './columns/promotionsColumns';


const PromotionsManager: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [activeFilter, setActiveFilter] = useState('All');
    const [sortBy, setSortBy] = useState('startDate');

    const samplePromotions: Promotion[] = [
        {
            id: 'PRO-001',
            name: 'Summer Bundle Bonanza',
            type: 'Bundle',
            startDate: '2025-06-01',
            endDate: '2025-08-31',
            skus: ['SKU-123', 'SKU-456', 'SKU-789'],
            status: 'Active',
            progress: 67,
            channel: 'Retail, Wholesale',
            description: 'Buy 2 get 1 free on selected summer products',
            benefits: '33% effective discount on bundle purchase',
            eligibility: 'Min. purchase: 2 units, All outlet types, Nationwide',
            uptakeRate: 67,
            salesUplift: 45,
            factsheets: ['Summer_Promo_Guide.pdf', 'Product_Catalog.xlsx']
        },
        {
            id: 'PRO-002',
            name: 'Mega Discount Week',
            type: 'Discount',
            startDate: '2025-10-15',
            endDate: '2025-10-22',
            skus: ['SKU-321', 'SKU-654'],
            status: 'Active',
            progress: 34,
            channel: 'E-commerce, Modern Trade',
            description: '20% off on premium product range',
            benefits: '20% discount on all orders',
            eligibility: 'Min. purchase: 5 units, Premium outlets only, Metro cities',
            uptakeRate: 34,
            salesUplift: 28,
            factsheets: ['Discount_Campaign.pdf']
        },
        {
            id: 'PRO-003',
            name: 'Holiday Cashback Special',
            type: 'Cashback',
            startDate: '2025-12-01',
            endDate: '2025-12-31',
            skus: ['SKU-111', 'SKU-222', 'SKU-333', 'SKU-444'],
            status: 'Draft',
            progress: 0,
            channel: 'All Channels',
            description: 'Get 15% cashback on purchases above $100',
            benefits: '15% cashback credited within 7 days',
            eligibility: 'Min. purchase: $100, All outlet types, All regions',
            uptakeRate: 0,
            salesUplift: 0,
            factsheets: []
        },
        {
            id: 'PRO-004',
            name: 'Spring Freebie Festival',
            type: 'Freebie',
            startDate: '2025-03-01',
            endDate: '2025-05-31',
            skus: ['SKU-555', 'SKU-666'],
            status: 'Expired',
            progress: 100,
            channel: 'Traditional Trade',
            description: 'Free gift with every purchase of 10 units',
            benefits: 'Free promotional item worth $25',
            eligibility: 'Min. purchase: 10 units, Traditional outlets, Rural areas',
            uptakeRate: 89,
            salesUplift: 56,
            factsheets: ['Spring_Promo.pdf', 'Gift_Catalog.pdf']
        }
    ];

    const [promotions, setPromotions] = useState<Promotion[]>(samplePromotions);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);


    const filteredPromotions = promotions.filter(promo => {
        const matchesSearch = promo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            promo.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            promo.skus.some(sku => sku.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesFilter = activeFilter === 'All' || promo.status === activeFilter;
        return matchesSearch && matchesFilter;
    });

    return (
        <div >
            <PageLayout title='Promotions & Factsheets' description='Create, manage, and monitor promotional campaigns'>
                <div className="p-4">
                    {/* Search and Filters Bar */}
                    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                        <div className="flex flex-wrap gap-4 items-center">
                            {/* Search */}
                            <div className="flex-1 min-w-[300px]">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Search by promotion name, SKU, or campaign code..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Filter Buttons */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <Filter className="w-4 h-4" />
                                    Filters
                                    <ChevronDown className="w-4 h-4" />
                                </button>

                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <option value="startDate">Start Date</option>
                                    <option value="endDate">End Date</option>
                                    <option value="priority">Priority</option>
                                </select>

                                <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                    <Plus className="w-4 h-4" />
                                    Create New Promotion
                                </button>
                            </div>
                        </div>

                        {/* Filter Tags */}
                        {showFilters && (
                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <div className="flex flex-wrap gap-2">
                                    {['All', 'Active', 'Draft', 'Expired', 'Closed'].map(filter => (
                                        <button
                                            key={filter}
                                            onClick={() => setActiveFilter(filter)}
                                            className={`px-3 py-1 rounded-full text-sm transition-colors
                    ${activeFilter === filter
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                        >
                                            {filter}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Replace the entire table section with this */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center gap-2">
                                <TrendingUp className="w-6 h-6 text-blue-500" />
                                <h3 className="text-lg font-semibold text-gray-900">Active Promotions</h3>
                            </div>
                        </div>

                        <DataTable
                            columns={promotionsColumns}
                            data={filteredPromotions}
                            page={page}
                            setPage={setPage}
                            totalPages={Math.ceil(filteredPromotions.length / limit)}
                            limit={limit}
                            setLimit={setLimit}
                        />
                    </div>
                </div>
            </PageLayout>
        </div>
    );
};

export default PromotionsManager;