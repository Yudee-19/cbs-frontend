import { ActionButtonWithTooltip } from "@/components/ui/actionButtonWithTooltip";
import { Edit, Trash2, Eye } from "lucide-react";

export interface PayeeData {
  _id?: string;
  id?: string;
  name: string;
  company?: string;
  category?: string;
  phone?: string;
  email?: string;
}

export const getPayeeColumns = (
  onViewDetails: (item: any) => void,
  onEdit: (item: any) => void,
  onDelete: (item: any) => void
) => [
  {
    key: "name",
    header: "Name",
    render: (row: any) => (
      <div className="font-medium text-sm">{row.name || "-"}</div>
    ),
  },
  {
    key: "company",
    header: "Company",
    render: (row: any) => (
      <div className="text-sm">{row.company || "-"}</div>
    ),
  },
  {
    key: "category",
    header: "Category",
    render: (row: any) => (
      <div className="text-sm">{row.category || "-"}</div>
    ),
  },
  {
    key: "phone",
    header: "Phone",
    render: (row: any) => (
      <div className="text-sm">{row.phone || "-"}</div>
    ),
  },
  {
    key: "email",
    header: "Email",
    render: (row: any) => (
      <div className="text-sm">{row.email || "-"}</div>
    ),
  },
  {
    key: "actions",
    header: "Actions",
    render: (row: any) => (
      <div className="flex items-center gap-1">
        <ActionButtonWithTooltip
          icon={<Eye size={18} />}
          tooltip="View"
          onClick={() => onViewDetails?.(row)}
          colorClass="h-7 w-7 bg-gray-100 hover:bg-blue-50 hover:text-primary text-primary rounded-md"
        />
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
