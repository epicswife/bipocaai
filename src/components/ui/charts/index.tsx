"use client";

import React from 'react';

interface ChartProps {
  labels: string[];
  data: number[];
  height?: number;
  className?: string;
  colors?: string[];
}

export const BarChart: React.FC<ChartProps> = ({
  labels,
  data,
  height = 300,
  className = '',
  colors = ['#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe']
}) => {
  // Find the maximum value for scaling
  const maxValue = Math.max(...data);
  
  return (
    <div className={`w-full h-full ${className}`} style={{ height: height, width: '100%' }}>
      <div className="flex h-full items-end space-x-2">
        {data.map((value, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div 
              className="w-full rounded-t-md transition-all duration-300 hover:opacity-80"
              style={{ 
                height: `${(value / maxValue) * 100}%`, 
                backgroundColor: colors[index % colors.length],
                minHeight: '4px'
              }}
            />
            <div className="text-xs mt-1 w-full text-center truncate" title={labels[index]}>
              {labels[index]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const LineChart: React.FC<ChartProps> = ({
  labels,
  data,
  height = 300,
  className = '',
  colors = ['#3b82f6']
}) => {
  // Find the maximum value for scaling
  const maxValue = Math.max(...data);
  
  // Calculate points for the SVG path
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((value / maxValue) * 100);
    return `${x},${y}`;
  }).join(' ');
  
  return (
    <div className={`w-full h-full ${className}`} style={{ height: height, width: '100%' }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline
          points={points}
          fill="none"
          stroke={colors[0]}
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
        {data.map((value, index) => {
          const x = (index / (data.length - 1)) * 100;
          const y = 100 - ((value / maxValue) * 100);
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="1.5"
              fill={colors[0]}
              stroke="#fff"
              strokeWidth="0.5"
            />
          );
        })}
      </svg>
      <div className="flex justify-between mt-2">
        {labels.map((label, index) => (
          <div key={index} className="text-xs truncate" style={{ width: `${100 / labels.length}%` }} title={label}>
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};

export const PieChart: React.FC<ChartProps> = ({
  labels,
  data,
  height = 300,
  className = '',
  colors = ['#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe', '#dbeafe']
}) => {
  const total = data.reduce((sum, value) => sum + value, 0);
  let cumulativePercent = 0;
  
  const segments = data.map((value, index) => {
    const percent = (value / total) * 100;
    const startPercent = cumulativePercent;
    cumulativePercent += percent;
    
    return {
      percent,
      startPercent,
      endPercent: cumulativePercent,
      color: colors[index % colors.length],
      label: labels[index],
      value
    };
  });
  
  return (
    <div className={`flex flex-col items-center ${className}`} style={{ height: height, width: height }}>
      <div className="relative" style={{ width: height * 0.8, height: height * 0.8 }}>
        <svg width="100%" height="100%" viewBox="0 0 20 20">
          {segments.map((segment, index) => {
            const startAngle = (segment.startPercent / 100) * 2 * Math.PI - (Math.PI / 2);
            const endAngle = (segment.endPercent / 100) * 2 * Math.PI - (Math.PI / 2);
            
            const x1 = 10 + 9 * Math.cos(startAngle);
            const y1 = 10 + 9 * Math.sin(startAngle);
            const x2 = 10 + 9 * Math.cos(endAngle);
            const y2 = 10 + 9 * Math.sin(endAngle);
            
            const largeArcFlag = segment.percent > 50 ? 1 : 0;
            
            const pathData = `
              M 10 10
              L ${x1} ${y1}
              A 9 9 0 ${largeArcFlag} 1 ${x2} ${y2}
              Z
            `;
            
            return (
              <path
                key={index}
                d={pathData}
                fill={segment.color}
                stroke="#fff"
                strokeWidth="0.1"
                className="transition-opacity duration-300 hover:opacity-80"
              />
            );
          })}
          <circle cx="10" cy="10" r="5" fill="white" />
        </svg>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-2 w-full">
        {segments.map((segment, index) => (
          <div key={index} className="flex items-center text-xs">
            <div 
              className="w-3 h-3 mr-1 rounded-sm flex-shrink-0" 
              style={{ backgroundColor: segment.color }}
            />
            <span className="truncate" title={`${segment.label}: ${segment.value} (${segment.percent.toFixed(1)}%)`}>
              {segment.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
