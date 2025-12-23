import { ActionButtonWithTooltip } from "@/components/ui/actionButtonWithTooltip";
import { Edit, Trash2 } from "lucide-react";

export const getBankAccountColumns = (
  onEdit: (item: any) => void,
  onDelete: (item: any) => void
) => [
  {
    key: "bankName",
    header: "Bank Name",
    render: (row: any) => (
      <div className="font-medium text-sm">{row.bankName || "-"}</div>
    ),
  },
  {
    key: "accountHolder",
    header: "Account Holder",
    render: (row: any) => (
      <div className="text-sm">{row.accountHolder || "-"}</div>
    ),
  },
  {
    key: "accountNumber",
    header: "Account Number",
    render: (row: any) => (
      <div className="text-sm font-mono">{row.accountNumber || "-"}</div>
    ),
  },
  {
    key: "currency",
    header: "Currency",
    render: (row: any) => (
      <div className="text-sm font-medium">{row.currency || "-"}</div>
    ),
  },
  {
    key: "template",
    header: "Template",
    render: (row: any) => (
      <div className="text-sm">{row.template || "No Template"}</div>
    ),
  },
  {
    key: "actions",
    header: "Actions",
    render: (row: any) => (
      <div className="flex items-center gap-1">
        <ActionButtonWithTooltip
          icon={<Edit size={18} />}
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
