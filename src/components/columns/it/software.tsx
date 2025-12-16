import { Eye, Pencil, Trash2 } from "lucide-react";
import { ActionButtonWithTooltip } from "@/components/ui/actionButtonWithTooltip";

// Status Badge (supports Active + Expiring Soon)
export const getStatusBadge = (status: string) => {
  let colorClass = "";
  let text = status;

  switch (status?.toLowerCase()) {
    case "active":
      colorClass = "bg-green-100 text-green-600 border border-green-200";
      break;

    case "expiring soon":
      colorClass = "bg-blue-100 text-primary border border-blue-300";
      break;

    case "expired":
      colorClass = "bg-red-100 text-red-600 border border-red-200";
      break;

    default:
      colorClass = "bg-gray-100 text-gray-600 border border-gray-200";
      text = status || "Unknown";
  }

  return (
    <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${colorClass}`}>
      {text}
    </span>
  );
};

const formatDate = (iso?: string) => (iso ? new Date(iso).toLocaleDateString() : "-");

export const getSoftwareTableColumns = (
  onViewDetails?: (item: any) => void,
  onEdit?: (item: any) => void,
  onDelete?: (item: any) => void
) => [
  { key: "name", header: "Software Name" },
  { key: "vendor", header: "Vendor" },
  { key: "licenseType", header: "License Type" },
  { key: "licenseKey", header: "License Key" },
  { key: "totalSeats", header: "Seats" },
  { key: "seatsUsed", header: "Used" },
  {
    key: "purchaseDate",
    header: "Purchase Date",
    render: (row: any) => formatDate(row.purchaseDate),
  },
  {
    key: "expiryDate",
    header: "Expiry Date",
    render: (row: any) => formatDate(row.expiryDate),
  },
  { key: "renewalCost", header: "Renewal Cost" },
  { key: "assignedDepartment", header: "Department" },
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
        { false && <ActionButtonWithTooltip
          icon={<Eye size={18} />}
          tooltip="View Details"
          onClick={() => onViewDetails?.(row)}
          colorClass="h-7 w-7 p-0 bg-gray-100 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md"
        />}
        <ActionButtonWithTooltip
          icon={<Pencil size={18} />}
          tooltip="Edit"
          onClick={() => onEdit?.(row)}
          colorClass="h-7 w-7 p-0 bg-gray-100 text-primary hover:text-primary hover:bg-green-50 rounded-md"
        />
        <ActionButtonWithTooltip
          icon={<Trash2 size={18} />}
          tooltip="Delete"
          onClick={() => onDelete?.(row)}
          colorClass="h-7 w-7 p-0 bg-gray-100 text-primary hover:text-primary hover:bg-red-50 rounded-md"
        />
      </div>
    ),
  },
];
