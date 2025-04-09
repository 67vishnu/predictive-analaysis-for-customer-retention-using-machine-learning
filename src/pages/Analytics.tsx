import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from "recharts";
import { ArrowUpRight, Download, Filter, Upload } from "lucide-react";

const monthlyData = [
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

const quarterlyData = [
  { name: "Q1", value: 68, predicted: 65 },
  { name: "Q2", value: 71, predicted: 70 },
  { name: "Q3", value: 41, predicted: 45 },
  { name: "Q4", value: 70, predicted: 69 },
];

const categoryData = [
  { name: "Network", value: 65 },
  { name: "Price", value: 45 },
  { name: "Customer Service", value: 78 },
  { name: "Value Added", value: 35 },
  { name: "Billing", value: 82 },
];

const demographicsData = [
  { name: "18-24", value: 15 },
  { name: "25-34", value: 30 },
  { name: "35-44", value: 25 },
  { name: "45-54", value: 18 },
  { name: "55+", value: 12 },
];

const COLORS = ["#3B82F6", "#10B981", "#8B5CF6", "#F59E0B", "#EF4444"];

const Analytics = () => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [timeFrame, setTimeFrame] = useState("monthly");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    setIsUploading(true);
    
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "File uploaded successfully",
        description: "Your analytics data has been updated with the new file.",
      });
    }, 2000);
  };

  const handleExportData = () => {
    toast({
      title: "Exporting data",
      description: "Your analytics data is being exported as CSV.",
    });
    
    setTimeout(() => {
      toast({
        title: "Export complete",
        description: "Your data has been exported successfully.",
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics Overview</h1>
          <p className="text-muted-foreground">Detailed customer attention predictions and analysis</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 mt-4 md:mt-0">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={handleExportData}
          >
            <Download className="h-4 w-4" />
            Export Data
          </Button>
          <Button 
            className="flex items-center gap-2"
            disabled={isUploading}
            onClick={() => document.getElementById('analytics-file-upload')?.click()}
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
              id="analytics-file-upload" 
              type="file" 
              className="hidden" 
              accept=".csv" 
              onChange={handleFileUpload}
              disabled={isUploading}
            />
          </Button>
        </div>
      </div>

      {/* Analytics filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filter by:</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 flex-1">
              <Select defaultValue="all">
                <SelectTrigger className="h-9 w-full">
                  <SelectValue placeholder="Customer Segment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Segments</SelectItem>
                  <SelectItem value="individual">Individual</SelectItem>
                  <SelectItem value="family">Family Plans</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                </SelectContent>
              </Select>
              
              <Select defaultValue="all">
                <SelectTrigger className="h-9 w-full">
                  <SelectValue placeholder="Plan Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Plans</SelectItem>
                  <SelectItem value="prepaid">Prepaid</SelectItem>
                  <SelectItem value="postpaid">Postpaid</SelectItem>
                </SelectContent>
              </Select>
              
              <Select defaultValue="all">
                <SelectTrigger className="h-9 w-full">
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="north">North</SelectItem>
                  <SelectItem value="south">South</SelectItem>
                  <SelectItem value="east">East</SelectItem>
                  <SelectItem value="west">West</SelectItem>
                </SelectContent>
              </Select>
              
              <Select 
                value={timeFrame}
                onValueChange={setTimeFrame}
              >
                <SelectTrigger className="h-9 w-full">
                  <SelectValue placeholder="Time Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button variant="secondary" className="ml-auto">Apply Filters</Button>
          </div>
        </CardContent>
      </Card>

      {/* Main analytics dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Customer Attention Trends</CardTitle>
            <CardDescription>Actual vs. Predicted attention scores over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart 
                  data={timeFrame === "monthly" ? monthlyData : quarterlyData} 
                  margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
                >
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
                  <Legend />
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
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Demographics</CardTitle>
            <CardDescription>Customer age distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={demographicsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    labelLine={false}
                  >
                    {demographicsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value}%`, "Percentage"]}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #f0f0f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Attention Category Breakdown</CardTitle>
          <CardDescription>Analysis by customer experience factors</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="chart">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="chart">Chart View</TabsTrigger>
                <TabsTrigger value="table">Table View</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="chart">
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={categoryData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
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
                      formatter={(value) => [`${value}%`, "Satisfaction"]}
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #f0f0f0',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                      }}
                    />
                    <Bar 
                      dataKey="value" 
                      fill="#3B82F6" 
                      name="Satisfaction" 
                      radius={[4, 4, 0, 0]} 
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="table">
              <div className="rounded-md border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-slate-50">
                      <th className="py-3 px-4 text-left font-medium">Category</th>
                      <th className="py-3 px-4 text-left font-medium">Satisfaction</th>
                      <th className="py-3 px-4 text-left font-medium">Change</th>
                      <th className="py-3 px-4 text-left font-medium">Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoryData.map((item, index) => (
                      <tr key={item.name} className={index !== categoryData.length - 1 ? "border-b" : ""}>
                        <td className="py-3 px-4">{item.name}</td>
                        <td className="py-3 px-4 font-medium">{item.value}%</td>
                        <td className={`py-3 px-4 ${index % 2 === 0 ? "text-green-600" : "text-red-600"}`}>
                          {index % 2 === 0 ? "+" : "-"}{Math.floor(Math.random() * 10) + 1}%
                        </td>
                        <td className="py-3 px-4">
                          {index % 2 === 0 ? (
                            <ArrowUpRight className="h-4 w-4 text-green-600" />
                          ) : (
                            <div className="h-1 bg-gray-200 rounded">
                              <div 
                                className="h-1 bg-red-500 rounded" 
                                style={{ width: `${item.value}%` }}
                              ></div>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Prediction accuracy */}
      <Card>
        <CardHeader>
          <CardTitle>Prediction Accuracy Analysis</CardTitle>
          <CardDescription>Comparison of predicted vs. actual customer attention metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={timeFrame === "monthly" ? monthlyData : quarterlyData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
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
                      formatter={(value) => [`${value}%`, "Score"]}
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #f0f0f0',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#3B82F6" 
                      name="Actual" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="predicted" 
                      stroke="#8B5CF6" 
                      name="Predicted" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-slate-50 rounded-lg p-4">
                <h3 className="text-lg font-medium mb-2">Prediction Accuracy</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Overall</span>
                      <span className="text-sm font-medium">94%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded">
                      <div className="h-2 bg-blue-500 rounded" style={{ width: "94%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Network</span>
                      <span className="text-sm font-medium">96%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded">
                      <div className="h-2 bg-blue-500 rounded" style={{ width: "96%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Pricing</span>
                      <span className="text-sm font-medium">89%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded">
                      <div className="h-2 bg-blue-500 rounded" style={{ width: "89%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <Card className="border-dashed">
                <CardContent className="p-4">
                  <h3 className="text-sm font-semibold mb-2">Recommendation</h3>
                  <p className="text-sm text-muted-foreground">
                    Based on prediction analysis, focus on improving customer service and billing clarity to increase overall customer attention metrics.
                  </p>
                  <Button variant="link" className="px-0 text-sm">View detailed report</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
