
import { useState, useEffect } from "react";
import { AnalyticsDataPoint, CategoryDataPoint, ChurnRiskDataPoint } from "@/utils/csvParser";

// Interface for health data metrics
export interface HealthMetric {
  score: number;
  label: string;
  color: string;
}

export interface HealthData {
  loyalty: HealthMetric;
  churn: HealthMetric;
  satisfaction: HealthMetric;
  payments: HealthMetric;
}

// Type for chart data with required predicted field
export interface AttentionDataPoint extends AnalyticsDataPoint {
  predicted: number;
}

// Initial default data
const defaultAttentionData: AttentionDataPoint[] = [
  { name: "Jan", value: 65, predicted: 67 },
  { name: "Feb", value: 59, predicted: 62 },
  { name: "Mar", value: 80, predicted: 76 },
  { name: "Apr", value: 81, predicted: 79 },
  { name: "May", value: 76, predicted: 75 },
  { name: "Jun", value: 55, predicted: 58 },
  { name: "Jul", value: 40, predicted: 44 },
  { name: "Aug", value: 35, predicted: 38 },
  { name: "Sep", value: 48, predicted: 52 },
  { name: "Oct", value: 65, predicted: 67 },
  { name: "Nov", value: 70, predicted: 68 },
  { name: "Dec", value: 75, predicted: 72 },
];

const defaultCategoryData = [
  { name: "Network", current: 65, previous: 55 },
  { name: "Price", current: 45, previous: 49 },
  { name: "Customer Service", current: 78, previous: 62 },
  { name: "Value Added", current: 35, previous: 40 },
  { name: "Billing", current: 82, previous: 75 },
];

const defaultChurnRiskData = [
  { name: "Low Risk", value: 60, color: "#4ade80" },
  { name: "Medium Risk", value: 25, color: "#facc15" },
  { name: "High Risk", value: 15, color: "#ef4444" },
];

const defaultHealthData: HealthData = {
  loyalty: { score: 87, label: "Loyalty Score", color: "blue" },
  churn: { score: 13, label: "Churn Risk", color: "red" },
  satisfaction: { score: 78, label: "Satisfaction", color: "green" },
  payments: { score: 96, label: "On-Time Payments", color: "purple" }
};

export const useAnalyticsData = () => {
  // Get data from localStorage if available
  const getStoredData = <T,>(key: string, defaultData: T): T => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultData;
  };

  const [attentionData, setAttentionData] = useState<AttentionDataPoint[]>(() => 
    getStoredData('attentionData', defaultAttentionData)
  );
  
  const [categoryData, setCategoryData] = useState(() => 
    getStoredData('categoryData', defaultCategoryData)
  );
  
  const [churnRiskData, setChurnRiskData] = useState(() => 
    getStoredData('churnRiskData', defaultChurnRiskData)
  );
  
  const [healthData, setHealthData] = useState<HealthData>(() => 
    getStoredData('healthData', defaultHealthData)
  );

  // Save to localStorage when data changes
  useEffect(() => {
    localStorage.setItem('attentionData', JSON.stringify(attentionData));
  }, [attentionData]);
  
  useEffect(() => {
    localStorage.setItem('categoryData', JSON.stringify(categoryData));
  }, [categoryData]);
  
  useEffect(() => {
    localStorage.setItem('churnRiskData', JSON.stringify(churnRiskData));
  }, [churnRiskData]);
  
  useEffect(() => {
    localStorage.setItem('healthData', JSON.stringify(healthData));
  }, [healthData]);

  // Calculate the current attention score
  const calculateCurrentAttentionScore = () => {
    if (!attentionData.length) return { score: 0, change: 0 };
    
    const currentMonth = attentionData[attentionData.length - 1];
    const previousMonth = attentionData[attentionData.length - 2] || { value: 0 };
    const score = currentMonth.value;
    const change = score - previousMonth.value;
    
    return { score, change };
  };

  const currentAttention = calculateCurrentAttentionScore();

  return {
    attentionData, setAttentionData,
    categoryData, setCategoryData,
    churnRiskData, setChurnRiskData,
    healthData, setHealthData,
    currentAttention
  };
};

export default useAnalyticsData;
