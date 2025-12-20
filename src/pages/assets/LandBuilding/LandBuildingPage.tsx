import { useEffect, useMemo, useState } from "react";
import LandBuildingTable from "./LandBuildingTable";
import TablePagination from "@/components/ui/tablePagination";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import ShimmerTable from "@/components/ui/shimmerTable";
import { toast } from "sonner";
import {
  listProperties,
  createProperty,
  updateProperty,
  deleteProperty,
  type PropertyData,
} from "@/services/assets/PropertiesServices";
import { LandBuildingFormDialog } from "./LandBuildingFormDialog";
import { LandBuildingDetailsDrawer } from "./LandBuildingDetailsDrawer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

const emptyForm: Partial<PropertyData> = {
  propertyName: "",
  propertyType: "Building",
  location: "",
  area: 0,
  unit: "sqm",
  propertyUsage: "Office",
  numberOfFloors: 1,
  ownershipType: "Owned",
  titleDeedNumber: "",
  purchaseDate: new Date().toISOString(),
  purchaseValue: 0,
  purchaseCurrency: "KWD",
  currentValue: 0,
  currentCurrency: "KWD",
  annualMaintenanceCost: 0,
  insuranceExpiryDate: new Date().toISOString(),
  status: "Active",
};

const LandBuildingPage = () => {
  const [items, setItems] = useState<PropertyData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
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
  const [current, setCurrent] = useState<PropertyData | null>(null);
  const [itemToDelete, setItemToDelete] = useState<PropertyData | null>(null);
  const [form, setForm] = useState<Partial<PropertyData>>(emptyForm);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { items: data, total: totalCount } = await listProperties(page, rowsPerPage);
      setItems(Array.isArray(data) ? data : []);
      setTotal(Number(totalCount) || 0);
      setError(null);
      // if (showToast) {
      //   toast.success("Properties refreshed", {
      //     description: `Loaded ${data.length} item${data.length === 1 ? "" : "s"}.`,
      //   });
      // }
    } catch (e: any) {
      setError(e?.message ?? "Failed to load properties");
      toast.error("Failed to load properties", { description: e?.message ?? "" });
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

  const openView = (item: PropertyData) => {
    setMode("view");
    setCurrent(item);
    setDrawerOpen(true);
  };

  const openEdit = (item: PropertyData) => {
    setMode("edit");
    setCurrent(item);
    setForm({
      propertyName: item.propertyName ?? "",
      propertyType: item.propertyType ?? "Building",
      location: item.location ?? "",
      area:
        item.area === undefined || item.area === null
          ? 0
          : typeof item.area === "number"
          ? item.area
          : Number(item.area),
      unit: item.unit ?? "sqm",
      propertyUsage: item.propertyUsage ?? "Office",
      numberOfFloors:
        item.numberOfFloors === undefined || item.numberOfFloors === null
          ? 1
          : typeof item.numberOfFloors === "number"
          ? item.numberOfFloors
          : Number(item.numberOfFloors),
      ownershipType: item.ownershipType ?? "Owned",
      titleDeedNumber: item.titleDeedNumber ?? "",
      purchaseDate: item.purchaseDate
        ? new Date(String(item.purchaseDate)).toISOString()
        : new Date().toISOString(),
      purchaseValue:
        item.purchaseValue === undefined || item.purchaseValue === null
          ? 0
          : typeof item.purchaseValue === "number"
          ? item.purchaseValue
          : Number(item.purchaseValue),
      purchaseCurrency: item.purchaseCurrency ?? "KWD",
      currentValue:
        item.currentValue === undefined || item.currentValue === null
          ? 0
          : typeof item.currentValue === "number"
          ? item.currentValue
          : Number(item.currentValue),
      currentCurrency: item.currentCurrency ?? "KWD",
      annualMaintenanceCost:
        item.annualMaintenanceCost === undefined || item.annualMaintenanceCost === null
          ? 0
          : typeof item.annualMaintenanceCost === "number"
          ? item.annualMaintenanceCost
          : Number(item.annualMaintenanceCost),
      insuranceExpiryDate: item.insuranceExpiryDate
        ? new Date(String(item.insuranceExpiryDate)).toISOString()
        : new Date().toISOString(),
      status: item.status ?? "Active",
    });
    setFormDialogOpen(true);
  };

  const requestDelete = (item: PropertyData) => {
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    if (!itemToDelete) return;
    try {
      setDeleting(true);
      await deleteProperty(itemToDelete.id as string | number);
      toast.success("Property deleted", { description: itemToDelete.propertyName });
      setDeleteDialogOpen(false);
      setItemToDelete(null);
      await fetchData();
    } catch (e: any) {
      toast.error("Delete failed", { description: e?.message ?? "" });
    } finally {
      setDeleting(false);
    }
  };

  const onFormChange = (patch: Partial<PropertyData>) =>
    setForm((prev) => ({ ...prev, ...patch }));

  const toISO = (v?: string | number) => {
    if (!v) return new Date().toISOString();
    const d = new Date(String(v));
    return Number.isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
  };

  const handleFormSubmit = async () => {
    setSubmitting(true);
    try {
      const payload: PropertyData = {
        propertyName: String(form.propertyName ?? ""),
        propertyType: String(form.propertyType ?? "Building"),
        location: String(form.location ?? ""),
        area:
          form.area === undefined || form.area === null
            ? 0
            : typeof form.area === "number"
            ? form.area
            : Number(form.area),
        unit: String(form.unit ?? "sqm"),
        propertyUsage: String(form.propertyUsage ?? ""),
        numberOfFloors:
          form.numberOfFloors === undefined || form.numberOfFloors === null
            ? 1
            : typeof form.numberOfFloors === "number"
            ? form.numberOfFloors
            : Number(form.numberOfFloors),
        ownershipType: String(form.ownershipType ?? "Owned"),
        titleDeedNumber: String(form.titleDeedNumber ?? ""),
        purchaseDate: toISO(String(form.purchaseDate ?? "")),
        purchaseValue:
          form.purchaseValue === undefined || form.purchaseValue === null
            ? 0
            : typeof form.purchaseValue === "number"
            ? form.purchaseValue
            : Number(form.purchaseValue),
        purchaseCurrency: String(form.purchaseCurrency ?? "KWD"),
        currentValue:
          form.currentValue === undefined || form.currentValue === null
            ? 0
            : typeof form.currentValue === "number"
            ? form.currentValue
            : Number(form.currentValue),
        currentCurrency: String(form.currentCurrency ?? "KWD"),
        annualMaintenanceCost:
          form.annualMaintenanceCost === undefined || form.annualMaintenanceCost === null
            ? 0
            : typeof form.annualMaintenanceCost === "number"
            ? form.annualMaintenanceCost
            : Number(form.annualMaintenanceCost),
        insuranceExpiryDate: toISO(String(form.insuranceExpiryDate ?? "")),
        status: String(form.status ?? "Active"),
      };

      if (mode === "add") {
        await createProperty(payload);
        toast.success("Property created", { description: payload.propertyName });
      } else if (mode === "edit" && current) {
        await updateProperty(current.id as string | number, payload);
        toast.success("Property updated", { description: payload.propertyName });
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
        {/* Header */}
        <CardHeader className="bg-white sticky top-0 z-20 ">
          <div className="flex items-center justify-between w-full gap-2">
            <h1 className="text-xl font-semibold">Land and Building</h1>
            <Button
              size="sm"
              variant="default"
              className="h-8 px-3 flex items-center gap-2"
              onClick={openAdd}
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Property</span>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto px-4">
          {loading ? (
            <ShimmerTable rowCount={rowsPerPage} columnCount={8} />
          ) : error ? (
            <div className="text-sm text-red-600">{error}</div>
          ) : (
            <LandBuildingTable
              landBuildings={paginated}
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

      <LandBuildingDetailsDrawer open={drawerOpen} item={current} onClose={() => setDrawerOpen(false)} />

      <LandBuildingFormDialog
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
            <DialogTitle>Delete property?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. It will permanently delete “{itemToDelete?.propertyName}”.
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

export default LandBuildingPage;
