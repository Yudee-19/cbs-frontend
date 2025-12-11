import { useMemo, useState } from "react";
import SoftwareTable from "./SoftwareTable";
import TablePagination from "@/components/ui/tablePagination";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const SoftwarePage = () => {
const dummySoftware = [
  {
    id: 1,
    deviceName: "Microsoft Office 365 Enterprise",
    vendor: "Microsoft",
    licenseType: "Subscription",
    seats: 150,
    used: 142,
    purchaseDate: "2023-01-01",
    expiryDate: "2024-01-01",
    renewalCost: "KD 15,000",
    department: "All",
    status: "Active",
  },
  {
    id: 2,
    deviceName: "Adobe Creative Cloud",
    vendor: "Adobe",
    licenseType: "Subscription",
    seats: 25,
    used: 23,
    purchaseDate: "2023-03-15",
    expiryDate: "2024-03-15",
    renewalCost: "KD 12,500",
    department: "Marketing",
    status: "Active",
  },
  {
    id: 3,
    deviceName: "AutoCAD 2023",
    vendor: "Autodesk",
    licenseType: "Perpetual",
    seats: 10,
    used: 10,
    purchaseDate: "2023-02-20",
    expiryDate: "N/A",
    renewalCost: "N/A",
    department: "Engineering",
    status: "Active",
  },
  {
    id: 4,
    deviceName: "Salesforce Enterprise",
    vendor: "Salesforce",
    licenseType: "Subscription",
    seats: 50,
    used: 48,
    purchaseDate: "2022-06-01",
    expiryDate: "2024-06-01",
    renewalCost: "KD 36,000",
    department: "Sales",
    status: "Active",
  },
  {
    id: 5,
    deviceName: "Norton Security Premium",
    vendor: "Norton",
    licenseType: "Subscription",
    seats: 200,
    used: 195,
    purchaseDate: "2023-09-01",
    expiryDate: "2024-09-01",
    renewalCost: "KD 8,000",
    department: "IT",
    status: "Expiring Soon",
  },
  // Repeat to fill table (same as screenshot)
  {
    id: 6,
    deviceName: "Microsoft Office 365 Enterprise",
    vendor: "Microsoft",
    licenseType: "Subscription",
    seats: 150,
    used: 142,
    purchaseDate: "2023-01-01",
    expiryDate: "2024-01-01",
    renewalCost: "KD 15,000",
    department: "All",
    status: "Active",
  },
  {
    id: 7,
    deviceName: "Adobe Creative Cloud",
    vendor: "Adobe",
    licenseType: "Subscription",
    seats: 25,
    used: 23,
    purchaseDate: "2023-03-15",
    expiryDate: "2024-03-15",
    renewalCost: "KD 12,500",
    department: "Marketing",
    status: "Active",
  },
  {
    id: 8,
    deviceName: "AutoCAD 2023",
    vendor: "Autodesk",
    licenseType: "Perpetual",
    seats: 10,
    used: 10,
    purchaseDate: "2023-02-20",
    expiryDate: "N/A",
    renewalCost: "N/A",
    department: "Engineering",
    status: "Active",
  },
  {
    id: 9,
    deviceName: "Salesforce Enterprise",
    vendor: "Salesforce",
    licenseType: "Subscription",
    seats: 50,
    used: 48,
    purchaseDate: "2022-06-01",
    expiryDate: "2024-06-01",
    renewalCost: "KD 36,000",
    department: "Sales",
    status: "Active",
  },
  {
    id: 10,
    deviceName: "Norton Security Premium",
    vendor: "Norton",
    licenseType: "Subscription",
    seats: 200,
    used: 195,
    purchaseDate: "2023-09-01",
    expiryDate: "2024-09-01",
    renewalCost: "KD 8,000",
    department: "IT",
    status: "Expiring Soon",
  },
];



  const total = dummySoftware.length;
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);

  const paginatedSoftware = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return dummySoftware.slice(start, start + rowsPerPage);
  }, [page, rowsPerPage, dummySoftware]);

 return (
    <div className="p-0 h-full flex flex-col">
      <Card className="shadow-sm flex flex-col h-full bg-white overflow-hidden">

        {/* ---------- Sticky Header ---------- */}
        <CardHeader className="bg-white sticky top-0 z-20 ">
          <div className="flex items-center justify-between w-full gap-2">
            <h1 className="text-xl font-semibold">Software License</h1>
            <Button
              size="sm"
              variant="default"
              className="h-8 px-3 flex items-center gap-2"
              onClick={() => {
                // TODO: open Add Hardware modal / navigate to add page
              }}
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Software</span>
            </Button>
          </div>
        </CardHeader>

        {/* ---------- Scrollable Table Content ---------- */}
        <CardContent className="flex-1 overflow-y-auto px-4">
          <SoftwareTable
            software={paginatedSoftware}
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

export default SoftwarePage;
