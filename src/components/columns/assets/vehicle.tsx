import { Eye, Pencil, Trash2 } from "lucide-react";
import { ActionButtonWithTooltip } from "@/components/ui/actionButtonWithTooltip";

export const getVehicleStatusBadge = (status: string) => {
  let cls = "";

  switch (status.toLowerCase()) {
    case "active":
      cls = "bg-green-100 text-green-600 border border-green-200";
      break;
    case "under maintenance":
      cls = "bg-blue-100 text-blue-600 border border-blue-200";
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


export const getVehicleTableColumns = (
  onView?: (row: any) => void,
  onEdit?: (row: any) => void,
  onDelete?: (row: any) => void
) => [
  {
    key: "vehicleName",
    header: "Vehicle Name",
    render: (row: any) => (
      <div className="flex items-center gap-2">
        🚗
        <span>{row.vehicleName}</span>
      </div>
    ),
  },

  { key: "type", header: "Type" },
  { key: "plateNumber", header: "Plate Number" },
  { key: "modelYear", header: "Model Year" },
  { key: "purchaseDate", header: "Purchase Date" },
  { key: "purchaseValue", header: "Purchase Value" },
  { key: "currentValue", header: "Current Value" },
  { key: "assignedTo", header: "Assigned To" },

  {
    key: "status",
    header: "Status",
    render: (row: any) => getVehicleStatusBadge(row.status),
  },

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
