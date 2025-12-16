import { useEffect, useMemo, useState } from "react";
import SoftwareTable from "./SoftwareTable";
import TablePagination from "@/components/ui/tablePagination";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import * as Service from "@/services/itServices/SoftwareLicenseServices";
import SoftwareDetailsDrawer from "./SoftwareDetailsDrawer";
import SoftwareFormDialog from "./SoftwareFormDialog";
import ShimmerTable from "@/components/ui/shimmerTable"; // add
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { toast } from "sonner"; // ...added

const SoftwarePage = () => {
  const [softwareList, setSoftwareList] = useState<Service.SoftwareLicenseData[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);
  const [loading, setLoading] = useState<boolean>(true); // add

  const [selected, setSelected] = useState<Service.SoftwareLicenseData | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [formData, setFormData] = useState<Service.SoftwareLicenseData>({ name: "" });
  const [submitting, setSubmitting] = useState(false);

  // NEW: delete confirmation state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Service.SoftwareLicenseData | null>(null);

  const load = async () => {
    setLoading(true); // add
    try {
      const { items, total } = await Service.listSoftware(page, rowsPerPage);
      setSoftwareList(Array.isArray(items) ? items : []);
      setTotal(Number(total) || 0);
      // success toast optional on manual refresh; uncomment if desired
      // toast.success("Software list loaded", { description: `Loaded ${items.length} items.` });
    } catch (e: any) {
      console.error(e);
      setSoftwareList([]);
      setTotal(0);
      toast.error("Failed to load software", { description: e?.message ?? "Unexpected error" }); // ...added
    } finally {
      setLoading(false); // add
    }
  };

  useEffect(() => { load(); }, [page, rowsPerPage]);

  const paginatedSoftware = useMemo(() => softwareList, [softwareList]);

  const openView = (item: Service.SoftwareLicenseData) => {
    setSelected(item);
    setDrawerOpen(true);
  };

  const openAdd = () => {
    setFormMode("add");
    setFormData({ name: "" });
    setFormOpen(true);
  };

  const openEdit = (item: Service.SoftwareLicenseData) => {
    setFormMode("edit");
    setFormData(item);
    setFormOpen(true);
  };

  // REPLACE old handleDelete with request + confirm handlers
  const requestDelete = (item?: Service.SoftwareLicenseData) => {
    const target = item ?? formData;
    if (!target?.id) return;
    setItemToDelete(target);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    if (!itemToDelete?.id) return;
    try {
      setDeleting(true);
      await Service.deleteSoftware(itemToDelete.id);
      toast.success("Software deleted", { description: itemToDelete.name }); // ...added
      await load();
      setDeleteDialogOpen(false);
      setItemToDelete(null);
      setFormOpen(false); // close form if deletion triggered from edit dialog
    } catch (e: any) {
      console.error(e);
      toast.error("Delete failed", { description: e?.message ?? "Unexpected error" }); // ...added
    } finally {
      setDeleting(false);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);

    // Basic client-side validation to match server rules
    const pd = formData.purchaseDate ? new Date(formData.purchaseDate) : null;
    const ed = formData.expiryDate ? new Date(formData.expiryDate) : null;
    const totalSeats = Number(formData.totalSeats ?? 0);
    const seatsUsed = Number(formData.seatsUsed ?? 0);

    // Expiry must be after purchase
    if (pd && ed && ed.getTime() <= pd.getTime()) {
      console.error("Expiry date must be after purchase date");
      toast.error("Expiry date must be after purchase date"); // ...added
      setSubmitting(false);
      return;
    }

    // Seats used cannot exceed total seats
    if (totalSeats > 0 && seatsUsed > totalSeats) {
      console.error("Seats used cannot exceed total seats");
      toast.error("Seats used cannot exceed total seats"); // ...added
      setSubmitting(false);
      return;
    }

    try {
      if (formMode === "add") {
        await Service.createSoftware(formData);
        toast.success("Software created", { description: formData.name }); // ...added
      } else if (formMode === "edit" && formData.id) {
        await Service.updateSoftware(formData.id, formData);
        toast.success("Software updated", { description: formData.name }); // ...added
      }
      await load();
      setFormOpen(false);
    } catch (e: any) {
      console.error(e);
      toast.error(formMode === "add" ? "Create failed" : "Update failed", {
        description: e?.message ?? "Unexpected error",
      }); // ...added
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-0 h-full flex flex-col">
      <Card className="shadow-sm flex flex-col h-full bg-white overflow-hidden">
        <CardHeader className="bg-white sticky top-0 z-20 ">
          <div className="flex items-center justify-between w-full gap-2">
            <h1 className="text-xl font-semibold">Software License</h1>
            <Button size="sm" variant="default" className="h-8 px-3 flex items-center gap-2" onClick={openAdd}>
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Software</span>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto px-4">
          {loading ? (
            <ShimmerTable columnCount={12} rowCount={rowsPerPage} />
          ) : (
            <>
              {/* onDelete triggers confirmation dialog */}
              <SoftwareTable
                software={Array.isArray(paginatedSoftware) ? paginatedSoftware : []}
                onViewDetails={(i: any) => openView(i)}
                onEdit={(i: any) => openEdit(i)}
                onDelete={(i: any) => requestDelete(i)}
              />
            </>
          )}
        </CardContent>

        <div className="border-t bg-white sticky bottom-0 z-20 px-2">
          <TablePagination
            total={total}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={(p: number) => setPage(p)}
            onRowsPerPageChange={(r: number) => { setRowsPerPage(r); setPage(1); }}
          />
        </div>
      </Card>

      <SoftwareDetailsDrawer open={drawerOpen} item={selected} onClose={() => setDrawerOpen(false)} />

      <SoftwareFormDialog
        open={formOpen}
        mode={formMode}
        form={formData}
        onChange={(patch) => setFormData((s) => ({ ...s, ...patch }))}
        onSubmit={handleSubmit}
        onClose={() => setFormOpen(false)}
        onDelete={formMode === "edit" ? () => requestDelete() : undefined}
        submitting={submitting}
      />

      {/* NEW: Delete confirmation dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete software?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. It will permanently delete “{itemToDelete?.name || "this software"}”.
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

export default SoftwarePage;
