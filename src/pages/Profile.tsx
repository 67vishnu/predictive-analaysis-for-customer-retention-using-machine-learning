import { useState, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Upload, Image, BadgeCheck, Check, UserCheck, UserPlus, ChevronRight, Calendar, Mail } from "lucide-react";
import InviteDialog from "@/components/InviteDialog";
import VerifiedBadge from "@/components/VerifiedBadge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const profileCompletionPercentage = 80; // Calculated based on profile completion

  const handleReset = () => {
    setName(user?.name || "");
    setEmail(user?.email || "");
  };

  const handleSave = () => {
    if (updateProfile) {
      updateProfile({ ...user, name, email, avatar });
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file.",
        variant: "destructive",
      });
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB.",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setAvatar(event.target.result as string);
        toast({
          title: "Image uploaded",
          description: "Your profile picture has been uploaded. Don't forget to save your changes.",
        });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Profile Settings</h1>
          <p className="text-muted-foreground">
            Manage your account information and preferences
          </p>
        </div>
        <InviteDialog />
      </div>

      <div className="grid gap-6 md:grid-cols-6">
        <div className="col-span-6 md:col-span-4 space-y-6">
          <Card className="overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
            <CardContent className="relative pt-0 -mt-16">
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4">
                <Avatar className="h-32 w-32 border-4 border-white bg-white">
                  <AvatarImage src={avatar} alt={name} />
                  <AvatarFallback className="text-3xl">
                    {name?.split(" ").map(n => n[0]).join("").toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-center sm:text-left mt-2 sm:mt-0">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <h2 className="text-2xl font-bold">{name}</h2>
                    <VerifiedBadge />
                  </div>
                  <p className="text-muted-foreground flex items-center justify-center sm:justify-start gap-1">
                    <Mail className="h-4 w-4" /> {email}
                  </p>
                  <div className="flex flex-wrap mt-3 gap-2 justify-center sm:justify-start">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleUploadClick}
                      className="flex items-center gap-2"
                    >
                      <Upload className="h-4 w-4" />
                      Change Photo
                    </Button>
                    {avatar && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setAvatar('')}
                        className="flex items-center gap-2 text-destructive hover:text-destructive"
                      >
                        Remove Photo
                      </Button>
                    )}
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your personal information and email address
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="name">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full sm:max-w-md"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full sm:max-w-md"
                  />
                </div>

                <div className="flex space-x-2 sm:max-w-md">
                  <Button variant="outline" onClick={handleReset}>
                    Reset
                  </Button>
                  <Button onClick={handleSave}>
                    Save Changes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-6 md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Profile Completion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Progress value={profileCompletionPercentage} className="h-2" />
                <p className="text-sm text-center font-medium">
                  {profileCompletionPercentage}% Complete
                </p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
                      <Check className="h-3 w-3 text-green-600" />
                    </div>
                    <span className="text-sm">Basic info</span>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
                      <Check className="h-3 w-3 text-green-600" />
                    </div>
                    <span className="text-sm">Profile picture</span>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                      <span className="h-3 w-3" />
                    </div>
                    <span className="text-sm text-muted-foreground">Two-factor authentication</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Account Rewards</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Points</span>
                  <span className="text-xl font-bold">325</span>
                </div>
                <Separator />
                <Button variant="outline" className="w-full flex justify-between" asChild>
                  <a href="/rewards">
                    View Rewards <ChevronRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-50 to-violet-50 border-indigo-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-indigo-700">Referral Program</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-indigo-700/80">
                  Invite friends and earn rewards when they join!
                </p>
                <div className="bg-white/80 rounded-lg p-3 text-center">
                  <p className="text-xs text-indigo-500 mb-1">You've invited</p>
                  <p className="text-2xl font-bold text-indigo-700">3 friends</p>
                </div>
                <Button variant="outline" className="w-full bg-white" asChild>
                  <a href="/rewards#referrals">
                    <UserPlus className="h-4 w-4 mr-2" />
                    View Referrals
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
