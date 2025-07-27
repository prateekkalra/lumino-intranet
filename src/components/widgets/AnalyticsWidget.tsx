import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../ui/card';
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
        return <TrendingUp className="h-3 w-3 text-primary" />;
      case 'down':
        return <TrendingDown className="h-3 w-3 text-destructive" />;
      case 'stable':
        return <Minus className="h-3 w-3 text-muted-foreground" />;
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
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
            <span>Analytics</span>
          </div>
          <div className="flex gap-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={handleDateRange}
              className="h-8 w-8 p-0"
              title="Date range"
            >
              <Calendar className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleExport}
              className="h-8 w-8 p-0"
              title="Export data"
            >
              <Download className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleFullView}
              className="h-8 w-8 p-0"
              title="Full view"
            >
              <Maximize2 className="h-3 w-3" />
            </Button>
          </div>
        </CardTitle>

        <Card>
          <CardContent className="p-3">
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
          </CardContent>
        </Card>
      </CardHeader>

      <CardContent className="flex-1">
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold">
                  {config.value}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {config.title}
                </p>
              </div>
              <Card>
                <CardContent className="p-2">
                  <div className="flex items-center gap-2">
                    {getTrendIcon(config.trend)}
                    <span className={`text-sm font-medium ${
                      config.trend === 'up' 
                        ? 'text-primary' 
                        : config.trend === 'down' 
                        ? 'text-destructive' 
                        : 'text-muted-foreground'
                    }`}>
                      {config.change}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardContent className="p-4 h-full">
            <div className="h-full w-full min-h-[120px]">
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
                    className="text-muted-foreground"
                    interval="preserveStartEnd"
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    fontSize={12}
                    className="text-muted-foreground"
                    width={40}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
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
                    dot={{ 
                      fill: config.color, 
                      strokeWidth: 2, 
                      r: 4,
                    }}
                    activeDot={{ 
                      r: 8, 
                      stroke: config.color, 
                      strokeWidth: 2,
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </CardContent>

      <CardFooter>
        <Card className="w-full">
          <CardContent className="p-3">
            <p className="text-xs text-muted-foreground text-center">
              Last 6 months • Updated hourly
            </p>
          </CardContent>
        </Card>
      </CardFooter>
    </Card>
  );
};