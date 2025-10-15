import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { usePieChartData } from './hooks';
import { Card } from '@components/app-cards/card/Card';
import { CardHeader } from '@components/app-cards/card/CardHeader';
import { CardBody } from '@components/app-cards/card/CardBody';

interface ReusablePieChartProps {
  data: any[];
  config: any;
  showBreakdown?: boolean;
  breakdownClassName?: string;
}

const ReusablePieChart: React.FC<ReusablePieChartProps> = ({
  data,
  config,
  showBreakdown = false,
}) => {
  const { formattedData, breakdownData } = usePieChartData(data);

  const renderCustomLabel = (entry: any) => {
    if (!config.showLabels) return '';
    if (config.labelFormatter) {
      return config.labelFormatter(entry);
    }
    return config.showPercentage
      ? `${entry.name} ${(entry.percent * 100).toFixed(0)}%`
      : entry.name;
  };

  const chart = (
    <div>
      <Card styleClass={`h-full`}>
        <CardHeader title={config.title} />
        <CardBody>
          <ResponsiveContainer width={config.width} height={config.height}>
            <PieChart>
              <Pie
                data={formattedData}
                cx={config.cx}
                cy={config.cy}
                outerRadius={config.outerRadius}
                innerRadius={config.innerRadius}
                fill="#8884d8"
                dataKey="value"
                label={config.showLabels ? renderCustomLabel : undefined}
                labelLine={config.labelPosition === 'outside'}
              >
                {formattedData.map((entry: any, index: any) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.color ||
                      config.colors?.[index % (config.colors?.length || 8)]
                    }
                  />
                ))}
              </Pie>
              {config.showTooltip && (
                <Tooltip
                  formatter={
                    config.tooltipFormatter ||
                    ((value) => [`${value}`, 'Value'])
                  }
                />
              )}
              {config.showLegend && <Legend />}
            </PieChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>
    </div>
  );

  if (!showBreakdown) {
    return chart;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {chart}

      {/* Breakdown Panel */}
      <Card styleClass={`h-full`}>
        <CardHeader
          title={`${config.title.replace('by', '').trim()} Breakdown`}
        />
        <CardBody>
          <div className="space-y-4">
            {breakdownData.map((item: any, index: any) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center">
                  <div
                    className="w-4 h-4 rounded-full mr-3"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="font-medium text-gray-900">
                    {item.label}
                  </span>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    ${item.value.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    {item.percentage.toFixed(1)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ReusablePieChart;