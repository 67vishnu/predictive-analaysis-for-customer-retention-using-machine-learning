
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

// Custom hook for analytics data
import useAnalyticsData from "@/hooks/useAnalyticsData";

// Components
import { HealthMetrics } from "@/components/dashboard/HealthMetrics";
import { MetricCards } from "@/components/dashboard/MetricCards";
import { AttentionChart } from "@/components/dashboard/AttentionChart";
import { ChurnRiskChart } from "@/components/dashboard/ChurnRiskChart";
import { FileUploader } from "@/components/dashboard/FileUploader";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RewardsCard } from "@/components/dashboard/RewardsCard";
import { ActivePlansCard } from "@/components/dashboard/ActivePlansCard";
import { CustomerDataInput } from "@/components/dashboard/CustomerDataInput";

const Dashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Get data from our custom hook
  const analyticsData = useAnalyticsData();
  
  const { 
    attentionData, setAttentionData,
    categoryData, setCategoryData,
    churnRiskData, setChurnRiskData,
    healthData, setHealthData,
    currentAttention
  } = analyticsData;

  const handleUpdateUsageData = () => {
    toast({
      title: "Usage Data Updated",
      description: "Your usage data has been successfully updated.",
    });
  };

  // For the loading state if user isn't available yet
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500">Loading user data...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome back, {user.name}</h1>
          <p className="text-muted-foreground">Here's what's happening with your telecom services today.</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Button 
            className="flex items-center gap-2"
            onClick={handleUpdateUsageData}
          >
            <Zap className="h-4 w-4" />
            Update Usage Data
          </Button>
          
          <FileUploader 
            onDataUpdate={{
              setAttentionData,
              setCategoryData,
              setChurnRiskData,
              setHealthData
            }}
            healthData={healthData}
          />
        </div>
      </div>

      <HealthMetrics healthData={healthData} />

      <MetricCards currentAttention={currentAttention} />

      <AttentionChart attentionData={attentionData} categoryData={categoryData} />

      <ChurnRiskChart churnRiskData={churnRiskData} />

      <RewardsCard />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Customer Data Input</CardTitle>
            <CardDescription>Update telecom usage data to improve predictions</CardDescription>
          </CardHeader>
          <CardContent>
            <CustomerDataInput />
          </CardContent>
        </Card>

        <QuickActions />
      </div>

      <ActivePlansCard />
    </div>
  );
};

export default Dashboard;
