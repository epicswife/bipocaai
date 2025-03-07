import { FC } from 'react';

interface ChartProps {
  labels: string[];
  data: number[];
  height?: number;
  className?: string;
  colors?: string[];
}

export const BarChart: FC<ChartProps>;
export const LineChart: FC<ChartProps>;
export const PieChart: FC<ChartProps>;
