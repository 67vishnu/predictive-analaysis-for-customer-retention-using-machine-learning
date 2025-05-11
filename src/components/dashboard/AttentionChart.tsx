
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, BarChart2 } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";
import { AttentionDataPoint } from "@/hooks/useAnalyticsData";
import { Tooltip } from "recharts";

interface AttentionChartProps {
  attentionData: AttentionDataPoint[];
  categoryData: any[];
}

export function AttentionChart({ attentionData, categoryData }: AttentionChartProps) {
  const [chartView, setChartView] = useState<"line" | "bar">("line");
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Customer Attention Trends</CardTitle>
          <CardDescription>Actual vs. predicted attention scores</CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant={chartView === "line" ? "default" : "outline"} 
            size="sm"
            onClick={() => setChartView("line")}
            className="h-8 w-8 p-0"
          >
            <LineChart className="h-4 w-4" />
          </Button>
          <Button 
            variant={chartView === "bar" ? "default" : "outline"} 
            size="sm"
            onClick={() => setChartView("bar")}
            className="h-8 w-8 p-0"
          >
            <BarChart2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-2 pb-6">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            {chartView === "line" ? (
              <AreaChart data={attentionData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  style={{ fontSize: '12px', fill: '#888' }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  style={{ fontSize: '12px', fill: '#888' }} 
                  domain={[0, 100]} 
                />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3B82F6" 
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                  name="Actual" 
                />
                <Area 
                  type="monotone" 
                  dataKey="predicted" 
                  stroke="#8B5CF6" 
                  fillOpacity={1} 
                  fill="url(#colorPredicted)" 
                  name="Predicted" 
                />
              </AreaChart>
            ) : (
              <BarChart data={categoryData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  style={{ fontSize: '12px', fill: '#888' }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  style={{ fontSize: '12px', fill: '#888' }} 
                  domain={[0, 100]} 
                />
                <Tooltip />
                <Legend />
                <Bar dataKey="current" fill="#3B82F6" name="Current Month" radius={[4, 4, 0, 0]} />
                <Bar dataKey="previous" fill="#93C5FD" name="Previous Month" radius={[4, 4, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
