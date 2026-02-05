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
import { Modal } from "../../components/Modal";
import  NHIFClaimSection  from "./NHIFClaimSection";
import Payments from "./Payments";
import { useState } from "react";

export default function BillingDashboard() {
  const [tab, setTab] = useState("invoices");

  const invoices = [
    {
      number: "#INV-101",
      patient: "Jane Mwangi",
      amount: "KES 3,500",
      status: "Pending",
      date: "2025-05-15",
    },
    {
      number: "#INV-102",
      patient: "John Kamau",
      amount: "KES 1,800",
      status: "Paid",
      date: "2025-05-14",
    },
  ];

  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Billing & Finance</h1>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="nhif">NHIF Claims</TabsTrigger>
          <TabsTrigger value="mpesa">Payments</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="invoices">
          <Card>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <Input placeholder="Search by Patient, ID or Visit #" />
                <Button>New Invoice</Button>
              </div>

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Invoice #</TableCell>
                    <TableCell>Patient</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {invoices.map((inv, i) => (
                    <tr key={i} className="border-t">
                      <TableCell>{inv.number}</TableCell>
                      <TableCell>{inv.patient}</TableCell>
                      <TableCell>{inv.amount}</TableCell>
                      <TableCell
                        className={
                          inv.status === "Paid"
                            ? "text-green-600"
                            : "text-yellow-500"
                        }
                      >
                        {inv.status}
                      </TableCell>
                      <TableCell>{inv.date}</TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          onClick={() => handleViewInvoice(inv)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </tr>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nhif">
          <Card>
            <CardContent>
              <p className="font-medium mb-2">NHIF Claims</p>
              {/* <p>Upload and manage claims submitted to NHIF.</p> */}

              <NHIFClaimSection />
              {/* <Button className="mt-4">Upload Claim File</Button> */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mpesa">
          <Card>
            <CardContent>
              <p className="font-medium mb-2">Payments</p>
              {/* <p>Manage payments and transactions.</p> */}

              <Payments />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardContent className="space-y-2">
              <p className="font-medium">Finance Reports</p>
              <Button>Download Daily Revenue Report</Button>
              <Button variant="outline">Download MOH Report</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Invoice Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedInvoice && (
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">Invoice Details</h2>
            <p>
              <strong>Invoice #:</strong> {selectedInvoice.number}
            </p>
            <p>
              <strong>Patient:</strong> {selectedInvoice.patient}
            </p>
            <p>
              <strong>Amount:</strong> {selectedInvoice.amount}
            </p>
            <p>
              <strong>Status:</strong> {selectedInvoice.status}
            </p>
            <p>
              <strong>Date:</strong> {selectedInvoice.date}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}
