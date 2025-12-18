import { Eye, Download, Pencil, Trash2 } from "lucide-react";
import { ActionButtonWithTooltip } from "@/components/ui/actionButtonWithTooltip";
import map from "@/assets/map.png"

export const getLandStatusBadge = (status: string) => {
  let cls = "";

  switch (status?.toLowerCase()) {
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
      {status ?? "-"}
    </span>
  );
};

const formatDate = (iso?: string) => (iso ? new Date(iso).toLocaleDateString() : "-");
const formatCurrency = (val?: number | string, cur?: string) =>
  val !== undefined && val !== null ? `${val} ${cur ?? ""}` : "-";

export const getLandBuildingColumns = (
  onView?: (row: any) => void,
  onEdit?: (row: any) => void,
  onDelete?: (row: any) => void,
  onDownload?: (row: any) => void,


) => [
    { key: "propertyName", header: "Property Name" },
    { key: "propertyType", header: "Type" },
    {
      key: "location",
      header: "Location",
      render: (row: any) => (
        <div className="flex items-center gap-1">
          <img src={map} alt="map" className="h-3 w-3 object-contain" />
          <span>{row.location ?? "-"}</span>
        </div>
      ),
    },
    {
      key: "area",
      header: "Area",
      render: (row: any) => `${row.area ?? "-"} ${row.unit ?? ""}`.trim(),
    },
    { key: "propertyUsage", header: "Usage" },
    { key: "numberOfFloors", header: "# Floors" },
    { key: "ownershipType", header: "Ownership" },
    { key: "titleDeedNumber", header: "Title Deed" },
    {
      key: "purchaseDate",
      header: "Purchase Date",
      render: (row: any) => formatDate(row.purchaseDate),
    },
    {
      key: "purchaseValue",
      header: "Purchase Value",
      render: (row: any) => formatCurrency(row.purchaseValue, row.purchaseCurrency),
    },
    {
      key: "currentValue",
      header: "Current Value",
      render: (row: any) => formatCurrency(row.currentValue, row.currentCurrency),
    },
    { key: "annualMaintenanceCost", header: "Annual Maintenance" },
    {
      key: "insuranceExpiryDate",
      header: "Insurance Expiry",
      render: (row: any) => formatDate(row.insuranceExpiryDate),
    },
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
          {false && <ActionButtonWithTooltip
            icon={<Eye size={18} />}
            tooltip="View"
            onClick={() => onView?.(row)}
            colorClass="h-7 w-7 bg-gray-100 hover:bg-blue-50 hover:text-blue-600 rounded-md"
          />
          }
          <ActionButtonWithTooltip
            icon={<Pencil size={18} />}
            tooltip="Edit"
            onClick={() => onEdit?.(row)}
            colorClass="h-7 w-7 bg-gray-100 hover:bg-green-50 hover:text-primary text-primary rounded-md"
          />

          <ActionButtonWithTooltip
            icon={<Trash2 size={18} />}
            tooltip="Delete"
            onClick={() => onDelete?.(row)}
            colorClass="h-7 w-7 bg-gray-100 hover:bg-green-50 hover:text-primary text-primary rounded-md"
          />
          {false && <ActionButtonWithTooltip
            icon={<Download size={18} />}
            tooltip="Download"
            onClick={() => onDownload?.(row)}
            colorClass="h-7 w-7 bg-gray-100 hover:bg-green-50 hover:text-primary text-primary rounded-md"
          />}
        </div>
      ),
    },
  ];
