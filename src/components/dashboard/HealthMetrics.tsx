
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { HealthData } from "@/hooks/useAnalyticsData";

interface HealthMetricsProps {
  healthData: HealthData;
}

export function HealthMetrics({ healthData }: HealthMetricsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Health Overview</CardTitle>
        <CardDescription>Key metrics about your telecom service performance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Object.entries(healthData).map(([key, data]) => (
            <div key={key} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{data.label}</span>
                <span className="text-sm font-bold">{data.score}%</span>
              </div>
              <Progress 
                value={data.score} 
                className={`h-2 ${
                  data.color === "blue" ? "bg-blue-100" : 
                  data.color === "red" ? "bg-red-100" : 
                  data.color === "green" ? "bg-green-100" : 
                  "bg-purple-100"
                }`}
              />
              <div className="h-1"></div>
              <div className={`w-full h-2 rounded-full ${
                data.color === "blue" ? "bg-blue-500" : 
                data.color === "red" ? "bg-red-500" : 
                data.color === "green" ? "bg-green-500" : 
                "bg-purple-500"
              }`} style={{ width: `${data.score}%` }}></div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
