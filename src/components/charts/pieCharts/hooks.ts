import { useMemo } from 'react';
import { createPieChartConfig, pieChartPresets } from './configs';
import type { PieChartConfig, PieChartDataItem, UsePieChartData } from './types';

export const usePieChartConfig = (
  title: string,
  data: PieChartDataItem[],
  preset?: keyof typeof pieChartPresets,
  overrides?: Partial<PieChartConfig>
) => {
  return useMemo(() => {
    const presetConfig = preset ? pieChartPresets[preset] : {};
    return createPieChartConfig(title, data, { ...presetConfig, ...overrides });
  }, [title, data, preset, overrides]);
};

export const usePieChartData = (data: PieChartDataItem[]): UsePieChartData => {
  return useMemo(() => {
    // Normalize data - handle both 'amount' and 'value' properties
    const formattedData = data.map((item, index) => ({
      ...item,
      name: item.name || item.type,
      value: item.value || item.amount,
      fill: item.color
    }));

    const totalValue = formattedData.reduce((sum, item) => sum + (item.value || 0), 0);

    const breakdownData = formattedData.map(item => ({
      label: item.name || item.type,
      value: item.value || 0,
      color: item.color,
      percentage: totalValue > 0 ? ((item.value || 0) / totalValue) * 100 : 0
    }));

    return {
      formattedData,
      totalValue,
      breakdownData
    };
  }, [data]);
};