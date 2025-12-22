import { useEffect, useMemo, useState } from "react";
import TablePagination from "@/components/ui/tablePagination";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import LegalDocumentTable from "./LegalDocumentTable";
import ShimmerTable from "@/components/ui/shimmerTable";
import { toast } from "sonner";
import {
  listDocuments,
  createDocument,
  updateDocumentById,
  deleteDocument,
  type LegalDoc,
  type LegalDocData,
} from "@/services/company-documents/LegalDocServices";
import { LegalDocumentFormDialog } from "./LegalDocumentFormDialog";
import { LegalDocumentDetailsDrawer } from "./LegalDocumentDetailsDrawer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { getPresignedUrls, uploadFileToS3 } from "@/services/utils/fileUploaderService";

type Mode = "view" | "edit" | "add";

const emptyForm: LegalDocData = {
  name: "",
  category: "",
  documentDate: new Date().toISOString(),
  partiesInvolved: "",
  fileKey: "",
};

const LegalDocumentPage = () => {
  const [items, setItems] = useState<LegalDoc[]>([]);
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
  const [current, setCurrent] = useState<LegalDoc | null>(null);
  const [itemToDelete, setItemToDelete] = useState<LegalDoc | null>(null);

  const [form, setForm] = useState<LegalDocData>(emptyForm);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { total: totalCount, items } = await listDocuments(page, rowsPerPage);
      setItems(Array.isArray(items) ? items : []);
      setTotal(Number(totalCount) || (Array.isArray(items) ? items.length : 0));
      setError(null);
    } catch (e: any) {
      setError(e?.message || "Failed to load documents.");
      toast.error("Failed to load documents", { description: e?.message ?? "Unexpected error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage]);

  const paginated = useMemo(() => items, [items]);

  const openAdd = () => {
    setMode("add");
    setCurrent(null);
    setForm(emptyForm);
    setSelectedFile(null);
    setEditDialogOpen(true);
  };

  const openView = (item: LegalDoc) => {
    setMode("view");
    setCurrent(item);
    setDrawerOpen(true);
  };

  const openEdit = (item: LegalDoc) => {
    setMode("edit");
    setCurrent(item);
    setForm({
      name: item.name,
      category: item.category,
      documentDate: item.documentDate ?? new Date().toISOString(),
      partiesInvolved: item.partiesInvolved,
      fileKey: item.fileKey ?? "",
    });
    setSelectedFile(null);
    setEditDialogOpen(true);
  };

  const requestDelete = (item: LegalDoc) => {
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    if (!itemToDelete) return;
    try {
      setDeleting(true);
      await deleteDocument(itemToDelete.id);
      toast.success("Document deleted", { description: itemToDelete.name });
      setDeleteDialogOpen(false);
      setItemToDelete(null);
      await fetchData();
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

  // const onFormChange = (patch: Partial<LegalDocData>) => setForm((p) => ({ ...p, ...patch }));

  const handleFormSubmit = async () => {
    setSubmitting(true);
    try {
      let fileKeyToUse = form.fileKey || "";

      if (selectedFile) {
        const presign = await getPresignedUrls("legal", [
          {
            filename: selectedFile.name,
            mimeType: selectedFile.type || "application/octet-stream",
            size: selectedFile.size,
            fileType: "certificate",
          },
        ]);

        const first = presign?.data?.files?.[0];
        if (!first?.presignedUrl || !first?.s3Key) {
          throw new Error("Failed to get upload URL");
        }

        await uploadFileToS3(
          first.presignedUrl,
          selectedFile,
          selectedFile.type || "application/octet-stream"
        );

        fileKeyToUse = first.s3Key;
      }

      const payload = {
        ...form,
        documentDate: toISODate(form.documentDate),
        fileKey: fileKeyToUse || undefined,
      };

      if (mode === "add") {
        await createDocument(payload);
        toast.success("Document created", { description: form.name });
      } else if (mode === "edit" && current) {
        await updateDocumentById(current.id, payload);
        toast.success("Document updated", { description: form.name });
      }
      await fetchData();
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
            <h1 className="text-xl font-semibold">Legal Documents</h1>
            <Button size="sm" variant="default" className="h-8 px-3 flex items-center gap-2" onClick={openAdd}>
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Document</span>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto px-4">
          {loading ? (
            <ShimmerTable rowCount={10} columnCount={6} />
          ) : error ? (
            <div className="text-sm text-red-600">{error}</div>
          ) : (
            <LegalDocumentTable
              legalDocuments={Array.isArray(paginated) ? paginated : []}
              onViewDetails={(item: LegalDoc) => openView(item)}
              onEdit={(item: LegalDoc) => openEdit(item)}
              onDelete={(item: LegalDoc) => requestDelete(item)}
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

      <LegalDocumentDetailsDrawer open={drawerOpen} item={current} onClose={() => setDrawerOpen(false)} />

      <LegalDocumentFormDialog
        open={editDialogOpen}
        mode={mode === "add" ? "add" : "edit"}
        form={form}
        onChange={(patch) => setForm((p) => ({ ...p, ...patch }))}
        onSubmit={handleFormSubmit}
        onClose={() => setEditDialogOpen(false)}
        onDelete={mode === "edit" && current ? () => requestDelete(current) : undefined}
        submitting={submitting}
        onFilesChanged={(files) => {
          const first = files[0];
          setSelectedFile(first ?? null);
          setForm((p) => ({ ...p, fileKey: first ? first.name : "" }));
        }}
      />

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete document?</DialogTitle>
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

export default LegalDocumentPage;
