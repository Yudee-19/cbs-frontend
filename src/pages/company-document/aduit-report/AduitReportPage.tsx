import { useMemo, useState } from "react";
import TablePagination from "@/components/ui/tablePagination";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AduitReportTable from "./AduitReportTable";

const AduitReportPage = () => {
const auditReportsDummy = [
  {
    id: 1,
    auditName: "Annual Financial Audit 2024",
    auditType: "Financial Audit",
    auditPeriod: "2024-01-01 to 2024-12-31",
    auditor: "Ernst & Young",
    completionDate: "2025-01-15",
    status: "Completed",
  },
  {
    id: 2,
    auditName: "Internal Control Audit Q4 2024",
    auditType: "Internal Audit",
    auditPeriod: "2024-10-01 to 2024-12-31",
    auditor: "Internal Audit Team",
    completionDate: "2025-01-05",
    status: "Completed",
  },
  {
    id: 3,
    auditName: "ISO Compliance Audit 2025",
    auditType: "Compliance Audit",
    auditPeriod: "2025-02-01 to 2025-02-15",
    auditor: "SGS Kuwait",
    completionDate: "2025-02-28",
    status: "In Progress",
  },
  {
    id: 4,
    auditName: "Tax Audit 2024",
    auditType: "Tax Audit",
    auditPeriod: "2024-01-01 to 2024-12-31",
    auditor: "Kuwait Tax Authority",
    completionDate: "2025-03-15",
    status: "Scheduled",
  },

  // Repeated (like screenshot)
  {
    id: 5,
    auditName: "Annual Financial Audit 2024",
    auditType: "Financial Audit",
    auditPeriod: "2024-01-01 to 2024-12-31",
    auditor: "Ernst & Young",
    completionDate: "2025-01-15",
    status: "Completed",
  },
  {
    id: 6,
    auditName: "Internal Control Audit Q4 2024",
    auditType: "Internal Audit",
    auditPeriod: "2024-10-01 to 2024-12-31",
    auditor: "Internal Audit Team",
    completionDate: "2025-01-05",
    status: "Completed",
  },
  {
    id: 7,
    auditName: "ISO Compliance Audit 2025",
    auditType: "Compliance Audit",
    auditPeriod: "2025-02-01 to 2025-02-15",
    auditor: "SGS Kuwait",
    completionDate: "2025-02-28",
    status: "In Progress",
  },
  {
    id: 8,
    auditName: "Tax Audit 2024",
    auditType: "Tax Audit",
    auditPeriod: "2024-01-01 to 2024-12-31",
    auditor: "Kuwait Tax Authority",
    completionDate: "2025-03-15",
    status: "Scheduled",
  },
  {
    id: 9,
    auditName: "Annual Financial Audit 2024",
    auditType: "Financial Audit",
    auditPeriod: "2024-01-01 to 2024-12-31",
    auditor: "Ernst & Young",
    completionDate: "2025-01-15",
    status: "Completed",
  },
  {
    id: 10,
    auditName: "Internal Control Audit Q4 2024",
    auditType: "Internal Audit",
    auditPeriod: "2024-10-01 to 2024-12-31",
    auditor: "Internal Audit Team",
    completionDate: "2025-01-05",
    status: "Completed",
  },
];



  const total = auditReportsDummy.length;
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);

  const paginatedAuditReports = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return auditReportsDummy.slice(start, start + rowsPerPage);
  }, [page, rowsPerPage, auditReportsDummy]);

 return (
    <div className="p-0 h-full flex flex-col">
      <Card className="shadow-sm flex flex-col h-full bg-white overflow-hidden">

        {/* ---------- Sticky Header ---------- */}
        <CardHeader className="bg-white sticky top-0 z-20 ">
          <div className="flex items-center justify-between w-full gap-2">
            <h1 className="text-xl font-semibold">Audit Reports</h1>
            <Button
              size="sm"
              variant="default"
              className="h-8 px-3 flex items-center gap-2"
              onClick={() => {
                // TODO: open Add Hardware modal / navigate to add page
              }}
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Audit Reports</span>
            </Button>
          </div>
        </CardHeader>

        {/* ---------- Scrollable Table Content ---------- */}
        <CardContent className="flex-1 overflow-y-auto px-4">
          <AduitReportTable
            auditReports={paginatedAuditReports}
            onViewDetails={(item: any) => console.log("🟦 View:", item)}
            // onEdit={(item: any) => console.log("🟩 Edit:", item)}
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

export default AduitReportPage;
