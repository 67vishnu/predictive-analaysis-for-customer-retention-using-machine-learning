
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { ArrowUpRight, ArrowDownRight, Users, Phone, Zap, Upload, BarChart2, LineChart } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";
import { useToast } from "@/hooks/use-toast";

// Mock data for charts
const attentionData = [
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

const categoryData = [
  { name: "Network", current: 65, previous: 55 },
  { name: "Price", current: 45, previous: 49 },
  { name: "Customer Service", current: 78, previous: 62 },
  { name: "Value Added", current: 35, previous: 40 },
  { name: "Billing", current: 82, previous: 75 },
];

const Dashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [chartView, setChartView] = useState<"line" | "bar">("line");
  const [isUploading, setIsUploading] = useState(false);

  if (!user) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    setIsUploading(true);
    
    // Simulate file processing
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "File uploaded successfully",
        description: "Your analytics data has been updated with the new file.",
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome back, {user.name}</h1>
          <p className="text-muted-foreground">Here's what's happening with your customers today.</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button 
            className="flex items-center gap-2"
            disabled={isUploading}
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            {isUploading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                Upload CSV
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
        </div>
      </div>

      {/* Stats row */}
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

      {/* Analytics chart */}
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Customer Attention Trends</CardTitle>
            <CardDescription>Actual vs. predicted attention scores over time</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant={chartView === "line" ? "default" : "outline"} 
              size="sm"
              onClick={() => setChartView("line")}
              className="h-8 w-8 p-0"
            >
              <LineChart className="h-4 w-4" />
            </Button>
            <Button 
              variant={chartView === "bar" ? "default" : "outline"} 
              size="sm"
              onClick={() => setChartView("bar")}
              className="h-8 w-8 p-0"
            >
              <BarChart2 className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-2 pb-6">
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              {chartView === "line" ? (
                <AreaChart data={attentionData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    style={{ fontSize: '12px', fill: '#888' }} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    style={{ fontSize: '12px', fill: '#888' }} 
                    domain={[0, 100]} 
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #f0f0f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3B82F6" 
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                    name="Actual" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="predicted" 
                    stroke="#8B5CF6" 
                    fillOpacity={1} 
                    fill="url(#colorPredicted)" 
                    name="Predicted" 
                  />
                </AreaChart>
              ) : (
                <BarChart data={categoryData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    style={{ fontSize: '12px', fill: '#888' }} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    style={{ fontSize: '12px', fill: '#888' }} 
                    domain={[0, 100]} 
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #f0f0f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                    }} 
                  />
                  <Legend />
                  <Bar dataKey="current" fill="#3B82F6" name="Current Month" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="previous" fill="#93C5FD" name="Previous Month" radius={[4, 4, 0, 0]} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Data input section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 card-hover">
          <CardHeader>
            <CardTitle>Customer Data Input</CardTitle>
            <CardDescription>Update telecom usage data to improve predictions</CardDescription>
          </CardHeader>
          <CardContent>
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
                    <input type="number" className="telecom-input" placeholder="Monthly data usage" defaultValue="4.2" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Call Minutes</label>
                    <input type="number" className="telecom-input" placeholder="Monthly call minutes" defaultValue="120" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">SMS Count</label>
                    <input type="number" className="telecom-input" placeholder="Monthly SMS count" defaultValue="45" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">4G/5G Usage Ratio</label>
                    <input type="number" className="telecom-input" placeholder="Percentage on 5G" defaultValue="65" />
                  </div>
                </div>
                <Button className="mt-4 w-full md:w-auto">Update Usage Data</Button>
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
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Loyalty Status</CardTitle>
            <CardDescription>Your current rewards and points</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Loyalty Points</span>
                <span className="text-sm font-medium">840 / 1000</span>
              </div>
              <Progress value={84} className="h-2" />
              <p className="text-xs text-muted-foreground">160 more points until next reward</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-3">Available Rewards</h4>
              <div className="space-y-3">
                <div className="rounded-lg border p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h5 className="font-medium text-sm">₹100 Bill Credit</h5>
                      <p className="text-xs text-muted-foreground">Expires in 30 days</p>
                    </div>
                    <Button variant="outline" size="sm">Claim</Button>
                  </div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h5 className="font-medium text-sm">1GB Extra Data</h5>
                      <p className="text-xs text-muted-foreground">Expires in 14 days</p>
                    </div>
                    <Button variant="outline" size="sm">Claim</Button>
                  </div>
                </div>
              </div>
            </div>
            
            <Button variant="outline" className="w-full">View All Rewards</Button>
          </CardContent>
        </Card>
      </div>

      {/* Plan activation section */}
      <Card className="card-hover">
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
                <div className="mt-4">
                  <span className="text-lg font-bold">₹599</span>
                  <span className="text-muted-foreground text-sm">/month</span>
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
                <div className="mt-4">
                  <span className="text-lg font-bold">₹899</span>
                  <span className="text-muted-foreground text-sm">/week</span>
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
                <div className="mt-4">
                  <span className="text-lg font-bold">₹299</span>
                  <span className="text-muted-foreground text-sm">/month</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-center">
            <Button>View All Available Plans</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
