import { useEffect, useMemo, useState } from "react";
import FurnitureTable from "./FurnitureTable";
import TablePagination from "@/components/ui/tablePagination";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import ShimmerTable from "@/components/ui/shimmerTable";
import { toast } from "sonner";
import {
  listFurnitures,
  createFurniture,
  updateFurniture,
  deleteFurniture,
  type FurnitureData,
} from "@/services/assets/FurnituresServices";
import { FurnitureFormDialog } from "./FurnitureFormDialog";
import { FurnitureDetailsDrawer } from "./FurnitureDetailsDrawer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

const emptyForm: Partial<FurnitureData> = {
  itemName: "",
  itemCode: "",
  category: "",
  quantity: 0,
  location: "",
  condition: "",
  material: "",
  color: "",
  dimensions: "",
  supplier: "",
  purchaseDate: new Date().toISOString(),
  unitValue: 0,
  purchaseCurrency: "KWD",
  currentUnitValue: 0,
  currentCurrency: "KWD",
  warrantyExpiry: new Date().toISOString(),
  status: "Active",
  notes: "",
};

const FurniturePage = () => {
  const [items, setItems] = useState<FurnitureData[]>([]);
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
  const [current, setCurrent] = useState<FurnitureData | null>(null);
  const [itemToDelete, setItemToDelete] = useState<FurnitureData | null>(null);
  const [form, setForm] = useState<Partial<FurnitureData>>(emptyForm);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { items: data, total: totalCount } = await listFurnitures(page, rowsPerPage);
      setItems(Array.isArray(data) ? data : []);
      setTotal(Number(totalCount) || 0);
      setError(null);
    } catch (e: any) {
      setError(e?.message ?? "Failed to load furnitures");
      toast.error("Failed to load furnitures", { description: e?.message ?? "" });
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

  const openView = (item: FurnitureData) => {
    setMode("view");
    setCurrent(item);
    setDrawerOpen(true);
  };

  const openEdit = (item: FurnitureData) => {
    setMode("edit");
    setCurrent(item);
    setForm({ ...emptyForm, ...item });
    setFormDialogOpen(true);
  };

  const requestDelete = (item: FurnitureData) => {
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    if (!itemToDelete) return;
    try {
      setDeleting(true);
      await deleteFurniture(itemToDelete.id as string | number);
      toast.success("Furniture deleted", { description: itemToDelete.itemName });
      setDeleteDialogOpen(false);
      setItemToDelete(null);
      await fetchData();
    } catch (e: any) {
      toast.error("Delete failed", { description: e?.message ?? "" });
    } finally {
      setDeleting(false);
    }
  };

  const onFormChange = (patch: Partial<FurnitureData>) => setForm((p) => ({ ...p, ...patch }));

  const toISO = (v?: string | number) => {
    if (!v) return new Date().toISOString();
    const d = new Date(String(v));
    return Number.isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
  };

  const handleFormSubmit = async () => {
    setSubmitting(true);
    try {
      const payload: FurnitureData = {
        itemName: String(form.itemName ?? ""),
        itemCode: String(form.itemCode ?? ""),
        category: String(form.category ?? ""),
        quantity: form.quantity ? Number(form.quantity) : 0,
        location: String(form.location ?? ""),
        condition: String(form.condition ?? ""),
        material: String(form.material ?? ""),
        color: String(form.color ?? ""),
        dimensions: String(form.dimensions ?? ""),
        supplier: String(form.supplier ?? ""),
        purchaseDate: toISO(String(form.purchaseDate ?? "")),
        unitValue: form.unitValue ?? 0,
        purchaseCurrency: String(form.purchaseCurrency ?? "KWD"),
        currentUnitValue: form.currentUnitValue ?? 0,
        currentCurrency: String(form.currentCurrency ?? "KWD"),
        warrantyExpiry: toISO(String(form.warrantyExpiry ?? "")),
        status: String(form.status ?? "Active"),
        notes: String(form.notes ?? ""),
      };

      if (mode === "add") {
        await createFurniture(payload);
        toast.success("Furniture created", { description: payload.itemName });
      } else if (mode === "edit" && current) {
        await updateFurniture(current.id as string | number, payload);
        toast.success("Furniture updated", { description: payload.itemName });
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
            <h1 className="text-xl font-semibold">Furniture</h1>
            <Button size="sm" variant="default" className="h-8 px-3 flex items-center gap-2" onClick={openAdd}>
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Furniture</span>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto px-4">
          {loading ? (
            <ShimmerTable rowCount={rowsPerPage} columnCount={8} />
          ) : error ? (
            <div className="text-sm text-red-600">{error}</div>
          ) : (
            <FurnitureTable
              furniture={paginated}
              onViewDetails={(item: any) => openView(item)}
              onEdit={(item: any) => openEdit(item)}
              onDelete={(item: any) => requestDelete(item)}
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

      <FurnitureDetailsDrawer open={drawerOpen} item={current} onClose={() => setDrawerOpen(false)} />

      <FurnitureFormDialog
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
            <DialogTitle>Delete furniture?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. It will permanently delete “{itemToDelete?.itemName}”.
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

export default FurniturePage;
