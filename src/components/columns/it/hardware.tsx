import { Eye, Pencil, Trash2 } from "lucide-react";
import { ActionButtonWithTooltip } from "../../ui/actionButtonWithTooltip";

export const getStatusBadge = (status: string) => {
  let colorClass = "";
  let text = status;

  switch (status?.toLowerCase()) {
    case "active":
      colorClass =
        "bg-green-100 text-green-600 border border-green-200";
      break;

    case "under repair":
      colorClass =
        "bg-blue-100 text-blue-600 border border-blue-200";
      break;

    case "inactive":
      colorClass =
        "bg-gray-100 text-gray-600 border border-gray-200";
      break;

    default:
      colorClass =
        "bg-gray-100 text-gray-600 border border-gray-200";
      text = status || "Unknown";
  }

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${colorClass}`}
    >
      {text}
    </span>
  );
};


export const getHardwareTableColumns = (
  onViewDetails?: (item: any) => void,
  onEdit?: (item: any) => void,
  onDelete?: (item: any) => void
) => [
  {
    key: "deviceName",
    header: "Device Name",
  },
  {
    key: "type",
    header: "Type",
  },
  {
    key: "serialNumber",
    header: "Serial Number",
  },
  {
    key: "processor",
    header: "Processor",
  },
  {
    key: "ram",
    header: "RAM",
  },
  {
    key: "storage",
    header: "Storage",
  },
  {
    key: "warrantyExpiry",
    header: "Warranty Expiry",
  },
  {
    key: "assignedTo",
    header: "Assigned To",
  },
  {
    key: "department",
    header: "Department",
  },
  {
    key: "status",
    header: "Status",
    render: (row: any) => getStatusBadge(row.status),
  },
  {
    key: "actions",
    header: "Actions",
    render: (row: any) => (
      <div className="flex space-x-3 cursor-pointer">
        <ActionButtonWithTooltip
          icon={<Eye size={18} />}
          tooltip="View Details"
          onClick={() => onViewDetails?.(row)}
          colorClass="h-7 w-7 p-0 bg-gray-100 text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors rounded-md"
        />
        <ActionButtonWithTooltip
          icon={<Pencil size={18} />}
          tooltip="Edit Asset"
          onClick={() => onEdit?.(row)}
          colorClass="h-7 w-7 p-0 bg-gray-100 text-gray-500 hover:text-green-600 hover:bg-green-50 transition-colors rounded-md"
        />
        <ActionButtonWithTooltip
          icon={<Trash2 size={18} />}
          tooltip="Delete Asset"
          onClick={() => onDelete?.(row)}
          colorClass="h-7 w-7 p-0 bg-gray-100 text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors rounded-md"
        />
      </div>
    ),
  },
];
