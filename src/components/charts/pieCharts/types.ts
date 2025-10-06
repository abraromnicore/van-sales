export interface PieChartDataItem {
  type: string;
  name?: string;
  amount: number;
  value?: number;
  color: string;
  [key: string]: string | number | undefined;
}

export interface PieChartConfig {
  title: string;
  width?: string | number;
  height?: number;
  outerRadius?: number;
  innerRadius?: number;
  cx?: string | number;
  cy?: string | number;
  showLabels?: boolean;
  showTooltip?: boolean;
  showLegend?: boolean;
  showPercentage?: boolean;
  showValue?: boolean;
  labelPosition?: 'inside' | 'outside';
  tooltipFormatter?: (value: any, name: string) => [string, string];
  labelFormatter?: (entry: any) => string;
  colors?: string[];
  containerClassName?: string;
  titleClassName?: string;
}

export interface PieChartBreakdownItem {
  label: string;
  value: number;
  color: string;
  percentage: number;
}

export interface UsePieChartData {
  formattedData: PieChartDataItem[];
  totalValue: number;
  breakdownData: PieChartBreakdownItem[];
}