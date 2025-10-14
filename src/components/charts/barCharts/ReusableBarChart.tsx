import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { ChartConfig } from './types';
import { Card } from '@components/app-cards/card/Card';
import { CardBody } from '@components/app-cards/card/CardBody';
import { CardHeader } from '@components/app-cards/card/CardHeader';

const ReusableBarChart: React.FC<ChartConfig> = ({
  title,
  data,
  bars,
  height = 320,
  formatValue = (value: number) => value.toString(),
  showGrid = true,
  showTooltip = true,
  xAxisProps = {},
  yAxisProps = {},
  chartMargin = { top: 20, right: 30, left: 20, bottom: 5 },
}) => {
  // Error handling
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader title={title} />
        <CardBody>
          <div className="flex items-center justify-center h-64 text-gray-500">
            No data available
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader title={title} />
      <CardBody>
        <div style={{ height: height }}>
          <ResponsiveContainer>
            <BarChart data={data} margin={chartMargin}>
              {showGrid && (
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              )}
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12 }}
                axisLine={{ stroke: '#e5e7eb' }}
                tickLine={{ stroke: '#e5e7eb' }}
                {...xAxisProps}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                axisLine={{ stroke: '#e5e7eb' }}
                tickLine={{ stroke: '#e5e7eb' }}
                {...yAxisProps}
              />
              {showTooltip && (
                <Tooltip
                  formatter={(value: number, name: string) => [
                    formatValue(value),
                    name,
                  ]} // ← FIXED: Keep the name parameter
                  labelStyle={{ color: '#374151', fontWeight: 'medium' }}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                />
              )}
              {bars.map((bar, index) => (
                <Bar
                  key={`${bar.dataKey}-${index}`}
                  dataKey={bar.dataKey}
                  fill={bar.color}
                  name={bar.name}
                  radius={bar.radius || [0, 0, 0, 0]}
                  stackId={bar.stackId}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardBody>
    </Card>
  );
};

export default ReusableBarChart;