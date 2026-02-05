import React, { useState, useEffect } from "react";
import { Button, Form, Input, Select, Table, Space, Typography, Divider } from "antd";
import { PrinterOutlined, PlusOutlined } from "@ant-design/icons";
import { Card, CardHeader, CardContent } from "../../components/card";

const { Title } = Typography;
const { Option } = Select;

const Referrals = () => {
  const [referrals, setReferrals] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    const storedReferrals = JSON.parse(sessionStorage.getItem("referrals")) || [];
    setReferrals(storedReferrals);
  }, []);

  const handleAddReferral = (values) => {
    const newReferral = {
      id: Date.now(),
      ...values,
      date: new Date().toLocaleDateString(),
    };
    const updatedReferrals = [...referrals, newReferral];
    setReferrals(updatedReferrals);
    sessionStorage.setItem("referrals", JSON.stringify(updatedReferrals));
    form.resetFields();
  };

  const handlePrint = (record) => {
    const printableWindow = window.open("", "PRINT", "height=600,width=800");
    printableWindow.document.write(`<html><head><title>Referral</title></head><body>`);
    printableWindow.document.write(`<h2>Referral Form</h2>`);
    printableWindow.document.write(`<p><strong>Patient Name:</strong> ${record.patientName}</p>`);
    printableWindow.document.write(`<p><strong>Referred To:</strong> ${record.referredTo}</p>`);
    printableWindow.document.write(`<p><strong>Reason:</strong> ${record.reason}</p>`);
    printableWindow.document.write(`<p><strong>Doctor:</strong> ${record.doctor}</p>`);
    printableWindow.document.write(`<p><strong>Date:</strong> ${record.date}</p>`);
    printableWindow.document.write(`</body></html>`);
    printableWindow.document.close();
    printableWindow.focus();
    printableWindow.print();
    printableWindow.close();
  };

  const columns = [
    { title: "Patient Name", dataIndex: "patientName", key: "patientName" },
    { title: "Referred To", dataIndex: "referredTo", key: "referredTo" },
    { title: "Reason", dataIndex: "reason", key: "reason" },
    { title: "Doctor", dataIndex: "doctor", key: "doctor" },
    { title: "Date", dataIndex: "date", key: "date" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="link" icon={<PrinterOutlined />} onClick={() => handlePrint(record)}>
          Print
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <div className="shadow-sm p-4 bg-white rounded">
      <Title level={3}>Referrals</Title>

      <Divider orientation="left">New Referral</Divider>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleAddReferral}
        style={{ maxWidth: 600 }}
      >
        <Form.Item name="patientName" label="Patient Name" rules={[{ required: true }]}>
          <Input placeholder="e.g. Pope Leo XIV" />
        </Form.Item>

        <Form.Item name="referredTo" label="Referred To (Facility/Doctor)" rules={[{ required: true }]}>
          <Input placeholder="e.g. Nairobi Hospital - Dr. Kelvin" />
        </Form.Item>

        <Form.Item name="reason" label="Reason for Referral" rules={[{ required: true }]}>
          <Input.TextArea rows={3} placeholder="Include symptoms, suspicion, etc." />
        </Form.Item>

        <Form.Item name="doctor" label="Attending Doctor" rules={[{ required: true }]}>
          <Input placeholder="e.g. Dr. Katumo" />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
              Add Referral
            </Button>
            <Button onClick={() => form.resetFields()}>Reset</Button>
          </Space>
        </Form.Item>
      </Form>

      <Divider orientation="left">Referral History</Divider>

      <Table
        columns={columns}
        dataSource={referrals}
        rowKey="id"
        pagination={{ pageSize: 4 }}
        scroll={{ x: true }}
      />
      {/* <Divider orientation="left">Referral Summary</Divider>

      <Card>
        <CardHeader>
          <Title level={4}>Referral Summary</Title>
        </CardHeader>
        <CardContent>
          <p><strong>Total Referrals:</strong> {referrals.length}</p>
          {referrals.length > 0 ? (
            <>
              <p><strong>Latest Referral:</strong></p>
              <p>Patient: {referrals[referrals.length - 1].patientName}</p>
              <p>Referred To: {referrals[referrals.length - 1].referredTo}</p>
              <p>Reason: {referrals[referrals.length - 1].reason}</p>
              <p>Doctor: {referrals[referrals.length - 1].doctor}</p>
              <p>Date: {referrals[referrals.length - 1].date}</p>
            </>
          ) : (
            <p>No referrals yet.</p>
          )}
        </CardContent>
      </Card> */}
     </div>
    </div>
  );
};

export default Referrals;
