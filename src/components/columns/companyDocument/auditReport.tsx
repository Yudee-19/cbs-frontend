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
    render: (row: any) => row?.name ?? "-",
  },
  {
    key: "auditType",
    header: "Audit Type",
    render: (row: any) => row?.type ?? "-",
  },
  {
    key: "auditPeriod",
    header: "Audit Period",
    render: (row: any) =>
      row?.periodStart && row?.periodEnd
        ? `${new Date(row.periodStart).toLocaleDateString()} — ${new Date(
            row.periodEnd
          ).toLocaleDateString()}`
        : "-",
  },
  {
    key: "auditor",
    header: "Auditor",
    render: (row: any) => row?.auditor ?? "-",
  },
  {
    key: "completionDate",
    header: "Completion Date",
    render: (row: any) =>
      row?.completionDate ? new Date(row.completionDate).toLocaleDateString() : "-",
  },
  {
    key: "status",
    header: "Status",
    render: (row: any) => getAuditStatusBadge(row?.status ?? "-"),
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
          colorClass="h-7 w-7 p-0 bg-gray-100 text-primary hover:bg-blue-50 hover:text-primary rounded-md"
        />
        <ActionButtonWithTooltip
          icon={<Download size={18} />}
          tooltip={row?.hasFile ? "Download Report" : "No file available"}
          onClick={() => row?.hasFile && onDownload?.(row)}
          colorClass={`h-7 w-7 p-0 ${
            row?.hasFile
              ? "bg-gray-100 text-primary hover:bg-green-50 hover:text-green-600"
              : "bg-gray-50 text-muted-foreground cursor-not-allowed"
          } rounded-md`}
        />
      </div>
    ),
  },
];
