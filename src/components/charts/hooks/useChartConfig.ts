import { useMemo } from 'react';
import type { ChartConfig, ChartType } from '../barCharts/types';
import { createChartConfig } from '../barCharts';

export const useChartConfig = (
  type: ChartType,
  title: string,
  data: any[],
  overrides?: Partial<ChartConfig>
) => {
  return useMemo(() => 
    createChartConfig(type, title, data, overrides),
    [type, title, data, overrides]
  );
};