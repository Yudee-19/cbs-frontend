import { useEffect, useMemo, useState } from "react";
import TablePagination from "@/components/ui/tablePagination";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import LicenseTable from "./LicenseTable";
import ShimmerTable from "@/components/ui/shimmerTable";
import { toast } from "sonner";
import {
  listLicenses,
  createLicense,
  updateLicenseById,
  deleteLicense,
  type License,
  type LicenseData,
} from "@/services/company-documents/licensesServices";
import { LicenseFormDialog } from "./LicenseFormDialog";
import { LicenseDetailsDrawer } from "./LicenseDetailsDrawer";
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

const emptyForm: LicenseData = {
  name: "",
  number: "",
  issueDate: new Date().toISOString(),
  expiryDate: new Date().toISOString(),
  issuingAuthority: "",
  fileKey: "",
};

const LicensePage = () => {
  const [items, setItems] = useState<License[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);
  const [total, setTotal] = useState<number>(0);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [mode, setMode] = useState<Mode>("view");
  const [current, setCurrent] = useState<License | null>(null);
  const [itemToDelete, setItemToDelete] = useState<License | null>(null);

  const [form, setForm] = useState<LicenseData>(emptyForm);

  const fetchData = async (showToast = false) => {
    try {
      setLoading(true);
      const { total: totalCount, items } = await listLicenses(page, rowsPerPage);
      setItems(Array.isArray(items) ? items : []);
      setTotal(Number(totalCount) || (Array.isArray(items) ? items.length : 0));
      setError(null);
      if (showToast) {
        toast.success("License list refreshed", {
          description: `Loaded ${items.length} item${items.length === 1 ? "" : "s"}.`,
        });
      }
    } catch (e: any) {
      setError(e?.message || "Failed to load licenses.");
      toast.error("Failed to load licenses", {
        description: e?.message ?? "Unexpected error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(false);
  }, [page, rowsPerPage]);

  const paginated = useMemo(() => items, [items]);

  const openAdd = () => {
    setMode("add");
    setCurrent(null);
    setForm(emptyForm);
    setEditDialogOpen(true);
  };

  const openView = (item: License) => {
    setMode("view");
    setCurrent(item);
    setDrawerOpen(true);
  };

  const openEdit = (item: License) => {
    setMode("edit");
    setCurrent(item);
    setForm({
      name: item.name,
      number: item.number,
      issueDate: item.issueDate ?? new Date().toISOString(),
      expiryDate: item.expiryDate ?? new Date().toISOString(),
      issuingAuthority: item.issuingAuthority,
      fileKey: item.fileKey ?? "",
    });
    setEditDialogOpen(true);
  };

  const requestDelete = (item: License) => {
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    if (!itemToDelete) return;
    try {
      setDeleting(true);
      await deleteLicense(itemToDelete.id);
      toast.success("License deleted", { description: itemToDelete.name });
      setDeleteDialogOpen(false);
      setItemToDelete(null);
      await fetchData(true);
    } catch (e: any) {
      toast.error("Delete failed", { description: e?.message ?? "Unexpected error" });
    } finally {
      setDeleting(false);
    }
  };

  const toISODate = (v: string) => {
    const d = new Date(v);
    if (Number.isNaN(d.getTime())) return new Date().toISOString();
    return d.toISOString();
  };

  const onFormChange = (patch: Partial<LicenseData>) => setForm((p) => ({ ...p, ...patch }));

  const handleFormSubmit = async () => {
    setSubmitting(true);
    try {
      if (mode === "add") {
        await createLicense({
          ...form,
          issueDate: toISODate(form.issueDate),
          expiryDate: toISODate(form.expiryDate),
        });
        toast.success("License created", { description: form.name });
      } else if (mode === "edit" && current) {
        await updateLicenseById(current.id, {
          ...form,
          issueDate: toISODate(form.issueDate),
          expiryDate: toISODate(form.expiryDate),
        });
        toast.success("License updated", { description: form.name });
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

  return (
    <div className="p-0 h-full flex flex-col">
      <Card className="shadow-sm flex flex-col h-full bg-white overflow-hidden">
        <CardHeader className="bg-white sticky top-0 z-20 ">
          <div className="flex items-center justify-between w-full gap-2">
            <h1 className="text-xl font-semibold">Licenses</h1>
            <Button size="sm" variant="default" className="h-8 px-3 flex items-center gap-2" onClick={openAdd}>
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add License</span>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto px-4">
          {loading ? (
            <ShimmerTable rowCount={10} columnCount={6} />
          ) : error ? (
            <div className="text-sm text-red-600">{error}</div>
          ) : (
            <LicenseTable
              licenses={Array.isArray(paginated) ? paginated : []}
              onViewDetails={(item: License) => openView(item)}
              onEdit={(item: License) => openEdit(item)}
              // onDownload={(item: License) => { onDownload(item); }}
              onDelete={(item: License) => requestDelete(item)}
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

      <LicenseDetailsDrawer open={drawerOpen} item={current} onClose={() => setDrawerOpen(false)} />

      <LicenseFormDialog
        open={editDialogOpen}
        mode={mode === "add" ? "add" : "edit"}
        form={form}
        onChange={onFormChange}
        onSubmit={handleFormSubmit}
        onClose={() => setEditDialogOpen(false)}
        onDelete={mode === "edit" && current ? () => requestDelete(current) : undefined}
        submitting={submitting}
      />

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete license?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. It will permanently delete “{itemToDelete?.name}”.
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

export default LicensePage;
