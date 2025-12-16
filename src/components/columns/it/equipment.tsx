import { Eye, Pencil, Trash2 } from "lucide-react";
import { ActionButtonWithTooltip } from "@/components/ui/actionButtonWithTooltip";
import type { NetworkEquipmentData } from "@/services/itServices/NetworkEquipmentServices";

const fmtDate = (iso?: string) =>
  iso ? new Date(iso).toLocaleDateString() : '';


export const getNetworkStatusBadge = (status: string) => {
  let style = "";

  switch (status?.toLowerCase()) {
    case "online":
      style = "bg-green-100 text-green-600 border border-green-200";
      break;
    case "offline":
      style = "bg-red-100 text-red-600 border border-red-200";
      break;
    default:
      style = "bg-gray-100 text-gray-600 border border-gray-200";
  }

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${style}`}
    >
      {status}
    </span>
  );
};


export const getNetworkEquipmentColumns = (
  onView?: (item: any) => void,
  onEdit?: (item: any) => void,
  onDelete?: (item: any) => void
) => [
  { key: "equipmentName", header: "Equipment Name" },
  { key: "equipmentType", header: "Type" },
  { key: "ipAddress", header: "IP Address" },
  { key: "macAddress", header: "MAC Address" },
  { key: "serialNumber", header: "Serial Number" },
  { key: "numberOfPorts", header: "Ports" },
  { key: "location", header: "Location" },
  { key: "firmwareVersion", header: "Firmware" },
  {key:'warrantyExpiry', header: "Warranty Expiry",
    render: (row: NetworkEquipmentData) => fmtDate(row.warrantyExpiry),
  },
  {key:'purchaseDate', header: "Purchase Date",
    render: (row: NetworkEquipmentData) => fmtDate(row.purchaseDate),
  },

  {
    key: "status",
    header: "Status",
    render: (row: any) => getNetworkStatusBadge(row.status),
  },

  {
    key: "actions",
    header: "Actions",
    render: (row: any) => (
      <div className="flex space-x-3">
        {false && <ActionButtonWithTooltip
          icon={<Eye size={18} />}
          tooltip="View"
          onClick={() => onView?.(row)}
          colorClass="h-7 w-7 bg-gray-100 text-gray-500 hover:bg-blue-50 hover:text-blue-600 rounded-md"
        />}
        <ActionButtonWithTooltip
          icon={<Pencil size={18} />}
          tooltip="Edit"
          onClick={() => onEdit?.(row)}
          colorClass="h-7 w-7 bg-gray-100 text-gray-500 hover:bg-green-50 hover:text-green-600 rounded-md"
        />
        <ActionButtonWithTooltip
          icon={<Trash2 size={18} />}
          tooltip="Delete"
          onClick={() => onDelete?.(row)}
          colorClass="h-7 w-7 bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-md"
        />
      </div>
    ),
  },
];
