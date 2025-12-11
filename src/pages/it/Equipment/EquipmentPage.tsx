import { useMemo, useState } from "react";
import SoftwareTable from "./EquipmentTable";
import TablePagination from "@/components/ui/tablePagination";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const EquipmentPage = () => {
 const dummyNetworkEquipment = [
  {
    id: 1,
    name: "Cisco Catalyst 9300",
    type: "Switch",
    ip: "192.168.1.1",
    mac: "00:1B:44:11:3A:B7",
    serial: "CS-2022-001",
    ports: 48,
    location: "Server Room – Rack A",
    firmware: "IOS XE 17.6.1",
    status: "Online",
  },
  {
    id: 2,
    name: "Fortinet FortiGate 200F",
    type: "Firewall",
    ip: "10.0.0.1",
    mac: "00:09:0F:09:00:01",
    serial: "FG-2021-008",
    ports: 16,
    location: "Server Room – Rack B",
    firmware: "FortiOS 7.2.3",
    status: "Online",
  },
  {
    id: 3,
    name: "Ubiquiti UniFi AP Pro",
    type: "Access Point",
    ip: "192.168.1.50",
    mac: "F0:9F:C2:A1:2B:3C",
    serial: "UA-2023-015",
    ports: 2,
    location: "Floor 2 – East Wing",
    firmware: "UniFi 6.5.5.4",
    status: "Online",
  },
  {
    id: 4,
    name: "Cisco ISR 4331",
    type: "Router",
    ip: "203.45.12.1",
    mac: "00:1E:14:5C:8D:9E",
    serial: "RT-2020-003",
    ports: 4,
    location: "Server Room – Main Rack",
    firmware: "IOS XE 16.12.5",
    status: "Offline",
  },
  {
    id: 5,
    name: "TP-Link TL-SG1024D",
    type: "Switch",
    ip: "192.168.1.2",
    mac: "1C:6B:B4:3A:F2:1D",
    serial: "TP-2023-012",
    ports: 24,
    location: "Floor 1 – IT Department",
    firmware: "v1.0.4",
    status: "Online",
  },

  // Duplicate set for full table like screenshot
  {
    id: 6,
    name: "Cisco Catalyst 9300",
    type: "Switch",
    ip: "192.168.1.1",
    mac: "00:1B:44:11:3A:B7",
    serial: "CS-2022-001",
    ports: 48,
    location: "Server Room – Rack A",
    firmware: "IOS XE 17.6.1",
    status: "Online",
  },
  {
    id: 7,
    name: "Fortinet FortiGate 200F",
    type: "Firewall",
    ip: "10.0.0.1",
    mac: "00:09:0F:09:00:01",
    serial: "FG-2021-008",
    ports: 16,
    location: "Server Room – Rack B",
    firmware: "FortiOS 7.2.3",
    status: "Online",
  },
  {
    id: 8,
    name: "Ubiquiti UniFi AP Pro",
    type: "Access Point",
    ip: "192.168.1.50",
    mac: "F0:9F:C2:A1:2B:3C",
    serial: "UA-2023-015",
    ports: 2,
    location: "Floor 2 – East Wing",
    firmware: "UniFi 6.5.5.4",
    status: "Online",
  },
  {
    id: 9,
    name: "Cisco ISR 4331",
    type: "Router",
    ip: "203.45.12.1",
    mac: "00:1E:14:5C:8D:9E",
    serial: "RT-2020-003",
    ports: 4,
    location: "Server Room – Main Rack",
    firmware: "IOS XE 16.12.5",
    status: "Offline",
  },
  {
    id: 10,
    name: "TP-Link TL-SG1024D",
    type: "Switch",
    ip: "192.168.1.2",
    mac: "1C:6B:B4:3A:F2:1D",
    serial: "TP-2023-012",
    ports: 24,
    location: "Floor 1 – IT Department",
    firmware: "v1.0.4",
    status: "Online",
  },
];




  const total = dummyNetworkEquipment.length;
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);

  const paginatedEquipment = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return dummyNetworkEquipment.slice(start, start + rowsPerPage);
  }, [page, rowsPerPage, dummyNetworkEquipment]);

 return (
    <div className="p-0 h-full flex flex-col">
      <Card className="shadow-sm flex flex-col h-full bg-white overflow-hidden">

        {/* ---------- Sticky Header ---------- */}
        <CardHeader className="bg-white sticky top-0 z-20 ">
          <div className="flex items-center justify-between w-full gap-2">
            <h1 className="text-xl font-semibold">Network Equipment</h1>
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
          <SoftwareTable
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
