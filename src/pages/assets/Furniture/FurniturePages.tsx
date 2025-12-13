import { useMemo, useState } from "react";
import TablePagination from "@/components/ui/tablePagination";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import FurnitureTable from "./FurnitureTable";

const FurniturePage = () => {
const furnitureDummyData = [
  {
    id: 1,
    itemName: "Executive Desk Set",
    category: "Office Furniture",
    itemCode: "FRN–2023–001",
    quantity: 15,
    purchaseDate: "2023-01-10",
    unitValue: "KD 1,200",
    location: "Main Office – Floor 3",
    condition: "Good",
    status: "Active",
  },
  {
    id: 2,
    itemName: "Conference Table",
    category: "Meeting Room Furniture",
    itemCode: "FRN–2022–005",
    quantity: 3,
    purchaseDate: "2022-06-15",
    unitValue: "KD 3,500",
    location: "Conference Rooms",
    condition: "Excellent",
    status: "Active",
  },
  {
    id: 3,
    itemName: "Ergonomic Office Chairs",
    category: "Office Furniture",
    itemCode: "FRN–2023–008",
    quantity: 50,
    purchaseDate: "2023-03-20",
    unitValue: "KD 450",
    location: "All Floors",
    condition: "Good",
    status: "Active",
  },
  {
    id: 4,
    itemName: "Filing Cabinets",
    category: "Storage Furniture",
    itemCode: "FRN–2021–012",
    quantity: 25,
    purchaseDate: "2021-09-05",
    unitValue: "KD 350",
    location: "Main Office – Floor 1",
    condition: "Fair",
    status: "Active",
  },
  {
    id: 5,
    itemName: "Reception Sofa Set",
    category: "Lounge Furniture",
    itemCode: "FRN–2020–003",
    quantity: 2,
    purchaseDate: "2020-12-10",
    unitValue: "KD 2,800",
    location: "Reception Area",
    condition: "Good",
    status: "Active",
  },

  // repeated set (like screenshot)
  {
    id: 6,
    itemName: "Executive Desk Set",
    category: "Office Furniture",
    itemCode: "FRN–2023–001",
    quantity: 15,
    purchaseDate: "2023-01-10",
    unitValue: "KD 1,200",
    location: "Main Office – Floor 3",
    condition: "Good",
    status: "Active",
  },
  {
    id: 7,
    itemName: "Conference Table",
    category: "Meeting Room Furniture",
    itemCode: "FRN–2022–005",
    quantity: 3,
    purchaseDate: "2022-06-15",
    unitValue: "KD 3,500",
    location: "Conference Rooms",
    condition: "Excellent",
    status: "Active",
  },
  {
    id: 8,
    itemName: "Ergonomic Office Chairs",
    category: "Office Furniture",
    itemCode: "FRN–2023–008",
    quantity: 50,
    purchaseDate: "2023-03-20",
    unitValue: "KD 450",
    location: "All Floors",
    condition: "Good",
    status: "Active",
  },
  {
    id: 9,
    itemName: "Filing Cabinets",
    category: "Storage Furniture",
    itemCode: "FRN–2021–012",
    quantity: 25,
    purchaseDate: "2021-09-05",
    unitValue: "KD 350",
    location: "Main Office – Floor 1",
    condition: "Fair",
    status: "Active",
  },
  {
    id: 10,
    itemName: "Reception Sofa Set",
    category: "Lounge Furniture",
    itemCode: "FRN–2020–003",
    quantity: 2,
    purchaseDate: "2020-12-10",
    unitValue: "KD 2,800",
    location: "Reception Area",
    condition: "Good",
    status: "Active",
  },
];







  const total = furnitureDummyData.length;
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);

  const paginatedFurniture = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return furnitureDummyData.slice(start, start + rowsPerPage);
  }, [page, rowsPerPage, furnitureDummyData]);

 return (
    <div className="p-0 h-full flex flex-col">
      <Card className="shadow-sm flex flex-col h-full bg-white overflow-hidden">

        {/* ---------- Sticky Header ---------- */}
        <CardHeader className="bg-white sticky top-0 z-20 ">
          <div className="flex items-center justify-between w-full gap-2">
            <h1 className="text-xl font-semibold">Furniture</h1>
            <Button
              size="sm"
              variant="default"
              className="h-8 px-3 flex items-center gap-2"
              onClick={() => {
                // TODO: open Add Hardware modal / navigate to add page
              }}
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Furniture</span>
            </Button>
          </div>
        </CardHeader>

        {/* ---------- Scrollable Table Content ---------- */}
        <CardContent className="flex-1 overflow-y-auto px-4">
          <FurnitureTable
            furniture={paginatedFurniture}
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

export default FurniturePage;
