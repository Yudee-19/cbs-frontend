import { Eye, Pencil, Trash2 } from "lucide-react";
import { ActionButtonWithTooltip } from "@/components/ui/actionButtonWithTooltip";

export const getTicketStatusBadge = (status: string) => {
  let style = "";

  switch (status?.toLowerCase()) {
    case "open":
      style = "bg-blue-100 text-blue-600 border border-blue-200";
      break;

    case "in progress":
      style = "bg-red-100 text-red-600 border border-red-200";
      break;

    case "resolved":
      style = "bg-green-100 text-green-600 border border-green-200";
      break;

    default:
      style = "bg-gray-100 text-gray-600 border border-gray-300";
  }

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${style}`}>
      {status}
    </span>
  );
};

export const getTicketTableColumns = (
  onView?: (item: any) => void,
  onEdit?: (item: any) => void,
  onDelete?: (item: any) => void
) => [
  {
    key: "ticketId",
    header: "Ticket #",
    render: (row: any) => row.ticketId ?? row.id ?? row._id ?? "",
  },
  {
    key: "title",
    header: "Title",
    render: (row: any) => row.title ?? row.ticketTitle ?? "",
  },
  {
    key: "category",
    header: "Category",
    render: (row: any) => row.category ?? "",
  },
  {
    key: "priority",
    header: "Priority",
    render: (row: any) => row.priority ?? "",
  },
  {
    key: "submittedBy",
    header: "Submitted By",
    render: (row: any) => row.submittedBy ?? row.submitted_by ?? "",
  },
  {
    key: "department",
    header: "Department",
    render: (row: any) => row.department ?? "",
  },
  {
    key: "assignedTo",
    header: "Assigned To",
    render: (row: any) => row.assignedTo ?? row.assignTo ?? row.assignee ?? "",
  },
  {
    key: "submittedDate",
    header: "Submitted Date",
    render: (row: any) => row.submittedDate ?? row.createdAt ?? row.created_at ?? "",
  },
  // {
  //   key: "dueDate",
  //   header: "Due Date",
  //   render: (row: any) => row.dueDate ?? row.due_date ?? "",
  // },

  {
    key: "status",
    header: "Status",
    render: (row: any) => getTicketStatusBadge(row.status ?? row.state ?? row.ticketStatus ?? ""),
  },

  {
    key: "actions",
    header: "Actions",
    render: (row: any) => (
      <div className="flex space-x-3">
        { false &&
        <ActionButtonWithTooltip
          icon={<Eye size={18} />}
          tooltip="View Ticket"
          onClick={() => onView?.(row)}
          colorClass="h-7 w-7 bg-gray-100 text-gray-500 hover:bg-blue-50 hover:text-blue-600 rounded-md"
        />}
        <ActionButtonWithTooltip
          icon={<Pencil size={18} />}
          tooltip="Edit Ticket"
          onClick={() => onEdit?.(row)}
          colorClass="h-7 w-7 bg-gray-100 text-gray-500 hover:bg-green-50 hover:text-green-600 rounded-md"
        />
        <ActionButtonWithTooltip
          icon={<Trash2 size={18} />}
          tooltip="Delete Ticket"
          onClick={() => onDelete?.(row)}
          colorClass="h-7 w-7 bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-md"
        />
      </div>
    ),
  },
];
