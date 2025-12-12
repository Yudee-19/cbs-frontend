import { Eye, Pencil, Trash2 } from "lucide-react";
import { ActionButtonWithTooltip } from "@/components/ui/actionButtonWithTooltip";

export const getTransferStatusBadge = (status: string) => {
  let cls = "";

  switch (status.toLowerCase()) {
    case "active":
      cls = "bg-blue-100 text-blue-600 border border-blue-200";
      break;
    case "returned":
      cls = "bg-green-100 text-green-600 border border-green-200";
      break;
    case "permanent transfer":
      cls = "bg-gray-100 text-gray-600 border border-gray-200";
      break;
    case "pending":
      cls = "bg-red-100 text-red-600 border border-red-200";
      break;
    default:
      cls = "bg-gray-100 text-gray-500 border border-gray-200";
  }

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${cls}`}>
      {status}
    </span>
  );
};


export const getHardwareTransferColumns = (
  onView?: (row: any) => void,
  onEdit?: (row: any) => void,
  onDelete?: (row: any) => void
) => [
  { key: "transferId", header: "Transfer ID" },

  {
    key: "hardware",
    header: "Hardware",
    render: (row: any) => (
      <div className="flex flex-col leading-tight">
        <span className="font-medium">{row.hardware}</span>
        <span className="text-xs text-gray-500">{row.hardwareType}</span>
      </div>
    ),
  },

  { key: "serialNumber", header: "Serial Number" },

  {
    key: "fromPerson",
    header: "From",
    render: (row: any) => (
      <div className="flex flex-col">
        <span>{row.fromPerson}</span>
        <span className="text-xs text-gray-500">{row.fromDept}</span>
      </div>
    ),
  },

  {
    key: "toPerson",
    header: "To",
    render: (row: any) => (
      <div className="flex flex-col">
        <span>{row.toPerson}</span>
        <span className="text-xs text-gray-500">{row.toDept}</span>
      </div>
    ),
  },

  { key: "transferDate", header: "Transfer Date" },
  { key: "returnDate", header: "Return Date" },
  { key: "condition", header: "Condition" },

  {
    key: "status",
    header: "Status",
    render: (row: any) => getTransferStatusBadge(row.status),
  },

  { key: "reason", header: "Reason" },

  {
    key: "actions",
    header: "Actions",
    render: (row: any) => (
      <div className="flex gap-2">
        <ActionButtonWithTooltip
          icon={<Eye size={18} />}
          tooltip="View"
          onClick={() => onView?.(row)}
          colorClass="h-7 w-7 bg-gray-100 hover:bg-blue-50 hover:text-blue-600 rounded-md"
        />

        <ActionButtonWithTooltip
          icon={<Pencil size={18} />}
          tooltip="Edit"
          onClick={() => onEdit?.(row)}
          colorClass="h-7 w-7 bg-gray-100 hover:bg-green-50 hover:text-green-600 rounded-md"
        />

        <ActionButtonWithTooltip
          icon={<Trash2 size={18} />}
          tooltip="Delete"
          onClick={() => onDelete?.(row)}
          colorClass="h-7 w-7 bg-gray-100 hover:bg-red-50 hover:text-red-600 rounded-md"
        />
      </div>
    ),
  },
];
