import { useState, useMemo, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Calendar, Download } from 'lucide-react';
import { Button } from '@components/button/Button.tsx';
import CalendarControl2 from '@components/forms/CalendarControl2.tsx';
import { useForm } from 'react-hook-form';
import { Card } from '@components/app-cards/card/Card.tsx';
import { CardHeader } from '@components/app-cards/card/CardHeader.tsx';
import { CardBody } from '@components/app-cards/card/CardBody.tsx';

type PerformanceData = {
  date: string;
  totalSales: number;
  visitAdherence: number;
  stockVariance: number;
};

type TimeRange = '7days' | '30days' | '3months' | 'custom';
type ChartType = 'line' | 'area';

const performanceData: PerformanceData[] = [
  { date: '2025-07-13', totalSales: 150, visitAdherence: 78, stockVariance: 5 },
  { date: '2025-07-14', totalSales: 145, visitAdherence: 82, stockVariance: 3 },
  { date: '2025-07-15', totalSales: 160, visitAdherence: 85, stockVariance: 4 },
  { date: '2025-07-16', totalSales: 155, visitAdherence: 80, stockVariance: 6 },
  { date: '2025-07-17', totalSales: 170, visitAdherence: 88, stockVariance: 2 },
  { date: '2025-07-18', totalSales: 165, visitAdherence: 84, stockVariance: 3 },
  { date: '2025-07-19', totalSales: 175, visitAdherence: 90, stockVariance: 1 },
  { date: '2025-07-20', totalSales: 180, visitAdherence: 87, stockVariance: 4 },
  { date: '2025-07-21', totalSales: 185, visitAdherence: 92, stockVariance: 2 },
  { date: '2025-07-22', totalSales: 178, visitAdherence: 86, stockVariance: 5 },
  { date: '2025-07-23', totalSales: 190, visitAdherence: 91, stockVariance: 3 },
  { date: '2025-07-24', totalSales: 195, visitAdherence: 89, stockVariance: 4 },
  { date: '2025-07-25', totalSales: 188, visitAdherence: 93, stockVariance: 2 },
  { date: '2025-07-26', totalSales: 200, visitAdherence: 90, stockVariance: 6 },
  { date: '2025-07-27', totalSales: 205, visitAdherence: 94, stockVariance: 3 },
  { date: '2025-07-28', totalSales: 198, visitAdherence: 88, stockVariance: 5 },
  { date: '2025-07-29', totalSales: 210, visitAdherence: 92, stockVariance: 4 },
  { date: '2025-07-30', totalSales: 215, visitAdherence: 95, stockVariance: 2 },
  { date: '2025-07-31', totalSales: 208, visitAdherence: 90, stockVariance: 7 },
  { date: '2025-08-01', totalSales: 220, visitAdherence: 93, stockVariance: 3 },
  { date: '2025-08-02', totalSales: 225, visitAdherence: 96, stockVariance: 2 },
  { date: '2025-08-03', totalSales: 218, visitAdherence: 91, stockVariance: 5 },
  { date: '2025-08-04', totalSales: 230, visitAdherence: 94, stockVariance: 4 },
  { date: '2025-08-05', totalSales: 235, visitAdherence: 97, stockVariance: 1 },
  { date: '2025-08-06', totalSales: 228, visitAdherence: 92, stockVariance: 6 },
  { date: '2025-08-07', totalSales: 240, visitAdherence: 95, stockVariance: 3 },
  { date: '2025-08-08', totalSales: 245, visitAdherence: 98, stockVariance: 2 },
  { date: '2025-08-09', totalSales: 238, visitAdherence: 93, stockVariance: 5 },
  { date: '2025-08-10', totalSales: 250, visitAdherence: 96, stockVariance: 4 },
  { date: '2025-08-11', totalSales: 255, visitAdherence: 94, stockVariance: 3 },
  { date: '2025-08-12', totalSales: 248, visitAdherence: 97, stockVariance: 2 },
  { date: '2025-08-13', totalSales: 260, visitAdherence: 95, stockVariance: 6 },
  { date: '2025-08-14', totalSales: 265, visitAdherence: 98, stockVariance: 1 },
  { date: '2025-08-15', totalSales: 258, visitAdherence: 93, stockVariance: 4 },
  { date: '2025-08-16', totalSales: 270, visitAdherence: 96, stockVariance: 3 },
  { date: '2025-08-17', totalSales: 275, visitAdherence: 92, stockVariance: 5 },
  { date: '2025-08-18', totalSales: 268, visitAdherence: 97, stockVariance: 2 },
  { date: '2025-08-19', totalSales: 280, visitAdherence: 94, stockVariance: 4 },
  { date: '2025-08-20', totalSales: 285, visitAdherence: 99, stockVariance: 1 },
  { date: '2025-08-21', totalSales: 278, visitAdherence: 95, stockVariance: 3 },
  { date: '2025-08-22', totalSales: 290, visitAdherence: 96, stockVariance: 2 },
  { date: '2025-08-23', totalSales: 295, visitAdherence: 93, stockVariance: 6 },
  { date: '2025-08-24', totalSales: 288, visitAdherence: 98, stockVariance: 3 },
  { date: '2025-08-25', totalSales: 300, visitAdherence: 94, stockVariance: 4 },
  { date: '2025-08-26', totalSales: 305, visitAdherence: 97, stockVariance: 2 },
  { date: '2025-08-27', totalSales: 298, visitAdherence: 92, stockVariance: 5 },
  { date: '2025-08-28', totalSales: 310, visitAdherence: 95, stockVariance: 3 },
  { date: '2025-08-29', totalSales: 315, visitAdherence: 98, stockVariance: 1 },
  { date: '2025-08-30', totalSales: 308, visitAdherence: 93, stockVariance: 4 },
  { date: '2025-08-31', totalSales: 320, visitAdherence: 96, stockVariance: 2 },
  { date: '2025-09-01', totalSales: 325, visitAdherence: 94, stockVariance: 3 },
  { date: '2025-09-02', totalSales: 318, visitAdherence: 99, stockVariance: 1 },
  { date: '2025-09-03', totalSales: 330, visitAdherence: 95, stockVariance: 5 },
  { date: '2025-09-04', totalSales: 335, visitAdherence: 97, stockVariance: 2 },
  { date: '2025-09-05', totalSales: 328, visitAdherence: 92, stockVariance: 4 },
  { date: '2025-09-06', totalSales: 340, visitAdherence: 96, stockVariance: 3 },
  { date: '2025-09-07', totalSales: 345, visitAdherence: 98, stockVariance: 1 },
  { date: '2025-09-08', totalSales: 338, visitAdherence: 93, stockVariance: 6 },
  { date: '2025-09-09', totalSales: 350, visitAdherence: 95, stockVariance: 2 },
  { date: '2025-09-10', totalSales: 355, visitAdherence: 97, stockVariance: 4 },
  { date: '2025-09-11', totalSales: 348, visitAdherence: 94, stockVariance: 3 },
  { date: '2025-09-12', totalSales: 360, visitAdherence: 99, stockVariance: 1 },
  { date: '2025-09-13', totalSales: 365, visitAdherence: 96, stockVariance: 5 },
  { date: '2025-09-14', totalSales: 358, visitAdherence: 92, stockVariance: 2 },
  { date: '2025-09-15', totalSales: 370, visitAdherence: 95, stockVariance: 4 },
  { date: '2025-09-16', totalSales: 375, visitAdherence: 98, stockVariance: 3 },
  { date: '2025-09-17', totalSales: 368, visitAdherence: 93, stockVariance: 6 },
  { date: '2025-09-18', totalSales: 380, visitAdherence: 97, stockVariance: 2 },
  { date: '2025-09-19', totalSales: 385, visitAdherence: 94, stockVariance: 4 },
  { date: '2025-09-20', totalSales: 378, visitAdherence: 99, stockVariance: 1 },
  { date: '2025-09-21', totalSales: 390, visitAdherence: 96, stockVariance: 3 },
  { date: '2025-09-22', totalSales: 395, visitAdherence: 95, stockVariance: 5 },
  { date: '2025-09-23', totalSales: 388, visitAdherence: 92, stockVariance: 2 },
  { date: '2025-09-24', totalSales: 400, visitAdherence: 98, stockVariance: 4 },
  { date: '2025-09-25', totalSales: 405, visitAdherence: 97, stockVariance: 3 },
  { date: '2025-09-26', totalSales: 398, visitAdherence: 93, stockVariance: 6 },
  { date: '2025-09-27', totalSales: 410, visitAdherence: 96, stockVariance: 2 },
  { date: '2025-09-28', totalSales: 415, visitAdherence: 94, stockVariance: 4 },
  { date: '2025-09-29', totalSales: 408, visitAdherence: 99, stockVariance: 1 },
  { date: '2025-09-30', totalSales: 420, visitAdherence: 95, stockVariance: 3 },
  { date: '2025-10-01', totalSales: 425, visitAdherence: 97, stockVariance: 2 },
  { date: '2025-10-02', totalSales: 418, visitAdherence: 92, stockVariance: 5 },
  { date: '2025-10-03', totalSales: 430, visitAdherence: 96, stockVariance: 4 },
  { date: '2025-10-04', totalSales: 435, visitAdherence: 98, stockVariance: 3 },
  { date: '2025-10-05', totalSales: 428, visitAdherence: 94, stockVariance: 6 },
  { date: '2025-10-06', totalSales: 440, visitAdherence: 97, stockVariance: 2 },
];

const PerformanceDashboard = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('3months');
  const [chartType] = useState<ChartType>('area');
  const [showSales, setShowSales] = useState(true);
  const [showAdherence, setShowAdherence] = useState(true);
  const [showVariance, setShowVariance] = useState(true);

  const {
    control,
    watch,
  } = useForm();

  const fromDate = watch('from');
  const toDate = watch('to');

  // Watch for changes in date fields and automatically switch to custom range
  useEffect(() => {
    if (fromDate && toDate) {
      setTimeRange('custom');
    }
  }, [fromDate, toDate]);

  const filteredData = useMemo(() => {
    const now = new Date('2025-10-06');

    // If custom date range is selected and both dates are available
    if (timeRange === 'custom' && fromDate && toDate) {
      const from = new Date(fromDate);
      const to = new Date(toDate);

      return performanceData.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= from && itemDate <= to;
      });
    }

    // Otherwise use the preset ranges
    let daysToShow: number;

    switch(timeRange) {
      case '7days':
        daysToShow = 7;
        break;
      case '30days':
        daysToShow = 30;
        break;
      case '3months':
      default:
        daysToShow = 90;
    }

    const cutoffDate = new Date(now);
    cutoffDate.setDate(cutoffDate.getDate() - daysToShow);

    return performanceData.filter(item => new Date(item.date) >= cutoffDate);
  }, [timeRange, fromDate, toDate]);

  const stats = useMemo(() => {
    const totalSalesSum = filteredData.reduce((sum, item) => sum + item.totalSales, 0);
    const avgAdherence = filteredData.reduce((sum, item) => sum + item.visitAdherence, 0) / filteredData.length;
    const avgVariance = filteredData.reduce((sum, item) => sum + item.stockVariance, 0) / filteredData.length;

    return {
      totalSales: totalSalesSum,
      avgAdherence: avgAdherence.toFixed(1),
      avgVariance: avgVariance.toFixed(2)
    };
  }, [filteredData]);

  const exportToCSV = () => {
    const headers = ['Date', 'Total Sales', 'Visit Adherence (%)', 'Stock Variance (%)'];
    const csvContent = [
      headers.join(','),
      ...filteredData.map(row =>
        `${row.date},${row.totalSales},${row.visitAdherence},${row.stockVariance}`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `performance-data-${timeRange}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-sm font-semibold mb-2">{payload[0].payload.date}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.name === 'Total Sales' ? `$${entry.value.toLocaleString()}` : `${entry.value}%`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader title={`Performance Dashboard`}/>
      <CardBody>
        <div>
          <div>
            <div className={`flex flex-row justify-between gap-6 mb-6`}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div
                  onClick={() => setShowSales(!showSales)}
                  className={`bg-gradient-to-br flex flex-row items-center gap-6 from-green-500 to-green-600 rounded-lg px-6 py-4 text-white shadow-lg cursor-pointer transition-opacity ${
                    !showSales ? 'opacity-50' : 'opacity-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={showSales}
                      onChange={() => setShowSales(!showSales)}
                      className="w-4 h-4 cursor-pointer hidden"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <span className="text-sm font-medium">Total Sales</span>
                  </div>
                  <div className="text-2xl font-bold">
                    ${stats.totalSales.toLocaleString()}
                  </div>
                </div>

                <div
                  onClick={() => setShowAdherence(!showAdherence)}
                  className={`bg-gradient-to-br flex flex-row items-center gap-6 from-blue-500 to-blue-600 rounded-lg px-6 py-4 text-white shadow-lg cursor-pointer transition-opacity ${
                    !showAdherence ? 'opacity-50' : 'opacity-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={showAdherence}
                      onChange={() => setShowAdherence(!showAdherence)}
                      className="w-4 h-4 cursor-pointer hidden"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <span className="text-sm font-medium">Avg Visit Adherence</span>
                  </div>
                  <div className="text-2xl font-bold">{stats.avgAdherence}%</div>
                </div>

                <div
                  onClick={() => setShowVariance(!showVariance)}
                  className={`bg-gradient-to-br flex flex-row items-center gap-4 from-red-500 to-red-600 rounded-lg px-6 py-4 text-white shadow-lg cursor-pointer transition-opacity ${
                    !showVariance ? 'opacity-50' : 'opacity-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={showVariance}
                      onChange={() => setShowVariance(!showVariance)}
                      className="w-4 h-4 cursor-pointer hidden"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <span className="text-sm font-medium">Avg Stock Variance</span>
                  </div>
                  <div className="text-xl font-bold">{stats.avgVariance}%</div>
                </div>
              </div>
              <div className={`flex flex-col gap-3`}>
                <div className="flex items-center gap-2">
                  <div>
                    <Button
                      label={`7days`}
                      onClick={() => setTimeRange('7days')}
                      variant={`${timeRange === '7days'? 'primary':'outline'}`}
                    >
                      7 Days
                    </Button>
                  </div>
                  <div>
                    <Button
                      label={`30days`}
                      onClick={() => setTimeRange('30days')}
                      variant={`${timeRange === '30days'? 'primary':'outline'}`}
                    />
                  </div>
                  <div>
                    <Button
                      label={`3months`}
                      onClick={() => setTimeRange('3months')}
                      variant={`${timeRange === '3months'? 'primary':'outline'}`}
                    />
                  </div>
                </div>
                <div className={`flex flex-row gap-2`}>
                  <CalendarControl2
                    name="from"
                    control={control}
                    prefixIcon={<Calendar size={18} />}
                    placeholder="From date"
                  />
                  <CalendarControl2
                    name="to"
                    control={control}
                    prefixIcon={<Calendar size={18} />}
                    placeholder="To date"
                  />
                </div>
              </div>



            </div>
            <div className="flex justify-end items-center mb-6 w-full">
              <Button
                icon={<Download size={16}/>}
                label={`Export`}
                variant={`outline`}
                onClick={exportToCSV}
              />
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <ResponsiveContainer width="100%" height={400}>
                {chartType === 'line' ? (
                  <LineChart data={filteredData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                      dataKey="date"
                      tickFormatter={formatDate}
                      stroke="#6b7280"
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis
                      stroke="#6b7280"
                      style={{ fontSize: '12px' }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                      wrapperStyle={{ paddingTop: '20px' }}
                      iconType="line"
                    />
                    {showSales && (
                      <Line
                        type="monotone"
                        dataKey="totalSales"
                        stroke="#10b981"
                        strokeWidth={2}
                        name="Total Sales"
                        dot={false}
                        activeDot={{ r: 5 }}
                      />
                    )}
                    {showAdherence && (
                      <Line
                        type="monotone"
                        dataKey="visitAdherence"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        name="Visit Adherence (%)"
                        dot={false}
                        activeDot={{ r: 5 }}
                      />
                    )}
                    {showVariance && (
                      <Line
                        type="monotone"
                        dataKey="stockVariance"
                        stroke="#ef4444"
                        strokeWidth={2}
                        name="Stock Variance (%)"
                        dot={false}
                        activeDot={{ r: 5 }}
                      />
                    )}
                  </LineChart>
                ) : (
                  <AreaChart data={filteredData}>
                    <defs>
                      <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorAdherence" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorVariance" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                      dataKey="date"
                      tickFormatter={formatDate}
                      stroke="#6b7280"
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis
                      stroke="#6b7280"
                      style={{ fontSize: '12px' }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                      wrapperStyle={{ paddingTop: '20px' }}
                      iconType="rect"
                    />
                    {showSales && (
                      <Area
                        type="monotone"
                        dataKey="totalSales"
                        stroke="#10b981"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorSales)"
                        name="Total Sales"
                      />
                    )}
                    {showAdherence && (
                      <Area
                        type="monotone"
                        dataKey="visitAdherence"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorAdherence)"
                        name="Visit Adherence (%)"
                      />
                    )}
                    {showVariance && (
                      <Area
                        type="monotone"
                        dataKey="stockVariance"
                        stroke="#ef4444"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorVariance)"
                        name="Stock Variance (%)"
                      />
                    )}
                  </AreaChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default PerformanceDashboard;