import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Plus, List } from "lucide-react";
import TablePagination from "@/components/ui/tablePagination";
import ChequeReportTable from "./ChequePrintingTable";

// Dummy data (you can move this to a separate file if you prefer)
const chequeDummyData = [
  { chequeNo: "Ch-2941", payee: "ABC Suppliers Ltd.", date: "2025-11-01", amount: { primary: "KD 4,605.00", secondary: "$ 15,000.00" }, printStatus: "Printed", transactionStatus: "Handed Over" },
  { chequeNo: "Ch-2942", payee: "XYZ Service Inc.", date: "2025-11-02", amount: { primary: "KD 2,609.50", secondary: "$ 8,500.00" }, printStatus: "Pending", transactionStatus: "..." },
  { chequeNo: "Ch-2943", payee: "Tech Solutions Corp.", date: "2025-11-03", amount: { primary: "KD 6,150.00", secondary: "$ 20,000.00" }, printStatus: "Printed", transactionStatus: "Credited" },
  { chequeNo: "Ch-2944", payee: "Global Trading LLC", date: "2025-11-04", amount: { primary: "KD 3,075.00", secondary: "$ 10,000.00" }, printStatus: "Cancelled", transactionStatus: "..." },
  { chequeNo: "Ch-2945", payee: "ABC Suppliers Ltd.", date: "2025-11-05", amount: { primary: "KD 1,537.50", secondary: "$ 5,000.00" }, printStatus: "Printed", transactionStatus: "Debited" },
  { chequeNo: "Ch-2946", payee: "XYZ Service Inc.", date: "2025-11-06", amount: { primary: "KD 4,000.00", secondary: "$ 13,000.00" }, printStatus: "Pending", transactionStatus: "..." },
  { chequeNo: "Ch-2947", payee: "Tech Solutions Corp.", date: "2025-11-07", amount: { primary: "KD 2,500.00", secondary: "$ 8,100.00" }, printStatus: "Printed", transactionStatus: "Handed Over" },
  { chequeNo: "Ch-2948", payee: "Prime Logistics Co.", date: "2025-11-08", amount: { primary: "KD 7,690.00", secondary: "$ 25,000.00" }, printStatus: "Printed", transactionStatus: "Credited" },
  { chequeNo: "Ch-2949", payee: "Omega Services", date: "2025-11-09", amount: { primary: "KD 3,200.00", secondary: "$ 10,400.00" }, printStatus: "Cancelled", transactionStatus: "..." },
  { chequeNo: "Ch-2950", payee: "Nova Enterprises", date: "2025-11-10", amount: { primary: "KD 5,380.00", secondary: "$ 17,500.00" }, printStatus: "Printed", transactionStatus: "Debited" },
  { chequeNo: "Ch-2951", payee: "ABC Suppliers Ltd.", date: "2025-11-11", amount: { primary: "KD 2,000.00", secondary: "$ 6,500.00" }, printStatus: "Pending", transactionStatus: "..." },
  { chequeNo: "Ch-2952", payee: "XYZ Service Inc.", date: "2025-11-12", amount: { primary: "KD 4,920.00", secondary: "$ 16,000.00" }, printStatus: "Printed", transactionStatus: "Handed Over" },
  { chequeNo: "Ch-2953", payee: "Tech Solutions Corp.", date: "2025-11-13", amount: { primary: "KD 3,850.00", secondary: "$ 12,500.00" }, printStatus: "Printed", transactionStatus: "Credited" },
  { chequeNo: "Ch-2954", payee: "Global Trading LLC", date: "2025-11-14", amount: { primary: "KD 1,845.00", secondary: "$ 6,000.00" }, printStatus: "Cancelled", transactionStatus: "..." },
  { chequeNo: "Ch-2955", payee: "Prime Logistics Co.", date: "2025-11-15", amount: { primary: "KD 6,765.00", secondary: "$ 22,000.00" }, printStatus: "Printed", transactionStatus: "Debited" },
  { chequeNo: "Ch-2956", payee: "Omega Services", date: "2025-11-16", amount: { primary: "KD 2,300.00", secondary: "$ 7,500.00" }, printStatus: "Pending", transactionStatus: "..." },
  { chequeNo: "Ch-2957", payee: "Nova Enterprises", date: "2025-11-17", amount: { primary: "KD 5,200.00", secondary: "$ 17,000.00" }, printStatus: "Printed", transactionStatus: "Handed Over" },
  { chequeNo: "Ch-2958", payee: "ABC Suppliers Ltd.", date: "2025-11-18", amount: { primary: "KD 3,400.00", secondary: "$ 11,000.00" }, printStatus: "Printed", transactionStatus: "Credited" },
  { chequeNo: "Ch-2959", payee: "XYZ Service Inc.", date: "2025-11-19", amount: { primary: "KD 1,690.00", secondary: "$ 5,500.00" }, printStatus: "Cancelled", transactionStatus: "..." },
  { chequeNo: "Ch-2960", payee: "Tech Solutions Corp.", date: "2025-11-20", amount: { primary: "KD 7,380.00", secondary: "$ 24,000.00" }, printStatus: "Printed", transactionStatus: "Debited" },
];

const ChequePrintingPage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);

  const total = chequeDummyData.length;

  const dataWithId = useMemo(
    () => chequeDummyData.map((r) => ({ ...r, id: r.chequeNo })),
    []
  );

  const paginated = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return dataWithId.slice(start, start + rowsPerPage);
  }, [dataWithId, page, rowsPerPage]);

  return (
    <div className="p-2 sm:p-4 h-full flex flex-col">
      <Card className="shadow-sm flex flex-col h-full bg-white overflow-hidden">
        <CardHeader className="bg-white sticky top-0 z-20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-2 sm:gap-3">
            <h1 className="text-lg sm:text-xl font-semibold">Cheque Printing</h1>

            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end sm:justify-normal">
              <Button
                variant="outline"
                size="sm"
                aria-label="Business Contacts"
                title="Business Contacts"
                onClick={() => console.log("Open Business Contacts")}
              >
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Business Contacts</span>
              </Button>
              <Button
                size="sm"
                aria-label="New Cheque"
                title="New Cheque"
                onClick={() => navigate("/banking/cheque-printing/new-cheque")}
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">New Cheque</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                aria-label="Cheque Manager"
                title="Cheque Manager"
                onClick={() => console.log("Open Cheque Manager")}
              >
                <List className="h-4 w-4" />
                <span className="hidden sm:inline">Cheque Manager</span>
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-hidden p-0">
          <div className="overflow-x-auto h-full px-2 sm:px-4">
            <ChequeReportTable
              chequeReports={paginated}
              onPrint={(row) => {
                console.log("Print cheque:", row.chequeNo);
              }}
            />
          </div>
        </CardContent>

        <div className="border-t bg-white sticky bottom-0 z-20 px-2 sm:px-4">
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

export default ChequePrintingPage;