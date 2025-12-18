import { useEffect, useMemo, useState } from "react";
import EquipmentTable from "./EquipmentTable";
import TablePagination from "@/components/ui/tablePagination";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import ShimmerTable from "@/components/ui/shimmerTable";
import { toast } from "sonner";
import {
  listEquipment,
  createEquipment,
  updateEquipment,
  deleteEquipment,
  type EquipmentData,
} from "@/services/assets/EquipmentServices";
import { EquipmentFormDialog } from "./EquipmentFormDialog";
import { EquipmentDetailsDrawer } from "./EquipmentDetailsDrawer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

const emptyForm: Partial<EquipmentData> = {
  equipmentName: "",
  category: "",
  manufacturer: "",
  equipmentModel: "",
  serialNumber: "",
  condition: "",
  location: "",
  assignedTo: "",
  purchaseDate: new Date().toISOString(),
  purchaseValue: 0,
  purchaseCurrency: "KWD",
  currentValue: 0,
  currentCurrency: "KWD",
  warrantyProvider: "",
  warrantyExpiry: new Date().toISOString(),
  lastMaintenanceDate: new Date().toISOString(),
  nextMaintenanceDate: new Date().toISOString(),
  maintenanceContract: "",
  status: "Active",
  technicalSpecifications: "",
};

const EquipmentPage = () => {
  const [items, setItems] = useState<EquipmentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);
  const [total, setTotal] = useState<number>(0);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [mode, setMode] = useState<"view" | "edit" | "add">("view");
  const [current, setCurrent] = useState<EquipmentData | null>(null);
  const [itemToDelete, setItemToDelete] = useState<EquipmentData | null>(null);
  const [form, setForm] = useState<Partial<EquipmentData>>(emptyForm);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { items: data, total: totalCount } = await listEquipment(page, rowsPerPage);
      setItems(Array.isArray(data) ? data : []);
      setTotal(Number(totalCount) || (Array.isArray(data) ? data.length : 0));
      setError(null);
    } catch (e: any) {
      setError(e?.message ?? "Failed to load equipment");
      toast.error("Failed to load equipment", { description: e?.message ?? "" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage]);

  const paginated = useMemo(() => items, [items]);

  const openAdd = () => {
    setMode("add");
    setCurrent(null);
    setForm(emptyForm);
    setFormDialogOpen(true);
  };

  const openView = (item: EquipmentData) => {
    setMode("view");
    setCurrent(item);
    setDrawerOpen(true);
  };

  const openEdit = (item: EquipmentData) => {
    setMode("edit");
    setCurrent(item);
    setForm({ ...emptyForm, ...item });
    setFormDialogOpen(true);
  };

  const requestDelete = (item: EquipmentData) => {
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    if (!itemToDelete) return;
    try {
      setDeleting(true);
      await deleteEquipment(itemToDelete.id as string | number);
      toast.success("Equipment deleted", { description: itemToDelete.equipmentName });
      setDeleteDialogOpen(false);
      setItemToDelete(null);
      await fetchData();
    } catch (e: any) {
      toast.error("Delete failed", { description: e?.message ?? "" });
    } finally {
      setDeleting(false);
    }
  };

  const onFormChange = (patch: Partial<EquipmentData>) => setForm((p) => ({ ...p, ...patch }));

  const toISO = (v?: string | number) => {
    if (!v) return new Date().toISOString();
    const d = new Date(String(v));
    return Number.isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
  };

  const handleFormSubmit = async () => {
    setSubmitting(true);
    try {
      const payload: EquipmentData = {
        equipmentName: String(form.equipmentName ?? ""),
        category: String(form.category ?? ""),
        manufacturer: String(form.manufacturer ?? ""),
        equipmentModel: String(form.equipmentModel ?? ""),
        serialNumber: String(form.serialNumber ?? ""),
        condition: String(form.condition ?? ""),
        location: String(form.location ?? ""),
        assignedTo: String(form.assignedTo ?? ""),
        purchaseDate: toISO(String(form.purchaseDate ?? "")),
        purchaseValue: form.purchaseValue ?? 0,
        purchaseCurrency: String(form.purchaseCurrency ?? "KWD"),
        currentValue: form.currentValue ?? 0,
        currentCurrency: String(form.currentCurrency ?? "KWD"),
        warrantyProvider: String(form.warrantyProvider ?? ""),
        warrantyExpiry: toISO(String(form.warrantyExpiry ?? "")),
        lastMaintenanceDate: toISO(String(form.lastMaintenanceDate ?? "")),
        nextMaintenanceDate: toISO(String(form.nextMaintenanceDate ?? "")),
        maintenanceContract: String(form.maintenanceContract ?? ""),
        status: String(form.status ?? "Active"),
        technicalSpecifications: String(form.technicalSpecifications ?? ""),
      };

      if (mode === "add") {
        await createEquipment(payload);
        toast.success("Equipment created", { description: payload.equipmentName });
      } else if (mode === "edit" && current) {
        await updateEquipment(current.id as string | number, payload);
        toast.success("Equipment updated", { description: payload.equipmentName });
      }

      setFormDialogOpen(false);
      await fetchData();
    } catch (e: any) {
      toast.error(mode === "add" ? "Create failed" : "Update failed", { description: e?.message ?? "" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-0 h-full flex flex-col">
      <Card className="shadow-sm flex flex-col h-full bg-white overflow-hidden">
        <CardHeader className="bg-white sticky top-0 z-20 ">
          <div className="flex items-center justify-between w-full gap-2">
            <h1 className="text-xl font-semibold">Equipment</h1>
            <Button size="sm" variant="default" className="h-8 px-3 flex items-center gap-2" onClick={openAdd}>
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Equipment</span>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto px-4">
          {loading ? (
            <ShimmerTable rowCount={rowsPerPage} columnCount={8} />
          ) : error ? (
            <div className="text-sm text-red-600">{error}</div>
          ) : (
            <EquipmentTable
              equipment={paginated}
              onViewDetails={(row) => openView(row)}
              onEdit={(row) => openEdit(row)}
              onDelete={(row) => requestDelete(row)}
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

      <EquipmentDetailsDrawer open={drawerOpen} item={current} onClose={() => setDrawerOpen(false)} />

      <EquipmentFormDialog
        open={formDialogOpen}
        mode={mode === "add" ? "add" : "edit"}
        form={form}
        onChange={onFormChange}
        onSubmit={handleFormSubmit}
        onClose={() => setFormDialogOpen(false)}
        onDelete={mode === "edit" && current ? () => requestDelete(current) : undefined}
        submitting={submitting}
      />

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete equipment?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. It will permanently delete “{itemToDelete?.equipmentName}”.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary" size="sm" disabled={deleting}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="button" variant="destructive" size="sm" onClick={handleDeleteConfirmed} disabled={deleting}>
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

export default EquipmentPage;
