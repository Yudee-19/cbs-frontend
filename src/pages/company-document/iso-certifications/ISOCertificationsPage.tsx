import { useMemo, useState } from "react";
import TablePagination from "@/components/ui/tablePagination";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
// import ISOCetificationsTable from "./ISOCertificationsTable";
import ISOCertificationsTable from "./ISOCertificationsTable";

const ISOCertificationsPage = () => {
const isoCertificationsDummy = [
  {
    id: 1,
    certificateName: "ISO 9001:2015 Quality Management",
    isoStandard: "ISO 9001:2015",
    issueDate: "2024-03-15",
    expiryDate: "2026-03-15",
    certifyingBody: "SGS Kuwait",
    status: "Active",
  },
  {
    id: 2,
    certificateName: "ISO 14001:2015 Environmental Management",
    isoStandard: "ISO 14001:2015",
    issueDate: "2024-01-20",
    expiryDate: "2026-01-20",
    certifyingBody: "Bureau Veritas",
    status: "Expiring Soon",
  },
  {
    id: 3,
    certificateName: "ISO 14001:2015 Environmental Management",
    isoStandard: "ISO 27001:2013",
    issueDate: "2023-06-10",
    expiryDate: "2025-06-10",
    certifyingBody: "BSI Group",
    status: "Active",
  },
  {
    id: 4,
    certificateName: "ISO 45001:2018 Occupational Health & Safety",
    isoStandard: "ISO 45001:2018",
    issueDate: "2024-09-05",
    expiryDate: "2026-09-05",
    certifyingBody: "TUV Rheinland",
    status: "Expiring Soon",
  },

  // Repeated rows (as shown in screenshot)
  {
    id: 5,
    certificateName: "ISO 14001:2015 Environmental Management",
    isoStandard: "ISO 27001:2013",
    issueDate: "2023-06-10",
    expiryDate: "2025-06-10",
    certifyingBody: "BSI Group",
    status: "Active",
  },
  {
    id: 6,
    certificateName: "ISO 45001:2018 Occupational Health & Safety",
    isoStandard: "ISO 45001:2018",
    issueDate: "2024-09-05",
    expiryDate: "2026-09-05",
    certifyingBody: "TUV Rheinland",
    status: "Expiring Soon",
  },
  {
    id: 7,
    certificateName: "ISO 14001:2015 Environmental Management",
    isoStandard: "ISO 27001:2013",
    issueDate: "2023-06-10",
    expiryDate: "2025-06-10",
    certifyingBody: "BSI Group",
    status: "Active",
  },
  {
    id: 8,
    certificateName: "ISO 45001:2018 Occupational Health & Safety",
    isoStandard: "ISO 45001:2018",
    issueDate: "2024-09-05",
    expiryDate: "2026-09-05",
    certifyingBody: "TUV Rheinland",
    status: "Expiring Soon",
  },
  {
    id: 9,
    certificateName: "ISO 14001:2015 Environmental Management",
    isoStandard: "ISO 27001:2013",
    issueDate: "2023-06-10",
    expiryDate: "2025-06-10",
    certifyingBody: "BSI Group",
    status: "Active",
  },
  {
    id: 10,
    certificateName: "ISO 45001:2018 Occupational Health & Safety",
    isoStandard: "ISO 45001:2018",
    issueDate: "2024-09-05",
    expiryDate: "2026-09-05",
    certifyingBody: "TUV Rheinland",
    status: "Expiring Soon",
  },
];



  const total = isoCertificationsDummy.length;
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);

  const paginatedISOCertifications = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return isoCertificationsDummy.slice(start, start + rowsPerPage);
  }, [page, rowsPerPage, isoCertificationsDummy]);

 return (
    <div className="p-0 h-full flex flex-col">
      <Card className="shadow-sm flex flex-col h-full bg-white overflow-hidden">

        {/* ---------- Sticky Header ---------- */}
        <CardHeader className="bg-white sticky top-0 z-20 ">
          <div className="flex items-center justify-between w-full gap-2">
            <h1 className="text-xl font-semibold">ISO Certifications</h1>
            <Button
              size="sm"
              variant="default"
              className="h-8 px-3 flex items-center gap-2"
              onClick={() => {
                // TODO: open Add Hardware modal / navigate to add page
              }}
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add ISO Certification</span>
            </Button>
          </div>
        </CardHeader>

        {/* ---------- Scrollable Table Content ---------- */}
        <CardContent className="flex-1 overflow-y-auto px-4">
          <ISOCertificationsTable
            isoCertifications={paginatedISOCertifications}
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

export default ISOCertificationsPage;
