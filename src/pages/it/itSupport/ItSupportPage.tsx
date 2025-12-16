import { useEffect, useMemo, useState } from "react";
import ItSolutionTable from "./ItSupportTable";
import TablePagination from "@/components/ui/tablePagination";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import ShimmerTable from "@/components/ui/shimmerTable";
import { toast } from "sonner";

import ItSupportFormDialog from "./ItSupportFormDialog";
import ItSupportDetailsDrawer from "./ItSupportDetailsDrawer";

import {
  listSupportTickets,
  createSupportTicket,
  updateSupportTicket,
  deleteSupportTicket,
  type SupportTicketData,
} from "@/services/itServices/SupportServices";
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

const emptyForm: SupportTicketData = {
  ticketTitle: "",
  category: "",
  priority: "",
  department: "",
  assignTo: "",
  description: "",
  submittedBy: "",
  status: "Open",
};

const ItSupportPage = () => {
  const [items, setItems] = useState<SupportTicketData[]>([]);
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
  const [current, setCurrent] = useState<SupportTicketData | null>(null);
  const [itemToDelete, setItemToDelete] = useState<SupportTicketData | null>(null);

  const [form, setForm] = useState<SupportTicketData>(emptyForm);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { items: fetched, total: totalCount } = await listSupportTickets(page, rowsPerPage);
      setItems(Array.isArray(fetched) ? fetched : []);
      setTotal(Number(totalCount) || (Array.isArray(fetched) ? fetched.length : 0));
      setError(null);
      // if (showToast) {
      //   toast.success("Support list refreshed", {
      //     description: `Loaded ${fetched?.length ?? 0} item${(fetched?.length ?? 0) === 1 ? "" : "s"}.`,
      //   });
      // }
    } catch (e: any) {
      setError(e?.message || "Failed to load tickets.");
      toast.error("Failed to load tickets", { description: e?.message ?? "Unexpected error" });
      setItems([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage]);

  const openAdd = () => {
    setMode("add");
    setCurrent(null);
    setForm(emptyForm);
    setEditDialogOpen(true);
  };

  const openView = (item: SupportTicketData) => {
    setMode("view");
    setCurrent(item);
    setDrawerOpen(true);
  };

  const openEdit = (item: SupportTicketData) => {
    setMode("edit");
    setCurrent(item);
    setForm({ ...item });
    setEditDialogOpen(true);
  };

  const requestDelete = (item: SupportTicketData) => {
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    if (!itemToDelete?.id) return;
    try {
      setDeleting(true);
      await deleteSupportTicket(itemToDelete.id);
      toast.success("Ticket deleted", { description: itemToDelete.ticketTitle });
      setDeleteDialogOpen(false);
      setItemToDelete(null);
      await fetchData();
    } catch (e: any) {
      toast.error("Delete failed", { description: e?.message ?? "Unexpected error" });
    } finally {
      setDeleting(false);
    }
  };

  const onFormChange = (patch: Partial<SupportTicketData>) => setForm((p) => ({ ...p, ...patch }));

  const handleFormSubmit = async () => {
    setSubmitting(true);
    try {
      if (mode === "add") {
        await createSupportTicket(form);
        toast.success("Ticket created", { description: form.ticketTitle });
      } else if (mode === "edit" && current?.id) {
        await updateSupportTicket(current.id, form);
        toast.success("Ticket updated", { description: form.ticketTitle });
      }
      await fetchData();
      setEditDialogOpen(false);
    } catch (e: any) {
      toast.error(mode === "add" ? "Create failed" : "Update failed", {
        description: e?.message ?? "Unexpected error",
      });
      throw e;
    } finally {
      setSubmitting(false);
    }
  };

  const paginatedTickets = useMemo(() => items, [items]);

  return (
    <div className="p-0 h-full flex flex-col">
      <Card className="shadow-sm flex flex-col h-full bg-white overflow-hidden">
        <CardHeader className="bg-white sticky top-0 z-20 ">
          <div className="flex items-center justify-between w-full gap-2">
            <h1 className="text-xl font-semibold">IT Support</h1>
            <Button size="sm" variant="default" className="h-8 px-3 flex items-center gap-2" onClick={openAdd}>
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Ticket</span>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto px-4">
          {loading ? (
            <ShimmerTable columnCount={10} rowCount={rowsPerPage} />
          ) : error ? (
            <div className="text-sm text-red-600 py-6">{error}</div>
          ) : (
            <ItSolutionTable
              tickets={Array.isArray(paginatedTickets) ? paginatedTickets : []}
              onViewDetails={(t: any) => openView(t)}
              onEdit={(t: any) => openEdit(t)}
              onDelete={(t: any) => requestDelete(t)}
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

      <ItSupportDetailsDrawer open={drawerOpen} item={current} onClose={() => setDrawerOpen(false)} />

      <ItSupportFormDialog
        open={editDialogOpen}
        mode={mode === "add" ? "add" : "edit"}
        form={form}
        onChange={onFormChange}
        onSubmit={handleFormSubmit}
        onClose={() => setEditDialogOpen(false)}
        onDelete={mode === "edit" && current ? () => requestDelete(current) : undefined}
        submitting={submitting}
      />

      {/* Delete confirmation dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete ticket?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. It will permanently delete “{itemToDelete?.ticketTitle || "this ticket"}”.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary" size="sm" disabled={deleting}>Cancel</Button>
            </DialogClose>
            <Button type="button" variant="destructive" size="sm" onClick={handleDeleteConfirmed} disabled={deleting}>
              {deleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ItSupportPage;
