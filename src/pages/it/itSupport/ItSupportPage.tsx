import { useMemo, useState } from "react";
import ItSolutionTable from "./ItSupportTable";
import TablePagination from "@/components/ui/tablePagination";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const HardwarePage = () => {
 const dummyTickets = [
  {
    id: 1,
    ticketId: "IT-2024-001",
    title: "Email Not Receiving",
    category: "Email",
    priority: "High",
    submittedBy: "John Smith",
    department: "Finance",
    assignedTo: "Mark Wilson",
    submittedDate: "2024-11-10",
    dueDate: "2024-11-12",
    status: "In Progress",
  },
  {
    id: 2,
    ticketId: "IT-2024-002",
    title: "Printer Offline",
    category: "Hardware",
    priority: "Medium",
    submittedBy: "Sarah Johnson",
    department: "HR",
    assignedTo: "James Chen",
    submittedDate: "2024-11-10",
    dueDate: "2024-11-13",
    status: "Open",
  },
  {
    id: 3,
    ticketId: "IT-2024-003",
    title: "VPN Connection Failed",
    category: "Network",
    priority: "Critical",
    submittedBy: "Robert Lee",
    department: "Sales",
    assignedTo: "Mark Wilson",
    submittedDate: "2024-11-09",
    dueDate: "2024-11-11",
    status: "In Progress",
  },
  {
    id: 4,
    ticketId: "IT-2024-005",
    title: "Laptop Screen Flickering",
    category: "Hardware",
    priority: "High",
    submittedBy: "Michael Brown",
    department: "Operations",
    assignedTo: "James Chen",
    submittedDate: "2024-11-08",
    dueDate: "2024-11-10",
    status: "Resolved",
  },
  {
    id: 5,
    ticketId: "IT-2024-004",
    title: "Software Installation Request",
    category: "Software",
    priority: "Low",
    submittedBy: "Emily Davis",
    department: "Marketing",
    assignedTo: "Unassigned",
    submittedDate: "2024-11-11",
    dueDate: "2024-11-14",
    status: "Open",
  },

  // -------- Duplicate entries like screenshot --------
  {
    id: 6,
    ticketId: "IT-2024-005",
    title: "Laptop Screen Flickering",
    category: "Hardware",
    priority: "High",
    submittedBy: "Michael Brown",
    department: "Operations",
    assignedTo: "James Chen",
    submittedDate: "2024-11-08",
    dueDate: "2024-11-10",
    status: "Resolved",
  },
  {
    id: 7,
    ticketId: "IT-2024-006",
    title: "Access Request to Shared Drive",
    category: "Access Control",
    priority: "Medium",
    submittedBy: "Lisa Anderson",
    department: "Finance",
    assignedTo: "Mark Wilson",
    submittedDate: "2024-11-11",
    dueDate: "2024-11-13",
    status: "Open",
  },
  {
    id: 8,
    ticketId: "IT-2024-001",
    title: "Email Not Receiving",
    category: "Email",
    priority: "High",
    submittedBy: "John Smith",
    department: "Finance",
    assignedTo: "Mark Wilson",
    submittedDate: "2024-11-10",
    dueDate: "2024-11-12",
    status: "In Progress",
  },
  {
    id: 9,
    ticketId: "IT-2024-002",
    title: "Printer Offline",
    category: "Hardware",
    priority: "Medium",
    submittedBy: "Sarah Johnson",
    department: "HR",
    assignedTo: "James Chen",
    submittedDate: "2024-11-10",
    dueDate: "2024-11-13",
    status: "Open",
  },
  {
    id: 10,
    ticketId: "IT-2024-005",
    title: "Laptop Screen Flickering",
    category: "Hardware",
    priority: "High",
    submittedBy: "Michael Brown",
    department: "Operations",
    assignedTo: "James Chen",
    submittedDate: "2024-11-08",
    dueDate: "2024-11-10",
    status: "Resolved",
  },
];



  const total = dummyTickets.length;
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);

  const paginatedTickets = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return dummyTickets.slice(start, start + rowsPerPage);
  }, [page, rowsPerPage, dummyTickets]);

 return (
    <div className="p-0 h-full flex flex-col">
      <Card className="shadow-sm flex flex-col h-full bg-white overflow-hidden">

        {/* ---------- Sticky Header ---------- */}
        <CardHeader className="bg-white sticky top-0 z-20 ">
          <div className="flex items-center justify-between w-full gap-2">
            <h1 className="text-xl font-semibold">IT Support</h1>
            <Button
              size="sm"
              variant="default"
              className="h-8 px-3 flex items-center gap-2"
              onClick={() => {
                // TODO: open Add Hardware modal / navigate to add page
              }}
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Ticket</span>
            </Button>
          </div>
        </CardHeader>

        {/* ---------- Scrollable Table Content ---------- */}
        <CardContent className="flex-1 overflow-y-auto px-4">
          <ItSolutionTable
            tickets={paginatedTickets}
            onViewDetails={(item: any) => console.log("🟦 View:", item)}
            onEdit={(item: any) => console.log("🟩 Edit:", item)}
            onDelete={(item: any) => console.log("🟥 Delete:", item)}
          />
        </CardContent>

        {/* ---------- Sticky Pagination At Bottom ---------- */}
        <div className="border-t bg-white sticky bottom-0 z-20 px-2">
          <TablePagination
            total={total}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={(p: number) => setPage(p)}
            onRowsPerPageChange={(r: number) => {
              setRowsPerPage(r);
              setPage(1);
            }}
          />
        </div>
      </Card>
    </div>
  );
};

export default HardwarePage;
