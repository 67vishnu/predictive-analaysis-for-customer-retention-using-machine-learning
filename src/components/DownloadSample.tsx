
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface DownloadSampleProps {
  variant?: "default" | "outline" | "ghost" | "link";
  size?: "sm" | "default" | "lg";
  className?: string;
}

const DownloadSample = ({ variant = "ghost", size = "sm", className }: DownloadSampleProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant={variant} 
            size={size}
            className={className}
            onClick={() => {
              window.open('/sample_analytics.csv', '_blank');
            }}
          >
            <Download className="h-4 w-4 mr-1" />
            Sample CSV
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Download a sample CSV file to see the expected format</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default DownloadSample;
