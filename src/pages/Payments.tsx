import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Calendar, CreditCard, DollarSign, Download, FileText, Search, User, Wallet, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PaymentMethod {
  id: string;
  type: "card" | "upi" | "bank";
  name: string;
  details: string;
  default: boolean;
}

interface Bill {
  id: string;
  amount: number;
  dueDate: string;
  status: "paid" | "pending" | "overdue";
  type: string;
}

const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "card-1",
    type: "card",
    name: "HDFC Credit Card",
    details: "Ending in 4242",
    default: true,
  },
  {
    id: "upi-1",
    type: "upi",
    name: "Google Pay",
    details: "user@okicici",
    default: false,
  },
  {
    id: "upi-2",
    type: "upi",
    name: "PhonePe",
    details: "user@ybl",
    default: false,
  },
  {
    id: "bank-1",
    type: "bank",
    name: "HDFC Bank",
    details: "Savings Account",
    default: false,
  },
];

const BILLS: Bill[] = [
  {
    id: "bill-1",
    amount: 599,
    dueDate: "2023-04-15",
    status: "pending",
    type: "Premium 5G",
  },
  {
    id: "bill-2",
    amount: 299,
    dueDate: "2023-04-20",
    status: "pending",
    type: "Entertainment Bundle",
  },
  {
    id: "bill-3",
    amount: 599,
    dueDate: "2023-03-15",
    status: "paid",
    type: "Premium 5G",
  },
  {
    id: "bill-4",
    amount: 299,
    dueDate: "2023-03-20",
    status: "paid",
    type: "Entertainment Bundle",
  },
  {
    id: "bill-5",
    amount: 599,
    dueDate: "2023-02-15",
    status: "paid",
    type: "Premium 5G",
  },
];

const Payments = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(PAYMENT_METHODS);
  const [bills, setBills] = useState<Bill[]>(BILLS);
  const [isPayingBill, setIsPayingBill] = useState(false);
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("");
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayNow = (bill: Bill) => {
    setSelectedBill(bill);
    setSelectedPaymentMethod(paymentMethods.find(m => m.default)?.id || "");
    setPaymentDialogOpen(true);
    setPaymentSuccess(false);
  };

  const processPayment = () => {
    setIsPayingBill(true);
    
    const selectedMethod = paymentMethods.find(m => m.id === selectedPaymentMethod);
    
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile && selectedMethod?.type === "upi") {
      let paymentLink = "";
      
      if (selectedMethod.name === "Google Pay") {
        paymentLink = `gpay://upi/pay?pa=${selectedMethod.details}&pn=TelecomService&am=${selectedBill?.amount}&cu=INR&tn=Bill+Payment`;
      } else if (selectedMethod.name === "PhonePe") {
        paymentLink = `phonepe://pay?pa=${selectedMethod.details}&pn=TelecomService&am=${selectedBill?.amount}&cu=INR&tn=Bill+Payment`;
      } else {
        paymentLink = `upi://pay?pa=${selectedMethod.details}&pn=TelecomService&am=${selectedBill?.amount}&cu=INR&tn=Bill+Payment`;
      }
      
      window.location.href = paymentLink;
      
      setTimeout(() => {
        setIsPayingBill(false);
        setPaymentSuccess(true);
        
        const updatedBills = bills.map(bill => 
          bill.id === selectedBill?.id ? { ...bill, status: "paid" as const } : bill
        );
        setBills(updatedBills);
        
        toast({
          title: "Payment initiated",
          description: `Payment request sent to your UPI app. Please complete the transaction.`,
        });
        
        setTimeout(() => {
          setPaymentDialogOpen(false);
        }, 3000);
      }, 2000);
    } else {
      setTimeout(() => {
        setIsPayingBill(false);
        setPaymentSuccess(true);
        
        const updatedBills = bills.map(bill => 
          bill.id === selectedBill?.id ? { ...bill, status: "paid" as const } : bill
        );
        setBills(updatedBills);
        
        setTimeout(() => {
          setPaymentDialogOpen(false);
          
          toast({
            title: "Payment successful",
            description: `₹${selectedBill?.amount} has been paid successfully.`,
          });
        }, 2000);
      }, 2000);
    }
  };

  const handleDownloadInvoice = (bill: Bill) => {
    toast({
      title: "Downloading invoice",
      description: `Invoice for ${bill.type} (₹${bill.amount}) is being downloaded.`,
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Payments</h1>
        <p className="text-muted-foreground">Manage your bills and payment methods</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Bills</CardTitle>
            <CardDescription>Your pending bills and payment status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bills.filter(bill => bill.status !== "paid").length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                        No pending bills. You're all set!
                      </TableCell>
                    </TableRow>
                  ) : (
                    bills
                      .filter(bill => bill.status !== "paid")
                      .map(bill => (
                        <TableRow key={bill.id}>
                          <TableCell className="font-medium">{bill.type}</TableCell>
                          <TableCell>₹{bill.amount}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              {formatDate(bill.dueDate)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              bill.status === "pending" 
                                ? "bg-yellow-100 text-yellow-800" 
                                : bill.status === "overdue"
                                ? "bg-red-100 text-red-800"
                                : "bg-green-100 text-green-800"
                            }`}>
                              {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="default" 
                                size="sm"
                                onClick={() => handlePayNow(bill)}
                              >
                                Pay Now
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Summary</CardTitle>
            <CardDescription>Your payment details at a glance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Current Due</span>
                <span className="text-lg font-bold">₹{bills
                  .filter(bill => bill.status === "pending" || bill.status === "overdue")
                  .reduce((total, bill) => total + bill.amount, 0)
                }</span>
              </div>
              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <span>Due Date</span>
                <span>{formatDate(bills
                  .filter(bill => bill.status === "pending")
                  .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())[0]?.dueDate || "")
                }</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="flex flex-col items-center justify-center h-24">
                <Calendar className="h-6 w-6 mb-2" />
                <span className="text-xs">Auto Pay</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center justify-center h-24">
                <FileText className="h-6 w-6 mb-2" />
                <span className="text-xs">View Bill</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center justify-center h-24">
                <Download className="h-6 w-6 mb-2" />
                <span className="text-xs">Download</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center justify-center h-24">
                <Search className="h-6 w-6 mb-2" />
                <span className="text-xs">Queries</span>
              </Button>
            </div>
            
            <Button className="w-full">Pay All Bills</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
          <CardDescription>Manage your saved payment methods</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="cards">Cards</TabsTrigger>
              <TabsTrigger value="upi">UPI</TabsTrigger>
              <TabsTrigger value="bank">Bank Account</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {paymentMethods.map(method => (
                  <div 
                    key={method.id} 
                    className={`rounded-lg border p-4 relative ${
                      method.default ? "border-primary" : ""
                    }`}
                  >
                    {method.default && (
                      <span className="absolute top-2 right-2 bg-primary text-white text-xs px-1.5 py-0.5 rounded-full">
                        Default
                      </span>
                    )}
                    <div className="flex flex-col items-center space-y-2 pt-3">
                      <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
                        {method.type === "card" ? (
                          <CreditCard className="h-5 w-5 text-slate-600" />
                        ) : method.type === "upi" ? (
                          <Wallet className="h-5 w-5 text-slate-600" />
                        ) : (
                          <DollarSign className="h-5 w-5 text-slate-600" />
                        )}
                      </div>
                      <h3 className="font-medium text-sm">{method.name}</h3>
                      <p className="text-xs text-muted-foreground">{method.details}</p>
                      <div className="flex gap-2 mt-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-xs h-7"
                          onClick={() => {
                            const updatedMethods = paymentMethods.map(m => ({
                              ...m,
                              default: m.id === method.id
                            }));
                            setPaymentMethods(updatedMethods);
                            toast({
                              title: "Default payment method updated",
                              description: `${method.name} is now your default payment method.`
                            });
                          }}
                          disabled={method.default}
                        >
                          Set Default
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-xs h-7 text-red-500 hover:text-red-600"
                          onClick={() => {
                            setPaymentMethods(paymentMethods.filter(m => m.id !== method.id));
                            toast({
                              title: "Payment method removed",
                              description: `${method.name} has been removed from your account.`
                            });
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                <Button 
                  variant="outline" 
                  className="h-auto py-8 flex flex-col items-center justify-center rounded-lg border border-dashed"
                  onClick={() => {
                    toast({
                      title: "Add payment method",
                      description: "This functionality will be available soon."
                    });
                  }}
                >
                  <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center mb-2">
                    <CreditCard className="h-5 w-5 text-slate-600" />
                  </div>
                  <span className="font-medium text-sm">Add new</span>
                  <span className="text-xs text-muted-foreground mt-1">Card, UPI, or Bank</span>
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="cards">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {paymentMethods.filter(m => m.type === "card").map(method => (
                  <div key={method.id} className={`rounded-lg border p-4 relative ${method.default ? "border-primary" : ""}`}>
                    <div className="flex flex-col items-center space-y-2 pt-3">
                      <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-slate-600" />
                      </div>
                      <h3 className="font-medium text-sm">{method.name}</h3>
                      <p className="text-xs text-muted-foreground">{method.details}</p>
                      <div className="flex gap-2 mt-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-xs h-7"
                          onClick={() => {
                            const updatedMethods = paymentMethods.map(m => ({
                              ...m,
                              default: m.id === method.id
                            }));
                            setPaymentMethods(updatedMethods);
                            toast({
                              title: "Default payment method updated",
                              description: `${method.name} is now your default payment method.`
                            });
                          }}
                          disabled={method.default}
                        >
                          Set Default
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-xs h-7 text-red-500 hover:text-red-600"
                          onClick={() => {
                            setPaymentMethods(paymentMethods.filter(m => m.id !== method.id));
                            toast({
                              title: "Payment method removed",
                              description: `${method.name} has been removed from your account.`
                            });
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="upi">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {paymentMethods.filter(m => m.type === "upi").map(method => (
                  <div key={method.id} className={`rounded-lg border p-4 relative ${method.default ? "border-primary" : ""}`}>
                    <div className="flex flex-col items-center space-y-2 pt-3">
                      <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
                        <Wallet className="h-5 w-5 text-slate-600" />
                      </div>
                      <h3 className="font-medium text-sm">{method.name}</h3>
                      <p className="text-xs text-muted-foreground">{method.details}</p>
                      <div className="flex gap-2 mt-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-xs h-7"
                          onClick={() => {
                            const updatedMethods = paymentMethods.map(m => ({
                              ...m,
                              default: m.id === method.id
                            }));
                            setPaymentMethods(updatedMethods);
                            toast({
                              title: "Default payment method updated",
                              description: `${method.name} is now your default payment method.`
                            });
                          }}
                          disabled={method.default}
                        >
                          Set Default
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-xs h-7 text-red-500 hover:text-red-600"
                          onClick={() => {
                            setPaymentMethods(paymentMethods.filter(m => m.id !== method.id));
                            toast({
                              title: "Payment method removed",
                              description: `${method.name} has been removed from your account.`
                            });
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="bank">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {paymentMethods.filter(m => m.type === "bank").map(method => (
                  <div key={method.id} className={`rounded-lg border p-4 relative ${method.default ? "border-primary" : ""}`}>
                    <div className="flex flex-col items-center space-y-2 pt-3">
                      <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-slate-600" />
                      </div>
                      <h3 className="font-medium text-sm">{method.name}</h3>
                      <p className="text-xs text-muted-foreground">{method.details}</p>
                      <div className="flex gap-2 mt-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-xs h-7"
                          onClick={() => {
                            const updatedMethods = paymentMethods.map(m => ({
                              ...m,
                              default: m.id === method.id
                            }));
                            setPaymentMethods(updatedMethods);
                            toast({
                              title: "Default payment method updated",
                              description: `${method.name} is now your default payment method.`
                            });
                          }}
                          disabled={method.default}
                        >
                          Set Default
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-xs h-7 text-red-500 hover:text-red-600"
                          onClick={() => {
                            setPaymentMethods(paymentMethods.filter(m => m.id !== method.id));
                            toast({
                              title: "Payment method removed",
                              description: `${method.name} has been removed from your account.`
                            });
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>Your recent payment transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bills.filter(bill => bill.status === "paid").length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                      No payment history found.
                    </TableCell>
                  </TableRow>
                ) : (
                  bills
                    .filter(bill => bill.status === "paid")
                    .map(bill => (
                      <TableRow key={bill.id}>
                        <TableCell className="font-medium">{bill.type}</TableCell>
                        <TableCell>₹{bill.amount}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            {formatDate(bill.dueDate)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                            HDFC Credit Card
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDownloadInvoice(bill)}
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Invoice
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>

    <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {paymentSuccess 
              ? "Payment Successful" 
              : `Pay Bill - ${selectedBill?.type}`}
          </DialogTitle>
          <DialogDescription>
            {paymentSuccess 
              ? "Your payment has been processed successfully." 
              : "Select a payment method to proceed with your payment."}
          </DialogDescription>
        </DialogHeader>
        
        {paymentSuccess ? (
          <div className="py-6 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-1">Thank You!</h3>
            <p className="text-center text-muted-foreground">
              Payment of ₹{selectedBill?.amount} for {selectedBill?.type} has been completed.
            </p>
          </div>
        ) : (
          <>
            <div className="py-4">
              <div className="flex justify-between mb-4">
                <span>Amount</span>
                <span className="font-semibold">₹{selectedBill?.amount}</span>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-sm font-medium mb-1">Select Payment Method</h4>
                {paymentMethods.map(method => (
                  <div 
                    key={method.id}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      selectedPaymentMethod === method.id ? "border-primary bg-primary/5" : ""
                    } cursor-pointer`}
                    onClick={() => setSelectedPaymentMethod(method.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
                        {method.type === "card" ? (
                          <CreditCard className="h-5 w-5 text-slate-600" />
                        ) : method.type === "upi" ? (
                          <Wallet className="h-5 w-5 text-slate-600" />
                        ) : (
                          <DollarSign className="h-5 w-5 text-slate-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{method.name}</p>
                        <p className="text-xs text-muted-foreground">{method.details}</p>
                      </div>
                    </div>
                    <div className="h-4 w-4 rounded-full border border-primary flex items-center justify-center">
                      {selectedPaymentMethod === method.id && (
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <DialogFooter className="flex-col sm:flex-row sm:justify-end gap-2">
              <Button 
                variant="outline" 
                onClick={() => setPaymentDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                disabled={!selectedPaymentMethod || isPayingBill} 
                onClick={processPayment}
              >
                {isPayingBill ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : `Pay ₹${selectedBill?.amount}`}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Payments;
