
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function CustomerDataInput() {
  const { toast } = useToast();

  const handleUpdateUsageData = () => {
    toast({
      title: "Usage Data Updated",
      description: "Your usage data has been successfully updated.",
    });
  };

  return (
    <Tabs defaultValue="usage">
      <TabsList className="grid grid-cols-3 mb-6">
        <TabsTrigger value="usage">Usage Data</TabsTrigger>
        <TabsTrigger value="preferences">Plan Preferences</TabsTrigger>
        <TabsTrigger value="feedback">Service Feedback</TabsTrigger>
      </TabsList>
      <TabsContent value="usage" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Data Usage (GB)</label>
            <input type="number" className="w-full px-3 py-2 border rounded-md" placeholder="Monthly data usage" defaultValue="4.2" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Call Minutes</label>
            <input type="number" className="w-full px-3 py-2 border rounded-md" placeholder="Monthly call minutes" defaultValue="120" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">SMS Count</label>
            <input type="number" className="w-full px-3 py-2 border rounded-md" placeholder="Monthly SMS count" defaultValue="45" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">4G/5G Usage Ratio</label>
            <input type="number" className="w-full px-3 py-2 border rounded-md" placeholder="Percentage on 5G" defaultValue="65" />
          </div>
        </div>
        <Button className="mt-4" onClick={handleUpdateUsageData}>Update Usage Data</Button>
      </TabsContent>
      <TabsContent value="preferences" className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Prefer Unlimited Data</label>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="h-8">No</Button>
              <Button size="sm" className="h-8">Yes</Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">International Calling</label>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="h-8">No</Button>
              <Button size="sm" className="h-8">Yes</Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Family Plan</label>
            <div className="flex items-center space-x-2">
              <Button size="sm" className="h-8">No</Button>
              <Button variant="outline" size="sm" className="h-8">Yes</Button>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Budget Range</label>
            <select className="telecom-input">
              <option>$0-$30 per month</option>
              <option>$30-$50 per month</option>
              <option selected>$50-$100 per month</option>
              <option>$100+ per month</option>
            </select>
          </div>
        </div>
        <Button className="mt-4 w-full md:w-auto">Update Plan Preferences</Button>
      </TabsContent>
      <TabsContent value="feedback" className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Network Quality Rating (1-10)</label>
            <input type="range" min="1" max="10" defaultValue="8" className="w-full" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Poor</span>
              <span>Excellent</span>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Customer Service Experience</label>
            <select className="telecom-input">
              <option>Very Dissatisfied</option>
              <option>Dissatisfied</option>
              <option>Neutral</option>
              <option selected>Satisfied</option>
              <option>Very Satisfied</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Additional Feedback</label>
            <textarea className="telecom-input min-h-[80px]" placeholder="Share your experience with our services"></textarea>
          </div>
        </div>
        <Button className="mt-4 w-full md:w-auto">Submit Feedback</Button>
      </TabsContent>
    </Tabs>
  );
}
