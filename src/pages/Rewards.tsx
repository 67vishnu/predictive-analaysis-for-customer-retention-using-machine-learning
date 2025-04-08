
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import DashboardLayout from "@/components/DashboardLayout";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Check, Gift, History, Medal, Phone, Smartphone, Wifi } from "lucide-react";

interface Reward {
  id: string;
  title: string;
  description: string;
  points: number;
  expiresIn: number | null;
  type: "bill" | "data" | "subscription" | "device";
  claimed: boolean;
}

interface HistoryItem {
  id: string;
  title: string;
  date: string;
  points: number;
  action: "earned" | "redeemed";
}

const REWARDS: Reward[] = [
  {
    id: "reward-1",
    title: "₹100 Bill Credit",
    description: "Apply a credit to your next monthly bill",
    points: 500,
    expiresIn: 30,
    type: "bill",
    claimed: false,
  },
  {
    id: "reward-2",
    title: "1GB Extra Data",
    description: "Add an extra 1GB of high-speed data to your plan",
    points: 200,
    expiresIn: 14,
    type: "data",
    claimed: false,
  },
  {
    id: "reward-3",
    title: "Free Netflix (1 Month)",
    description: "Get a free month of Netflix subscription",
    points: 1000,
    expiresIn: 30,
    type: "subscription",
    claimed: false,
  },
  {
    id: "reward-4",
    title: "₹200 Bill Credit",
    description: "Apply a credit to your next monthly bill",
    points: 800,
    expiresIn: 30,
    type: "bill",
    claimed: false,
  },
  {
    id: "reward-5",
    title: "2GB Extra Data",
    description: "Add an extra 2GB of high-speed data to your plan",
    points: 350,
    expiresIn: 14,
    type: "data",
    claimed: false,
  },
  {
    id: "reward-6",
    title: "5% Off Device Upgrade",
    description: "Get 5% off on your next phone purchase",
    points: 1500,
    expiresIn: 90,
    type: "device",
    claimed: false,
  },
];

const HISTORY: HistoryItem[] = [
  {
    id: "history-1",
    title: "Monthly Plan Renewal",
    date: "2023-04-01",
    points: 50,
    action: "earned",
  },
  {
    id: "history-2",
    title: "Redeemed: ₹100 Bill Credit",
    date: "2023-03-15",
    points: 500,
    action: "redeemed",
  },
  {
    id: "history-3",
    title: "Referral Bonus",
    date: "2023-03-10",
    points: 200,
    action: "earned",
  },
  {
    id: "history-4",
    title: "Survey Completion",
    date: "2023-03-05",
    points: 100,
    action: "earned",
  },
  {
    id: "history-5",
    title: "Redeemed: 1GB Extra Data",
    date: "2023-02-20",
    points: 200,
    action: "redeemed",
  },
];

const Rewards = () => {
  const { toast } = useToast();
  const [rewards, setRewards] = useState<Reward[]>(REWARDS);
  const [history, setHistory] = useState<HistoryItem[]>(HISTORY);
  const [userPoints, setUserPoints] = useState(840);
  const [claimingReward, setClaimingReward] = useState<string | null>(null);
  
  const handleClaimReward = (reward: Reward) => {
    if (userPoints < reward.points) {
      toast({
        title: "Insufficient points",
        description: `You need ${reward.points - userPoints} more points to claim this reward.`,
        variant: "destructive",
      });
      return;
    }
    
    setClaimingReward(reward.id);
    
    // Simulate API call
    setTimeout(() => {
      // Mark reward as claimed
      const updatedRewards = rewards.map(r =>
        r.id === reward.id ? { ...r, claimed: true } : r
      );
      setRewards(updatedRewards);
      
      // Deduct points
      setUserPoints(prev => prev - reward.points);
      
      // Add to history
      const newHistoryItem: HistoryItem = {
        id: `history-${Date.now()}`,
        title: `Redeemed: ${reward.title}`,
        date: new Date().toISOString().split('T')[0],
        points: reward.points,
        action: "redeemed",
      };
      setHistory([newHistoryItem, ...history]);
      
      setClaimingReward(null);
      
      toast({
        title: "Reward claimed successfully",
        description: `You have successfully claimed ${reward.title}.`,
      });
    }, 1500);
  };

  const getTier = (points: number) => {
    if (points >= 2000) return "Platinum";
    if (points >= 1000) return "Gold";
    if (points >= 500) return "Silver";
    return "Bronze";
  };

  const getTierProgress = (points: number) => {
    if (points >= 2000) return 100;
    if (points >= 1000) return ((points - 1000) / 1000) * 100 + 50;
    if (points >= 500) return ((points - 500) / 500) * 100 + 25;
    return (points / 500) * 100;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
  };

  const getRewardIcon = (type: string) => {
    switch (type) {
      case "bill":
        return <Phone className="h-5 w-5" />;
      case "data":
        return <Wifi className="h-5 w-5" />;
      case "subscription":
        return <Gift className="h-5 w-5" />;
      case "device":
        return <Smartphone className="h-5 w-5" />;
      default:
        return <Gift className="h-5 w-5" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Rewards & Loyalty</h1>
          <p className="text-muted-foreground">
            Earn and redeem points for exclusive rewards and benefits
          </p>
        </div>

        {/* Loyalty status card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2 bg-gradient-to-br from-primary/5 to-primary/10 overflow-hidden relative">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Medal className="h-5 w-5 text-primary" />
                Loyalty Status
              </CardTitle>
              <CardDescription>Your current tier and benefits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col justify-center col-span-1">
                  <div className="rounded-full w-28 h-28 mx-auto flex items-center justify-center bg-white border-4 border-primary/20 mb-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">{userPoints}</div>
                      <div className="text-xs text-muted-foreground">POINTS</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-bold">{getTier(userPoints)} Tier</h3>
                    <p className="text-sm text-muted-foreground">Member since Jan 2023</p>
                  </div>
                </div>
                
                <div className="md:col-span-2 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <span className="text-sm font-medium">
                          {getTier(userPoints) === "Bronze" ? "Silver Tier" : 
                           getTier(userPoints) === "Silver" ? "Gold Tier" : 
                           getTier(userPoints) === "Gold" ? "Platinum Tier" : "Max Tier"}
                        </span>
                        {getTier(userPoints) !== "Platinum" && (
                          <div className="text-xs text-muted-foreground">
                            {getTier(userPoints) === "Bronze" ? (500 - userPoints) : 
                             getTier(userPoints) === "Silver" ? (1000 - userPoints) : 
                             (2000 - userPoints)} points needed
                          </div>
                        )}
                      </div>
                      <span className="text-sm font-medium">
                        {userPoints}/{getTier(userPoints) === "Bronze" ? "500" : 
                                      getTier(userPoints) === "Silver" ? "1000" : 
                                      getTier(userPoints) === "Gold" ? "2000" : "2000+"}
                      </span>
                    </div>
                    <Progress value={getTierProgress(userPoints)} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                    <div className="bg-white/80 rounded-lg p-3 shadow-sm">
                      <div className="flex items-center gap-2 text-sm font-medium mb-1">
                        <Check className="h-4 w-4 text-green-500" />
                        Priority Support
                      </div>
                      <p className="text-xs text-muted-foreground">24/7 dedicated customer support</p>
                    </div>
                    <div className="bg-white/80 rounded-lg p-3 shadow-sm">
                      <div className="flex items-center gap-2 text-sm font-medium mb-1">
                        <Check className="h-4 w-4 text-green-500" />
                        Birthday Bonus
                      </div>
                      <p className="text-xs text-muted-foreground">Extra 100 points on your birthday</p>
                    </div>
                    <div className="bg-white/80 rounded-lg p-3 shadow-sm">
                      <div className="flex items-center gap-2 text-sm font-medium mb-1">
                        <Check className="h-4 w-4 text-green-500" />
                        Exclusive Offers
                      </div>
                      <p className="text-xs text-muted-foreground">Special deals only for your tier</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <div className="absolute -bottom-6 -right-6 opacity-10">
              <Medal className="h-48 w-48 text-primary" />
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ways to Earn</CardTitle>
              <CardDescription>Earn points through these activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Monthly Bill Payment</h4>
                      <p className="text-xs text-muted-foreground">Pay your bill on time</p>
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-primary">+50 pts</div>
                </div>
              </div>
              
              <div className="rounded-lg border p-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Refer a Friend</h4>
                      <p className="text-xs text-muted-foreground">When they join with your code</p>
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-primary">+200 pts</div>
                </div>
              </div>
              
              <div className="rounded-lg border p-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                      <Smartphone className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Plan Upgrade</h4>
                      <p className="text-xs text-muted-foreground">Upgrade to a higher plan</p>
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-primary">+100 pts</div>
                </div>
              </div>
              
              <Button variant="outline" className="w-full">View All Ways to Earn</Button>
            </CardContent>
          </Card>
        </div>

        {/* Available rewards */}
        <Card>
          <CardHeader>
            <CardTitle>Available Rewards</CardTitle>
            <CardDescription>Redeem your points for these rewards</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-4 w-full justify-start">
                <TabsTrigger value="all">All Rewards</TabsTrigger>
                <TabsTrigger value="bill">Bill Credits</TabsTrigger>
                <TabsTrigger value="data">Data Rewards</TabsTrigger>
                <TabsTrigger value="subscription">Subscriptions</TabsTrigger>
                <TabsTrigger value="device">Device Offers</TabsTrigger>
              </TabsList>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {rewards.map(reward => (
                  <Card key={reward.id} className={`overflow-hidden border ${reward.claimed ? 'bg-muted' : ''}`}>
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className={`h-10 w-10 rounded-full ${
                            reward.type === "bill" ? "bg-blue-100 text-blue-600" :
                            reward.type === "data" ? "bg-green-100 text-green-600" :
                            reward.type === "subscription" ? "bg-purple-100 text-purple-600" :
                            "bg-amber-100 text-amber-600"
                          } flex items-center justify-center`}>
                            {getRewardIcon(reward.type)}
                          </div>
                          <div>
                            <h3 className="font-medium">{reward.title}</h3>
                            <p className="text-sm text-muted-foreground">{reward.description}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex justify-between items-center">
                        <div className="flex items-center gap-1 text-sm">
                          <span className="font-semibold text-primary">{reward.points} points</span>
                          {reward.expiresIn && (
                            <span className="text-xs text-muted-foreground">
                              • Expires in {reward.expiresIn} days
                            </span>
                          )}
                        </div>
                        
                        <Button 
                          variant={reward.claimed ? "outline" : (userPoints >= reward.points ? "default" : "outline")}
                          size="sm"
                          disabled={reward.claimed || claimingReward !== null || userPoints < reward.points}
                          onClick={() => handleClaimReward(reward)}
                          className={reward.claimed ? "opacity-50" : ""}
                        >
                          {claimingReward === reward.id ? (
                            <span className="flex items-center">
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Claiming...
                            </span>
                          ) : reward.claimed ? (
                            <span className="flex items-center">
                              <Check className="h-4 w-4 mr-1" />
                              Claimed
                            </span>
                          ) : (
                            "Claim Reward"
                          )}
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="outline" className="w-full mt-4">Browse More Rewards</Button>
            </CardFooter>
          </Card>
        </Card>

        {/* Rewards history */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Rewards History
              </CardTitle>
              <CardDescription>Your points activity and reward redemptions</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              Download History
            </Button>
          </CardHeader>
          <CardContent>
            {history.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                No history available yet.
              </div>
            ) : (
              <div className="space-y-4">
                {history.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex justify-between items-center p-3 rounded-lg border"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-full ${
                        item.action === "earned" ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
                      } flex items-center justify-center`}>
                        {item.action === "earned" ? (
                          <Gift className="h-5 w-5" />
                        ) : (
                          <Check className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{item.title}</h4>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(item.date)}
                        </p>
                      </div>
                    </div>
                    <div className={`font-semibold ${
                      item.action === "earned" ? "text-green-600" : "text-blue-600"
                    }`}>
                      {item.action === "earned" ? "+" : "-"}{item.points} pts
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" className="w-full mt-4">View Complete History</Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Rewards;
