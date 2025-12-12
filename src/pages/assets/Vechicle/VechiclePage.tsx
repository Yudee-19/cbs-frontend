import { useMemo, useState } from "react";
import TablePagination from "@/components/ui/tablePagination";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import VehicleTable from "./VechicleTable";

const VehiclePage = () => {
const vehicleDummyData = [
  {
    id: 1,
    vehicleName: "Toyota Land Cruiser",
    type: "SUV",
    plateNumber: "KWT-12345",
    modelYear: 2022,
    purchaseDate: "2022-03-15",
    purchaseValue: "KD 35,000",
    currentValue: "KD 30,000",
    assignedTo: "Executive Team",
    status: "Active",
  },
  {
    id: 2,
    vehicleName: "Mercedes-Benz Sprinter",
    type: "Van",
    plateNumber: "KWT-67890",
    modelYear: 2021,
    purchaseDate: "2021-08-20",
    purchaseValue: "KD 45,000",
    currentValue: "KD 38,000",
    assignedTo: "Operations",
    status: "Active",
  },
  {
    id: 3,
    vehicleName: "Toyota Hilux",
    type: "Pickup Truck",
    plateNumber: "KWT-24680",
    modelYear: 2020,
    purchaseDate: "2020-05-10",
    purchaseValue: "KD 28,000",
    currentValue: "KD 22,000",
    assignedTo: "Maintenance",
    status: "Active",
  },
  {
    id: 4,
    vehicleName: "Honda Accord",
    type: "Sedan",
    plateNumber: "KWT-13579",
    modelYear: 2019,
    purchaseDate: "2019-11-05",
    purchaseValue: "KD 22,000",
    currentValue: "KD 15,000",
    assignedTo: "Sales Team",
    status: "Under Maintenance",
  },

  // Repeated rows as in screenshot
  {
    id: 5,
    vehicleName: "Toyota Land Cruiser",
    type: "SUV",
    plateNumber: "KWT-12345",
    modelYear: 2022,
    purchaseDate: "2022-03-15",
    purchaseValue: "KD 35,000",
    currentValue: "KD 30,000",
    assignedTo: "Executive Team",
    status: "Active",
  },
  {
    id: 6,
    vehicleName: "Mercedes-Benz Sprinter",
    type: "Van",
    plateNumber: "KWT-67890",
    modelYear: 2021,
    purchaseDate: "2021-08-20",
    purchaseValue: "KD 45,000",
    currentValue: "KD 38,000",
    assignedTo: "Operations",
    status: "Active",
  },
  {
    id: 7,
    vehicleName: "Toyota Hilux",
    type: "Pickup Truck",
    plateNumber: "KWT-24680",
    modelYear: 2020,
    purchaseDate: "2020-05-10",
    purchaseValue: "KD 28,000",
    currentValue: "KD 22,000",
    assignedTo: "Maintenance",
    status: "Active",
  },
  {
    id: 8,
    vehicleName: "Honda Accord",
    type: "Sedan",
    plateNumber: "KWT-13579",
    modelYear: 2019,
    purchaseDate: "2019-11-05",
    purchaseValue: "KD 22,000",
    currentValue: "KD 15,000",
    assignedTo: "Sales Team",
    status: "Under Maintenance",
  },

  {
    id: 9,
    vehicleName: "Toyota Land Cruiser",
    type: "SUV",
    plateNumber: "KWT-12345",
    modelYear: 2022,
    purchaseDate: "2022-03-15",
    purchaseValue: "KD 35,000",
    currentValue: "KD 30,000",
    assignedTo: "Executive Team",
    status: "Active",
  },
  {
    id: 10,
    vehicleName: "Toyota Hilux",
    type: "Pickup Truck",
    plateNumber: "KWT-24680",
    modelYear: 2020,
    purchaseDate: "2020-05-10",
    purchaseValue: "KD 28,000",
    currentValue: "KD 22,000",
    assignedTo: "Maintenance",
    status: "Active",
  },
];





  const total = vehicleDummyData.length;
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);

  const paginatedVehicle = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return vehicleDummyData.slice(start, start + rowsPerPage);
  }, [page, rowsPerPage, vehicleDummyData]);

 return (
    <div className="p-0 h-full flex flex-col">
      <Card className="shadow-sm flex flex-col h-full bg-white overflow-hidden">

        {/* ---------- Sticky Header ---------- */}
        <CardHeader className="bg-white sticky top-0 z-20 ">
          <div className="flex items-center justify-between w-full gap-2">
            <h1 className="text-xl font-semibold">Vehicle</h1>
            <Button
              size="sm"
              variant="default"
              className="h-8 px-3 flex items-center gap-2"
              onClick={() => {
                // TODO: open Add Hardware modal / navigate to add page
              }}
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Vehicle</span>
            </Button>
          </div>
        </CardHeader>

        {/* ---------- Scrollable Table Content ---------- */}
        <CardContent className="flex-1 overflow-y-auto px-4">
          <VehicleTable
            vehicle={paginatedVehicle}
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

export default VehiclePage;
