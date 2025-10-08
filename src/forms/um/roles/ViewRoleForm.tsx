import { useCreateRole } from '@hooks/um/roles/useCreateRole.ts';
import { SwitchControl } from '@components/forms/SwitchControl.tsx';
import { CardBody } from '@components/card/CardBody.tsx';
import { CardFooter } from '@components/card/CardFooter.tsx';
import { InputControl } from '@components/forms/InputControl.tsx';
import { useEffect } from 'react';

const PERMISSIONS = [
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

type ViewRoleFormProps = {
  id: string | undefined
}

export const ViewRoleForm = (props: ViewRoleFormProps) => {
  const { id } = props;
  const { control, submitHandler } = useCreateRole();

  return (
    <>
      <CardBody>
        <div className="flex flex-col space-y-6">
          {/* Role Selector */}
          <div>
            <InputControl
              label={'Role Name'}
              control={control}
              name={'roleName'}
              placeholder={'Enter Role Name'}
            />
          </div>

          {/* Permissions Grid */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Permissions</h3>
            <div className="space-y-8">
              {PERMISSIONS.map((category) => (
                <div
                  key={category.id}
                  className="border rounded-lg shadow-sm bg-white overflow-hidden"
                >
                  <div className="bg-gray-100 px-4 py-3 border-b">
                    <h4 className="text-base font-semibold text-gray-800 flex items-center">
                      {category.label}
                    </h4>
                  </div>

                  <table className="min-w-full text-sm">
                    <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left p-3 font-medium text-gray-700 w-1/3">
                        Permission
                      </th>
                      <th className="text-left p-3 font-medium text-gray-700 w-2/3">
                        Description
                      </th>
                      <th className="text-center p-3 font-medium text-gray-700 w-24">
                        Enabled
                      </th>
                    </tr>
                    </thead>
                    <tbody>
                    {category.children.map((perm) => (
                      <tr
                        key={perm.id}
                        className="border-b hover:bg-gray-50 transition"
                      >
                        <td className="p-3 text-gray-800 font-medium">
                          {perm.label}
                        </td>
                        <td className="p-3 text-gray-600">{perm.description}</td>
                        <td className="p-3 text-center">
                          <SwitchControl
                            control={control}
                            name={`permissions.${perm.key}`}
                          />
                        </td>
                      </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardBody>
      <CardFooter>
        {/* Save Button */}
        <button type={'button'}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
                onClick={() => submitHandler()}>
          Save Changes
        </button>
      </CardFooter>
    </>
  );
};