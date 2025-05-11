
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Users, Zap } from "lucide-react";

interface MetricCardProps {
  currentAttention: { score: number; change: number };
}

export function MetricCards({ currentAttention }: MetricCardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="card-hover">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Current Attention Score</p>
              <h3 className="text-2xl font-bold mt-1">75%</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              <ArrowUpRight className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm">
              <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">+5.4%</span>
              <span className="ml-2 text-muted-foreground">vs. last month</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="card-hover">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Churn Risk</p>
              <h3 className="text-2xl font-bold mt-1">12%</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
              <ArrowDownRight className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm">
              <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
              <span className="text-red-500 font-medium">-2.1%</span>
              <span className="ml-2 text-muted-foreground">vs. last month</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="card-hover">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Users</p>
              <h3 className="text-2xl font-bold mt-1">3,842</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <Users className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm">
              <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">+10.2%</span>
              <span className="ml-2 text-muted-foreground">vs. last month</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="card-hover">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Network Quality</p>
              <h3 className="text-2xl font-bold mt-1">92%</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
              <Zap className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm">
              <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">+3.1%</span>
              <span className="ml-2 text-muted-foreground">vs. last month</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
