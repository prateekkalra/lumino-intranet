import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Button } from '../ui/button';
import { TrendingUp, TrendingDown, Minus, BarChart3 } from 'lucide-react';

const mockData = {
  revenue: [
    { month: 'Jan', value: 4000 },
    { month: 'Feb', value: 3000 },
    { month: 'Mar', value: 5000 },
    { month: 'Apr', value: 4500 },
    { month: 'May', value: 6000 },
    { month: 'Jun', value: 5500 },
  ],
  productivity: [
    { month: 'Jan', value: 85 },
    { month: 'Feb', value: 88 },
    { month: 'Mar', value: 92 },
    { month: 'Apr', value: 90 },
    { month: 'May', value: 95 },
    { month: 'Jun', value: 93 },
  ],
  projects: [
    { month: 'Jan', value: 12 },
    { month: 'Feb', value: 15 },
    { month: 'Mar', value: 18 },
    { month: 'Apr', value: 16 },
    { month: 'May', value: 22 },
    { month: 'Jun', value: 20 },
  ],
};

type ChartType = 'revenue' | 'productivity' | 'projects';

const chartConfig = {
  revenue: {
    title: 'Revenue',
    value: '$65K',
    change: '+12%',
    trend: 'up' as const,
    color: '#3B82F6',
    unit: '$',
  },
  productivity: {
    title: 'Productivity',
    value: '93%',
    change: '+5%',
    trend: 'up' as const,
    color: '#10B981',
    unit: '%',
  },
  projects: {
    title: 'Projects',
    value: '20',
    change: '-2',
    trend: 'down' as const,
    color: '#F59E0B',
    unit: '',
  },
};

export const AnalyticsWidget = () => {
  const [activeChart, setActiveChart] = useState<ChartType>('revenue');

  const config = chartConfig[activeChart];
  const data = mockData[activeChart];

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-3 w-3 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-3 w-3 text-red-500" />;
      case 'stable':
        return <Minus className="h-3 w-3 text-gray-500" />;
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Chart Type Selector */}
      <div className="flex items-center gap-1 mb-4">
        <BarChart3 className="h-4 w-4 text-gray-500" />
        <div className="flex gap-1">
          {(Object.keys(chartConfig) as ChartType[]).map((type) => (
            <Button
              key={type}
              size="sm"
              variant={activeChart === type ? 'default' : 'outline'}
              onClick={() => setActiveChart(type)}
              className="h-6 px-2 text-xs capitalize"
            >
              {type}
            </Button>
          ))}
        </div>
      </div>

      {/* Current Value Display */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {config.value}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {config.title}
            </p>
          </div>
          <div className="flex items-center gap-1">
            {getTrendIcon(config.trend)}
            <span className={`text-sm font-medium ${
              config.trend === 'up' 
                ? 'text-green-600' 
                : config.trend === 'down' 
                ? 'text-red-600' 
                : 'text-gray-600'
            }`}>
              {config.change}
            </span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              fontSize={12}
              stroke="#6B7280"
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              fontSize={12}
              stroke="#6B7280"
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '12px',
              }}
              formatter={(value) => [`${config.unit}${value}`, config.title]}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={config.color}
              strokeWidth={2}
              dot={{ fill: config.color, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: config.color, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}
      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-500 text-center">
          Last 6 months • Updated hourly
        </p>
      </div>
    </div>
  );
};