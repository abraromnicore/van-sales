export interface ChartDataPoint {
  name: string;
  [key: string]: string | number;
}

export interface BarConfig {
  dataKey: string;
  color: string;
  name: string;
  radius?: [number, number, number, number];
  stackId?: string;
}

export interface BaseChartProps {
  title: string;
  data: ChartDataPoint[];
  bars: BarConfig[];
  height?: number;
  className?: string;
  formatValue?: (value: number) => string;
  showGrid?: boolean;
  showTooltip?: boolean;
  xAxisProps?: Record<string, any>;
  yAxisProps?: Record<string, any>;
  chartMargin?: { top?: number; right?: number; bottom?: number; left?: number };
}

export interface ChartConfig extends BaseChartProps {
  id: string;
  containerClass?: string;
  titleClass?: string;
}

// Updated to include new return types
export type ChartType = 'sales' | 'collections' | 'revenue' | 'performance' | 'returns' | 'returnsStacked' | 'skus' | 'achievement';

export interface ChartTypeConfig {
  bars: BarConfig[];
  defaultHeight?: number;
  formatValue?: (value: number) => string;
}