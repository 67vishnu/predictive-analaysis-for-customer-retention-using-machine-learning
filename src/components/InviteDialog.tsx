
import { useState } from "react";
import { UserPlus, Mail, Link, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const InviteDialog = () => {
  const [email, setEmail] = useState("");
  const [emails, setEmails] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const inviteLink = `${window.location.origin}/signup?referral=user123`;

  const handleAddEmail = () => {
    if (!email) return;
    if (!email.includes("@") || !email.includes(".")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    if (emails.includes(email)) {
      toast({
        title: "Email already added",
        description: "This email has already been added to the list.",
        variant: "destructive",
      });
      return;
    }
    setEmails([...emails, email]);
    setEmail("");
  };

  const handleRemoveEmail = (emailToRemove: string) => {
    setEmails(emails.filter((e) => e !== emailToRemove));
  };

  const handleSendInvites = () => {
    if (emails.length === 0) {
      toast({
        title: "No emails added",
        description: "Please add at least one email address.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Invitations sent",
      description: `Successfully sent invitations to ${emails.length} contacts.`,
    });
    setEmails([]);
    setIsOpen(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    toast({
      title: "Link copied",
      description: "Invite link copied to clipboard!",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700">
          <UserPlus className="h-4 w-4" />
          Invite Friends
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Invite Friends</DialogTitle>
          <DialogDescription>
            Invite your friends to join Telecom Insight and earn rewards.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="email" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="link">Invite Link</TabsTrigger>
          </TabsList>
          
          <TabsContent value="email" className="space-y-4 mt-4">
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddEmail();
                  }
                }}
              />
              <Button onClick={handleAddEmail}>Add</Button>
            </div>
            
            {emails.length > 0 && (
              <div className="bg-slate-50 p-3 rounded-md max-h-32 overflow-y-auto">
                <p className="text-sm text-muted-foreground mb-2">Recipients:</p>
                <div className="flex flex-wrap gap-2">
                  {emails.map((email) => (
                    <div
                      key={email}
                      className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-full text-xs"
                    >
                      <span>{email}</span>
                      <button
                        onClick={() => handleRemoveEmail(email)}
                        className="text-primary hover:text-primary/80"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="link" className="space-y-4 mt-4">
            <div className="flex flex-col space-y-2">
              <p className="text-sm text-muted-foreground">
                Share this link with your friends to invite them to join.
              </p>
              <div className="flex items-center space-x-2">
                <Input value={inviteLink} readOnly />
                <Button variant="outline" size="icon" onClick={handleCopyLink}>
                  {copied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="sm:justify-between">
          <div className="flex items-center">
            <div className="text-xs text-muted-foreground">
              5 invites available
            </div>
          </div>
          <Button 
            onClick={handleSendInvites} 
            disabled={emails.length === 0}
            className="gap-2"
          >
            <Mail className="h-4 w-4" />
            Send Invites
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InviteDialog;
