import { Eye, Pencil, Trash2 } from "lucide-react";
import { ActionButtonWithTooltip } from "@/components/ui/actionButtonWithTooltip";
import Chair from "@/assets/chair.png"

export const getFurnitureStatusBadge = (status: string) => {
  let cls = "";

  switch (status.toLowerCase()) {
    case "active":
      cls = "bg-green-100 text-green-600 border border-green-200";
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


export const getFurnitureTableColumns = (
  onView?: (row: any) => void,
  onEdit?: (row: any) => void,
  onDelete?: (row: any) => void
) => [
  {
    key: "itemName",
    header: "Item Name",
    render: (row: any) => (
      <div className="flex items-center gap-2">
        <img src={Chair} alt="chair" className="h-3 w-3 object-contain" />
        <span>{row.itemName}</span>
      </div>
    ),
  },

  { key: "category", header: "Category" },
  { key: "itemCode", header: "Item Code" },
  { key: "quantity", header: "Quantity" },
  { key: "purchaseDate", header: "Purchase Date" },
  { key: "unitValue", header: "Unit Value" },
  { key: "location", header: "Location" },
  { key: "condition", header: "Condition" },

  {
    key: "status",
    header: "Status",
    render: (row: any) => getFurnitureStatusBadge(row.status),
  },

  {
    key: "actions",
    header: "Actions",
    render: (row: any) => (
      <div className="flex gap-2">

       { false && <ActionButtonWithTooltip
          icon={<Eye size={18} />}
          tooltip="View"
          onClick={() => onView?.(row)}
          colorClass="h-7 w-7 bg-gray-100 hover:bg-blue-50 hover:text-primary text-primary rounded-md"
        />}

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
          colorClass="h-7 w-7 bg-gray-100 hover:bg-red-50 hover:text-primary text-primary rounded-md"
        />

      </div>
    ),
  },
];
