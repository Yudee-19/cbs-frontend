import { Eye, Pencil, Trash2 } from "lucide-react";
import { ActionButtonWithTooltip } from "@/components/ui/actionButtonWithTooltip";

export const getTransferStatusBadge = (status: string) => {
  let cls = "";

  switch (String(status).toLowerCase()) {
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
  {
    key: "transferId",
    header: "Transfer ID",
    render: (row: any) => row.id ?? row._id ?? row.transferId ?? "",
  },

  {
    key: "hardware",
    header: "Hardware",
    render: (row: any) => (
      <div className="flex flex-col leading-tight">
        <span className="font-medium">{row.hardwareName ?? row.hardware ?? ""}</span>
        {/* optional second line: show transferType or empty */}
        <span className="text-xs text-gray-500">{row.transferType ?? ""}</span>
      </div>
    ),
  },

  {
    key: "serialNumber",
    header: "Serial Number",
    render: (row: any) => row.serialNumber ?? "",
  },

  {
    key: "fromPerson",
    header: "From",
    render: (row: any) => {
      const from = row.fromUser ?? row.fromPerson ?? "";
      const [name, dept] = String(from).split(" - ").map((s) => s?.trim());
      return (
        <div className="flex flex-col">
          <span>{name ?? from}</span>
          <span className="text-xs text-gray-500">{dept ?? row.fromDept ?? ""}</span>
        </div>
      );
    },
  },

  {
    key: "toPerson",
    header: "To",
    render: (row: any) => {
      const to = row.toUser ?? row.toPerson ?? "";
      const [name, dept] = String(to).split(" - ").map((s) => s?.trim());
      return (
        <div className="flex flex-col">
          <span>{name ?? to}</span>
          <span className="text-xs text-gray-500">{dept ?? row.toDept ?? ""}</span>
        </div>
      );
    },
  },

  {
    key: "transferDate",
    header: "Transfer Date",
    render: (row: any) => {
      const d = row.transferDate ?? row.createdAt ?? "";
      return d ? new Date(d).toLocaleDateString() : "";
    },
  },
  {
    key: "returnDate",
    header: "Return Date",
    render: (row: any) => {
      const d = row.expectedReturnDate ?? row.returnDate ?? "";
      return d ? new Date(d).toLocaleDateString() : "";
    },
  },
  {
    key: "condition",
    header: "Condition",
    render: (row: any) => row.hardwareCondition ?? row.condition ?? "",
  },

  {
    key: "status",
    header: "Status",
    render: (row: any) => getTransferStatusBadge(row.status ?? ""),
  },

  {
    key: "reason",
    header: "Reason",
    render: (row: any) => row.transferReason ?? row.reason ?? "",
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
          colorClass="h-7 w-7 bg-gray-100 hover:bg-blue-50 hover:text-blue-600 rounded-md"
        />}

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
