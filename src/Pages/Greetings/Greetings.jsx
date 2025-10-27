import ReusableTable from "../../Components/CustomTable/Customtable";

const columns = [
  { id: "profileName", label: "Profile Name" },
  { id: "greeting", label: "Greeting" },
  { id: "timeGreeting", label: "Good Morn/Aft/Eve" },
];

const data = [
  {
    profileName: "Standard Greeting",
    greeting: "Hello! How can I assist you today?",
    timeGreeting: "Good Morning",
  },
  {
    profileName: "Friendly Greeting",
    greeting: "Hey there! Hope you’re having a great day.",
    timeGreeting: "Good Afternoon",
  },
  {
    profileName: "Formal Greeting",
    greeting: "Good evening, this is the support desk. How may I help you?",
    timeGreeting: "Good Evening",
  },
  {
    profileName: "Short Greeting",
    greeting: "Hi, how can I help?",
    timeGreeting: "Good Morning",
  },
  {
    profileName: "Warm Greeting",
    greeting: "Good afternoon! It’s a pleasure to speak with you.",
    timeGreeting: "Good Afternoon",
  },
  {
    profileName: "Casual Greeting",
    greeting: "Hey! What’s up? How can I help out?",
    timeGreeting: "Good Evening",
  },
];

export default function GreetingProfiles() {
  const handleAddGreeting = () => {
    alert("Add new greeting profile clicked!");
  };

  return (
    <ReusableTable
      title="Greeting Profiles"
      columns={columns}
      data={data}
      onAddClick={handleAddGreeting}
      searchPlaceholder="Search by profile name or greeting..."
    />
  );
}
