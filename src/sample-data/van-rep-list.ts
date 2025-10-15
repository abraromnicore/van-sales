export const vanRepList = [
    {
      'repId': 'VR001',
      'name': 'Ali Khan',
      'van': 'Van-12',
      'gender': 'Male',
      'territory': 'North Zone',
      'status': 'Occupied',
      'orders': {
        'totalOrders': 18,
        'salesValue': 45000,
        'targetAchievedPercent': 72,
      },
      'visits': {
        'planned': 12,
        'completed': 9,
        'missed': 1,
        'currentStatus': 'On Route',
      },
      'stock': {
        'vanStockUtilization': '80%',
        'loadVariancePercent': 2,
      },
      'collections': {
        'cashCollected': 15000,
        'creditExtended': 30000,
        'creditLimitFlag': false,
      },
      'loadLimit': {
        'status': 'Assigned',
        'limitType': 'order_value',
        'limitValue': 12000,
        'effectiveFrom': '2024-06-01',
        'effectiveTo': null,
        'remarks': 'Increased limit for summer season'
      },
    },
    {
      'repId': 'VR002',
      'name': 'Ahmed Khan',
      'van': 'Van-14',
      'gender': 'Male',
      'territory': 'South Zone',
      'status': 'Available',
      'orders': {
        'totalOrders': 18,
        'salesValue': 45000,
        'targetAchievedPercent': 72,
      },
      'visits': {
        'planned': 12,
        'completed': 9,
        'missed': 1,
        'currentStatus': 'On Route',
      },
      'stock': {
        'vanStockUtilization': '80%',
        'loadVariancePercent': 2,
      },
      'collections': {
        'cashCollected': 15000,
        'creditExtended': 30000,
        'creditLimitFlag': false,
      },
      'loadLimit': {
        'status': 'Not Assigned',
        'limitType': null,
        'limitValue': null,
        'effectiveFrom': null,
        'effectiveTo': null,
        'remarks': null
      },
    },
    {
      'repId': 'VR003',
      'name': 'Shayad Ali',
      'van': 'Van-15',
      'gender': 'Female',
      'territory': 'East Zone',
      'status': 'Not Available',
      'orders': {
        'totalOrders': 18,
        'salesValue': 45000,
        'targetAchievedPercent': 72,
      },
      'visits': {
        'planned': 12,
        'completed': 9,
        'missed': 1,
        'currentStatus': 'On Route',
      },
      'stock': {
        'vanStockUtilization': '80%',
        'loadVariancePercent': 2,
      },
      'collections': {
        'cashCollected': 15000,
        'creditExtended': 30000,
        'creditLimitFlag': false,
      },
      'loadLimit': {
        'status': 'Expired',
        'limitType': 'load_quantity',
        'limitValue': 30,
        'effectiveFrom': '2024-01-01',
        'effectiveTo': '2024-03-31',
        'remarks': 'Q1 2024 limit - expired'
      },
    },
    {
      'repId': 'VR004',
      'name': 'Fatima Sheikh',
      'van': 'Van-16',
      'gender': 'Female',
      'territory': 'West Zone',
      'status': 'Available',
      'orders': {
        'totalOrders': 15,
        'salesValue': 38000,
        'targetAchievedPercent': 85,
      },
      'visits': {
        'planned': 10,
        'completed': 8,
        'missed': 2,
        'currentStatus': 'Available',
      },
      'stock': {
        'vanStockUtilization': '75%',
        'loadVariancePercent': 1,
      },
      'collections': {
        'cashCollected': 12000,
        'creditExtended': 25000,
        'creditLimitFlag': false,
      },
      'loadLimit': {
        'status': 'Not Assigned',
        'limitType': null,
        'limitValue': null,
        'effectiveFrom': null,
        'effectiveTo': null,
        'remarks': null
      },
    },
    {
      'repId': 'VR005',
      'name': 'Hassan Ali',
      'van': 'Van-17',
      'gender': 'Male',
      'territory': 'Central Zone',
      'status': 'Occupied',
      'orders': {
        'totalOrders': 22,
        'salesValue': 52000,
        'targetAchievedPercent': 95,
      },
      'visits': {
        'planned': 15,
        'completed': 14,
        'missed': 1,
        'currentStatus': 'On Route',
      },
      'stock': {
        'vanStockUtilization': '90%',
        'loadVariancePercent': 3,
      },
      'collections': {
        'cashCollected': 18000,
        'creditExtended': 35000,
        'creditLimitFlag': true,
      },
      'loadLimit': {
        'status': 'Assigned',
        'limitType': 'load_value',
        'limitValue': 15000,
        'effectiveFrom': '2024-05-01',
        'effectiveTo': '2024-12-31',
        'remarks': 'High performer - extended limit'
      },
    },
  ];