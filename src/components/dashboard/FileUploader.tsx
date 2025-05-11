
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { parseAnalyticsCSV } from "@/utils/csvParser";
import { AttentionDataPoint, HealthData } from "@/hooks/useAnalyticsData";
import DownloadSample from "@/components/DownloadSample";

interface FileUploaderProps {
  onDataUpdate: {
    setAttentionData: (data: AttentionDataPoint[]) => void;
    setCategoryData: (data: any[]) => void;
    setChurnRiskData: (data: any[]) => void;
    setHealthData: (data: HealthData) => void;
  };
  healthData: HealthData;
}

export function FileUploader({ onDataUpdate, healthData }: FileUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const { setAttentionData, setCategoryData, setChurnRiskData, setHealthData } = onDataUpdate;
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    setIsUploading(true);
    
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const csvContent = event?.target?.result as string;
        const parsedData = parseAnalyticsCSV(csvContent);
        
        // Update dashboard data with parsed CSV data
        if (parsedData.monthlyData && parsedData.monthlyData.length > 0) {
          // Ensure all data points have a predicted value
          const processedData = parsedData.monthlyData.map(point => ({
            ...point,
            predicted: point.predicted || (point.value * 0.98) // Default prediction if none provided
          })) as AttentionDataPoint[];
          
          setAttentionData(processedData);
        }
        
        if (parsedData.categoryData && parsedData.categoryData.length > 0) {
          setCategoryData(parsedData.categoryData);
        }
        
        if (parsedData.churnRiskData && parsedData.churnRiskData.length > 0) {
          setChurnRiskData(parsedData.churnRiskData);
        }
        
        // Update health metrics based on the new data
        if (parsedData.monthlyData || parsedData.categoryData || parsedData.churnRiskData) {
          // Calculate new health metrics
          const newHealthData = {...healthData};
          
          // Example: Update loyalty score based on monthly data if available
          if (parsedData.monthlyData) {
            const recentMonths = parsedData.monthlyData.slice(-3);
            const avgScore = recentMonths.reduce((acc, item) => acc + item.value, 0) / recentMonths.length;
            newHealthData.loyalty.score = Math.min(Math.round(avgScore + 10), 100);
            newHealthData.satisfaction.score = Math.min(Math.round(avgScore), 100);
          }
          
          // Update churn risk based on churn risk data if available
          if (parsedData.churnRiskData) {
            const highRisk = parsedData.churnRiskData.find(item => 
              item.name.toLowerCase().includes('high')
            );
            if (highRisk) {
              newHealthData.churn.score = Math.min(Math.round(highRisk.value), 100);
            }
          }
          
          setHealthData(newHealthData);
        }
        
        setIsUploading(false);
        
        toast({
          title: "Data uploaded successfully",
          description: "Your analytics data has been updated with the new file.",
        });
      } catch (error) {
        console.error("Error processing CSV file:", error);
        setIsUploading(false);
        
        toast({
          title: "Error processing CSV",
          description: "There was an error processing your file. Please check the format.",
          variant: "destructive"
        });
      }
    };
    
    reader.onerror = () => {
      setIsUploading(false);
      
      toast({
        title: "File read error",
        description: "Failed to read the uploaded file. Please try again.",
        variant: "destructive"
      });
    };
    
    reader.readAsText(file);
  };

  return (
    <div className="flex gap-2">
      <Button 
        className="flex items-center gap-2"
        variant="outline"
        disabled={isUploading}
        onClick={() => document.getElementById('file-upload')?.click()}
      >
        {isUploading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </>
        ) : (
          <>
            <FileUp className="h-4 w-4" />
            Upload CSV Data
          </>
        )}
        <input 
          id="file-upload" 
          type="file" 
          className="hidden" 
          accept=".csv" 
          onChange={handleFileUpload}
          disabled={isUploading}
        />
      </Button>
      <DownloadSample />
    </div>
  );
}
