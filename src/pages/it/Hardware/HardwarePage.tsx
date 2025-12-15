import { useEffect, useMemo, useState } from "react";
import HardwareTable from "./HardwareTable";
import TablePagination from "@/components/ui/tablePagination";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import ShimmerTable from "@/components/ui/shimmerTable";
import { toast } from "sonner";
import {
  createHardware,
  updateHardwareById,
  deleteHardware,
  type Hardware,
  type HardwareData,
  listHardware,
} from "@/services/itServices/HardwareServices";
import { HardwareFormDialog } from "./HardwareFormDialog";
import { HardwareDetailsDrawer } from "./HardwareDetailsDrawer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

type Mode = "view" | "edit" | "add";

const emptyForm: HardwareData = {
  deviceName: "",
  type: "",
  serialNumber: "",
  operatingSystem: "",
  status: "Active",
  processor: "",
  ram: "",
  storage: "",
  purchaseDate: new Date().toISOString(),
  warrantyExpiry: new Date().toISOString(),
  assignedTo: "",
  department: "",
};

const HardwarePage = () => {
  const [items, setItems] = useState<Hardware[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);
  const [total, setTotal] = useState<number>(0);

  const [drawerOpen, setDrawerOpen] = useState(false); // view
  const [editDialogOpen, setEditDialogOpen] = useState(false); // add/edit
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // confirm delete
  const [deleting, setDeleting] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [mode, setMode] = useState<Mode>("view");
  const [current, setCurrent] = useState<Hardware | null>(null);
  const [itemToDelete, setItemToDelete] = useState<Hardware | null>(null);

  const [form, setForm] = useState<HardwareData>(emptyForm);
  // const totalItems = items.length;

  const fetchData = async (showToast = false) => {
    try {
      setLoading(true);
      const { total: totalCount, items } = await listHardware(page, rowsPerPage);
      console.log("Fetched hardware data:", totalCount);
      setItems(Array.isArray(items) ? items : []);
      setTotal(Number(totalCount) || 0);
      setError(null);

      if (showToast) {
        toast.success("Hardware list refreshed", {
          description: `Loaded ${items.length} item${items.length === 1 ? "" : "s"}.`,
        });
      }
    } catch (e: any) {
      setError(e?.message || "Failed to load hardware.");
      toast.error("Failed to load hardware", {
        description: e?.message ?? "Unexpected error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(false);
  }, [page, rowsPerPage]);

  const paginatedHardware = useMemo(() => items, [items]);

  const openAdd = () => {
    setMode("add");
    setCurrent(null);
    setForm(emptyForm);
    setEditDialogOpen(true);
  };

  const openView = (item: Hardware) => {
    setMode("view");
    setCurrent(item);
    setDrawerOpen(true);
  };

  const openEdit = (item: Hardware) => {
    setMode("edit");
    setCurrent(item);
    setForm({
      deviceName: item.deviceName,
      type: item.type,
      serialNumber: item.serialNumber,
      operatingSystem: item.operatingSystem,
      status: item.status,
      processor: item.processor,
      ram: item.ram,
      storage: item.storage,
      purchaseDate: item.purchaseDate,
      warrantyExpiry: item.warrantyExpiry,
      assignedTo: item.assignedTo,
      department: item.department,
    });
    setEditDialogOpen(true);
  };

  const requestDelete = (item: Hardware) => {
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    if (!itemToDelete) return;
    try {
      setDeleting(true);
      await deleteHardware(itemToDelete.id);
      toast.success("Hardware deleted", {
        description: itemToDelete.deviceName,
      });
      setDeleteDialogOpen(false);
      setItemToDelete(null);
      await fetchData(true);
    } catch (e: any) {
      console.error(e);
      toast.error("Delete failed", {
        description: e?.message ?? "Unexpected error",
      });
    } finally {
      setDeleting(false);
    }
  };

  const toISODate = (v: string) => {
    const d = new Date(v);
    if (Number.isNaN(d.getTime())) return new Date().toISOString();
    return d.toISOString();
  };

  const onFormChange = (patch: Partial<HardwareData>) =>
    setForm((prev) => ({ ...prev, ...patch }));

  const handleFormSubmit = async () => {
    setSubmitting(true);
    try {
      if (mode === "add") {
        await createHardware({
          ...form,
          purchaseDate: toISODate(form.purchaseDate),
          warrantyExpiry: toISODate(form.warrantyExpiry),
        });
        toast.success("Hardware created", { description: form.deviceName });
      } else if (mode === "edit" && current) {
        await updateHardwareById(current.id, {
          ...form,
          purchaseDate: toISODate(form.purchaseDate),
          warrantyExpiry: toISODate(form.warrantyExpiry),
        });
        toast.success("Hardware updated", { description: form.deviceName });
      }
      await fetchData(true);
    } catch (e: any) {
      toast.error(mode === "add" ? "Create failed" : "Update failed", {
        description: e?.message ?? "Unexpected error",
      });
      throw e;
    } finally {
      setSubmitting(false);
    }
  };

  // const readOnly = mode === "view";

  return (
    <div className="p-0 h-full flex flex-col">
      <Card className="shadow-sm flex flex-col h-full bg-white overflow-hidden">
        <CardHeader className="bg-white sticky top-0 z-20 ">
          <div className="flex items-center justify-between w-full gap-2">
            <h1 className="text-xl font-semibold">Hardware Inventory</h1>
            <Button
              size="sm"
              variant="default"
              className="h-8 px-3 flex items-center gap-2"
              onClick={openAdd}
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Hardware</span>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto px-4">
          {loading ? (
            <ShimmerTable rowCount={25} columnCount={6} />
          ) : error ? (
            <div className="text-sm text-red-600">{error}</div>
          ) : (
            <HardwareTable
              hardware={Array.isArray(paginatedHardware) ? paginatedHardware : []}
              onViewDetails={(item: Hardware) => openView(item)}
              onEdit={(item: Hardware) => openEdit(item)}
              onDelete={(item: Hardware) => requestDelete(item)}
            />
          )}
        </CardContent>

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

      {/* View details in Drawer */}
      <HardwareDetailsDrawer
        open={drawerOpen}
        item={current}
        onClose={() => setDrawerOpen(false)}
      />

      <HardwareFormDialog
        open={editDialogOpen}
        mode={mode === "add" ? "add" : "edit"}
        form={form}
        onChange={onFormChange}
        onSubmit={handleFormSubmit}
        onClose={() => setEditDialogOpen(false)}
        onDelete={
          mode === "edit" && current
            ? () => requestDelete(current)
            : undefined
        }
        submitting={submitting}
      />

      {/* Delete confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete hardware?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. It will permanently delete
              “{itemToDelete?.deviceName}”.
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

export default HardwarePage;
