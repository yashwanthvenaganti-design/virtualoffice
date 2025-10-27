import ReusableTable from "../../Components/CustomTable/Customtable";

const columns = [
  { id: "statusName", label: "Status Name" },
  { id: "availability", label: "Availability" },
  { id: "tel", label: "Tel No" },
  { id: "email", label: "E-mail" },
  { id: "sms", label: "SMS" },
];

const data = [
  {
    statusName: "Available - Office",
    availability: "Available",
    tel: "555-111-2222",
    email: "office.status@company.com",
    sms: "Yes",
  },
  {
    statusName: "In a Meeting",
    availability: "Busy",
    tel: "555-333-4444",
    email: "meeting.status@company.com",
    sms: "No",
  },
  {
    statusName: "On Leave",
    availability: "Unavailable",
    tel: "555-555-6666",
    email: "leave.status@company.com",
    sms: "Yes",
  },
  {
    statusName: "Working from Home",
    availability: "Available",
    tel: "555-777-8888",
    email: "remote.status@company.com",
    sms: "Yes",
  },
  {
    statusName: "Do Not Disturb",
    availability: "Busy",
    tel: "555-999-0000",
    email: "dnd.status@company.com",
    sms: "No",
  },
  {
    statusName: "Training Session",
    availability: "Partially Available",
    tel: "555-121-2121",
    email: "training.status@company.com",
    sms: "No",
  },
  {
    statusName: "Traveling",
    availability: "Unavailable",
    tel: "555-343-5656",
    email: "travel.status@company.com",
    sms: "Yes",
  },
];

export default function AvailableStatus() {
  const handleAddStatus = () => {
    alert("Add new status clicked!");
  };

  return (
    <ReusableTable
      title="Availability statuses"
      columns={columns}
      data={data}
      onAddClick={handleAddStatus}
      searchPlaceholder="Search by status name, email, or availability..."
    />
  );
}
