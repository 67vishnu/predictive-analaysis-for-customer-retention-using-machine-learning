
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Eye, Users, ArrowUpRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export function QuickActions() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handlePayNow = () => {
    const userAgent = navigator.userAgent || navigator.vendor;
    
    if (/android/i.test(userAgent)) {
      window.location.href = "googlepay://pay";
    } else if (/iPad|iPhone|iPod/.test(userAgent)) {
      window.location.href = "apple-pay://";
    } else {
      toast({
        title: "Payment Redirecting",
        description: "On a mobile device, this would open your payment app. Please pay via our web payment form.",
      });
      navigate("/payments");
    }
  };

  const handleViewPlans = () => {
    navigate("/payments");
    toast({
      title: "Viewing Available Plans",
      description: "Showing you all available telecom plans.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Access key features and services</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-4">
          <Button onClick={handlePayNow} className="justify-start">
            <Phone className="mr-2 h-4 w-4" />
            Pay Current Bill
          </Button>
          
          <Button onClick={handleViewPlans} className="justify-start" variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            View Available Plans
          </Button>
          
          <Button className="justify-start" variant="outline">
            <Users className="mr-2 h-4 w-4" />
            Invite Friends
          </Button>
          
          <Button 
            className="justify-start" 
            variant="outline"
            onClick={() => navigate("/rewards")}
          >
            <ArrowUpRight className="mr-2 h-4 w-4" />
            Redeem Rewards
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
