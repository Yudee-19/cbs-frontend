import { Eye, Pencil, Trash2 } from "lucide-react";
import { ActionButtonWithTooltip } from "@/components/ui/actionButtonWithTooltip";
import Car from "@/assets/car.png"

const formatDate = (iso?: string) => (iso ? new Date(iso).toLocaleDateString() : "-");
const formatCurrency = (val?: number | string, cur?: string) =>
  val !== undefined && val !== null ? `${val} ${cur ?? ""}` : "-";

export const getVehicleStatusBadge = (status: string) => {
  let cls = "";

  switch ((status ?? "").toLowerCase()) {
    case "active":
      cls = "bg-green-100 text-green-600 border border-green-200";
      break;
    case "under maintenance":
    case "maintenance":
      cls = "bg-blue-100 text-blue-600 border border-blue-200";
      break;
    default:
      cls = "bg-gray-100 text-gray-600 border border-gray-200";
  }

  return <span className={`px-3 py-1 rounded-full text-xs font-medium ${cls}`}>{status ?? "-"}</span>;
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
        <img src={Car} alt="car" className="h-3 w-3 object-contain" />
        <span>{row.vehicleName ?? "-"}</span>
      </div>
    ),
  },

  { key: "vehicleType", header: "Type", render: (r: any) => r.vehicleType ?? "-" },
  { key: "vehicleModel", header: "Model", render: (r: any) => r.vehicleModel ?? "-" },
  { key: "year", header: "Year", render: (r: any) => (r.year ?? "-") },
  { key: "plateNumber", header: "Plate Number", render: (r: any) => r.plateNumber ?? "-" },
  { key: "purchaseDate", header: "Purchase Date", render: (r: any) => formatDate(r.purchaseDate) },
  {
    key: "purchaseValue",
    header: "Purchase Value",
    render: (r: any) => formatCurrency(r.purchaseValue, r.purchaseCurrency),
  },
  {
    key: "currentValue",
    header: "Current Value",
    render: (r: any) => formatCurrency(r.currentValue, r.currentCurrency),
  },
  { key: "assignedTo", header: "Assigned To", render: (r: any) => r.assignedTo ?? "-" },
  { key: "department", header: "Department", render: (r: any) => r.department ?? "-" },

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
        { false &&<ActionButtonWithTooltip
          icon={<Eye size={18} />}
          tooltip="View"
          onClick={() => onView?.(row)}
          colorClass="h-7 w-7 bg-gray-100 hover:bg-blue-50 hover:text-primary text-primary rounded-md"
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
          colorClass="h-7 w-7 bg-gray-100 hover:bg-red-50 hover:text-primary text-primary-primaryrounded-md"
        />
      </div>
    ),
  },
];
