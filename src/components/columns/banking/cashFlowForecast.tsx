import BadgePill from "@/components/ui/BadgePill";

export type ForecastEntry = {
  id: string;
  date: string;
  type: "Inflow" | "Outflow";
  category: string;
  description: string;
  amount: {
    primary: string;
    secondary: string;
  };
  bankAccount: string;
  status: "Planned" | "Confirmed";
};

export const getForecastColumns = () => [
  {
    key: "date",
    header: "Date",
    render: (row: ForecastEntry) => (
      <span className="text-sm text-gray-900">{row.date}</span>
    ),
  },
  {
    key: "type",
    header: "Type",
    render: (row: ForecastEntry) => (
      <span
        className={`text-sm font-medium ${
          row.type === "Inflow" ? "text-green-600" : "text-red-600"
        }`}
      >
        {row.type}
      </span>
    ),
  },
  {
    key: "category",
    header: "Category",
    render: (row: ForecastEntry) => (
      <span className="text-sm text-gray-900">{row.category}</span>
    ),
  },
  {
    key: "description",
    header: "Description",
    render: (row: ForecastEntry) => (
      <span className="text-sm text-gray-900">{row.description}</span>
    ),
  },
  {
    key: "amount",
    header: "Amount",
    render: (row: ForecastEntry) => (
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-900">{row.amount.primary}</span>
        <span className="text-xs text-gray-500">({row.amount.secondary})</span>
      </div>
    ),
  },
  {
    key: "bankAccount",
    header: "Bank Account",
    render: (row: ForecastEntry) => (
      <span className="text-sm text-gray-900">{row.bankAccount}</span>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (row: ForecastEntry) => (
      <BadgePill className="px-5 py-2" color={row.status === "Confirmed" ? "green" : "gray"}>
        {row.status}
      </BadgePill>
    ),
  },
];
