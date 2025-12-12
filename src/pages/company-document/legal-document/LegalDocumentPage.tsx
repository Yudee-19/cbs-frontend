import { useMemo, useState } from "react";
import TablePagination from "@/components/ui/tablePagination";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import LegalDocumentTable from "./LegalDocumentTable";

const LegalDocumentPage = () => {
const legalDocumentsDummy = [
  {
    id: 1,
    documentName: "Master Service Agreement",
    category: "Contract",
    documentDate: "2025-01-15",
    partiesInvolved: "CWG-ITS & ABC Corp",
    uploadedBy: "Legal Dept",
    status: "Active",
  },
  {
    id: 2,
    documentName: "Vendor Agreement 2024",
    category: "Contract",
    documentDate: "2024-03-20",
    partiesInvolved: "CWG-ITS & XYZ Supplies",
    uploadedBy: "Procurement",
    status: "Archived",
  },
  {
    id: 3,
    documentName: "Non-Disclosure Agreement Template",
    category: "Template",
    documentDate: "2024-12-01",
    partiesInvolved: "Standard Template",
    uploadedBy: "Legal Dept",
    status: "Active",
  },
  {
    id: 4,
    documentName: "Vendor Agreement 2024",
    category: "Contract",
    documentDate: "2024-03-20",
    partiesInvolved: "CWG-ITS & XYZ Supplies",
    uploadedBy: "Procurement",
    status: "Archived",
  },
  {
    id: 5,
    documentName: "Employment Agreement Template",
    category: "Template",
    documentDate: "2024-11-15",
    partiesInvolved: "CWG-ITS & Employees",
    uploadedBy: "HR",
    status: "Active",
  },

  // Repeated entries like screenshot
  {
    id: 6,
    documentName: "Vendor Agreement 2024",
    category: "Contract",
    documentDate: "2024-03-20",
    partiesInvolved: "CWG-ITS & XYZ Supplies",
    uploadedBy: "Procurement",
    status: "Archived",
  },
  {
    id: 7,
    documentName: "Employment Agreement Template",
    category: "Template",
    documentDate: "2024-11-15",
    partiesInvolved: "CWG-ITS & Employees",
    uploadedBy: "HR",
    status: "Active",
  },
  {
    id: 8,
    documentName: "Vendor Agreement 2024",
    category: "Contract",
    documentDate: "2024-03-20",
    partiesInvolved: "CWG-ITS & XYZ Supplies",
    uploadedBy: "Procurement",
    status: "Archived",
  },
  {
    id: 9,
    documentName: "Employment Agreement Template",
    category: "Template",
    documentDate: "2024-11-15",
    partiesInvolved: "CWG-ITS & Employees",
    uploadedBy: "HR",
    status: "Active",
  },
  {
    id: 10,
    documentName: "Vendor Agreement 2024",
    category: "Contract",
    documentDate: "2024-03-20",
    partiesInvolved: "CWG-ITS & XYZ Supplies",
    uploadedBy: "Procurement",
    status: "Archived",
  },
];


  const total = legalDocumentsDummy.length;
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);

  const paginatedLegalDocuments = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return legalDocumentsDummy.slice(start, start + rowsPerPage);
  }, [page, rowsPerPage, legalDocumentsDummy]);

 return (
    <div className="p-0 h-full flex flex-col">
      <Card className="shadow-sm flex flex-col h-full bg-white overflow-hidden">

        {/* ---------- Sticky Header ---------- */}
        <CardHeader className="bg-white sticky top-0 z-20 ">
          <div className="flex items-center justify-between w-full gap-2">
            <h1 className="text-xl font-semibold">Legal Documents</h1>
            <Button
              size="sm"
              variant="default"
              className="h-8 px-3 flex items-center gap-2"
              onClick={() => {
                // TODO: open Add Hardware modal / navigate to add page
              }}
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Legal Documents</span>
            </Button>
          </div>
        </CardHeader>

        {/* ---------- Scrollable Table Content ---------- */}
        <CardContent className="flex-1 overflow-y-auto px-4">
          <LegalDocumentTable
            legalDocuments={paginatedLegalDocuments}
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

export default LegalDocumentPage;
