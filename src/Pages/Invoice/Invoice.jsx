import ReusableTable from "../../Components/CustomTable/Customtable";

const columns = [
  { id: "type", label: "Type" },
  { id: "invoiceNumber", label: "Invoice #" },
  { id: "from", label: "From" },
  { id: "to", label: "To" },
  { id: "generated", label: "Generated" },
  { id: "net", label: "Net" },
  { id: "vat", label: "VAT" },
  { id: "total", label: "Total" },
];

const data = [
  {
    type: "Service",
    invoiceNumber: "INV-001",
    from: "01/10/2025",
    to: "31/10/2025",
    generated: "01/11/2025",
    net: "₹12,000",
    vat: "₹2,160",
    total: "₹14,160",
  },
  {
    type: "Consulting",
    invoiceNumber: "INV-002",
    from: "01/09/2025",
    to: "30/09/2025",
    generated: "01/10/2025",
    net: "₹8,500",
    vat: "₹1,530",
    total: "₹10,030",
  },
  {
    type: "Maintenance",
    invoiceNumber: "INV-003",
    from: "01/08/2025",
    to: "31/08/2025",
    generated: "01/09/2025",
    net: "₹6,000",
    vat: "₹1,080",
    total: "₹7,080",
  },
  {
    type: "Subscription",
    invoiceNumber: "INV-004",
    from: "01/07/2025",
    to: "31/07/2025",
    generated: "01/08/2025",
    net: "₹3,000",
    vat: "₹540",
    total: "₹3,540",
  },
  {
    type: "Support",
    invoiceNumber: "INV-005",
    from: "01/06/2025",
    to: "30/06/2025",
    generated: "01/07/2025",
    net: "₹9,000",
    vat: "₹1,620",
    total: "₹10,620",
  },
];

export default function Invoices() {
  const handleAddInvoice = () => {
    alert("Add new invoice clicked!");
  };

  return (
    <ReusableTable
      title="Invoice List"
      columns={columns}
      data={data}
      onAddClick={handleAddInvoice}
      searchPlaceholder="Search by type, invoice number, or date..."
    />
  );
}
