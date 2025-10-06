import { useState, useMemo } from 'react';
import PageLayout from '../layout/pageLayout';
import { DailySummaryTable, mockDailySummaryData, SettlementsTable } from '../teamPerformance/columns/SettlementColumns';

// Types
interface Settlement {
  id: string;
  repId: string;
  repName: string;
  region: string;
  date: string;
  salesAmount: number;
  collections: {
    cash: number;
    cheque: number;
    pending: number;
    total: number;
  };
  returns: number;
  netAmount: number;
  status: 'pending' | 'approved' | 'rejected' | 'correction_pending';
  proofs: string[];
  notes: string;
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
}

// Mock Data
const mockSettlements: Settlement[] = [
  {
    id: 'STL-001',
    repId: 'REP-001',
    repName: 'John Smith',
    region: 'North',
    date: '2025-09-25',
    salesAmount: 15000,
    collections: { cash: 8000, cheque: 5000, pending: 2000, total: 15000 },
    returns: 500,
    netAmount: 14500,
    status: 'pending',
    proofs: ['receipt1.jpg', 'invoice1.pdf', 'collection_slip1.jpg'],
    notes: 'Regular settlement - all collections verified',
    submittedAt: '2025-09-25T10:30:00'
  },
  {
    id: 'STL-002',
    repId: 'REP-002',
    repName: 'Sarah Johnson',
    region: 'South',
    date: '2025-09-25',
    salesAmount: 12500,
    collections: { cash: 7500, cheque: 3000, pending: 2000, total: 12500 },
    returns: 200,
    netAmount: 12300,
    status: 'approved',
    proofs: ['receipt2.jpg', 'invoice2.pdf'],
    notes: 'Approved - all documentation complete',
    submittedAt: '2025-09-25T09:15:00',
    reviewedAt: '2025-09-25T14:00:00',
    reviewedBy: 'Manager A'
  },
  {
    id: 'STL-003',
    repId: 'REP-003',
    repName: 'Mike Davis',
    region: 'East',
    date: '2025-09-24',
    salesAmount: 18000,
    collections: { cash: 10000, cheque: 6000, pending: 2000, total: 18000 },
    returns: 800,
    netAmount: 17200,
    status: 'correction_pending',
    proofs: ['receipt3.jpg'],
    notes: 'Missing collection slip for cheque payment',
    submittedAt: '2025-09-24T16:45:00',
    reviewedAt: '2025-09-25T11:30:00',
    reviewedBy: 'Manager B'
  },
  {
    id: 'STL-004',
    repId: 'REP-004',
    repName: 'Lisa Wilson',
    region: 'West',
    date: '2025-09-24',
    salesAmount: 9500,
    collections: { cash: 5500, cheque: 2000, pending: 2000, total: 9500 },
    returns: 150,
    netAmount: 9350,
    status: 'rejected',
    proofs: ['receipt4.jpg'],
    notes: 'Discrepancy in cash collection amount',
    submittedAt: '2025-09-24T14:20:00',
    reviewedAt: '2025-09-24T17:00:00',
    reviewedBy: 'Manager C'
  }
];

const SettlementsModule = () => {

  // Daily Summary State
  const [dailyPage, setDailyPage] = useState(1);
  const [dailyLimit, setDailyLimit] = useState(5);

  // Settlements State
  const [settlementsPage, setSettlementsPage] = useState(1);
  const [settlementsLimit, setSettlementsLimit] = useState(5);

  // Your actual data would come from API calls or props
  const dailySummaryData = mockDailySummaryData; // Replace with actual data
  const settlementsData = mockSettlements; // Replace with actual data

  // Daily Summary Pagination
  const dailyTotalPages = Math.ceil(dailySummaryData.length / dailyLimit);
  const currentDailyData = useMemo(() => {
    const startIndex = (dailyPage - 1) * dailyLimit;
    return dailySummaryData.slice(startIndex, startIndex + dailyLimit);
  }, [dailySummaryData, dailyPage, dailyLimit]);

  // Settlements Pagination
  const settlementsTotalPages = Math.ceil(settlementsData.length / settlementsLimit);
  const currentSettlementsData = useMemo(() => {
    const startIndex = (settlementsPage - 1) * settlementsLimit;
    return settlementsData.slice(startIndex, startIndex + settlementsLimit);
  }, [settlementsData, settlementsPage, settlementsLimit]);

  return (
    <div className="min-h-screen">
      <PageLayout title='Settlement Reviews' description='See all Settlement Reviews sales across your team'>
        <div className="space-y-6 p-4">
          <div className="space-y-6 p-4">
            {/* Daily Summary Table */}
            <DailySummaryTable
              data={currentDailyData}
              page={dailyPage}
              setPage={setDailyPage}
              totalPages={dailyTotalPages}
              limit={dailyLimit}
              setLimit={setDailyLimit}
            />

            {/* Settlements Table */}
            <SettlementsTable
              data={currentSettlementsData}
              page={settlementsPage}
              setPage={setSettlementsPage}
              totalPages={settlementsTotalPages}
              limit={settlementsLimit}
              setLimit={setSettlementsLimit}
            />
          </div>
        </div>
      </PageLayout>
    </div>
  );
};

export default SettlementsModule;