import { useMemo, useState, useRef, useEffect } from "react";
import SimTable from "./SimTable";
import TablePagination from "@/components/ui/tablePagination";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ban, Calendar, Plus, UserMinus, Users, Upload, Download, Loader2 } from "lucide-react";
import StatCard from "@/components/ui/statCard";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import {
  listSims,
  createSim,
  updateSim,
  deleteSim,
  type SimData,
} from "@/services/itServices/SimServices";
import { SimFormDialog } from "./SimFormDialog";
import { SimDetailsDrawer } from "./SimDetailsDrawer";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import ShimmerTable from "@/components/ui/shimmerTable";
import { toast } from "sonner";

const SimPage = () => {
  const [items, setItems] = useState<SimData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);
  const [total, setTotal] = useState<number>(0);

  const [filter, setFilter] = useState<string>("all");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [current, setCurrent] = useState<SimData | null>(null);
  const [form, setForm] = useState<Partial<SimData>>({});
  const [submitting, setSubmitting] = useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<SimData | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchData(false);
  }, [page, rowsPerPage, filter]);

  const fetchData = async (showToast = false) => {
    try {
      setLoading(true);
      const { items: sims, total: totalCount } = await listSims(page, rowsPerPage);
      const filtered = filter === "all" ? sims : sims.filter((s) => (s.status ?? "").toLowerCase() === filter.toLowerCase());
      setItems(filtered);
      setTotal(totalCount);
      setError(null);
      if (showToast) toast.success("SIMs refreshed", { description: `Loaded ${filtered.length} item${filtered.length === 1 ? "" : "s"}.` });
    } catch (e: any) {
      setError(e?.message ?? "Failed to load sims");
      toast.error("Failed to load sims", { description: e?.message ?? "Unexpected error" });
    } finally {
      setLoading(false);
    }
  };

  const paginatedSimCards = useMemo(() => items, [items]);

  const openAdd = () => {
    setMode("add");
    setCurrent(null);
    setForm({});
    setFormOpen(true);
  };

  const openEdit = (item: SimData) => {
    setMode("edit");
    setCurrent(item);
    setForm({ ...item });
    setFormOpen(true);
  };

  const openView = (item: SimData) => {
    setCurrent(item);
    setDrawerOpen(true);
  };

  const requestDelete = (item: SimData) => {
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    if (!itemToDelete) return;
    try {
      setDeleting(true);
      await deleteSim(itemToDelete.id as any);
      toast.success("SIM deleted", { description: itemToDelete.simNumber });
      setDeleteDialogOpen(false);
      setItemToDelete(null);
      await fetchData(true);
    } catch (e: any) {
      toast.error("Delete failed", { description: e?.message ?? "Unexpected error" });
    } finally {
      setDeleting(false);
    }
  };

  const onFormChange = (patch: Partial<SimData>) => setForm((p) => ({ ...(p ?? {}), ...patch }));

  const handleFormSubmit = async () => {
    setSubmitting(true);
    try {
      if (mode === "add") {
        await createSim(form as SimData);
        toast.success("SIM created", { description: form?.simNumber });
      } else if (mode === "edit" && current?.id) {
        await updateSim(current.id as any, form as Partial<SimData>);
        toast.success("SIM updated", { description: form?.simNumber });
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

  const onImportClick = () => fileInputRef.current?.click();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // TODO: parse/import
    console.log("Import file:", file.name);
    e.currentTarget.value = "";
  };

  const onExport = () => {
    const rows = [
      ["id", "simNumber", "phoneNumber", "status"],
      ...items.map((r) => [r.id, r.simNumber, r.phoneNumber, r.status]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${String(c ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sims-export.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  // stat values (simple derivation)
  const activeCount = items.filter((i) => (i.status ?? "").toLowerCase() === "active").length;
  const suspendedCount = items.filter((i) => (i.status ?? "").toLowerCase() === "suspended").length;
  const inactiveCount = items.filter((i) => (i.status ?? "").toLowerCase() === "inactive").length;

  return (
    <div className="p-0 h-full flex flex-col">
      <div className="grid grid-cols-4 gap-4 pb-4">
        <StatCard title="Active SIMs" value={String(activeCount).padStart(2, "0")} icon={<Users size={20} className="text-green-600" />} bgColor="bg-green-100" />
        <StatCard title="Monthly Cost" value="KD 120.00" icon={<Calendar size={20} className="text-blue-600" />} bgColor="bg-blue-100" />
        <StatCard title="Suspended" value={String(suspendedCount).padStart(2, "0")} icon={<UserMinus size={20} className="text-red-600" />} bgColor="bg-red-100" />
        <StatCard title="Inactive" value={String(inactiveCount).padStart(2, "0")} icon={<Ban size={20} className="text-gray-600" />} bgColor="bg-gray-200" />
      </div>

      <Card className="shadow-sm flex flex-col h-full bg-white overflow-hidden">
        <CardHeader className="bg-white sticky top-0 z-20 ">
          <div className="flex items-center justify-between w-full gap-2">
            <h1 className="text-xl font-semibold">SIM Card Management</h1>
            <div className="flex items-center gap-2">
              <div className="w-40">
                <Select onValueChange={(v) => { setFilter(v); setPage(1); }} defaultValue="all">
                  <SelectTrigger size="sm" className="w-full"><SelectValue placeholder="All" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>

            {false && (<><Button size="sm" variant="outline" className="h-8 px-2 flex items-center gap-2" onClick={onExport}>
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export Report</span>
            </Button>

            <input ref={fileInputRef} type="file" accept=".csv,.xlsx" className="hidden" onChange={onFileChange} />
            <Button size="sm" variant="outline" className="h-8 px-2 flex items-center gap-2" onClick={onImportClick}>
              <Upload className="h-4 w-4" />
              <span className="hidden sm:inline">Import</span>
            </Button>
</>)}
              <Button size="sm" variant="default" className="h-8 px-3 flex items-center gap-2" onClick={openAdd}>
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Add SIM Card</span>
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
            <SimTable sim={paginatedSimCards} onViewDetails={(item: any) => openView(item)} onEdit={(item: any) => openEdit(item)} onDelete={(item: any) => requestDelete(item)} />
          )}
        </CardContent>

        <div className="border-t bg-white sticky bottom-0 z-20 px-2">
          <TablePagination total={total} page={page} rowsPerPage={rowsPerPage} onPageChange={(p: number) => setPage(p)} onRowsPerPageChange={(r: number) => { setRowsPerPage(r); setPage(1); }} />
        </div>
      </Card>

      <SimDetailsDrawer open={drawerOpen} item={current} onClose={() => setDrawerOpen(false)} />

      <SimFormDialog
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
            <DialogTitle>Delete SIM?</DialogTitle>
            <DialogDescription>This action cannot be undone. It will permanently delete “{itemToDelete?.simNumber}”.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary" size="sm" disabled={deleting}>Cancel</Button>
            </DialogClose>
            <Button type="button" variant="destructive" size="sm" onClick={handleDeleteConfirmed} disabled={deleting}>
              {deleting ? <> <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Deleting...</> : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SimPage;
