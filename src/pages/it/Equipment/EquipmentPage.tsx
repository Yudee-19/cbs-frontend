import { useEffect, useMemo, useState } from "react";
import EquipmentTable from "./EquipmentTable";
import TablePagination from "@/components/ui/tablePagination";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import ShimmerTable from "@/components/ui/shimmerTable";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import {
  listNetworkEquipment,
  createNetworkEquipment,
  updateNetworkEquipment,
  deleteNetworkEquipment,
  type NetworkEquipmentData,
} from "@/services/itServices/NetworkEquipmentServices";
import EquipmentDetailsDrawer from "./EquipmentDetailsDrawer";
import EquipmentFormDialog from "./EquipmentFormDialog";

type Mode = "view" | "edit" | "add";

const emptyForm: NetworkEquipmentData = {
  equipmentName: "",
  equipmentType: "",
  ipAddress: "",
  macAddress: "",
  serialNumber: "",
  numberOfPorts: undefined,
  location: "",
  purchaseDate: new Date().toISOString(),
  warrantyExpiry: new Date().toISOString(),
  firmwareVersion: "",
  status: "Online",
};

const EquipmentPage = () => {
  const [items, setItems] = useState<NetworkEquipmentData[]>([]);
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
  const [current, setCurrent] = useState<NetworkEquipmentData | null>(null);
  const [itemToDelete, setItemToDelete] = useState<NetworkEquipmentData | null>(null);

  const [form, setForm] = useState<NetworkEquipmentData>(emptyForm);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { total: totalCount, items } = await listNetworkEquipment(page, rowsPerPage);
      console.log('Fetched items:', items);
      setItems(Array.isArray(items) ? items : []);
      setTotal(Number(totalCount) || 0);
      setError(null);
    } catch (e: any) {
      setError(e?.message || "Failed to load equipment.");
      setItems([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage]);

  // Map API shape -> table row shape while keeping ids for callbacks
  const rows = useMemo(
    () =>
      items.map((i) => ({
        id: i.id,
        name: i.equipmentName,
        type: i.equipmentType,
        ip: i.ipAddress,
        mac: i.macAddress,
        serial: i.serialNumber,
        ports: i.numberOfPorts,
        location: i.location,
        firmware: i.firmwareVersion,
        status: i.status,
      })),
    [items]
  );

  const findById = (id: number | string) =>
    items.find((it) => String(it.id) === String(id)) || null;

  const openAdd = () => {
    setMode("add");
    setCurrent(null);
    setForm(emptyForm);
    setEditDialogOpen(true);
  };

  const openViewById = (id: number | string) => {
    const item = findById(id);
    if (!item) return;
    setMode("view");
    setCurrent(item);
    setDrawerOpen(true);
  };

  const openEditById = (id: number | string) => {
    const item = findById(id);
    if (!item) return;
    setMode("edit");
    setCurrent(item);
    setForm({
      equipmentName: item.equipmentName,
      equipmentType: item.equipmentType,
      ipAddress: item.ipAddress,
      macAddress: item.macAddress,
      serialNumber: item.serialNumber,
      numberOfPorts: item.numberOfPorts,
      location: item.location,
      purchaseDate: item.purchaseDate,
      warrantyExpiry: item.warrantyExpiry,
      firmwareVersion: item.firmwareVersion,
      status: item.status,
      id: item.id,
    });
    setEditDialogOpen(true);
  };

  const requestDeleteById = (id: number | string) => {
    const item = findById(id);
    if (!item) return;
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    if (!itemToDelete?.id) return;
    try {
      setDeleting(true);
      await deleteNetworkEquipment(itemToDelete.id);
      setDeleteDialogOpen(false);
      setItemToDelete(null);
      await fetchData();
    } catch (e) {
      // noop
    } finally {
      setDeleting(false);
    }
  };

  const onFormChange = (patch: Partial<NetworkEquipmentData>) =>
    setForm((prev) => ({ ...prev, ...patch }));

  const handleFormSubmit = async () => {
    setSubmitting(true);
    try {
      if (mode === "add") {
        await createNetworkEquipment(form);
      } else if (mode === "edit" && current?.id) {
        await updateNetworkEquipment(current.id, form);
      }
      await fetchData();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-0 h-full flex flex-col">
      <Card className="shadow-sm flex flex-col h-full bg-white overflow-hidden">
        <CardHeader className="bg-white sticky top-0 z-20 ">
          <div className="flex items-center justify-between w-full gap-2">
            <h1 className="text-xl font-semibold">Network Equipment</h1>
            <Button
              size="sm"
              variant="default"
              className="h-8 px-3 flex items-center gap-2"
              onClick={openAdd}
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Equipment</span>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto px-4">
          {loading ? (
            <ShimmerTable columnCount={10} rowCount={rowsPerPage} />
          ) : error ? (
            <div className="text-sm text-red-600 py-6">{error}</div>
          ) : (
            <EquipmentTable
              equipment={rows}
              onViewDetails={(row: any) => openViewById(row.id)}
              onEdit={(row: any) => openEditById(row.id)}
              onDelete={(row: any) => requestDeleteById(row.id)}
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

      <EquipmentDetailsDrawer
        open={drawerOpen}
        item={current}
        onClose={() => setDrawerOpen(false)}
      />

      <EquipmentFormDialog
        open={editDialogOpen}
        mode={mode === "add" ? "add" : "edit"}
        form={form}
        onChange={onFormChange}
        onSubmit={handleFormSubmit}
        onClose={() => setEditDialogOpen(false)}
        onDelete={mode === "edit" && current ? () => requestDeleteById(current.id!) : undefined}
        submitting={submitting}
      />

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete equipment?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. It will permanently delete “
              {itemToDelete?.equipmentName || "this equipment"}”.
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

export default EquipmentPage;
