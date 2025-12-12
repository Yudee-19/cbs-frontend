import { Eye, Download } from "lucide-react";
import { ActionButtonWithTooltip } from "@/components/ui/actionButtonWithTooltip";

export const getAuditStatusBadge = (status: string) => {
  let classes = "";

  switch (status.toLowerCase()) {
    case "completed":
      classes = "bg-green-100 text-green-600 border border-green-200";
      break;
    case "in progress":
      classes = "bg-blue-100 text-blue-600 border border-blue-200";
      break;
    case "scheduled":
      classes = "bg-red-100 text-red-600 border border-red-200";
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


export const getAuditReportColumns = (
  onView?: (row: any) => void,
  onDownload?: (row: any) => void
) => [
  {
    key: "auditName",
    header: "Audit Name",
  },
  {
    key: "auditType",
    header: "Audit Type",
  },
  {
    key: "auditPeriod",
    header: "Audit Period",
  },
  {
    key: "auditor",
    header: "Auditor",
  },
  {
    key: "completionDate",
    header: "Completion Date",
  },
  {
    key: "status",
    header: "Status",
    render: (row: any) => getAuditStatusBadge(row.status),
  },
  {
    key: "actions",
    header: "Actions",
    render: (row: any) => (
      <div className="flex items-center gap-2">
        <ActionButtonWithTooltip
          icon={<Eye size={18} />}
          tooltip="View Audit Report"
          onClick={() => onView?.(row)}
          colorClass="h-7 w-7 p-0 bg-gray-100 hover:bg-blue-50 hover:text-blue-600 rounded-md"
        />
        <ActionButtonWithTooltip
          icon={<Download size={18} />}
          tooltip="Download Report"
          onClick={() => onDownload?.(row)}
          colorClass="h-7 w-7 p-0 bg-gray-100 hover:bg-green-50 hover:text-green-600 rounded-md"
        />
      </div>
    ),
  },
];
