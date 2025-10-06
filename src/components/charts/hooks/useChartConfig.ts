import { useMemo } from 'react';
import { createChartConfig } from '../configs';
import type { ChartConfig, ChartType } from '../types';

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