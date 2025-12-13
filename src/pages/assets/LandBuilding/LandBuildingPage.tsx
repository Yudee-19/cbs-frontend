import { useMemo, useState } from "react";
import LandBuildingTable from "./LandBuildingTable";
import TablePagination from "@/components/ui/tablePagination";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const LandBuildingPage = () => {
const landBuildingDummyData = [
  {
    id: 1,
    propertyName: "Main Office Building",
    type: "Building",
    location: "Al Safat, Kuwait City",
    area: "5,000 sqm",
    purchaseDate: "2020-01-15",
    purchaseValue: "KD 2,500,000",
    currentValue: "KD 2,800,000",
    status: "Active",
  },
  {
    id: 2,
    propertyName: "Warehouse Facility",
    type: "Building",
    location: "Shuwaikh Industrial Area",
    area: "8,500 sqm",
    purchaseDate: "2019-06-20",
    purchaseValue: "KD 1,200,000",
    currentValue: "KD 1,400,000",
    status: "Active",
  },
  {
    id: 3,
    propertyName: "Commercial Land Plot",
    type: "Land",
    location: "Farwaniya",
    area: "3,000 sqm",
    purchaseDate: "2021-03-10",
    purchaseValue: "KD 800,000",
    currentValue: "KD 950,000",
    status: "Active",
  },
  {
    id: 4,
    propertyName: "Main Office Building",
    type: "Building",
    location: "Al Safat, Kuwait City",
    area: "5,000 sqm",
    purchaseDate: "2020-01-15",
    purchaseValue: "KD 2,500,000",
    currentValue: "KD 2,800,000",
    status: "Active",
  },
  {
    id: 5,
    propertyName: "Warehouse Facility",
    type: "Building",
    location: "Shuwaikh Industrial Area",
    area: "8,500 sqm",
    purchaseDate: "2019-06-20",
    purchaseValue: "KD 1,200,000",
    currentValue: "KD 1,400,000",
    status: "Active",
  },
  {
    id: 6,
    propertyName: "Commercial Land Plot",
    type: "Land",
    location: "Farwaniya",
    area: "3,000 sqm",
    purchaseDate: "2021-03-10",
    purchaseValue: "KD 800,000",
    currentValue: "KD 950,000",
    status: "Active",
  },
  {
    id: 7,
    propertyName: "Main Office Building",
    type: "Building",
    location: "Al Safat, Kuwait City",
    area: "5,000 sqm",
    purchaseDate: "2020-01-15",
    purchaseValue: "KD 2,500,000",
    currentValue: "KD 2,800,000",
    status: "Active",
  },
  {
    id: 8,
    propertyName: "Warehouse Facility",
    type: "Building",
    location: "Shuwaikh Industrial Area",
    area: "8,500 sqm",
    purchaseDate: "2019-06-20",
    purchaseValue: "KD 1,200,000",
    currentValue: "KD 1,400,000",
    status: "Active",
  },
  {
    id: 9,
    propertyName: "Warehouse Facility",
    type: "Building",
    location: "Shuwaikh Industrial Area",
    area: "8,500 sqm",
    purchaseDate: "2019-06-20",
    purchaseValue: "KD 1,200,000",
    currentValue: "KD 1,400,000",
    status: "Active",
  },
  {
    id: 10,
    propertyName: "Commercial Land Plot",
    type: "Land",
    location: "Farwaniya",
    area: "3,000 sqm",
    purchaseDate: "2021-03-10",
    purchaseValue: "KD 800,000",
    currentValue: "KD 950,000",
    status: "Active",
  },
];





  const total = landBuildingDummyData.length;
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);

  const paginatedLandBuilding = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return landBuildingDummyData.slice(start, start + rowsPerPage);
  }, [page, rowsPerPage, landBuildingDummyData]);

 return (
    <div className="p-0 h-full flex flex-col">
      <Card className="shadow-sm flex flex-col h-full bg-white overflow-hidden">

        {/* ---------- Sticky Header ---------- */}
        <CardHeader className="bg-white sticky top-0 z-20 ">
          <div className="flex items-center justify-between w-full gap-2">
            <h1 className="text-xl font-semibold">Land and Building</h1>
            <Button
              size="sm"
              variant="default"
              className="h-8 px-3 flex items-center gap-2"
              onClick={() => {
                // TODO: open Add Hardware modal / navigate to add page
              }}
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Property</span>
            </Button>
          </div>
        </CardHeader>

        {/* ---------- Scrollable Table Content ---------- */}
        <CardContent className="flex-1 overflow-y-auto px-4">
          <LandBuildingTable
            landBuildings={paginatedLandBuilding}
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

export default LandBuildingPage;
