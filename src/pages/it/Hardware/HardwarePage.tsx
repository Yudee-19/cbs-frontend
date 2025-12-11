import { useMemo, useState } from "react";
import HardwareTable from "./HardwareTable";
import TablePagination from "@/components/ui/tablePagination";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const HardwarePage = () => {
const dummyHardware = [
  {
    id: 1,
    deviceName: "Dell Latitude 7420",
    type: "Laptop",
    serialNumber: "FRN-2023-001",
    processor: "Intel i7-1185G7",
    ram: "16GB",
    storage: "512GB SSD",
    warrantyExpiry: "2026-02-15",
    assignedTo: "John Smith",
    department: "Finance",
    status: "Active",
  },
  {
    id: 2,
    deviceName: "HP EliteDesk 800 G6",
    type: "Desktop",
    serialNumber: "HP-2022-008",
    processor: "Intel i5-10500",
    ram: "8GB",
    storage: "256GB SSD",
    warrantyExpiry: "2025-08-10",
    assignedTo: "Sarah Johnson",
    department: "HR",
    status: "Active",
  },
  {
    id: 3,
    deviceName: "Dell PowerEdge R740",
    type: "Server",
    serialNumber: "SV-2021-003",
    processor: "Intel Xeon Silver 4214",
    ram: "64GB",
    storage: "2TB RAID",
    warrantyExpiry: "2024-05-20",
    assignedTo: "IT Department",
    department: "IT",
    status: "Active",
  },
  {
    id: 4,
    deviceName: "MacBook Pro 16”",
    type: "Laptop",
    serialNumber: "AP-2023-012",
    processor: "Apple M2 Pro",
    ram: "32GB",
    storage: "1TB SSD",
    warrantyExpiry: "2026-06-01",
    assignedTo: "Design Team",
    department: "Marketing",
    status: "Active",
  },
  {
    id: 5,
    deviceName: "Lenovo ThinkPad T14",
    type: "Laptop",
    serialNumber: "LN-2020-015",
    processor: "Intel i5-10210U",
    ram: "8GB",
    storage: "256GB SSD",
    warrantyExpiry: "2023-11-10",
    assignedTo: "Unassigned",
    department: "IT",
    status: "Under Repair",
  },

  // ----------- 25 MORE RECORDS BELOW ------------
  {
    id: 6,
    deviceName: "Dell Latitude 5430",
    type: "Laptop",
    serialNumber: "DL-2022-101",
    processor: "Intel i7-1165G7",
    ram: "16GB",
    storage: "512GB SSD",
    warrantyExpiry: "2026-03-18",
    assignedTo: "Emma Davis",
    department: "HR",
    status: "Active",
  },
  {
    id: 7,
    deviceName: "HP ProBook 450 G8",
    type: "Laptop",
    serialNumber: "HP-2021-119",
    processor: "Intel i5-1135G7",
    ram: "8GB",
    storage: "256GB SSD",
    warrantyExpiry: "2025-12-01",
    assignedTo: "Daniel Lee",
    department: "Finance",
    status: "Active",
  },
  {
    id: 8,
    deviceName: "Lenovo ThinkCentre M720",
    type: "Desktop",
    serialNumber: "LC-2020-223",
    processor: "Intel i5-9400",
    ram: "8GB",
    storage: "512GB SSD",
    warrantyExpiry: "2024-08-05",
    assignedTo: "Ava Brown",
    department: "IT",
    status: "Active",
  },
  {
    id: 9,
    deviceName: "MacBook Air M1",
    type: "Laptop",
    serialNumber: "AP-2022-042",
    processor: "Apple M1",
    ram: "8GB",
    storage: "256GB SSD",
    warrantyExpiry: "2026-05-10",
    assignedTo: "Liam Johnson",
    department: "Marketing",
    status: "Active",
  },
  {
    id: 10,
    deviceName: "Dell OptiPlex 7090",
    type: "Desktop",
    serialNumber: "DX-2023-331",
    processor: "Intel i7-11700",
    ram: "16GB",
    storage: "512GB SSD",
    warrantyExpiry: "2027-02-14",
    assignedTo: "Unassigned",
    department: "Support",
    status: "Under Repair",
  },
  {
    id: 11,
    deviceName: "HP EliteDesk 600 G4",
    type: "Desktop",
    serialNumber: "HP-2020-412",
    processor: "Intel i5-8500",
    ram: "8GB",
    storage: "256GB SSD",
    warrantyExpiry: "2024-09-20",
    assignedTo: "John Smith",
    department: "Finance",
    status: "Active",
  },
  {
    id: 12,
    deviceName: "MacBook Pro 14”",
    type: "Laptop",
    serialNumber: "AP-2023-178",
    processor: "Apple M2 Pro",
    ram: "16GB",
    storage: "512GB SSD",
    warrantyExpiry: "2027-04-22",
    assignedTo: "Emma Davis",
    department: "Marketing",
    status: "Active",
  },
  {
    id: 13,
    deviceName: "Lenovo ThinkSystem SR550",
    type: "Server",
    serialNumber: "SV-2019-552",
    processor: "Intel Xeon Silver 4210",
    ram: "64GB",
    storage: "2TB RAID",
    warrantyExpiry: "2024-11-03",
    assignedTo: "IT Department",
    department: "IT",
    status: "Active",
  },
  {
    id: 14,
    deviceName: "Acer TravelMate P6",
    type: "Laptop",
    serialNumber: "AC-2021-090",
    processor: "Intel i7-10510U",
    ram: "16GB",
    storage: "512GB SSD",
    warrantyExpiry: "2025-07-17",
    assignedTo: "Sarah Johnson",
    department: "HR",
    status: "Active",
  },
  {
    id: 15,
    deviceName: "HP ProLiant DL380 Gen10",
    type: "Server",
    serialNumber: "PL-2020-909",
    processor: "Intel Xeon Gold 5220",
    ram: "128GB",
    storage: "4TB RAID",
    warrantyExpiry: "2025-03-30",
    assignedTo: "IT Department",
    department: "IT",
    status: "Active",
  },
  {
    id: 16,
    deviceName: "Dell Latitude 5520",
    type: "Laptop",
    serialNumber: "DL-2022-651",
    processor: "Intel i5-1135G7",
    ram: "8GB",
    storage: "256GB SSD",
    warrantyExpiry: "2026-10-01",
    assignedTo: "Daniel Lee",
    department: "Finance",
    status: "Active",
  },
  {
    id: 17,
    deviceName: "HP ProBook 430 G7",
    type: "Laptop",
    serialNumber: "HP-2021-554",
    processor: "Intel i5-10210U",
    ram: "8GB",
    storage: "256GB SSD",
    warrantyExpiry: "2025-02-18",
    assignedTo: "Ava Brown",
    department: "Sales",
    status: "Active",
  },
  {
    id: 18,
    deviceName: "Lenovo ThinkCentre Neo 50t",
    type: "Desktop",
    serialNumber: "LC-2022-778",
    processor: "Intel i5-12400",
    ram: "16GB",
    storage: "512GB SSD",
    warrantyExpiry: "2027-06-09",
    assignedTo: "Unassigned",
    department: "Support",
    status: "Under Repair",
  },
  {
    id: 19,
    deviceName: "MacBook Air M2",
    type: "Laptop",
    serialNumber: "AP-2023-233",
    processor: "Apple M2",
    ram: "8GB",
    storage: "256GB SSD",
    warrantyExpiry: "2027-09-12",
    assignedTo: "Sophia Wilson",
    department: "Marketing",
    status: "Active",
  },
  {
    id: 20,
    deviceName: "Dell Precision 3561",
    type: "Laptop",
    serialNumber: "DL-2021-984",
    processor: "Intel i7-11800H",
    ram: "32GB",
    storage: "1TB SSD",
    warrantyExpiry: "2026-01-22",
    assignedTo: "John Smith",
    department: "Finance",
    status: "Active",
  },
  {
    id: 21,
    deviceName: "HP Z2 Mini G5",
    type: "Desktop",
    serialNumber: "HP-2022-832",
    processor: "Intel i7-10700",
    ram: "16GB",
    storage: "512GB SSD",
    warrantyExpiry: "2027-03-14",
    assignedTo: "Emma Davis",
    department: "HR",
    status: "Active",
  },
  {
    id: 22,
    deviceName: "Dell PowerEdge T440",
    type: "Server",
    serialNumber: "SV-2019-440",
    processor: "Intel Xeon Silver 4208",
    ram: "64GB",
    storage: "2TB RAID",
    warrantyExpiry: "2024-12-01",
    assignedTo: "IT Department",
    department: "IT",
    status: "Active",
  },
  {
    id: 23,
    deviceName: "Lenovo ThinkPad E14",
    type: "Laptop",
    serialNumber: "LN-2020-413",
    processor: "Intel i3-10110U",
    ram: "8GB",
    storage: "256GB SSD",
    warrantyExpiry: "2024-11-07",
    assignedTo: "Daniel Lee",
    department: "Sales",
    status: "Active",
  },
  {
    id: 24,
    deviceName: "Acer Aspire TC",
    type: "Desktop",
    serialNumber: "AC-2019-552",
    processor: "Intel i5-9400",
    ram: "8GB",
    storage: "512GB SSD",
    warrantyExpiry: "2024-04-09",
    assignedTo: "Unassigned",
    department: "Support",
    status: "Under Repair",
  },
  {
    id: 25,
    deviceName: "Mac Mini M2",
    type: "Desktop",
    serialNumber: "AP-2023-889",
    processor: "Apple M2",
    ram: "16GB",
    storage: "512GB SSD",
    warrantyExpiry: "2027-07-15",
    assignedTo: "Sophia Wilson",
    department: "Marketing",
    status: "Active",
  },
  {
    id: 26,
    deviceName: "HP Pavilion 15",
    type: "Laptop",
    serialNumber: "HP-2021-744",
    processor: "Intel i5-1135G7",
    ram: "8GB",
    storage: "256GB SSD",
    warrantyExpiry: "2025-10-11",
    assignedTo: "Emma Davis",
    department: "HR",
    status: "Active",
  },
  {
    id: 27,
    deviceName: "Dell XPS 13",
    type: "Laptop",
    serialNumber: "DL-2022-1010",
    processor: "Intel i7-1185G7",
    ram: "16GB",
    storage: "512GB SSD",
    warrantyExpiry: "2026-12-03",
    assignedTo: "John Smith",
    department: "Finance",
    status: "Active",
  },
  {
    id: 28,
    deviceName: "Lenovo ThinkStation P340",
    type: "Desktop",
    serialNumber: "LN-2020-887",
    processor: "Intel i7-10700",
    ram: "16GB",
    storage: "1TB SSD",
    warrantyExpiry: "2025-05-20",
    assignedTo: "Ava Brown",
    department: "IT",
    status: "Active",
  },
  {
    id: 29,
    deviceName: "MacBook Pro 13”",
    type: "Laptop",
    serialNumber: "AP-2022-616",
    processor: "Apple M1",
    ram: "8GB",
    storage: "256GB SSD",
    warrantyExpiry: "2026-07-23",
    assignedTo: "Sarah Johnson",
    department: "Marketing",
    status: "Active",
  },
  {
    id: 30,
    deviceName: "Dell PowerEdge R640",
    type: "Server",
    serialNumber: "SV-2021-640",
    processor: "Intel Xeon Silver 4210",
    ram: "64GB",
    storage: "2TB RAID",
    warrantyExpiry: "2025-09-14",
    assignedTo: "IT Department",
    department: "IT",
    status: "Active",
  },
];


  const total = dummyHardware.length;
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);

  const paginatedHardware = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return dummyHardware.slice(start, start + rowsPerPage);
  }, [page, rowsPerPage, dummyHardware]);

 return (
    <div className="p-0 h-full flex flex-col">
      <Card className="shadow-sm flex flex-col h-full bg-white overflow-hidden">

        {/* ---------- Sticky Header ---------- */}
        <CardHeader className="bg-white sticky top-0 z-20 ">
          <div className="flex items-center justify-between w-full gap-2">
            <h1 className="text-xl font-semibold">Hardware Inventory</h1>
            <Button
              size="sm"
              variant="default"
              className="h-8 px-3 flex items-center gap-2"
              onClick={() => {
                // TODO: open Add Hardware modal / navigate to add page
              }}
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Hardware</span>
            </Button>
          </div>
        </CardHeader>

        {/* ---------- Scrollable Table Content ---------- */}
        <CardContent className="flex-1 overflow-y-auto px-4">
          <HardwareTable
            hardware={paginatedHardware}
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

export default HardwarePage;
