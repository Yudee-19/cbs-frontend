import { Edit, Save, X } from "lucide-react";
import { ActionButtonWithTooltip } from "@/components/ui/actionButtonWithTooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const getPrintStatusBadge = (status: string) => {
  let cls = "";

  switch (status?.toLowerCase()) {
    case "printed":
      cls = "bg-green-100 text-green-600 border border-green-200";
      break;
    case "pending":
      cls = "bg-blue-100 text-blue-600 border border-blue-200";
      break;
    case "cancelled":
      cls = "bg-red-100 text-red-600 border border-red-200";
      break;
    default:
      cls = "bg-gray-100 text-gray-600 border border-gray-200";
  }

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${cls}`}>
      {status || "Unknown"}
    </span>
  );
};

export const getChequeManagerColumns = (
    onEdit?: (row: any) => void,
    onSave?: (row: any) => void,
    onCancel?: (row: any) => void,
    onPrintStatusChange?: (row: any, value: string) => void,
    onTransactionStatusChange?: (row: any, value: string) => void,
    editingRowId?: string | null
) => [
    {
        key: "chequeNo",
        header: "Cheque No",
        render: (row: any) => (
            <span className="font-medium text-sm text-[#101828]">{row.chequeNo}</span>
        ),
    },
    {
        key: "payee",
        header: "Payee",
        render: (row: any) => (
            <span className="text-sm text-[#101828]">{row.payee}</span>
        ),
    },
    {
        key: "date",
        header: "Date",
        render: (row: any) => (
            <span className="text-sm text-[#101828]">{row.date}</span>
        ),
    },
    {
        key: "amount",
        header: "Amount",
        render: (row: any) => (
            <div className="flex flex-col">
                <span className="font-medium text-sm text-[#101828]">{row.amount.primary}</span>
                <span className="text-xs text-gray-500">{row.amount.secondary}</span>
            </div>
        ),
    },
    {
        key: "printStatus",
        header: "Print Status",
        render: (row: any) => {
            const isEditing = editingRowId === row.id;
            
            if (isEditing) {
                return (
                    <Select
                        value={row.printStatus}
                        onValueChange={(value) => onPrintStatusChange?.(row, value)}
                    >
                        <SelectTrigger className="w-[140px] h-8 border-[rgba(4,70,165,0.6)]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Printed">Printed</SelectItem>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Cancelled">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>
                );
            }
            
            return getPrintStatusBadge(row.printStatus);
        },
    },
    {
        key: "transactionStatus",
        header: "Transaction Status",
        render: (row: any) => {
            const isEditing = editingRowId === row.id;
            
            if (isEditing) {
                return (
                    <Select
                        value={row.transactionStatus || "none"}
                        onValueChange={(value) => onTransactionStatusChange?.(row, value === "none" ? "" : value)}
                    >
                        <SelectTrigger className="w-[160px] h-8 border border-[rgba(4,70,165,0.6)]">
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Handed Over">Handed Over</SelectItem>
                            <SelectItem value="Credited">Credited</SelectItem>
                            <SelectItem value="Debited">Debited</SelectItem>
                        </SelectContent>
                    </Select>
                );
            }
            
            return (
                <span className="text-sm text-gray-700">
                    {row.transactionStatus || "..."}
                </span>
            );
        },
    },
    {
        key: "actions",
        header: "Action",
        render: (row: any) => {
            const isEditing = editingRowId === row.id;
            
            if (isEditing) {
                return (
                    <div className="flex gap-2">
                        <ActionButtonWithTooltip
                            icon={<Save size={18} />}
                            tooltip="Save"
                            onClick={() => onSave?.(row)}
                            colorClass="h-7 w-7 text-green-600 bg-green-50 hover:bg-green-100 rounded-md"
                        />
                        <ActionButtonWithTooltip
                            icon={<X size={18} />}
                            tooltip="Cancel"
                            onClick={() => onCancel?.(row)}
                            colorClass="h-7 w-7 text-red-600 bg-red-50 hover:bg-red-100 rounded-md"
                        />
                    </div>
                );
            }
            
            return (
                <div 
                    className="flex gap-2"
                    onClick={() => onEdit?.(row)}
                >
                    <ActionButtonWithTooltip
                        icon={<Edit size={18} />}
                        tooltip="Edit"
                        colorClass="h-7 w-7 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md"
                    />
                    <span className="text-sm text-blue-600 py-1 font-medium">Edit</span>
                </div>
            );
        },
    },
];
