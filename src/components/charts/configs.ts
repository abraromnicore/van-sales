import type { ChartConfig, ChartType, ChartTypeConfig } from "./types";

export const chartConfigs: Record<ChartType, ChartTypeConfig> = {
  sales: {
    bars: [
      { dataKey: "target", color: "#e5e7eb", name: "Target" },
      { dataKey: "sales", color: "#3b82f6", name: "Sales", radius: [4, 4, 0, 0] }
    ],
    defaultHeight: 320,
    formatValue: (value: number) => `₹${(value / 1000).toFixed(0)}K`
  },
  collections: {
    bars: [
      { dataKey: "target", color: "#e5e7eb", name: "Target" },
      { dataKey: "total", color: "#10b981", name: "Collections", radius: [4, 4, 0, 0] }
    ],
    defaultHeight: 300,
    formatValue: (value: number) => `₹${value.toLocaleString()}`
  },
  revenue: {
    bars: [
      { dataKey: "target", color: "#e5e7eb", name: "Target" },
      { dataKey: "revenue", color: "#f59e0b", name: "Revenue", radius: [4, 4, 0, 0] }
    ],
    formatValue: (value: number) => `₹${value.toLocaleString()}`
  },
  performance: {
    bars: [
      { dataKey: "target", color: "#e5e7eb", name: "Target" },
      { dataKey: "actual", color: "#8b5cf6", name: "Actual", radius: [4, 4, 0, 0] }
    ],
    formatValue: (value: number) => `${value}%`
  },
  // NEW: Returns configurations
  returns: {
    bars: [
      { dataKey: 'quantity', color: '#ef4444', name: 'Quantity', radius: [4, 4, 0, 0] }
    ],
    defaultHeight: 300,
    formatValue: (value: number) => `${value} items`
  },
  returnsStacked: {
    bars: [
      { dataKey: 'valid', color: '#10b981', name: 'Valid Returns', stackId: 'a' },
      { dataKey: 'invalid', color: '#ef4444', name: 'Invalid Returns', stackId: 'a' }
    ],
    defaultHeight: 300,
    formatValue: (value: number) => `${value} items`
  },
  skus: {
    bars: [
      { dataKey: 'sales', color: '#8b5cf6', name: 'Sales', radius: [4, 4, 0, 0] }
    ],
    defaultHeight: 300,
    formatValue: (value: number) => `$${value.toLocaleString()}`
  },
  achievement: {
    bars: [
      { dataKey: 'target', color: '#3b82f6', name: 'Target', radius: [4, 4, 0, 0] },
      { dataKey: 'achieved', color: '#10b981', name: 'Achieved', radius: [4, 4, 0, 0] }
    ],
    defaultHeight: 300,
    formatValue: (value: number) => `PKR ${value.toLocaleString()}`
  }
};

export const createChartConfig = (
  type: ChartType,
  title: string,
  data: any[],
  overrides: Partial<ChartConfig> = {}
): ChartConfig => {
  const baseConfig = chartConfigs[type];
  
  return {
    id: `${type}-${Date.now()}`,
    title,
    data,
    bars: baseConfig.bars,
    height: baseConfig.defaultHeight || 320,
    formatValue: baseConfig.formatValue,
    showGrid: true,
    showTooltip: true,
    ...overrides
  };
};