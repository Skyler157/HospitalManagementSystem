import React from 'react';
import { Card, CardContent } from '../../components/card';
import { Button } from '../../components/button';

export default function InvoiceView({ invoice, onBack }) {
  if (!invoice) return null;

  return (
    <Card>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Invoice #{invoice.number}</h2>
          <Button onClick={onBack}>Back</Button>
        </div>
        <div>
          <p><strong>Patient:</strong> {invoice.patient}</p>
          <p><strong>Date:</strong> {invoice.date}</p>
          <p><strong>Status:</strong> {invoice.status}</p>
          <p><strong>Total Amount:</strong> {invoice.amount}</p>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold mb-2">Services</h3>
          <ul className="list-disc list-inside space-y-1">
            {invoice.services.map((service, index) => (
              <li key={index}>
                {service.name} - KES {service.fee}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
