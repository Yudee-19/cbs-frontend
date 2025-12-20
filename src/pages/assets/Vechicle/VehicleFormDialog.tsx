import React from "react";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import type { VehicleData } from "@/services/assets/VehiclesServices";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import CustomDialog from "@/components/ui/CustomDialog";

type Mode = "add" | "edit" | "view";

interface Props {
  open: boolean;
  mode: Mode;
  form: Partial<VehicleData>;
  onChange: (patch: Partial<VehicleData>) => void;
  onSubmit: () => void | Promise<void>;
  onClose: () => void;
  onDelete?: () => void;
  submitting?: boolean;
}

const VEHICLE_TYPES = ["Sedan", "SUV", "Van", "Pickup Truck", "Bus", "Motorcycle"] as const;
const FUEL_TYPES = ["Petrol", "Diesel", "Electric", "Hybrid", "CNG"] as const;
const DEPARTMENTS = ["Fleet", "Management", "Sales", "Operations", "Marketing", "Maintenance", "IT", "HR", "Finance"] as const;
const STATUS_OPTIONS = ["Active", "Inactive", "Maintenance", "Decommissioned"] as const;

export const VehicleFormDialog: React.FC<Props> = ({ open, mode, form, onChange, onSubmit, onClose, onDelete, submitting = false }) => {
  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    // validation
    if (!form.vehicleName || String(form.vehicleName).trim() === "") {
      window.alert("Vehicle name is required");
      return;
    }
    if (!form.makeBrand || String(form.makeBrand).trim() === "") {
      window.alert("Make / Brand is required");
      return;
    }
    if (!form.vehicleType || !VEHICLE_TYPES.includes(String(form.vehicleType) as any)) {
      window.alert(`Vehicle type is required and must be one of: ${VEHICLE_TYPES.join(", ")}`);
      return;
    }
    if (!form.fuelType || !FUEL_TYPES.includes(String(form.fuelType) as any)) {
      window.alert(`Fuel type is required and must be one of: ${FUEL_TYPES.join(", ")}`);
      return;
    }
    if (!form.chassisNumber || String(form.chassisNumber).trim() === "") {
      window.alert("Chassis number is required");
      return;
    }
    if (form.year === undefined || form.year === null || Number.isNaN(Number(form.year))) {
      window.alert("Year is required");
      return;
    }
    if (!form.department || !DEPARTMENTS.includes(String(form.department) as any)) {
      window.alert(`Department is required and must be one of: ${DEPARTMENTS.join(", ")}`);
      return;
    }

    // normalize numeric fields
    if (form.year !== undefined && typeof form.year === "string") {
      const y = Number(form.year);
      onChange({ year: Number.isNaN(y) ? form.year : y });
    }
    if (form.purchaseValue !== undefined && typeof form.purchaseValue === "string") {
      const n = Number(form.purchaseValue);
      onChange({ purchaseValue: Number.isNaN(n) ? form.purchaseValue : n });
    }
    if (form.currentValue !== undefined && typeof form.currentValue === "string") {
      const n = Number(form.currentValue);
      onChange({ currentValue: Number.isNaN(n) ? form.currentValue : n });
    }
    if (form.mileage !== undefined && typeof form.mileage === "string") {
      const n = Number(form.mileage);
      onChange({ mileage: Number.isNaN(n) ? undefined : n });
    }

    await onSubmit();
  };

  const footer = (
    <>
      <Button form="vehicle-form" type="submit" size="sm" className="h-9 px-4" disabled={submitting}>
        {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{mode === "add" ? "Creating..." : "Updating..."}</> : (mode === "add" ? "Create" : "Update")}
      </Button>

      {mode === "edit" && onDelete && (
        <Button type="button" size="sm" variant="destructive" className="h-9 px-4" onClick={onDelete} disabled={submitting}>
          Delete
        </Button>
      )}

      <DialogClose asChild>
        <Button type="button" size="sm" variant="secondary" className="h-9 px-4" disabled={submitting} onClick={onClose}>Close</Button>
      </DialogClose>
    </>
  );

  return (
    <CustomDialog
      open={open}
      onOpenChange={(v) => {
        if (!v) onClose();
      }}
      title={mode === "add" ? "New Vehicle" : `Edit: ${form.vehicleName ?? ""}`}
      description={mode === "add" ? "Add vehicle details." : "Update vehicle details."}
      footer={footer}
    >
      <form id="vehicle-form" className="grid grid-cols-2 gap-3 text-sm" onSubmit={handleSubmit}>
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Name</label>
          <input className="w-full border rounded px-2 py-1" value={form.vehicleName ?? ""} onChange={(e) => onChange({ vehicleName: e.target.value })} />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Make / Brand</label>
          <input className="w-full border rounded px-2 py-1" value={form.makeBrand ?? ""} onChange={(e) => onChange({ makeBrand: e.target.value })} />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Model</label>
          <input className="w-full border rounded px-2 py-1" value={form.vehicleModel ?? ""} onChange={(e) => onChange({ vehicleModel: e.target.value })} />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Year</label>
          <input
            type="number"
            min={1900}
            max={2100}
            className="w-full border rounded px-2 py-1"
            value={form.year ?? ""}
            onChange={(e) => onChange({ year: e.target.value === "" ? undefined : Number(e.target.value) })}
          />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Type</label>
          <Select value={String(form.vehicleType ?? VEHICLE_TYPES[0])} onValueChange={(v) => onChange({ vehicleType: v })} disabled={submitting}>
            <SelectTrigger className="w-full" size="sm"><SelectValue /></SelectTrigger>
            <SelectContent>{VEHICLE_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Fuel Type</label>
          <Select value={String(form.fuelType ?? FUEL_TYPES[0])} onValueChange={(v) => onChange({ fuelType: v })} disabled={submitting}>
            <SelectTrigger className="w-full" size="sm"><SelectValue /></SelectTrigger>
            <SelectContent>{FUEL_TYPES.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}</SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Chassis Number</label>
          <input className="w-full border rounded px-2 py-1" value={form.chassisNumber ?? ""} onChange={(e) => onChange({ chassisNumber: e.target.value })} />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Engine Number</label>
          <input className="w-full border rounded px-2 py-1" value={form.engineNumber ?? ""} onChange={(e) => onChange({ engineNumber: e.target.value })} />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Plate Number</label>
          <input className="w-full border rounded px-2 py-1" value={form.plateNumber ?? ""} onChange={(e) => onChange({ plateNumber: e.target.value })} />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Registration Expiry</label>
          <input type="date" className="w-full border rounded px-2 py-1" value={form.registrationExpiry ? String(form.registrationExpiry).slice(0,10) : ""} onChange={(e) => onChange({ registrationExpiry: new Date(e.target.value).toISOString() })} />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Insurance Provider</label>
          <input className="w-full border rounded px-2 py-1" value={form.insuranceProvider ?? ""} onChange={(e) => onChange({ insuranceProvider: e.target.value })} />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Insurance Expiry</label>
          <input type="date" className="w-full border rounded px-2 py-1" value={form.insuranceExpiry ? String(form.insuranceExpiry).slice(0,10) : ""} onChange={(e) => onChange({ insuranceExpiry: new Date(e.target.value).toISOString() })} />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Purchase Date</label>
          <input type="date" className="w-full border rounded px-2 py-1" value={form.purchaseDate ? String(form.purchaseDate).slice(0,10) : ""} onChange={(e) => onChange({ purchaseDate: new Date(e.target.value).toISOString() })} />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Purchase Value</label>
          <input className="w-full border rounded px-2 py-1" value={form.purchaseValue ?? ""} onChange={(e) => onChange({ purchaseValue: e.target.value })} />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Current Value</label>
          <input className="w-full border rounded px-2 py-1" value={form.currentValue ?? ""} onChange={(e) => onChange({ currentValue: e.target.value })} />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Assigned To</label>
          <input className="w-full border rounded px-2 py-1" value={form.assignedTo ?? ""} onChange={(e) => onChange({ assignedTo: e.target.value })} />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Department</label>
          <Select value={String(form.department ?? DEPARTMENTS[0])} onValueChange={(v) => onChange({ department: v })} disabled={submitting}>
            <SelectTrigger className="w-full" size="sm"><SelectValue /></SelectTrigger>
            <SelectContent>{DEPARTMENTS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Mileage</label>
          <input className="w-full border rounded px-2 py-1" value={form.mileage ?? ""} onChange={(e) => onChange({ mileage: e.target.value === "" ? undefined : Number(e.target.value) })} />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Last Service</label>
          <input type="date" className="w-full border rounded px-2 py-1" value={form.lastService ? String(form.lastService).slice(0,10) : ""} onChange={(e) => onChange({ lastService: new Date(e.target.value).toISOString() })} />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Next Service</label>
          <input type="date" className="w-full border rounded px-2 py-1" value={form.nextService ? String(form.nextService).slice(0,10) : ""} onChange={(e) => onChange({ nextService: new Date(e.target.value).toISOString() })} />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Status</label>
          <Select value={String(form.status ?? STATUS_OPTIONS[0])} onValueChange={(v) => onChange({ status: v })} disabled={submitting}>
            <SelectTrigger className="w-full" size="sm"><SelectValue /></SelectTrigger>
            <SelectContent>{STATUS_OPTIONS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
          </Select>
        </div>

        <div className="col-span-2">
          <label className="block text-xs text-muted-foreground mb-1">Notes</label>
          <textarea className="w-full border rounded px-2 py-1" rows={3} value={form.notes ?? ""} onChange={(e) => onChange({ notes: e.target.value })} />
        </div>
      </form>
    </CustomDialog>
  );
};

export default VehicleFormDialog;