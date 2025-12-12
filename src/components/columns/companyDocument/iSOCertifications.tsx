import { Eye, Download } from "lucide-react";
import { ActionButtonWithTooltip } from "@/components/ui/actionButtonWithTooltip";
export const getISOStatusBadge = (status: string) => {
  let classes = "";

  switch (status.toLowerCase()) {
    case "active":
      classes = "bg-green-100 text-green-600 border border-green-200";
      break;
    case "expiring soon":
      classes = "bg-blue-100 text-blue-600 border border-blue-200";
      break;
    default:
      classes = "bg-gray-100 text-gray-600 border border-gray-200";
  }

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${classes}`}
    >
      {status}
    </span>
  );
};


export const getISOColumns = (
  onView?: (row: any) => void,
  onDownload?: (row: any) => void
) => [
  {
    key: "certificateName",
    header: "Certificate Name",
  },
  {
    key: "isoStandard",
    header: "ISO Standard",
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
    key: "certifyingBody",
    header: "Certifying Body",
  },
  {
    key: "status",
    header: "Status",
    render: (row: any) => getISOStatusBadge(row.status),
  },
  {
    key: "actions",
    header: "Actions",
    render: (row: any) => (
      <div className="flex items-center gap-2">
        <ActionButtonWithTooltip
          icon={<Eye size={18} />}
          tooltip="View Certificate"
          onClick={() => onView?.(row)}
          colorClass="h-7 w-7 p-0 bg-gray-100 hover:bg-blue-50 hover:text-blue-600 rounded-md"
        />
        <ActionButtonWithTooltip
          icon={<Download size={18} />}
          tooltip="Download Certificate"
          onClick={() => onDownload?.(row)}
          colorClass="h-7 w-7 p-0 bg-gray-100 hover:bg-green-50 hover:text-green-600 rounded-md"
        />
      </div>
    ),
  },
];
