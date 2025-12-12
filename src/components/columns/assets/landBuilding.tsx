import { Eye, Download } from "lucide-react";
import { ActionButtonWithTooltip } from "@/components/ui/actionButtonWithTooltip";

export const getLandStatusBadge = (status: string) => {
  let cls = "";

  switch (status.toLowerCase()) {
    case "active":
      cls = "bg-green-100 text-green-600 border border-green-200";
      break;
    case "inactive":
      cls = "bg-gray-100 text-gray-600 border border-gray-200";
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


export const getLandBuildingColumns = (
  onView?: (row: any) => void,
  onDownload?: (row: any) => void
) => [
  { key: "propertyName", header: "Property Name" },
  { key: "type", header: "Type" },

  {
    key: "location",
    header: "Location",
    render: (row: any) => (
      <div className="flex items-center gap-1">
        <span className="text-gray-500">📍</span>
        <span>{row.location}</span>
      </div>
    ),
  },

  { key: "area", header: "Area" },
  { key: "purchaseDate", header: "Purchase Date" },
  { key: "purchaseValue", header: "Purchase Value" },
  { key: "currentValue", header: "Current Value" },

  {
    key: "status",
    header: "Status",
    render: (row: any) => getLandStatusBadge(row.status),
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
          icon={<Download size={18} />}
          tooltip="Download"
          onClick={() => onDownload?.(row)}
          colorClass="h-7 w-7 bg-gray-100 hover:bg-green-50 hover:text-green-600 rounded-md"
        />

      </div>
    ),
  },
];
