import { Eye, Download, FileText } from "lucide-react";
import { ActionButtonWithTooltip } from "@/components/ui/actionButtonWithTooltip";

export const getDocumentStatusBadge = (status: string) => {
  let classes = "";

  switch (status.toLowerCase()) {
    case "active":
      classes = "bg-green-100 text-green-600 border border-green-200";
      break;

    case "archived":
      classes = "bg-blue-100 text-blue-600 border border-blue-200";
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

export const getLegalDocumentColumns = (
  onView?: (row: any) => void,
  onDownload?: (row: any) => void
) => [
  {
    key: "name",
    header: "Document Name",
    render: (row: any) => (
      <div className="flex items-center gap-2">
        <FileText size={18} className="text-gray-600" />
        <span>{row.name}</span>
      </div>
    ),
  },
  {
    key: "category",
    header: "Category",
    render: (row: any) => row?.category ?? "-",
  },
  {
    key: "documentDate",
    header: "Document Date",
    render: (row: any) =>
      row?.documentDate ? new Date(row.documentDate).toLocaleDateString() : "-",
  },
  {
    key: "partiesInvolved",
    header: "Parties Involved",
    render: (row: any) => row?.partiesInvolved ?? "-",
  },
  {
    key: "updatedAt",
    header: "Uploaded By",
    render: (row: any) => row?.updatedAt ?? "-",
  },
  {
    key: "status",
    header: "Status",
    render: (row: any) => getDocumentStatusBadge(row.status),
  },
  {
    key: "actions",
    header: "Actions",
    render: (row: any) => (
      <div className="flex items-center gap-2">
        <ActionButtonWithTooltip
          icon={<Eye size={18} />}
          tooltip="View Document"
          onClick={() => onView?.(row)}
          colorClass="h-7 w-7 bg-gray-100 hover:bg-blue-50 hover:text-blue-600 rounded-md"
        />

        <ActionButtonWithTooltip
          icon={<Download size={18} />}
          tooltip={row?.hasFile ? "Download Document" : "No file available"}
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
