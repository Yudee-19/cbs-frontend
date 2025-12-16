import { Eye, Pencil, Trash2 } from "lucide-react";
import { ActionButtonWithTooltip } from "@/components/ui/actionButtonWithTooltip";


export const getSimStatusBadge = (status: string) => {
  let style = "";

  switch (status?.toLowerCase()) {
    case "active":
      style = "bg-green-100 text-green-600 border border-green-200";
      break;

    case "inactive":
      style = "bg-blue-100 text-primary border border-blue-200";
      break;

    case "suspended":
      style = "bg-red-100 text-red-600 border border-red-200";
      break;

    default:
      style = "bg-gray-100 text-gray-600 border border-gray-200";
  }

  return (
    <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${style}`}>
      {status}
    </span>
  );
};


export const getSimTableColumns = (
  onView?: (row: any) => void,
  onEdit?: (row: any) => void,
  onDelete?: (row: any) => void
) => [
  { key: "simNumber", header: "SIM Number" },
  { key: "phoneNumber", header: "Phone Number" },
  { key: "carrier", header: "Carrier" },
  { key: "planType", header: "Plan Type" },
  { key: "monthlyFee", header: "Monthly Fee" ,
     render: (row: any) => (
      <div className="flex flex-col leading-tight">
        <span className="text-black font-medium">{row.monthlyFee}</span>
        {/* optional second line: show transferType or empty */}
        <span className="text-xs text-gray-500">(KWD)</span>
      </div>
    ),
  },
  { key: "extraCharges", header: "Extra Charges" ,
         render: (row: any) => (
      <div className="flex flex-col leading-tight">
        <span className="text-black font-medium">{row.extraCharges}</span>
        {/* optional second line: show transferType or empty */}
        <span className="text-xs text-gray-500">(KWD)</span>
      </div>
    ),
  },
  { key: "simCharges", header: "SIM Charges" , render: (row: any) => (
      <div className="flex flex-col leading-tight">
        <span className="text-black font-medium">{row.simCharges}</span>
        {/* optional second line: show transferType or empty */}
        <span className="text-xs text-gray-500">(KWD)</span>
      </div>
    ),},
  { key: "totalCharges", header: "Total Charges",
     render: (row: any) => (
      <div className="flex flex-col leading-tight">
        <span className="text-black font-medium">{row.simCharges + row.extraCharges + row.monthlyFee}</span>
        {/* optional second line: show transferType or empty */}
        <span className="text-xs text-gray-500">(KWD)</span>
      </div>
    ),
   },
  { key: "dataLimit", header: "Data Limit" },
  { key: "assignedTo", header: "Assigned To" },
  { key: "department", header: "Department" },
  { key: "expiryDate", header: "Expiry Date" },

  {
    key: "status",
    header: "Status",
    render: (row: any) => getSimStatusBadge(row.status),
  },

  {
    key: "actions",
    header: "Actions",
    render: (row: any) => (
      <div className="flex space-x-3 cursor-pointer">
        { false && <ActionButtonWithTooltip
          icon={<Eye size={18} />}
          tooltip="View SIM"
          onClick={() => onView?.(row)}
          colorClass="h-7 w-7 bg-gray-100 text-gray-500 hover:bg-blue-50 hover:text-blue-600 rounded-md"
        />}

        <ActionButtonWithTooltip
          icon={<Pencil size={18} />}
          tooltip="Edit SIM"
          onClick={() => onEdit?.(row)}
          colorClass="h-7 w-7 bg-gray-100 text-primary hover:bg-green-50 hover:text-primary rounded-md"
        />

        <ActionButtonWithTooltip
          icon={<Trash2 size={18} />}
          tooltip="Delete SIM"
          onClick={() => onDelete?.(row)}
          colorClass="h-7 w-7 bg-gray-100 text-primary hover:bg-red-50 hover:text-primary rounded-md"
        />
      </div>
    ),
  },
];
