import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Plus, Trash2, Download, Building, User } from 'lucide-react';

interface InvoiceItem {
  id: number;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface InvoiceData {
  invoiceNumber: string;
  date: string;
  clientName: string;
  clientAddress: string;
  clientGST: string;
  businessName: string;
  businessAddress: string;
  businessGST: string;
  items: InvoiceItem[];
}

const GSTInvoiceGenerator: React.FC = () => {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    invoiceNumber: 'INV-001',
    date: new Date().toISOString().split('T')[0],
    clientName: 'Acme Corp',
    clientAddress: '123 Business Rd, Suite 456, Mumbai, MH 400001',
    clientGST: '27ABCDE1234F1Z5',
    businessName: 'A-Plus Services',
    businessAddress: '789 Tech Park, Innovation Drive, Bengaluru, KA 560001',
    businessGST: '29ABCDE1234F1Z5',
    items: [{ id: 1, description: 'Web Development Services', quantity: 1, rate: 50000, amount: 50000 }]
  });

  const [generatedCount, setGeneratedCount] = useState(0);
  const [showUpgrade, setShowUpgrade] = useState(false);

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now(),
      description: '',
      quantity: 1,
      rate: 0,
      amount: 0
    };
    setInvoiceData(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
  };

  const removeItem = (id: number) => {
    setInvoiceData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
  };

  const updateItem = (id: number, field: keyof InvoiceItem, value: string | number) => {
    setInvoiceData(prev => ({
      ...prev,
      items: prev.items.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          if (field === 'quantity' || field === 'rate') {
            updatedItem.amount = Number(updatedItem.quantity) * Number(updatedItem.rate);
          }
          return updatedItem;
        }
        return item;
      })
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInvoiceData(prev => ({...prev, [name]: value}));
  };

  const calculateTotals = () => {
    const subtotal = invoiceData.items.reduce((sum, item) => sum + item.amount, 0);
    const gst = subtotal * 0.18; // 18% GST
    const total = subtotal + gst;
    return { subtotal, gst, total };
  };

  const generatePDF = () => {
    if (generatedCount >= 3) {
      setShowUpgrade(true);
      return;
    }
    setGeneratedCount(prev => prev + 1);
    alert('Invoice PDF generated successfully! (This is a demo)');
  };

  const { subtotal, gst, total } = calculateTotals();

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-brand-background text-brand-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FileText className="w-8 h-8 text-accent-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-brand-foreground mb-4">GST Invoice Generator</h1>
          <p className="text-xl text-brand-muted max-w-2xl mx-auto">Create and preview professional, GST-compliant invoices instantly.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-brand-card rounded-xl shadow-lg p-8 border border-brand-border">
            <div className="space-y-6">
              {/* Business Info */}
              <div>
                <h3 className="text-lg font-medium text-brand-foreground mb-3 flex items-center"><Building className="w-5 h-5 mr-2 text-accent" />Your Business</h3>
                <input name="businessName" value={invoiceData.businessName} onChange={handleInputChange} placeholder="Business Name" className="w-full p-2 mb-2 bg-brand-background border border-brand-border rounded-md" />
                <textarea name="businessAddress" value={invoiceData.businessAddress} onChange={handleInputChange} placeholder="Business Address" className="w-full p-2 mb-2 bg-brand-background border border-brand-border rounded-md resize-none h-20" />
                <input name="businessGST" value={invoiceData.businessGST} onChange={handleInputChange} placeholder="Business GSTIN" className="w-full p-2 bg-brand-background border border-brand-border rounded-md" />
              </div>
              {/* Client Info */}
              <div>
                <h3 className="text-lg font-medium text-brand-foreground mb-3 flex items-center"><User className="w-5 h-5 mr-2 text-accent" />Client Details</h3>
                <input name="clientName" value={invoiceData.clientName} onChange={handleInputChange} placeholder="Client Name" className="w-full p-2 mb-2 bg-brand-background border border-brand-border rounded-md" />
                <textarea name="clientAddress" value={invoiceData.clientAddress} onChange={handleInputChange} placeholder="Client Address" className="w-full p-2 mb-2 bg-brand-background border border-brand-border rounded-md resize-none h-20" />
                <input name="clientGST" value={invoiceData.clientGST} onChange={handleInputChange} placeholder="Client GSTIN" className="w-full p-2 bg-brand-background border border-brand-border rounded-md" />
              </div>
              {/* Invoice Meta */}
              <div className="flex gap-4">
                <input name="invoiceNumber" value={invoiceData.invoiceNumber} onChange={handleInputChange} placeholder="Invoice #" className="w-1/2 p-2 bg-brand-background border border-brand-border rounded-md" />
                <input name="date" type="date" value={invoiceData.date} onChange={handleInputChange} className="w-1/2 p-2 bg-brand-background border border-brand-border rounded-md" />
              </div>
            </div>
            {/* Items */}
            <div className="mt-6">
              <h3 className="text-lg font-medium text-brand-foreground mb-3">Invoice Items</h3>
              {invoiceData.items.map((item) => (
                <div key={item.id} className="grid grid-cols-12 gap-2 mb-2 items-center">
                  <input type="text" value={item.description} onChange={(e) => updateItem(item.id, 'description', e.target.value)} placeholder="Description" className="col-span-5 p-2 bg-brand-background border border-brand-border rounded-md" />
                  <input type="number" value={item.quantity} onChange={(e) => updateItem(item.id, 'quantity', e.target.value)} placeholder="Qty" className="col-span-2 p-2 bg-brand-background border border-brand-border rounded-md" />
                  <input type="number" value={item.rate} onChange={(e) => updateItem(item.id, 'rate', e.target.value)} placeholder="Rate" className="col-span-3 p-2 bg-brand-background border border-brand-border rounded-md" />
                  <span className="col-span-1 text-center font-mono">₹{item.amount.toFixed(0)}</span>
                  <button onClick={() => removeItem(item.id)} className="col-span-1 text-red-500 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
              <button onClick={addItem} className="mt-2 text-accent hover:underline flex items-center gap-1"><Plus className="w-4 h-4"/>Add Item</button>
            </div>
            <button onClick={generatePDF} className="w-full mt-8 bg-accent text-accent-foreground py-3 rounded-lg hover:bg-accent/90 font-semibold flex items-center justify-center gap-2"><Download className="w-5 h-5" />Generate PDF</button>
            {generatedCount > 0 && <p className="text-center text-sm text-brand-muted mt-2">{generatedCount}/3 free invoices used.</p>}
          </motion.div>

          {/* Preview Section */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="bg-brand-card rounded-xl shadow-lg p-8 border border-brand-border">
            <h2 className="text-2xl font-bold text-center mb-6">Invoice Preview</h2>
            <div className="bg-white p-8 rounded-lg text-black shadow-inner">
              <div className="flex justify-between items-start pb-4 border-b-2 border-gray-200">
                <div>
                  <h3 className="font-bold text-2xl">{invoiceData.businessName || 'Your Business'}</h3>
                  <p className="text-xs text-gray-500 whitespace-pre-line">{invoiceData.businessAddress || 'Your Address'}</p>
                  <p className="text-xs text-gray-500">GSTIN: {invoiceData.businessGST || 'Your GSTIN'}</p>
                </div>
                <h1 className="font-bold text-4xl text-gray-400 uppercase">Invoice</h1>
              </div>
              <div className="flex justify-between pt-4">
                <div>
                  <p className="font-semibold text-sm">Bill To:</p>
                  <p className="font-bold">{invoiceData.clientName || 'Client Name'}</p>
                  <p className="text-xs text-gray-500 whitespace-pre-line">{invoiceData.clientAddress || 'Client Address'}</p>
                  <p className="text-xs text-gray-500">GSTIN: {invoiceData.clientGST || 'Client GSTIN'}</p>
                </div>
                <div className="text-right">
                  <p><span className="font-semibold">Invoice #:</span> {invoiceData.invoiceNumber || 'INV-001'}</p>
                  <p><span className="font-semibold">Date:</span> {invoiceData.date || 'YYYY-MM-DD'}</p>
                </div>
              </div>
              <table className="w-full mt-8">
                <thead>
                  <tr className="bg-gray-100 text-left font-semibold text-sm">
                    <th className="p-2">Description</th><th className="p-2">Qty</th><th className="p-2">Rate</th><th className="p-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceData.items.map(item => (
                    <tr key={item.id} className="border-b border-gray-100">
                      <td className="p-2">{item.description}</td><td>{item.quantity}</td><td>₹{item.rate.toFixed(2)}</td><td className="text-right">₹{item.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-end mt-4">
                <div className="w-64 space-y-1 text-sm">
                  <div className="flex justify-between"><span className="text-gray-600">Subtotal:</span><span>₹{subtotal.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">GST (18%):</span><span>₹{gst.toFixed(2)}</span></div>
                  <div className="flex justify-between font-bold text-base border-t-2 border-gray-200 mt-2 pt-2"><span >Total:</span><span>₹{total.toFixed(2)}</span></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default GSTInvoiceGenerator;
