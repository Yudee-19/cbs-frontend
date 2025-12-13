import { useMemo, useState, useRef } from "react";
import HardwareTransferTable from "./HardwareTansferTable";
import TablePagination from "@/components/ui/tablePagination";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Ban,
  Calendar,
  Plus,
  UserMinus,
  Users,
  Upload,
  Download,
} from "lucide-react";
import StatCard from "@/components/ui/statCard";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const HardwareTransferPage = () => {
const hardwareTransferDummy = [
  {
    id: 1,
    transferId: "HT-2024-001",
    hardware: "Dell Latitude 7420",
    hardwareType: "Laptop",
    serialNumber: "DL-2023-001",

    fromPerson: "John Smith",
    fromDept: "Finance",

    toPerson: "Sarah Johnson",
    toDept: "Marketing",

    transferDate: "2024-11-01",
    returnDate: "-",
    condition: "Excellent",
    status: "Active",
    reason: "Department relocation",
  },

  {
    id: 2,
    transferId: "HT-2024-002",
    hardware: "HP EliteDesk 800 G6",
    hardwareType: "Desktop",
    serialNumber: "HP-2022-008",

    fromPerson: "Michael Brown",
    fromDept: "Operations",

    toPerson: "Ahmed Al-Rashid",
    toDept: "Finance",

    transferDate: "2024-10-15",
    returnDate: "2024-11-10",
    condition: "Good",
    status: "Returned",
    reason: "Temporary backup during repair",
  },

  {
    id: 3,
    transferId: "HT-2024-003",
    hardware: "MacBook Pro 16”",
    hardwareType: "Laptop",
    serialNumber: "AP-2023-012",

    fromPerson: "IT Department",
    fromDept: "IT",

    toPerson: "Emma Wilson",
    toDept: "Design",

    transferDate: "2024-11-05",
    returnDate: "-",
    condition: "Excellent",
    status: "Permanent Transfer",
    reason: "New hire assignment",
  },

  {
    id: 4,
    transferId: "HT-2024-004",
    hardware: "Lenovo ThinkPad T14",
    hardwareType: "Laptop",
    serialNumber: "LN-2020-015",

    fromPerson: "Unassigned",
    fromDept: "IT",

    toPerson: "David Lee",
    toDept: "Sales",

    transferDate: "2024-11-12",
    returnDate: "-",
    condition: "Good",
    status: "Pending",
    reason: "New employee onboarding",
  },

  {
    id: 5,
    transferId: "HT-2024-002",
    hardware: "HP EliteDesk 800 G6",
    hardwareType: "Desktop",
    serialNumber: "HP-2022-008",

    fromPerson: "Michael Brown",
    fromDept: "Operations",

    toPerson: "Ahmed Al-Rashid",
    toDept: "Finance",

    transferDate: "2024-10-15",
    returnDate: "2024-11-10",
    condition: "Good",
    status: "Returned",
    reason: "Temporary backup during repair",
  },

  {
    id: 6,
    transferId: "HT-2024-001",
    hardware: "Dell Latitude 7420",
    hardwareType: "Laptop",
    serialNumber: "DL-2023-001",

    fromPerson: "John Smith",
    fromDept: "Finance",

    toPerson: "Sarah Johnson",
    toDept: "Marketing",

    transferDate: "2024-11-01",
    returnDate: "-",
    condition: "Excellent",
    status: "Active",
    reason: "Department relocation",
  },
];

const transferStats = [
  {
    title: "Active Transfers",
    value: "02",
    icon: <Calendar size={20} className="text-blue-600" />,
    bgColor: "bg-blue-100",
  },
  {
    title: "Returned",
    value: "02",
    icon: <Users size={20} className="text-green-600" />,
    bgColor: "bg-green-100",
  },
  {
    title: "Permanent",
    value: "01",
    icon: <Ban size={20} className="text-gray-600" />,
    bgColor: "bg-gray-200",
  },
  {
    title: "Pending",
    value: "01",
    icon: <UserMinus size={20} className="text-red-600" />,
    bgColor: "bg-red-100",
  },
];


  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);
  const [filter, setFilter] = useState<string>("all");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const filteredHardware = useMemo(() => {
    if (filter === "all") return hardwareTransferDummy;
    return hardwareTransferDummy.filter(
      (s) => s.status?.toLowerCase() === filter.toLowerCase()
    );
  }, [filter, hardwareTransferDummy]);

  const total = filteredHardware.length;

  const paginatedHardware = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredHardware.slice(start, start + rowsPerPage);
  }, [page, rowsPerPage, filteredHardware]);

  const onImportClick = () => {
    fileInputRef.current?.click();
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // TODO: handle import parsing
    console.log("Import file:", file.name);
    e.currentTarget.value = "";
  };

  const onExport = () => {
    // simple CSV export of currently filtered data (id, simNumber, phoneNumber, status)
    const rows = [
      ["id", "transferId", "hardware", "hardwareType", "serialNumber", "fromPerson", "fromDept", "toPerson", "toDept", "transferDate", "returnDate", "condition", "status", "reason"],
      ...filteredHardware.map((r) => [
        r.id,
        r.transferId,
        r.hardware,
        r.hardwareType,
        r.serialNumber,
        r.fromPerson,
        r.fromDept,
        r.toPerson,
        r.toDept,
        r.transferDate,
        r.returnDate,
        r.condition,
        r.status,
        r.reason,
      ]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sims-export.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

 return (
    <div className="p-0 h-full flex flex-col">
        <div className="grid grid-cols-4 gap-4 pb-4">

 {transferStats.map((item, index) => (
    <StatCard
      key={index}
      title={item.title}
      value={item.value}
      icon={item.icon}
      bgColor={item.bgColor}
    />
  ))}

    </div>
      <Card className="shadow-sm flex flex-col h-full bg-white overflow-hidden">

        {/* ---------- Sticky Header ---------- */}
        <CardHeader className="bg-white sticky top-0 z-20 ">
          <div className="flex items-center justify-between w-full gap-2">
            <h1 className="text-xl font-semibold">Hardware Tansfer Tracking</h1>

            {/* right controls: filter, export, import, add */}
            <div className="flex items-center gap-2">
              <div className="w-40">
                <Select onValueChange={(v) => { setFilter(v); setPage(1); }} defaultValue="all">
                  <SelectTrigger size="sm" className="w-full">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button size="sm" variant="outline" className="h-8 px-2 flex items-center gap-2" onClick={onExport}>
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Export Report</span>
              </Button>

              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.xlsx"
                className="hidden"
                onChange={onFileChange}
              />
              <Button size="sm" variant="outline" className="h-8 px-2 flex items-center gap-2" onClick={onImportClick}>
                <Upload className="h-4 w-4" />
                <span className="hidden sm:inline">Import</span>
              </Button>

              <Button
                size="sm"
                variant="default"
                className="h-8 px-3 flex items-center gap-2"
                onClick={() => {
                  // TODO: open Add Hardware modal / navigate to add page
                }}
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">New Transfer</span>
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* ---------- Scrollable Table Content ---------- */}
        <CardContent className="flex-1 overflow-y-auto px-4">
          <HardwareTransferTable
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

export default HardwareTransferPage;
