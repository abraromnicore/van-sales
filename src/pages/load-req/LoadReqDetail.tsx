import { useState } from 'react';
import { CheckCircle, XCircle, Package, Calendar, User, Truck } from 'lucide-react';
import { Card } from '@components/card/Card';
import { CardHeader } from '@components/card/CardHeader.tsx';
import { CardBody } from '@components/card/CardBody.tsx';
import { Button } from '@components/button/Button.tsx';
import { CustomTable } from '@components/tables/CustomTable.tsx';
import * as React from 'react';
import { useConfirmationDialog } from '@hooks/dialog/useConfirmationDialog.ts';
import { RejectionDialog } from '@components/dialog/RejectionDialog.tsx';
import { useAppToast } from '@hooks/common/useAppToast.ts';

type Item = {
  sku: string;
  name: string;
  requestedQty: number;
  approvedQty: number;
  unitPrice: number;
};

type Customer = {
  customerId: string;
  customerName: string;
  items: Item[];
};

type LoadRequest = {
  id: string;
  date: string;
  repId: string;
  vanId: string;
  requestedValue: number;
  approvedValue: number;
  status: string;
  totalItems: number;
  customers: Customer[];
  items: Item[];
  rejectionReason: string | null;
  supervisorActionBy: string | null;
  lastUpdated: string;
};

const mockData: LoadRequest = {
  id: "REQ-2025-1001",
  date: "2025-10-09",
  repId: "REP-001",
  vanId: "VAN-LHR-01",
  requestedValue: 300000,
  approvedValue: 0,
  status: "pending",
  totalItems: 3,
  items: [
    {
      sku: "SKU-001",
      name: "Premium Tea 500g",
      requestedQty: 50,
      approvedQty: 0,
      unitPrice: 1000
    },
    {
      sku: "SKU-002",
      name: "Milk Powder 1kg",
      requestedQty: 30,
      approvedQty: 0,
      unitPrice: 1500
    },
    {
      sku: "SKU-003",
      name: "Biscuits Pack",
      requestedQty: 100,
      approvedQty: 0,
      unitPrice: 300
    }
  ],
  customers: [
    {
      customerId: "CUST-001",
      customerName: "Al-Faisal Superstore",
      items: [
        {
          sku: "SKU-003",
          name: "Biscuits Pack",
          requestedQty: 100,
          approvedQty: 0,
          unitPrice: 300
        },
        {
          sku: "SKU-001",
          name: "Premium Tea 500g",
          requestedQty: 50,
          approvedQty: 0,
          unitPrice: 1000
        },
        {
          sku: "SKU-002",
          name: "Milk Powder 1kg",
          requestedQty: 30,
          approvedQty: 0,
          unitPrice: 1500
        }
      ]
    },
    {
      customerId: "CUST-002",
      customerName: "Metro Mart",
      items: [
        {
          sku: "SKU-003",
          name: "Biscuits Pack",
          requestedQty: 100,
          approvedQty: 0,
          unitPrice: 300
        }
      ]
    }
  ],
  rejectionReason: null,
  supervisorActionBy: null,
  lastUpdated: "2025-10-09T10:30:00Z"
};

export const LoadReqDetail=() => {

  const { showSuccess,showError } = useAppToast();
  const columns = [
    {
      field: 'sku',
      header: 'SKU',
    },
    {
      field: 'name',
      header: 'Product Name',
    },
    {
      field: 'unitPrice',
      header: 'Unit Price',
    },
    {
      field: 'requestedQty',
      header: 'Requested Qty',
    },
    {
      field: 'approvedQty',
      header: 'Approved Qty',
    },
    {
      field: 'totalValue',
      header: 'Total Value',
    },
  ];

  const [request] = useState<LoadRequest>(mockData);
  const [selectedItem, setSelectedItem] = React.useState();

  const [visibleReject, setVisibleReject] = React.useState(false);
  const { showConfirmation } = useConfirmationDialog();

  const handleApprove = () => {
    showConfirmation({
      message: 'Are You Sure to Approve the Load Request?',
      header: 'Approve Confirmation',
      onConfirm: () => {
        showSuccess('Load Request', 'Load Request Accept Successfully');
      },
    });
  };

  const handleReject = () => {
    setVisibleReject(true);
  };

  const handleRejectSubmit = (reason: string) => {
    showConfirmation({
      message: 'Are You Sure to Reject the Load Request?',
      header: 'Reject Confirmation',
      onConfirm: () => {
        showError('Load Request', 'Load Request Accept Failure.');
      },
    });
  };

  const formatCurrency = (amount: number) => {
    return `PKR ${amount.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-PK', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div>
      <div>
        <div>
        <Card>
          <CardHeader title={`Order Information`}/>
          <CardBody>
              {/* Header Section */}
              <div className="rounded-lg mb-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className="text-sm font-bold text-gray-900">{request.id}</h1>
                    <p className="text-xs text-gray-500 mt-1">
                      Last updated: {formatDate(request.lastUpdated)}
                    </p>
                  </div>
                  <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
           {request.status.toUpperCase()}
      </span>
                </div>

                {/* Request Info Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Date</p>
                      <p className="text-sm font-medium text-gray-900">{formatDate(request.date)}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Rep ID</p>
                      <p className="text-sm font-medium text-gray-900">{request.repId}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Truck className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Van ID</p>
                      <p className="text-sm font-medium text-gray-900">{request.vanId}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Package className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Total Items</p>
                      <p className="text-sm font-medium text-gray-900">{request.totalItems}</p>
                    </div>
                  </div>
                </div>

                {/* Value Summary */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Requested Value</p>
                      <p className="text-sm font-bold text-gray-900">{formatCurrency(request.requestedValue)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Approved Value</p>
                      <p className="text-sm font-bold text-green-600">{formatCurrency(request.approvedValue)}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 w-full">
                  <Button
                    label="Accept"
                    icon={<CheckCircle className="w-4 h-4" />}
                    onClick={handleApprove}
                  />
                  <Button
                    variant={'danger'}
                    label="Reject"
                    icon={<XCircle className="w-4 h-4 " />}
                    onClick={handleReject}
                  />
                </div>

                <RejectionDialog
                  visible={visibleReject}
                  onHide={() => setVisibleReject(false)}
                  onSubmit={handleRejectSubmit}
                />
              </div>
          </CardBody>
        </Card>
        </div>
         {/*Customer Sections*/}
        {/*<div className={'mt-6 flex flex-col gap-6'}>*/}
        {/*  {request.customers.map((customer) => (*/}
        {/*    <div key={customer.customerId}>*/}
        {/*    <Card>*/}
        {/*      <CardHeader title={`Load Request SKU's`} />*/}
        {/*      <CardBody>*/}
        {/*          <CustomTable*/}
        {/*            setSelectedItem={setSelectedItem}*/}
        {/*            columns={columns}*/}
        {/*            data={customer.items.map(item => ({*/}
        {/*              ...item,*/}
        {/*              totalValue: formatCurrency(item.requestedQty * item.unitPrice),*/}
        {/*              unitPrice: formatCurrency(item.unitPrice), // optional: if you want formatted here too*/}
        {/*            }))}*/}
        {/*          />*/}
        {/*      </CardBody>*/}
        {/*    </Card>*/}
        {/*    </div>*/}
        {/*  ))}*/}
        {/*</div>*/}

        <div className={'mt-6 flex flex-col gap-6'}>
            <div>
              <Card>
                <CardHeader title={`Load Request SKU's`} />
                <CardBody>
                  <CustomTable
                    setSelectedItem={setSelectedItem}
                    columns={columns}
                    data={request.items.map(item => ({
                      ...item,
                      totalValue: formatCurrency(item.requestedQty * item.unitPrice),
                      unitPrice: formatCurrency(item.unitPrice), // optional: if you want formatted here too
                    }))}
                  />
                </CardBody>
              </Card>
            </div>
        </div>
      </div>
    </div>
  );
}