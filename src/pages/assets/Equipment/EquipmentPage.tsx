import { useMemo, useState } from "react";
import TablePagination from "@/components/ui/tablePagination";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import EquipmentTable from "./EquipmentTable";

const EquipmentPage = () => {
const equipmentDummyData = [
  {
    id: 1,
    equipmentName: "Industrial Printer XL–500",
    category: "Office Equipment",
    serialNumber: "PR–2023–001",
    manufacturer: "Canon",
    purchaseDate: "2023-02-10",
    purchaseValue: "KD 12,000",
    location: "Main Office – Floor 2",
    warrantyExpiry: "2026-02-10",
    status: "Active",
  },
  {
    id: 2,
    equipmentName: "Forklift Toyota 8FD25",
    category: "Heavy Equipment",
    serialNumber: "FL–2021–003",
    manufacturer: "Toyota",
    purchaseDate: "2021-07-15",
    purchaseValue: "KD 25,000",
    location: "Warehouse",
    warrantyExpiry: "2024-07-15",
    status: "Active",
  },
  {
    id: 3,
    equipmentName: "Generator Set 50KVA",
    category: "Power Equipment",
    serialNumber: "GN–2020–008",
    manufacturer: "Caterpillar",
    purchaseDate: "2020-11-20",
    purchaseValue: "KD 35,000",
    location: "Main Building",
    warrantyExpiry: "2023-11-20",
    status: "Under Maintenance",
  },
  {
    id: 4,
    equipmentName: "Conference AV System",
    category: "IT Equipment",
    serialNumber: "AV–2022–012",
    manufacturer: "Polycom",
    purchaseDate: "2022-04-05",
    purchaseValue: "KD 8,500",
    location: "Conference Room A",
    warrantyExpiry: "2025-04-05",
    status: "Active",
  },

  // repeated pattern like screenshot
  {
    id: 5,
    equipmentName: "Conference AV System",
    category: "IT Equipment",
    serialNumber: "AV–2022–012",
    manufacturer: "Polycom",
    purchaseDate: "2022-04-05",
    purchaseValue: "KD 8,500",
    location: "Conference Room A",
    warrantyExpiry: "2025-04-05",
    status: "Active",
  },
  {
    id: 6,
    equipmentName: "Generator Set 50KVA",
    category: "Power Equipment",
    serialNumber: "GN–2020–008",
    manufacturer: "Caterpillar",
    purchaseDate: "2020-11-20",
    purchaseValue: "KD 35,000",
    location: "Main Building",
    warrantyExpiry: "2023-11-20",
    status: "Under Maintenance",
  },
  {
    id: 7,
    equipmentName: "Conference AV System",
    category: "IT Equipment",
    serialNumber: "AV–2022–012",
    manufacturer: "Polycom",
    purchaseDate: "2022-04-05",
    purchaseValue: "KD 8,500",
    location: "Conference Room A",
    warrantyExpiry: "2025-04-05",
    status: "Active",
  },
  {
    id: 8,
    equipmentName: "Conference AV System",
    category: "IT Equipment",
    serialNumber: "AV–2022–012",
    manufacturer: "Polycom",
    purchaseDate: "2022-04-05",
    purchaseValue: "KD 8,500",
    location: "Conference Room A",
    warrantyExpiry: "2025-04-05",
    status: "Active",
  },
  {
    id: 9,
    equipmentName: "Generator Set 50KVA",
    category: "Power Equipment",
    serialNumber: "GN–2020–008",
    manufacturer: "Caterpillar",
    purchaseDate: "2020-11-20",
    purchaseValue: "KD 35,000",
    location: "Main Building",
    warrantyExpiry: "2023-11-20",
    status: "Under Maintenance",
  },
  {
    id: 10,
    equipmentName: "Conference AV System",
    category: "IT Equipment",
    serialNumber: "AV–2022–012",
    manufacturer: "Polycom",
    purchaseDate: "2022-04-05",
    purchaseValue: "KD 8,500",
    location: "Conference Room A",
    warrantyExpiry: "2025-04-05",
    status: "Active",
  },
];






  const total = equipmentDummyData.length;
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);

  const paginatedEquipment = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return equipmentDummyData.slice(start, start + rowsPerPage);
  }, [page, rowsPerPage, equipmentDummyData]);

 return (
    <div className="p-0 h-full flex flex-col">
      <Card className="shadow-sm flex flex-col h-full bg-white overflow-hidden">

        {/* ---------- Sticky Header ---------- */}
        <CardHeader className="bg-white sticky top-0 z-20 ">
          <div className="flex items-center justify-between w-full gap-2">
            <h1 className="text-xl font-semibold">Equipment</h1>
            <Button
              size="sm"
              variant="default"
              className="h-8 px-3 flex items-center gap-2"
              onClick={() => {
                // TODO: open Add Hardware modal / navigate to add page
              }}
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Equipment</span>
            </Button>
          </div>
        </CardHeader>

        {/* ---------- Scrollable Table Content ---------- */}
        <CardContent className="flex-1 overflow-y-auto px-4">
          <EquipmentTable
            equipment={paginatedEquipment}
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

export default EquipmentPage;
