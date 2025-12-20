import { Printer } from "lucide-react";
import { ActionButtonWithTooltip } from "@/components/ui/actionButtonWithTooltip";

export const getPrintStatusBadge = (status: string) => {
  let cls = "";

  switch (status.toLowerCase()) {
    case "printed":
      cls = "bg-green-100 text-green-600 border border-green-200";
      break;
    case "pending":
      cls = "bg-blue-100 text-blue-600 border border-blue-200";
      break;
    case "cancelled":
      cls = "bg-red-100 text-red-600 border border-red-200";
      break;
    default:
      cls = "bg-gray-100 text-gray-600 border border-gray-200";
  }

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${cls}`}>
      {status}
    </span>
  );
};


export const getChequeTableColumns = (
  onPrint?: (row: any) => void,
) => [
  {
    key: "chequeNo",
    header: "Cheque No",
  },

  {
    key: "payee",
    header: "Payee",
  },

  {
    key: "date",
    header: "Date",
  },

  {
    key: "amount",
    header: "Amount",
    render: (row: any) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.amount.primary}</span>
        <span className="text-xs text-gray-500">
          ({row.amount.secondary})
        </span>
      </div>
    ),
  },

  {
    key: "printStatus",
    header: "Print Status",
    render: (row: any) => getPrintStatusBadge(row.printStatus),
  },

  {
    key: "transactionStatus",
    header: "Transaction Status",
    render: (row: any) => (
      <span className="text-sm text-gray-700">
        {row.transactionStatus || "..."}
      </span>
    ),
  },

  {
    key: "actions",
    header: "Action",
    render: (row: any) => (
      <div className="flex gap-2">

        <ActionButtonWithTooltip
          icon={<Printer size={18} />}
          tooltip="Print"
          onClick={() => onPrint?.(row)}
          colorClass="h-7 w-7 text-primary bg-gray-100 hover:text-primary rounded-md"
        />

      </div>
    ),
  },
];
