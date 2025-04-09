
import { useState, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Upload, Image } from "lucide-react";

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Profile Settings</h1>
        <p className="text-muted-foreground">
          Manage your account information and preferences
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            Update your personal information and email address
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="flex flex-col items-center sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={avatar} alt={name} />
                <AvatarFallback className="text-2xl">
                  {name?.split(" ").map(n => n[0]).join("").toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1 text-center sm:text-left">
                <h3 className="font-medium">Profile Picture</h3>
                <p className="text-sm text-muted-foreground">
                  Upload a new profile picture
                </p>
                <div className="flex flex-col sm:flex-row gap-2 mt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleUploadClick}
                    className="flex items-center gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    Upload Photo
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
