
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function RewardsCard() {
  return (
    <Card className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
      <CardHeader>
        <CardTitle>Payment Rewards Program</CardTitle>
        <CardDescription className="text-white/70">Earn points with on-time payments and get exclusive benefits</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 bg-white/10 rounded-xl p-5">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-bold">Gold Tier Status</h3>
                <p className="text-sm text-white/70">Reward points: 2,450</p>
              </div>
              <div className="relative h-16 w-16">
                <div className="absolute inset-0 rounded-full border-4 border-white/30"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold">75%</span>
                </div>
              </div>
            </div>
            <Button className="w-full bg-white text-blue-600 hover:bg-white/90">Redeem Rewards</Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-2">
            <div className="bg-white/10 rounded-xl p-4">
              <h4 className="font-semibold mb-2">On-Time Payment</h4>
              <p className="text-sm text-white/70">+50 points for each on-time payment</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <h4 className="font-semibold mb-2">3-Month Streak</h4>
              <p className="text-sm text-white/70">+200 points for 3 consecutive months</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <h4 className="font-semibold mb-2">Referral Bonus</h4>
              <p className="text-sm text-white/70">+100 points for each successful referral</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
