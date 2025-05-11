
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export function ActivePlansCard() {
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
        <CardTitle>Active Plans</CardTitle>
        <CardDescription>Manage your telecom plans and services</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl border p-4 relative">
            <div className="absolute top-4 right-4">
              <div className="flex items-center h-6 w-12 rounded-full bg-green-100 p-1">
                <div className="h-4 w-4 rounded-full bg-green-500 translate-x-6 transition-all" />
              </div>
            </div>
            <div className="pt-2">
              <h3 className="font-semibold">Premium 5G</h3>
              <p className="text-sm text-muted-foreground mt-1">Unlimited calls & data</p>
              <div className="mt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Data</span>
                  <span className="font-medium">Unlimited</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Calls</span>
                  <span className="font-medium">Unlimited</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Validity</span>
                  <span className="font-medium">28 days</span>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div>
                  <span className="text-lg font-bold">₹599</span>
                  <span className="text-muted-foreground text-sm">/month</span>
                </div>
                <Button size="sm" onClick={handlePayNow}>Pay Now</Button>
              </div>
            </div>
          </div>
          
          <div className="rounded-xl border p-4 relative">
            <div className="absolute top-4 right-4">
              <div className="flex items-center h-6 w-12 rounded-full bg-gray-200 p-1">
                <div className="h-4 w-4 rounded-full bg-gray-400 translate-x-0 transition-all" />
              </div>
            </div>
            <div className="pt-2">
              <h3 className="font-semibold">International Add-on</h3>
              <p className="text-sm text-muted-foreground mt-1">Global roaming pack</p>
              <div className="mt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Data</span>
                  <span className="font-medium">2GB/day</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Calls</span>
                  <span className="font-medium">100 mins</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Validity</span>
                  <span className="font-medium">7 days</span>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div>
                  <span className="text-lg font-bold">₹899</span>
                  <span className="text-muted-foreground text-sm">/week</span>
                </div>
                <Button size="sm" onClick={handlePayNow}>Pay Now</Button>
              </div>
            </div>
          </div>
          
          <div className="rounded-xl border p-4 relative">
            <div className="absolute top-4 right-4">
              <div className="flex items-center h-6 w-12 rounded-full bg-green-100 p-1">
                <div className="h-4 w-4 rounded-full bg-green-500 translate-x-6 transition-all" />
              </div>
            </div>
            <div className="pt-2">
              <h3 className="font-semibold">Entertainment Bundle</h3>
              <p className="text-sm text-muted-foreground mt-1">OTT subscription pack</p>
              <div className="mt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Netflix</span>
                  <span className="font-medium">Basic</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Disney+</span>
                  <span className="font-medium">Standard</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Validity</span>
                  <span className="font-medium">30 days</span>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div>
                  <span className="text-lg font-bold">₹299</span>
                  <span className="text-muted-foreground text-sm">/month</span>
                </div>
                <Button size="sm" onClick={handlePayNow}>Pay Now</Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-center">
          <Button onClick={handleViewPlans}>
            <Eye className="mr-2 h-4 w-4" />
            View All Available Plans
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
