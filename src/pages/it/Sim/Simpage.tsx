import { useMemo, useState, useRef } from "react";
import SimTable from "./SimTable";
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

const SimPage = () => {
 const dummySimCards = [
  {
    id: 1,
    simNumber: "SIM-89965-2024-001",
    phoneNumber: "+965 9876 5432",
    carrier: "Zain Kuwait",
    planType: "Business Unlimited",
    monthlyFee: "25,000 (KWD)",
    extraCharges: "5,000 (KWD)",
    simCharges: "40,000 (KWD)",
    totalCharges: "Unlimited",
    dataLimit: "Unlimited",
    assignedTo: "John Smith",
    department: "Sales",
    expiryDate: "2025-01-15",
    status: "Active",
  },
  {
    id: 2,
    simNumber: "SIM-89965-2024-002",
    phoneNumber: "+965 9876 5433",
    carrier: "Ooredoo Kuwait",
    planType: "Business Premium",
    monthlyFee: "30,000 (KWD)",
    extraCharges: "5,000 (KWD)",
    simCharges: "50,000 (KWD)",
    totalCharges: "100GB",
    dataLimit: "100GB",
    assignedTo: "Sarah Johnson",
    department: "Marketing",
    expiryDate: "2025-02-10",
    status: "Inactive",
  },
  {
    id: 3,
    simNumber: "SIM-89965-2023-045",
    phoneNumber: "+965 9876 5434",
    carrier: "STC Kuwait",
    planType: "Standard",
    monthlyFee: "15,000 (KWD)",
    extraCharges: "5,000 (KWD)",
    simCharges: "20,000 (KWD)",
    totalCharges: "50GB",
    dataLimit: "50GB",
    assignedTo: "Unassigned",
    department: "IT",
    expiryDate: "2024-06-20",
    status: "Active",
  },
  {
    id: 4,
    simNumber: "SIM-89965-2024-003",
    phoneNumber: "+965 9876 5435",
    carrier: "Zain Kuwait",
    planType: "Business Basic",
    monthlyFee: "20,000 (KWD)",
    extraCharges: "5,000 (KWD)",
    simCharges: "30,000 (KWD)",
    totalCharges: "75GB",
    dataLimit: "75GB",
    assignedTo: "Michael Brown",
    department: "Operations",
    expiryDate: "2025-03-01",
    status: "Active",
  },
  {
    id: 5,
    simNumber: "SIM-89965-2023-089",
    phoneNumber: "+965 9876 5436",
    carrier: "Ooredoo Kuwait",
    planType: "Business Unlimited",
    monthlyFee: "25,000 (KWD)",
    extraCharges: "5,000 (KWD)",
    simCharges: "30,000 (KWD)",
    totalCharges: "Unlimited",
    dataLimit: "Unlimited",
    assignedTo: "Ahmed Al-Rashid",
    department: "Finance",
    expiryDate: "2024-11-15",
    status: "Suspended",
  },

  // Repeat set like screenshot
  {
    id: 6,
    simNumber: "SIM-89965-2024-001",
    phoneNumber: "+965 9876 5432",
    carrier: "Zain Kuwait",
    planType: "Business Unlimited",
    monthlyFee: "25,000 (KWD)",
    extraCharges: "5,000 (KWD)",
    simCharges: "40,000 (KWD)",
    totalCharges: "Unlimited",
    dataLimit: "Unlimited",
    assignedTo: "John Smith",
    department: "Sales",
    expiryDate: "2025-01-15",
    status: "Active",
  },
  {
    id: 7,
    simNumber: "SIM-89965-2024-002",
    phoneNumber: "+965 9876 5433",
    carrier: "Ooredoo Kuwait",
    planType: "Business Premium",
    monthlyFee: "30,000 (KWD)",
    extraCharges: "5,000 (KWD)",
    simCharges: "50,000 (KWD)",
    totalCharges: "100GB",
    dataLimit: "100GB",
    assignedTo: "Sarah Johnson",
    department: "Marketing",
    expiryDate: "2025-02-10",
    status: "Inactive",
  },
  {
    id: 8,
    simNumber: "SIM-89965-2023-045",
    phoneNumber: "+965 9876 5434",
    carrier: "STC Kuwait",
    planType: "Standard",
    monthlyFee: "15,000 (KWD)",
    extraCharges: "5,000 (KWD)",
    simCharges: "20,000 (KWD)",
    totalCharges: "50GB",
    dataLimit: "50GB",
    assignedTo: "Unassigned",
    department: "IT",
    expiryDate: "2024-06-20",
    status: "Active",
  },
];

  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);
  const [filter, setFilter] = useState<string>("all");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const filteredSimCards = useMemo(() => {
    if (filter === "all") return dummySimCards;
    return dummySimCards.filter(
      (s) => s.status?.toLowerCase() === filter.toLowerCase()
    );
  }, [filter, dummySimCards]);

  const total = filteredSimCards.length;

  const paginatedSimCards = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredSimCards.slice(start, start + rowsPerPage);
  }, [page, rowsPerPage, filteredSimCards]);

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
      ["id", "simNumber", "phoneNumber", "status"],
      ...filteredSimCards.map((r) => [
        r.id,
        r.simNumber,
        r.phoneNumber,
        r.status,
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

      <StatCard
        title="Active SIMs"
        value="03"
        icon={<Users size={20} className="text-green-600" />}
        bgColor="bg-green-100"
      />

      <StatCard
        title="Monthly Cost"
        value="KD 120.00"
        icon={<Calendar size={20} className="text-blue-600" />}
        bgColor="bg-blue-100"
      />

      <StatCard
        title="Suspended"
        value="01"
        icon={<UserMinus size={20} className="text-red-600" />}
        bgColor="bg-red-100"
      />

      <StatCard
        title="Inactive"
        value="01"
        icon={<Ban size={20} className="text-gray-600" />}
        bgColor="bg-gray-200"
      />

    </div>
      <Card className="shadow-sm flex flex-col h-full bg-white overflow-hidden">

        {/* ---------- Sticky Header ---------- */}
        <CardHeader className="bg-white sticky top-0 z-20 ">
          <div className="flex items-center justify-between w-full gap-2">
            <h1 className="text-xl font-semibold">SIM Card Managemnt</h1>

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
                <span className="hidden sm:inline">Add SIM Card</span>
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* ---------- Scrollable Table Content ---------- */}
        <CardContent className="flex-1 overflow-y-auto px-4">
          <SimTable
            sim={paginatedSimCards}
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

export default SimPage;
