export const vansData = [
  { vanId: 'VAN-1023', status: 'Loading' },
  { vanId: 'VAN-2041', status: 'In Transit' },
  { vanId: 'VAN-1108', status: 'Unloading' },
  { vanId: 'VAN-3082', status: 'Completed' },
  { vanId: 'VAN-5007', status: 'Idle' },
  { vanId: 'VAN-4120', status: 'In Transit' },
  { vanId: 'VAN-2219', status: 'Loading' },
  { vanId: 'VAN-3344', status: 'Maintenance' },
  { vanId: 'VAN-6590', status: 'Idle' },
  { vanId: 'VAN-7263', status: 'Completed' },
  { vanId: 'VAN-8451', status: 'Unloading' },
  { vanId: 'VAN-9002', status: 'In Transit' },
  { vanId: 'VAN-1289', status: 'Loading' },
  { vanId: 'VAN-5617', status: 'Completed' },
  { vanId: 'VAN-4428', status: 'Maintenance' },
  { vanId: 'VAN-3735', status: 'Idle' },
  { vanId: 'VAN-6178', status: 'In Transit' },
  { vanId: 'VAN-7891', status: 'Loading' },
  { vanId: 'VAN-9530', status: 'Unloading' },
  { vanId: 'VAN-1055', status: 'Completed' }
];

export const dashboardData = {
  liveTracking: {
    totalVans: 15, onRoute: 12, atWarehouse: 2, idle: 1,
  }, pendingApprovals: {
    vanLoadRequests: 3, emergencyLoadRequests: 1, creditApprovals: 2, returnApprovals: 1, discountRequests: 2,
  }, alerts: [{
    id: 'ALT-001',
    type: 'route_deviation',
    severity: 'high' as const,
    vanId: 'VAN-LHR-03',
    repName: 'Imran Ahmed',
    message: 'Van deviated 5km from planned route',
    timestamp: '2025-10-09T14:15:00Z',
  }, {
    id: 'ALT-002',
    type: 'stock_variance',
    severity: 'medium' as const,
    vanId: 'VAN-LHR-07',
    repName: 'Sara Malik',
    message: 'Stock variance detected: PKR 15,000',
    timestamp: '2025-10-09T13:50:00Z',
  }], salesAnalytics: {
    today: {
      totalSales: 2450000,
      cashSales: 1200000,
      creditSales: 1250000,
      target: 3000000,
      achievement: 81.67,
      ordersCount: 245,
      avgOrderValue: 10000,
    }, weekly: {
      dailyBreakdown: [{ day: 'Mon', sales: 2800000, target: 3000000 }, {
        day: 'Tue',
        sales: 2950000,
        target: 3000000,
      }, { day: 'Wed', sales: 2850000, target: 3000000 }, { day: 'Thu', sales: 3000000, target: 3000000 }, {
        day: 'Fri',
        sales: 2900000,
        target: 3000000,
      }],
    }, topProducts: [{
      sku: 'SKU-001', name: 'Premium Tea 500g', unitsSold: 450, revenue: 450000,
    }, {
      sku: 'SKU-012', name: 'Cooking Oil 5L', unitsSold: 320, revenue: 640000,
    }, {
      sku: 'SKU-007', name: 'Basmati Rice 10kg', unitsSold: 150, revenue: 300000,
    }],
  }, inventory: {
    vanStock: {
      totalLoaded: 3500000, totalRemaining: 1450000, utilizationRate: 58.57,
    },
  }, routePerformance: {
    totalRoutes: 15, completed: 0, inProgress: 12, notStarted: 3, onTimePerformance: 86.7,
  }, collectionMetrics: {
    cashCollection: 1200000,
    chequeCollection: 450000,
    bankTransfer: 440000,
    outstandingReceivables: 8500000,
    overdueAccounts: 23,
  }, promotionTracking: {
    topPromotions: [{
      id: 'PROMO-001', name: 'Buy 10 Get 1 Free', applied: 18, incrementalSales: 180000,
    }, {
      id: 'PROMO-002', name: '5% Off Invoice > 5000', applied: 12, incrementalSales: 120000,
    }],
  },
};

export const collectionsData = [{ type: 'Cash', amount: 45600, color: '#10b981' }, {
  type: 'Cheque',
  amount: 32400,
  color: '#3b82f6',
}, { type: 'Bank Transfer', amount: 28900, color: '#8b5cf6' }, {
  type: 'Credit Card',
  amount: 15800,
  color: '#f59e0b',
}];

export const salesData = [{
  id: 1, name: 'Ahmed Khan', sales: 245000, target: 200000, region: 'North', team: 'Alpha', achievement: 122.5, rank: 1,
}, {
  id: 2, name: 'Sarah Ali', sales: 198000, target: 180000, region: 'South', team: 'Beta', achievement: 110.0, rank: 2,
}, {
  id: 3,
  name: 'Muhammad Asif',
  sales: 176000,
  target: 160000,
  region: 'East',
  team: 'Alpha',
  achievement: 110.0,
  rank: 3,
}, {
  id: 4,
  name: 'Fatima Sheikh',
  sales: 165000,
  target: 170000,
  region: 'West',
  team: 'Gamma',
  achievement: 97.1,
  rank: 4,
}, {
  id: 5,
  name: 'Hassan Malik',
  sales: 142000,
  target: 150000,
  region: 'Central',
  team: 'Beta',
  achievement: 94.7,
  rank: 5,
}, {
  id: 6,
  name: 'Zara Qureshi',
  sales: 138000,
  target: 140000,
  region: 'North',
  team: 'Gamma',
  achievement: 98.6,
  rank: 6,
}, {
  id: 7, name: 'Omar Farooq', sales: 125000, target: 130000, region: 'South', team: 'Alpha', achievement: 96.2, rank: 7,
}];

export const notifications: any[] = [{
  id: 1, type: 'warning', message: 'Route deviation detected - Ahmad Hassan', time: '2m ago', priority: 'high',
}, {
  id: 2, type: 'error', message: 'Pending settlement: Rs. 8,500', time: '15m ago', priority: 'high',
}, {
  id: 3, type: 'success', message: 'Daily collection target achieved', time: '1h ago', priority: 'medium',
}, {
  id: 4, type: 'warning', message: 'Customer complaint - Route 3', time: '2h ago', priority: 'medium',
}, {
  id: 5, type: 'info', message: 'New order received - Route 5', time: '3h ago', priority: 'low',
}, {
  id: 6, type: 'warning', message: 'Route deviation detected - Ahmad Hassan', time: '2m ago', priority: 'high',
}, {
  id: 7, type: 'error', message: 'Pending settlement: Rs. 8,500', time: '15m ago', priority: 'high',
}, {
  id: 8, type: 'success', message: 'Daily collection target achieved', time: '1h ago', priority: 'medium',
}, {
  id: 9, type: 'warning', message: 'Customer complaint - Route 3', time: '2h ago', priority: 'medium',
}, {
  id: 10, type: 'info', message: 'New order received - Route 5', time: '3h ago', priority: 'low',
}];