import { useMemo, useState } from "react";
import TablePagination from "@/components/ui/tablePagination";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import LicenseTable from "./LicenseTable";

const LicensePage = () => {
const licenseDummyData = [
  {
    id: 1,
    licenseName: "Business License 2025",
    licenseNumber: "BL-2025-001234",
    issueDate: "2025-01-01",
    expiryDate: "2025-12-31",
    issuingAuthority: "Ministry of Commerce",
    status: "Active",
  },
  {
    id: 2,
    licenseName: "Tax Registration Certificate",
    licenseNumber: "TAX-KW-567890",
    issueDate: "2024-07-01",
    expiryDate: "2025-06-30",
    issuingAuthority: "Kuwait Tax Authority",
    status: "Expiring Soon",
  },
  {
    id: 3,
    licenseName: "Import License",
    licenseNumber: "IMP-2024-987654",
    issueDate: "2024-01-15",
    expiryDate: "2024-12-31",
    issuingAuthority: "Customs Department",
    status: "Expired",
  },

  // Repeated blocks like the screenshot
  {
    id: 4,
    licenseName: "Business License 2025",
    licenseNumber: "BL-2025-001234",
    issueDate: "2025-01-01",
    expiryDate: "2025-12-31",
    issuingAuthority: "Ministry of Commerce",
    status: "Active",
  },
  {
    id: 5,
    licenseName: "Tax Registration Certificate",
    licenseNumber: "TAX-KW-567890",
    issueDate: "2024-07-01",
    expiryDate: "2025-06-30",
    issuingAuthority: "Kuwait Tax Authority",
    status: "Expiring Soon",
  },
  {
    id: 6,
    licenseName: "Import License",
    licenseNumber: "IMP-2024-987654",
    issueDate: "2024-01-15",
    expiryDate: "2024-12-31",
    issuingAuthority: "Customs Department",
    status: "Expired",
  },
  {
    id: 7,
    licenseName: "Business License 2025",
    licenseNumber: "BL-2025-001234",
    issueDate: "2025-01-01",
    expiryDate: "2025-12-31",
    issuingAuthority: "Ministry of Commerce",
    status: "Active",
  },
  {
    id: 8,
    licenseName: "Tax Registration Certificate",
    licenseNumber: "TAX-KW-567890",
    issueDate: "2024-07-01",
    expiryDate: "2025-06-30",
    issuingAuthority: "Kuwait Tax Authority",
    status: "Expiring Soon",
  },
  {
    id: 9,
    licenseName: "Import License",
    licenseNumber: "IMP-2024-987654",
    issueDate: "2024-01-15",
    expiryDate: "2024-12-31",
    issuingAuthority: "Customs Department",
    status: "Expired",
  },
  {
    id: 10,
    licenseName: "Business License 2025",
    licenseNumber: "BL-2025-001234",
    issueDate: "2025-01-01",
    expiryDate: "2025-12-31",
    issuingAuthority: "Ministry of Commerce",
    status: "Active",
  },
];

  const total = licenseDummyData.length;
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);

  const paginatedLicense = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return licenseDummyData.slice(start, start + rowsPerPage);
  }, [page, rowsPerPage, licenseDummyData]);

 return (
    <div className="p-0 h-full flex flex-col">
      <Card className="shadow-sm flex flex-col h-full bg-white overflow-hidden">

        {/* ---------- Sticky Header ---------- */}
        <CardHeader className="bg-white sticky top-0 z-20 ">
          <div className="flex items-center justify-between w-full gap-2">
            <h1 className="text-xl font-semibold">License</h1>
            <Button
              size="sm"
              variant="default"
              className="h-8 px-3 flex items-center gap-2"
              onClick={() => {
                // TODO: open Add Hardware modal / navigate to add page
              }}
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add New License</span>
            </Button>
          </div>
        </CardHeader>

        {/* ---------- Scrollable Table Content ---------- */}
        <CardContent className="flex-1 overflow-y-auto px-4">
          <LicenseTable
            licenses={paginatedLicense}
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

export default LicensePage;
