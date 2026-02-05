import { useState, useEffect } from "react";
import { Card, CardContent } from "../../components/card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../components/tabs";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "../../components/table";


export default function PaymentTransactionsTable() {
  // Sample transaction data - in a real app this would come from an API
  const initialTransactions = [
    { id: "MP201001", amount: 1000, method: "M-Pesa", status: "Completed", date: "2025-05-15" },
    { id: "MP201002", amount: 5000, method: "M-Pesa", status: "Completed", date: "2025-05-14" },
    { id: "CS201003", amount: 3500, method: "Cash", status: "Completed", date: "2025-05-13" },
    { id: "MP201004", amount: 2000, method: "M-Pesa", status: "Failed", date: "2025-05-13" },
    { id: "CS201005", amount: 1200, method: "Cash", status: "Completed", date: "2025-05-12" },
    { id: "MP201006", amount: 8000, method: "M-Pesa", status: "Pending", date: "2025-05-12" },
    { id: "MP201007", amount: 700, method: "M-Pesa", status: "Completed", date: "2025-05-11" },
    { id: "CS201008", amount: 2500, method: "Cash", status: "Completed", date: "2025-05-10" },
  ];

  const [transactions, setTransactions] = useState(initialTransactions);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMethod, setFilterMethod] = useState("all");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [tab, setTab] = useState("all");

  // Filter transactions based on search term, payment method, and date range
  useEffect(() => {
    let filtered = initialTransactions;

    // Filter by search term (transaction ID)
    if (searchTerm) {
      filtered = filtered.filter(tx => 
        tx.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by payment method
    if (filterMethod !== "all") {
      filtered = filtered.filter(tx => tx.method === filterMethod);
    }

    // Filter by date range
    if (dateRange.start) {
      filtered = filtered.filter(tx => tx.date >= dateRange.start);
    }
    if (dateRange.end) {
      filtered = filtered.filter(tx => tx.date <= dateRange.end);
    }

    setTransactions(filtered);
  }, [searchTerm, filterMethod, dateRange]);

  // Format currency
  const formatCurrency = (amount) => {
    return `KES ${amount.toLocaleString()}`;
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "text-green-600";
      case "Pending":
        return "text-yellow-600";
      case "Failed":
        return "text-red-600";
      default:
        return "";
    }
  };

  return (
    
<Tabs value={tab} onValueChange={setTab}>
      <TabsList className="mb-4">
        <TabsTrigger value="all">All Payments</TabsTrigger>
        <TabsTrigger value="mpesa">M-Pesa</TabsTrigger>
        <TabsTrigger value="cash">Cash</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all">
        <Card>
          <CardContent className="space-y-4">
            <p className="font-medium">All Payments</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search transactions */}
              <div>
                <Input
                  type="text"
                  placeholder="Search by transaction #"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Date range filter */}
              <div className="flex space-x-2">
                <Input
                  type="date"
                  className="w-full"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                />
                <span className="self-center">to</span>
                <Input
                  type="date"
                  className="w-full"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                />
              </div>
              
              <Button 
                onClick={() => {
                  setSearchTerm("");
                  setDateRange({ start: "", end: "" });
                  setFilterMethod("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
            
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Transaction #</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Method</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.length > 0 ? (
                  transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">{transaction.id}</TableCell>
                      <TableCell>{formatCurrency(transaction.amount)}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          transaction.method === "M-Pesa" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                        }`}>
                          {transaction.method}
                        </span>
                      </TableCell>
                      <TableCell className={getStatusColor(transaction.status)}>
                        {transaction.status}
                      </TableCell>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" className="mr-2">
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          Receipt
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-gray-500">
                      No transactions found matching your criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            
            {/* Transaction Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-gray-500">Total Transactions</div>
                  <div className="text-2xl font-bold">{transactions.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-gray-500">Total Amount</div>
                  <div className="text-2xl font-bold">
                    {formatCurrency(transactions.reduce((sum, tx) => sum + tx.amount, 0))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-gray-500">Payment Methods</div>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span className="text-sm">M-Pesa: {transactions.filter(tx => tx.method === "M-Pesa").length}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                      <span className="text-sm">Cash: {transactions.filter(tx => tx.method === "Cash").length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="mpesa">
        <Card>
          <CardContent className="space-y-4">
            <p className="font-medium">M-Pesa Payments</p>
            <Input 
              placeholder="Search transactions" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Transaction #</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions
                  .filter(tx => tx.method === "M-Pesa")
                  .map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">{transaction.id}</TableCell>
                      <TableCell>{formatCurrency(transaction.amount)}</TableCell>
                      <TableCell className={getStatusColor(transaction.status)}>
                        {transaction.status}
                      </TableCell>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" className="mr-2">
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          Receipt
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="cash">
        <Card>
          <CardContent className="space-y-4">
            <p className="font-medium">Cash Payments</p>
            <Input 
              placeholder="Search transactions" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Transaction #</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions
                  .filter(tx => tx.method === "Cash")
                  .map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">{transaction.id}</TableCell>
                      <TableCell>{formatCurrency(transaction.amount)}</TableCell>
                      <TableCell className={getStatusColor(transaction.status)}>
                        {transaction.status}
                      </TableCell>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" className="mr-2">
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          Receipt
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}