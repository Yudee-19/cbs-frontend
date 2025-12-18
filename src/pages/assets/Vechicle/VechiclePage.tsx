import { useEffect, useMemo, useState } from "react";
import VehicleTable from "./VechicleTable";
import TablePagination from "@/components/ui/tablePagination";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import ShimmerTable from "@/components/ui/shimmerTable";
import { toast } from "sonner";
import {
  listVehicles,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  type VehicleData,
} from "@/services/assets/VehiclesServices";
import { VehicleFormDialog } from "./VehicleFormDialog";
import { VehicleDetailsDrawer } from "./VehicleDetailsDrawer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

const emptyForm: Partial<VehicleData> = {
  vehicleName: "",
  makeBrand: "",
  vehicleModel: "",
  vehicleType: "",
  year: new Date().getFullYear(),
  color: "",
  fuelType: "",
  chassisNumber: "",
  engineNumber: "",
  plateNumber: "",
  registrationExpiry: new Date().toISOString(),
  insuranceProvider: "",
  insuranceExpiry: new Date().toISOString(),
  purchaseDate: new Date().toISOString(),
  purchaseValue: 0,
  purchaseCurrency: "KWD",
  currentValue: 0,
  currentCurrency: "KWD",
  assignedTo: "",
  department: "",
  mileage: 0,
  lastService: new Date().toISOString(),
  nextService: new Date().toISOString(),
  status: "Active",
  notes: "",
};

const VehiclePage = () => {
  const [items, setItems] = useState<VehicleData[]>([]);
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
  const [current, setCurrent] = useState<VehicleData | null>(null);
  const [itemToDelete, setItemToDelete] = useState<VehicleData | null>(null);
  const [form, setForm] = useState<Partial<VehicleData>>(emptyForm);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { items: data, total: totalCount } = await listVehicles(page, rowsPerPage);
      setItems(Array.isArray(data) ? data : []);
      setTotal(Number(totalCount) || data.length || 0);
      setError(null);
      // if (showToast) toast.success("Vehicles refreshed");
    } catch (e: any) {
      setError(e?.message ?? "Failed to load vehicles");
      toast.error("Failed to load vehicles", { description: e?.message ?? "" });
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

  const openView = (item: VehicleData) => {
    setMode("view");
    setCurrent(item);
    setDrawerOpen(true);
  };

  const openEdit = (item: VehicleData) => {
    setMode("edit");
    setCurrent(item);
    setForm({
      ...emptyForm,
      ...item,
    });
    setFormDialogOpen(true);
  };

  const requestDelete = (item: VehicleData) => {
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    if (!itemToDelete) return;
    try {
      setDeleting(true);
      await deleteVehicle(itemToDelete.id as string | number);
      toast.success("Vehicle deleted", { description: itemToDelete.vehicleName });
      setDeleteDialogOpen(false);
      setItemToDelete(null);
      await fetchData();
    } catch (e: any) {
      toast.error("Delete failed", { description: e?.message ?? "" });
    } finally {
      setDeleting(false);
    }
  };

  const onFormChange = (patch: Partial<VehicleData>) =>
    setForm((prev) => ({ ...prev, ...patch }));

  const toISO = (v?: string | number) => {
    if (!v) return new Date().toISOString();
    const d = new Date(String(v));
    return Number.isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
  };

  const handleFormSubmit = async () => {
    setSubmitting(true);
    try {
      const payload: VehicleData = {
        vehicleName: String(form.vehicleName ?? ""),
        makeBrand: String(form.makeBrand ?? ""),
        vehicleModel: String(form.vehicleModel ?? ""),
        vehicleType: String(form.vehicleType ?? ""),
        year: form.year ? Number(form.year) : undefined,
        color: String(form.color ?? ""),
        fuelType: String(form.fuelType ?? ""),
        chassisNumber: String(form.chassisNumber ?? ""),
        engineNumber: String(form.engineNumber ?? ""),
        plateNumber: String(form.plateNumber ?? ""),
        registrationExpiry: toISO(String(form.registrationExpiry ?? "")),
        insuranceProvider: String(form.insuranceProvider ?? ""),
        insuranceExpiry: toISO(String(form.insuranceExpiry ?? "")),
        purchaseDate: toISO(String(form.purchaseDate ?? "")),
        purchaseValue: form.purchaseValue ?? 0,
        purchaseCurrency: String(form.purchaseCurrency ?? "KWD"),
        currentValue: form.currentValue ?? 0,
        currentCurrency: String(form.currentCurrency ?? "KWD"),
        assignedTo: String(form.assignedTo ?? ""),
        department: String(form.department ?? ""),
        mileage: form.mileage ? Number(form.mileage) : undefined,
        lastService: toISO(String(form.lastService ?? "")),
        nextService: toISO(String(form.nextService ?? "")),
        status: String(form.status ?? "Active"),
        notes: String(form.notes ?? ""),
      };

      if (mode === "add") {
        await createVehicle(payload);
        toast.success("Vehicle created", { description: payload.vehicleName });
      } else if (mode === "edit" && current) {
        await updateVehicle(current.id as string | number, payload);
        toast.success("Vehicle updated", { description: payload.vehicleName });
      }

      setFormDialogOpen(false);
      await fetchData();
    } catch (e: any) {
      toast.error(mode === "add" ? "Create failed" : "Update failed", {
        description: e?.message ?? "",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-0 h-full flex flex-col">
      <Card className="shadow-sm flex flex-col h-full bg-white overflow-hidden">
        <CardHeader className="bg-white sticky top-0 z-20 ">
          <div className="flex items-center justify-between w-full gap-2">
            <h1 className="text-xl font-semibold">Vehicle</h1>
            <Button size="sm" variant="default" className="h-8 px-3 flex items-center gap-2" onClick={openAdd}>
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Vehicle</span>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto px-4">
          {loading ? (
            <ShimmerTable rowCount={rowsPerPage} columnCount={8} />
          ) : error ? (
            <div className="text-sm text-red-600">{error}</div>
          ) : (
            <VehicleTable
              vehicle={paginated}
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

      <VehicleDetailsDrawer open={drawerOpen} item={current} onClose={() => setDrawerOpen(false)} />

      <VehicleFormDialog
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
            <DialogTitle>Delete vehicle?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. It will permanently delete “{itemToDelete?.vehicleName}”.
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

export default VehiclePage;
