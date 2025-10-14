
export const createPieChartConfig = (
  title: string, overrides?: any): any => {
  const defaultConfig: any = {
    title,
    width: '100%',
    height: 300,
    outerRadius: 80,
    innerRadius: 0,
    cx: '50%',
    cy: '50%',
    showLabels: true,
    showTooltip: true,
    showLegend: false,
    showPercentage: true,
    showValue: true,
    labelPosition: 'outside',
    colors: [
      '#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', 
      '#ef4444', '#06b6d4', '#84cc16', '#f97316'
    ],
    containerClassName: 'bg-white p-6 rounded-lg shadow-sm border',
    titleClassName: 'text-lg font-semibold text-gray-900 mb-4'
  };

  return { ...defaultConfig, ...overrides };
};

// Preset configurations for common use cases
export const pieChartPresets = {
  collections: {
    title: 'Collections by Payment Type',
    tooltipFormatter: (value: any) => [`$${value.toLocaleString()}`, 'Amount'],
    colors: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b']
  },
  
  revenue: {
    title: 'Revenue Distribution',
    tooltipFormatter: (value: any) => [`$${value.toLocaleString()}`, 'Revenue'],
    colors: ['#059669', '#0d9488', '#0891b2', '#0284c7']
  },
  
  expenses: {
    title: 'Expense Breakdown',
    tooltipFormatter: (value: any) => [`$${value.toLocaleString()}`, 'Expenses'],
    colors: ['#dc2626', '#ea580c', '#d97706', '#ca8a04']
  },
  
  status: {
    title: 'Status Distribution',
    showPercentage: true,
    tooltipFormatter: (value: any) => [`${value}`, 'Count'],
    colors: ['#22c55e', '#eab308', '#ef4444', '#6b7280']
  },

  donut: {
    title: 'Donut Chart',
    innerRadius: 40,
    outerRadius: 80,
    showLabels: true
  }
};