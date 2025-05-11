
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";

interface ChurnRiskChartProps {
  churnRiskData: {
    name: string;
    value: number;
    color: string;
  }[];
}

export function ChurnRiskChart({ churnRiskData }: ChurnRiskChartProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Churn Risk Analysis</CardTitle>
        <CardDescription>Distribution of customers by risk level</CardDescription>
      </CardHeader>
      <CardContent className="px-2 pb-6">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={churnRiskData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {churnRiskData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <RechartsTooltip formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
