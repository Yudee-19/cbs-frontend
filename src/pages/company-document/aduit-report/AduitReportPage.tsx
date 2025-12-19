import { useEffect, useMemo, useState } from "react";
import TablePagination from "@/components/ui/tablePagination";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import AduitReportTable from "./AduitReportTable";
import ShimmerTable from "@/components/ui/shimmerTable";
import { toast } from "sonner";
import {
  listAudits,
  createAudit,
  updateAuditById,
  deleteAudit,
  type Audit,
  type AuditData,
} from "@/services/company-documents/AuditServices";
import { AduitReportFormDialog } from "./AduitReportFormDialog";
import { AduitReportDetailsDrawer } from "./AduitReportDetailsDrawer";
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

const emptyForm: AuditData = {
  name: "",
  type: "",
  periodStart: new Date().toISOString(),
  periodEnd: new Date().toISOString(),
  auditor: "",
  completionDate: "",
  fileKey: "",
};

const AduitReportPage = () => {
  const [items, setItems] = useState<Audit[]>([]);
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
  const [current, setCurrent] = useState<Audit | null>(null);
  const [itemToDelete, setItemToDelete] = useState<Audit | null>(null);

  const [form, setForm] = useState<AuditData>(emptyForm);

  const fetchData = async (showToast = false) => {
    try {
      setLoading(true);
      const { total: totalCount, items } = await listAudits(page, rowsPerPage);
      setItems(Array.isArray(items) ? items : []);
      setTotal(Number(totalCount) || (Array.isArray(items) ? items.length : 0));
      setError(null);
      if (showToast) {
        toast.success("Audit reports refreshed", {
          description: `Loaded ${items.length} item${items.length === 1 ? "" : "s"}.`,
        });
      }
    } catch (e: any) {
      setError(e?.message || "Failed to load audit reports.");
      toast.error("Failed to load audit reports", { description: e?.message ?? "Unexpected error" });
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

  const openView = (item: Audit) => {
    setMode("view");
    setCurrent(item);
    setDrawerOpen(true);
  };

  const openEdit = (item: Audit) => {
    setMode("edit");
    setCurrent(item);
    setForm({
      name: item.name,
      type: item.type,
      periodStart: item.periodStart ?? new Date().toISOString(),
      periodEnd: item.periodEnd ?? new Date().toISOString(),
      auditor: item.auditor,
      completionDate: item.completionDate ?? "",
      fileKey: item.fileKey ?? "",
    });
    setEditDialogOpen(true);
  };

  const requestDelete = (item: Audit) => {
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    if (!itemToDelete) return;
    try {
      setDeleting(true);
      await deleteAudit(itemToDelete.id);
      toast.success("Audit deleted", { description: itemToDelete.name });
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

  const onFormChange = (patch: Partial<AuditData>) => setForm((p) => ({ ...p, ...patch }));

  const handleFormSubmit = async () => {
    setSubmitting(true);
    try {
      if (mode === "add") {
        await createAudit({
          ...form,
          periodStart: toISODate(form.periodStart),
          periodEnd: toISODate(form.periodEnd),
          completionDate: form.completionDate ? toISODate(form.completionDate) : undefined,
        });
        toast.success("Audit created", { description: form.name });
      } else if (mode === "edit" && current) {
        await updateAuditById(current.id, {
          ...form,
          periodStart: toISODate(form.periodStart),
          periodEnd: toISODate(form.periodEnd),
          completionDate: form.completionDate ? toISODate(form.completionDate) : undefined,
        });
        toast.success("Audit updated", { description: form.name });
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
            <h1 className="text-xl font-semibold">Audit Reports</h1>
            <Button size="sm" variant="default" className="h-8 px-3 flex items-center gap-2" onClick={openAdd}>
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Audit Report</span>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto px-4">
          {loading ? (
            <ShimmerTable rowCount={10} columnCount={6} />
          ) : error ? (
            <div className="text-sm text-red-600">{error}</div>
          ) : (
            <AduitReportTable
              auditReports={Array.isArray(paginated) ? paginated : []}
              onViewDetails={(item: Audit) => openView(item)}
              onEdit={(item: Audit) => openEdit(item)}
              onDelete={(item: Audit) => requestDelete(item)}
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

      <AduitReportDetailsDrawer open={drawerOpen} item={current} onClose={() => setDrawerOpen(false)} />

      <AduitReportFormDialog
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
            <DialogTitle>Delete audit report?</DialogTitle>
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

export default AduitReportPage;
