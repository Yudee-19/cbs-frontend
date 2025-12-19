import { Eye, Download, Pencil, Trash } from "lucide-react";
import { ActionButtonWithTooltip } from "@/components/ui/actionButtonWithTooltip";

export const getLicenseStatusBadge = (status: string) => {
  let classes = "";

  switch (status.toLowerCase()) {
    case "active":
      classes = "bg-green-100 text-green-600 border border-green-200";
      break;

    case "expiring soon":
      classes = "bg-blue-100 text-blue-600 border border-blue-200";
      break;

    case "expired":
      classes = "bg-red-100 text-red-600 border border-red-200";
      break;

    default:
      classes = "bg-gray-100 text-gray-600 border border-gray-200";
  }

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${classes}`}>
      {status}
    </span>
  );
};

export const getLicenseTableColumns = (
  onView?: (row: any) => void,
  onEdit?: (row: any) => void,
  onDownload?: (row: any) => void,
  onDelete?: (row: any) => void
) => [
    {
      key: "name",
      header: "License Name",
    },
    {
      key: "number",
      header: "License Number",
    },
    {
      key: "issueDate",
      header: "Issue Date",
    },
    {
      key: "expiryDate",
      header: "Expiry Date",
    },
    {
      key: "issuingAuthority",
      header: "Issuing Authority",
    },
    {
      key: "status",
      header: "Status",
      render: (row: any) => getLicenseStatusBadge(row.status),
    },
    {
      key: "actions",
      header: "Actions",
      render: (row: any) => (
        <div className="flex gap-2">
          {false && <ActionButtonWithTooltip
            icon={<Eye size={18} />}
            tooltip="View License"
            onClick={() => onView?.(row)}
            colorClass="h-7 w-7 bg-gray-100 hover:bg-blue-50 hover:text-blue-600 rounded-md"
          />
          }
          <ActionButtonWithTooltip
            icon={<Pencil size={18} />}
            tooltip="Edit License"
            onClick={() => onEdit?.(row)}
            colorClass="h-7 w-7 bg-gray-100 hover:bg-blue-50 hover:text-blue-600 rounded-md"
          />
           <ActionButtonWithTooltip
            icon={<Trash size={18} />}
            tooltip="Delete License"
            onClick={() => onDelete?.(row)}
            colorClass="h-7 w-7 bg-gray-100 hover:bg-green-50 hover:text-green-600 rounded-md"
          />
          <ActionButtonWithTooltip
            icon={<Download size={18} />}
            tooltip="Download License"
            onClick={() => onDownload?.(row)}
            colorClass="h-7 w-7 bg-gray-100 hover:bg-green-50 hover:text-green-600 rounded-md"
          />
        </div>
      ),
    },
  ];
