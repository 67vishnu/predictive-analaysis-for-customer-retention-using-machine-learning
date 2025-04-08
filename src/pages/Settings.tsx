
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/DashboardLayout";
import { 
  BellRing, 
  Languages, 
  Lock, 
  Monitor, 
  Moon, 
  Settings as SettingsIcon, 
  Shield, 
  SmartphoneNfc, 
  Sun, 
  Users
} from "lucide-react";

const Settings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    marketingEmails: false,
    billReminders: true,
    dataUsageAlerts: true,
    newServices: false,
  });
  
  // Privacy settings
  const [privacySettings, setPrivacySettings] = useState({
    allowDataCollection: true,
    allowLocationSharing: false,
    allowPersonalization: true,
  });
  
  // Device settings
  const [deviceSettings, setDevicySettings] = useState({
    autoUpdate: true,
    darkMode: false,
    highContrast: false,
    language: "english",
  });
  
  const [isUpdating, setIsUpdating] = useState(false);
  
  const handleToggleSetting = (
    settingType: 'notification' | 'privacy' | 'device',
    key: string
  ) => {
    if (settingType === 'notification') {
      setNotificationSettings({
        ...notificationSettings,
        [key]: !notificationSettings[key as keyof typeof notificationSettings]
      });
    } else if (settingType === 'privacy') {
      setPrivacySettings({
        ...privacySettings,
        [key]: !privacySettings[key as keyof typeof privacySettings]
      });
    } else if (settingType === 'device') {
      setDevicySettings({
        ...deviceSettings,
        [key]: !deviceSettings[key as keyof typeof deviceSettings]
      });
    }
    
    toast({
      title: "Setting updated",
      description: `Your preference has been updated successfully.`,
    });
  };
  
  const handleSaveSettings = () => {
    setIsUpdating(true);
    
    // Simulate saving
    setTimeout(() => {
      setIsUpdating(false);
      
      toast({
        title: "Settings saved",
        description: "Your settings have been saved successfully.",
      });
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your app preferences and account settings
          </p>
        </div>

        <Tabs defaultValue="notifications" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
                <TabsTrigger value="notifications" className="flex gap-2 items-center">
                  <BellRing className="h-4 w-4" />
                  <span className="hidden sm:inline">Notifications</span>
                </TabsTrigger>
                <TabsTrigger value="privacy" className="flex gap-2 items-center">
                  <Shield className="h-4 w-4" />
                  <span className="hidden sm:inline">Privacy</span>
                </TabsTrigger>
                <TabsTrigger value="device" className="flex gap-2 items-center">
                  <SmartphoneNfc className="h-4 w-4" />
                  <span className="hidden sm:inline">Device</span>
                </TabsTrigger>
                <TabsTrigger value="account" className="flex gap-2 items-center">
                  <Users className="h-4 w-4" />
                  <span className="hidden sm:inline">Account</span>
                </TabsTrigger>
              </TabsList>
            </CardContent>
          </Card>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Configure how you want to receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-base font-medium">Communication Channels</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="space-y-0.5">
                        <Label className="text-base">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive updates and alerts via email
                        </p>
                      </div>
                      <Switch 
                        checked={notificationSettings.emailNotifications} 
                        onCheckedChange={() => handleToggleSetting("notification", "emailNotifications")} 
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between items-center">
                      <div className="space-y-0.5">
                        <Label className="text-base">SMS Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive updates and alerts via SMS
                        </p>
                      </div>
                      <Switch 
                        checked={notificationSettings.smsNotifications} 
                        onCheckedChange={() => handleToggleSetting("notification", "smsNotifications")} 
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between items-center">
                      <div className="space-y-0.5">
                        <Label className="text-base">Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive updates and alerts via app notifications
                        </p>
                      </div>
                      <Switch 
                        checked={notificationSettings.pushNotifications} 
                        onCheckedChange={() => handleToggleSetting("notification", "pushNotifications")} 
                      />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-base font-medium">Notification Types</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="space-y-0.5">
                        <Label className="text-base">Marketing Emails</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive promotional offers and updates
                        </p>
                      </div>
                      <Switch 
                        checked={notificationSettings.marketingEmails} 
                        onCheckedChange={() => handleToggleSetting("notification", "marketingEmails")} 
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between items-center">
                      <div className="space-y-0.5">
                        <Label className="text-base">Bill Reminders</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified when bills are due
                        </p>
                      </div>
                      <Switch 
                        checked={notificationSettings.billReminders} 
                        onCheckedChange={() => handleToggleSetting("notification", "billReminders")} 
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between items-center">
                      <div className="space-y-0.5">
                        <Label className="text-base">Data Usage Alerts</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified when you're approaching your data limit
                        </p>
                      </div>
                      <Switch 
                        checked={notificationSettings.dataUsageAlerts} 
                        onCheckedChange={() => handleToggleSetting("notification", "dataUsageAlerts")} 
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between items-center">
                      <div className="space-y-0.5">
                        <Label className="text-base">New Services</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified about new features and services
                        </p>
                      </div>
                      <Switch 
                        checked={notificationSettings.newServices} 
                        onCheckedChange={() => handleToggleSetting("notification", "newServices")} 
                      />
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button 
                    onClick={handleSaveSettings}
                    disabled={isUpdating}
                  >
                    {isUpdating ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </span>
                    ) : "Save Changes"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>
                  Manage how your data is used and shared
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="space-y-0.5">
                      <Label className="text-base">Data Collection</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow collection of usage data to improve services
                      </p>
                    </div>
                    <Switch 
                      checked={privacySettings.allowDataCollection} 
                      onCheckedChange={() => handleToggleSetting("privacy", "allowDataCollection")} 
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center">
                    <div className="space-y-0.5">
                      <Label className="text-base">Location Sharing</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow sharing of location data for service improvements
                      </p>
                    </div>
                    <Switch 
                      checked={privacySettings.allowLocationSharing} 
                      onCheckedChange={() => handleToggleSetting("privacy", "allowLocationSharing")} 
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center">
                    <div className="space-y-0.5">
                      <Label className="text-base">Personalization</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow personalization of content based on your usage
                      </p>
                    </div>
                    <Switch 
                      checked={privacySettings.allowPersonalization} 
                      onCheckedChange={() => handleToggleSetting("privacy", "allowPersonalization")} 
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-base font-medium">Data Management</h3>
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full md:w-auto">
                      Download My Data
                    </Button>
                    
                    <Button variant="outline" className="w-full md:w-auto text-destructive hover:text-destructive">
                      Delete All Data
                    </Button>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button 
                    onClick={handleSaveSettings}
                    disabled={isUpdating}
                  >
                    {isUpdating ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </span>
                    ) : "Save Changes"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="device">
            <Card>
              <CardHeader>
                <CardTitle>Device Settings</CardTitle>
                <CardDescription>
                  Customize your app experience and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-base font-medium">Display</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="space-y-0.5">
                        <Label className="text-base">Dark Mode</Label>
                        <p className="text-sm text-muted-foreground">
                          Switch between light and dark theme
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Sun className="h-4 w-4 text-muted-foreground" />
                        <Switch 
                          checked={deviceSettings.darkMode} 
                          onCheckedChange={() => handleToggleSetting("device", "darkMode")} 
                        />
                        <Moon className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between items-center">
                      <div className="space-y-0.5">
                        <Label className="text-base">High Contrast</Label>
                        <p className="text-sm text-muted-foreground">
                          Enhance visibility with high contrast mode
                        </p>
                      </div>
                      <Switch 
                        checked={deviceSettings.highContrast} 
                        onCheckedChange={() => handleToggleSetting("device", "highContrast")} 
                      />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-base font-medium">Language & Region</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select 
                        defaultValue={deviceSettings.language}
                        onValueChange={(value) => {
                          setDevicySettings({
                            ...deviceSettings,
                            language: value
                          });
                          toast({
                            title: "Language updated",
                            description: `Your app language has been updated.`,
                          });
                        }}
                      >
                        <SelectTrigger id="language" className="w-full">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="hindi">Hindi</SelectItem>
                          <SelectItem value="tamil">Tamil</SelectItem>
                          <SelectItem value="telugu">Telugu</SelectItem>
                          <SelectItem value="bengali">Bengali</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select defaultValue="ist">
                        <SelectTrigger id="timezone" className="w-full">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ist">India Standard Time (IST)</SelectItem>
                          <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
                          <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                          <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-base font-medium">Updates</h3>
                  <div className="flex justify-between items-center">
                    <div className="space-y-0.5">
                      <Label className="text-base">Auto Update</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically update the app when new versions are available
                      </p>
                    </div>
                    <Switch 
                      checked={deviceSettings.autoUpdate} 
                      onCheckedChange={() => handleToggleSetting("device", "autoUpdate")} 
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button 
                    onClick={handleSaveSettings}
                    disabled={isUpdating}
                  >
                    {isUpdating ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </span>
                    ) : "Save Changes"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account information and security
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-base font-medium">Account Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        placeholder="Your full name" 
                        defaultValue={user?.name}
                        className="telecom-input"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="Your email address" 
                        defaultValue={user?.email}
                        className="telecom-input"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        placeholder="Your phone number" 
                        defaultValue="9876543210"
                        className="telecom-input"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input 
                        id="address" 
                        placeholder="Your address" 
                        defaultValue="123 Main St, Bangalore"
                        className="telecom-input"
                      />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-base font-medium">Security</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="space-y-0.5">
                        <Label className="text-base">Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <Button variant="outline">
                        <Lock className="h-4 w-4 mr-2" />
                        Enable
                      </Button>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <Button variant="outline" className="w-full md:w-auto">
                        Change Password
                      </Button>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-base font-medium text-destructive">Danger Zone</h3>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <Button variant="destructive">
                      Delete Account
                    </Button>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button 
                    onClick={handleSaveSettings}
                    disabled={isUpdating}
                  >
                    {isUpdating ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </span>
                    ) : "Save Changes"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
