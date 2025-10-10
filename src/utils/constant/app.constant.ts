export const ACCESS_TOKEN = 'ACCESS_TOKEN';
export const APP_TITLE = 'Van Sales';
export const APP_PERMISSIONS = 'permissions';
export const PERMISSIONS = [
  // ======================
  // 🏷 STOCK MANAGEMENT
  // ======================
  {
    id: 1,
    key: 'stock_management',
    label: 'Stock Management',
    children: [
      {
        id: 2,
        key: 'view_stock',
        label: 'View Stock',
        description: 'View available stock in van or warehouse.',
      },
      {
        id: 3,
        key: 'update_stock_quantity',
        label: 'Update Stock Quantity',
        description: 'Edit stock counts manually.',
      },
      {
        id: 4,
        key: 'receive_stock',
        label: 'Receive Stock',
        description: 'Confirm received stock from warehouse.',
      },
      {
        id: 5,
        key: 'transfer_stock',
        label: 'Transfer Stock',
        description: 'Transfer stock between vans or locations.',
      },
      {
        id: 6,
        key: 'view_stock_movements',
        label: 'View Stock Movements',
        description: 'View logs of stock transactions and history.',
      },
    ],
  },

  // ======================
  // 💰 SALES MANAGEMENT
  // ======================
  {
    id: 7,
    key: 'sales_management',
    label: 'Sales Management',
    children: [
      {
        id: 8,
        key: 'create_sales_order',
        label: 'Create Sales Order',
        description: 'Create and issue sales orders or invoices.',
      },
      {
        id: 9,
        key: 'view_sales_history',
        label: 'View Sales History',
        description: 'View and filter past sales transactions.',
      },
      {
        id: 10,
        key: 'process_return',
        label: 'Process Return',
        description: 'Handle sales returns and exchanges.',
      },
      {
        id: 11,
        key: 'apply_discount',
        label: 'Apply Discount',
        description: 'Apply discounts to sales orders.',
      },
      {
        id: 12,
        key: 'cancel_sales_order',
        label: 'Cancel Sales Order',
        description: 'Cancel pending or draft sales orders.',
      },
    ],
  },

  // ======================
  // 🧾 CUSTOMER MANAGEMENT
  // ======================
  {
    id: 13,
    key: 'customer_management',
    label: 'Customer Management',
    children: [
      {
        id: 14,
        key: 'view_customers',
        label: 'View Customers',
        description: 'Access list of customers assigned to the van.',
      },
      {
        id: 15,
        key: 'add_customer',
        label: 'Add Customer',
        description: 'Register a new customer.',
      },
      {
        id: 16,
        key: 'update_customer_info',
        label: 'Update Customer Info',
        description: 'Edit customer contact or route details.',
      },
      {
        id: 17,
        key: 'view_customer_ledger',
        label: 'View Customer Ledger',
        description: 'View customer balances and history.',
      },
    ],
  },

  // ======================
  // 💳 PAYMENTS
  // ======================
  {
    id: 18,
    key: 'payments',
    label: 'Payments',
    children: [
      {
        id: 19,
        key: 'record_payment',
        label: 'Record Payment',
        description: 'Record payments received from customers.',
      },
      {
        id: 20,
        key: 'view_payment_history',
        label: 'View Payment History',
        description: 'See payment transactions and balances.',
      },
      {
        id: 21,
        key: 'approve_payment_adjustment',
        label: 'Approve Payment Adjustment',
        description: 'Approve or reject manual adjustments.',
      },
    ],
  },

  // ======================
  // 🚚 ROUTES & DELIVERIES
  // ======================
  {
    id: 22,
    key: 'route_management',
    label: 'Routes & Deliveries',
    children: [
      {
        id: 23,
        key: 'view_route_plan',
        label: 'View Route Plan',
        description: 'Access planned delivery routes.',
      },
      {
        id: 24,
        key: 'update_route_status',
        label: 'Update Route Status',
        description: 'Mark deliveries as complete or pending.',
      },
      {
        id: 25,
        key: 'record_delivery',
        label: 'Record Delivery',
        description: 'Confirm successful delivery of goods.',
      },
      {
        id: 26,
        key: 'sync_data',
        label: 'Sync Data',
        description: 'Sync data between van and central system.',
      },
    ],
  },

  // ======================
  // 📊 REPORTS
  // ======================
  {
    id: 27,
    key: 'reports',
    label: 'Reports',
    children: [
      {
        id: 28,
        key: 'view_sales_report',
        label: 'View Sales Report',
        description: 'Access sales summaries and analytics.',
      },
      {
        id: 29,
        key: 'view_stock_report',
        label: 'View Stock Report',
        description: 'Check van and warehouse stock reports.',
      },
      {
        id: 30,
        key: 'view_payment_report',
        label: 'View Payment Report',
        description: 'View daily or monthly payment summaries.',
      },
    ],
  },

  // ======================
  // ⚙️ SYSTEM
  // ======================
  {
    id: 31,
    key: 'system_settings',
    label: 'System Settings',
    children: [
      {
        id: 32,
        key: 'sync_offline_data',
        label: 'Sync Offline Data',
        description: 'Sync offline data when network is available.',
      },
      {
        id: 33,
        key: 'change_app_settings',
        label: 'Change App Settings',
        description: 'Modify application configuration.',
      },
      {
        id: 34,
        key: 'manage_users',
        label: 'Manage Users',
        description: 'Create or manage app users (Admin only).',
      },
    ],
  },
];
export const ACTUAL_PERMISSIONS = [
  { module_name: 'Role Management', permission_name: 'role.create', description: 'Create roles' },
  { module_name: 'Role Management', permission_name: 'role.view', description: 'View roles' },
  { module_name: 'Role Management', permission_name: 'role.update', description: 'Update roles' },
  { module_name: 'Role Management', permission_name: 'role.delete', description: 'Delete roles' },
  { module_name: 'Role Management', permission_name: 'role.deactivate', description: 'Deactivate and archive roles' },
  { module_name: 'Role Management', permission_name: 'role.view_audit_log', description: 'View role audit logs' },
];