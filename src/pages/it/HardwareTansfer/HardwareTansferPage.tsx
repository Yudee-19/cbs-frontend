import { useMemo, useState, useEffect } from "react";
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
} from "lucide-react";
import StatCard from "@/components/ui/statCard";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import ShimmerTable from "@/components/ui/shimmerTable";
import { toast } from "sonner";

import {
  listHardwareTransfers,
  createHardwareTransfer,
  updateHardwareTransfer,
  deleteHardwareTransfer,
  type HardwareTransferData,
} from "@/services/itServices/HardwareTansferServices";

import { HardwareTransferFormDialog } from "./HardwareTansferFormDialog";
import { HardwareTransferDetailsDrawer } from "./HardwareTansferDetailsDrawer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

const HardwareTransferPage = () => {
  const [items, setItems] = useState<HardwareTransferData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);
  const [total, setTotal] = useState<number>(0);

  const [filter, setFilter] = useState<string>("all");
  // const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [current, setCurrent] = useState<HardwareTransferData | null>(null);
  const [form, setForm] = useState<Partial<HardwareTransferData>>({});
  const [submitting, setSubmitting] = useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<HardwareTransferData | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchData = async (showToast = false) => {
    try {
      setLoading(true);
      const { items: transfers, total: totalCount } = await listHardwareTransfers(page, rowsPerPage);
      const filtered = filter === "all" ? transfers : transfers.filter((t) => (t.status ?? "").toLowerCase() === filter.toLowerCase());
      setItems(filtered);
      setTotal(totalCount);
      setError(null);
      if (showToast) toast.success("Transfers refreshed", { description: `Loaded ${filtered.length}` });
    } catch (e: any) {
      setError(e?.message ?? "Failed to load transfers");
      toast.error("Failed to load transfers", { description: e?.message ?? "Unexpected error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(false);
  }, [page, rowsPerPage, filter]);

  const openAdd = () => {
    setMode("add");
    setCurrent(null);
    setForm({});
    setFormOpen(true);
  };

  const openEdit = (item: HardwareTransferData) => {
    setMode("edit");
    setCurrent(item);
    setForm({ ...item });
    setFormOpen(true);
  };

  const openView = (item: HardwareTransferData) => {
    setCurrent(item);
    setDrawerOpen(true);
  };

  const requestDelete = (item: HardwareTransferData) => {
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    if (!itemToDelete) return;
    try {
      setDeleting(true);
      await deleteHardwareTransfer(itemToDelete.id as any);
      toast.success("Transfer deleted", { description: itemToDelete.transferReason ?? String(itemToDelete.id) });
      setDeleteDialogOpen(false);
      setItemToDelete(null);
      await fetchData(true);
    } catch (e: any) {
      toast.error("Delete failed", { description: e?.message ?? "Unexpected error" });
    } finally {
      setDeleting(false);
    }
  };

  const onFormChange = (patch: Partial<HardwareTransferData>) => setForm((p) => ({ ...(p ?? {}), ...patch }));

  const handleFormSubmit = async () => {
    setSubmitting(true);
    try {
      if (mode === "add") {
        await createHardwareTransfer(form as HardwareTransferData);
        toast.success("Transfer created", { description: (form as any).transferId ?? "" });
      } else if (mode === "edit" && current?.id) {
        await updateHardwareTransfer(current.id as any, form as Partial<HardwareTransferData>);
        toast.success("Transfer updated", { description: (form as any).transferId ?? "" });
      }
      setFormOpen(false);
      await fetchData(true);
    } catch (e: any) {
      toast.error(mode === "add" ? "Create failed" : "Update failed", { description: e?.message ?? "Unexpected error" });
      throw e;
    } finally {
      setSubmitting(false);
    }
  };

  // const onImportClick = () => fileInputRef.current?.click();

  // const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;
  //   console.log("Import file:", file.name);
  //   e.currentTarget.value = "";
  // };

  // const onExport = () => {
  //   const rows = [
  //     ["id","transferId","hardwareName","serialNumber","fromUser","toUser","transferDate","expectedReturnDate","status"],
  //     ...items.map(r => [r.id,r.transferId,r.hardwareName,r.serialNumber,r.fromUser,r.toUser,r.transferDate,r.expectedReturnDate,r.status])
  //   ];
  //   const csv = rows.map(r => r.map(c => `"${String(c ?? "").replace(/"/g,'""')}"`).join(",")).join("\n");
  //   const blob = new Blob([csv], { type: "text/csv" });
  //   const url = URL.createObjectURL(blob);
  //   const a = document.createElement("a");
  //   a.href = url;
  //   a.download = "hardware-transfers.csv";
  //   a.click();
  //   URL.revokeObjectURL(url);
  // };

  const transferStats = useMemo(() => {
    const active = items.filter(i => (i.status ?? "").toLowerCase() === "active").length;
    const returned = items.filter(i => (i.status ?? "").toLowerCase() === "returned").length;
    const permanent = items.filter(i => (i.status ?? "").toLowerCase() === "permanent transfer").length;
    const pending = items.filter(i => (i.status ?? "").toLowerCase() === "pending").length;
    return [
      { title: "Active Transfers", value: String(active).padStart(2,"0"), icon: <Calendar size={20} className="text-blue-600" />, bgColor: "bg-blue-100" },
      { title: "Returned", value: String(returned).padStart(2,"0"), icon: <Users size={20} className="text-green-600" />, bgColor: "bg-green-100" },
      { title: "Permanent", value: String(permanent).padStart(2,"0"), icon: <Ban size={20} className="text-gray-600" />, bgColor: "bg-gray-200" },
      { title: "Pending", value: String(pending).padStart(2,"0"), icon: <UserMinus size={20} className="text-red-600" />, bgColor: "bg-red-100" },
    ];
  }, [items]);

  const paginatedHardware = useMemo(() => items, [items]);

  return (
    <div className="p-0 h-full flex flex-col">
      <div className="grid grid-cols-4 gap-4 pb-4">
        {transferStats.map((s, idx) => <StatCard key={idx} title={s.title} value={s.value} icon={s.icon} bgColor={s.bgColor} />)}
      </div>

      <Card className="shadow-sm flex flex-col h-full bg-white overflow-hidden">
        <CardHeader className="bg-white sticky top-0 z-20 ">
          <div className="flex items-center justify-between w-full gap-2">
            <h1 className="text-xl font-semibold">Hardware Transfer Tracking</h1>
            <div className="flex items-center gap-2">
              <div className="w-40">
                <Select onValueChange={(v) => { setFilter(v); setPage(1); }} defaultValue="all">
                  <SelectTrigger size="sm" className="w-full"><SelectValue placeholder="All" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Returned">Returned</SelectItem>
                    <SelectItem value="Permanent Transfer">Permanent Transfer</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* <Button size="sm" variant="outline" className="h-8 px-2 flex items-center gap-2">
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Export Report</span>
              </Button>

              <input ref={fileInputRef} type="file" accept=".csv,.xlsx" className="hidden" onChange={onFileChange} />
              <Button size="sm" variant="outline" className="h-8 px-2 flex items-center gap-2" onClick={onImportClick}>
                <Upload className="h-4 w-4" />
                <span className="hidden sm:inline">Import</span>
              </Button> */}

              <Button size="sm" variant="default" className="h-8 px-3 flex items-center gap-2" onClick={openAdd}>
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">New Transfer</span>
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto px-4">
          {loading ? (
           <ShimmerTable columnCount={10} rowCount={rowsPerPage} />
          ) : error ? (
            <div className="text-sm text-red-600">{error}</div>
          ) : (
            <HardwareTransferTable
              hardware={paginatedHardware}
              onViewDetails={(item) => openView(item)}
              onEdit={(item) => openEdit(item)}
              onDelete={(item) => requestDelete(item)}
            />
          )}
        </CardContent>

        <div className="border-t bg-white sticky bottom-0 z-20 px-2">
          <TablePagination total={total} page={page} rowsPerPage={rowsPerPage} onPageChange={(p: number) => setPage(p)} onRowsPerPageChange={(r: number) => { setRowsPerPage(r); setPage(1); }} />
        </div>
      </Card>

      <HardwareTransferDetailsDrawer open={drawerOpen} item={current} onClose={() => setDrawerOpen(false)} />

      <HardwareTransferFormDialog
        open={formOpen}
        mode={mode}
        form={form}
        onChange={onFormChange}
        onSubmit={handleFormSubmit}
        onClose={() => setFormOpen(false)}
        onDelete={mode === "edit" && current ? () => requestDelete(current) : undefined}
        submitting={submitting}
      />

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete transfer?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. It will permanently delete “
              {itemToDelete?.hardwareName || itemToDelete?.transferReason || String(itemToDelete?.id) || "this transfer"}”.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary" size="sm" disabled={deleting}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={handleDeleteConfirmed}
              disabled={deleting}
            >
              {deleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HardwareTransferPage;
