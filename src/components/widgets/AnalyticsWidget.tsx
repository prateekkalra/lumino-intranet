import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
import { useDialog } from '../../contexts/DialogContext';
import { TrendingUp, TrendingDown, Minus, BarChart3, Download, Calendar, Maximize2 } from 'lucide-react';

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
  const { toast } = useToast();
  const { openDialog } = useDialog();

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

  const handleChartClick = (data: any) => {
    if (data && data.activePayload) {
      const point = data.activePayload[0];
      toast({
        title: "Data point details",
        description: `${point.payload.month}: ${config.unit}${point.value}`,
      });
    }
  };

  const handleExport = () => {
    toast({
      title: "Exporting data",
      description: `Downloading ${config.title} data as CSV`,
    });
    // Simulate export
    setTimeout(() => {
      toast({
        title: "Export complete",
        description: "File downloaded successfully",
      });
    }, 1500);
  };

  const handleDateRange = () => {
    openDialog('calendar');
    toast({
      title: "Date range selector",
      description: "Choose custom date range for analytics",
    });
  };

  const handleFullView = () => {
    openDialog('project-management');
    toast({
      title: "Full analytics view",
      description: "Opening detailed analytics dashboard",
    });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header with Controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1">
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
        
        {/* Action Buttons */}
        <div className="flex gap-1">
          <Button
            size="sm"
            variant="ghost"
            onClick={handleDateRange}
            className="h-6 w-6 p-0"
            title="Date range"
          >
            <Calendar className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleExport}
            className="h-6 w-6 p-0"
            title="Export data"
          >
            <Download className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleFullView}
            className="h-6 w-6 p-0"
            title="Full view"
          >
            <Maximize2 className="h-3 w-3" />
          </Button>
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
      <div className="flex-1 min-h-0 w-full">
        <div className="h-full w-full min-h-[120px] cursor-pointer">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={data}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              onClick={handleChartClick}
            >
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                fontSize={12}
                stroke="#6B7280"
                interval="preserveStartEnd"
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                fontSize={12}
                stroke="#6B7280"
                width={40}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '12px',
                  cursor: 'pointer',
                }}
                formatter={(value) => [`${config.unit}${value}`, config.title]}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke={config.color}
                strokeWidth={2}
                dot={{ 
                  fill: config.color, 
                  strokeWidth: 2, 
                  r: 4,
                  className: "hover:r-6 cursor-pointer transition-all duration-200"
                }}
                activeDot={{ 
                  r: 8, 
                  stroke: config.color, 
                  strokeWidth: 2,
                  className: "cursor-pointer animate-pulse"
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-3 py-3 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-500 text-center">
          Last 6 months • Updated hourly
        </p>
      </div>
    </div>
  );
};