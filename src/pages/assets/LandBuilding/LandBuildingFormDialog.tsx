import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import type { PropertyData } from "@/services/assets/PropertiesServices";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

type Mode = "add" | "edit" | "view";

interface Props {
  open: boolean;
  mode: Mode;
  form: Partial<PropertyData>;
  onChange: (patch: Partial<PropertyData>) => void;
  onSubmit: () => void | Promise<void>;
  onClose: () => void;
  onDelete?: () => void;
  submitting?: boolean;
}

const PROPERTY_TYPES = ["Building", "Land", "Office", "Warehouse", "Retail Space"] as const;
const UNITS = ["sqm", "sqft", "acre"] as const;
const STATUS_OPTIONS = ["Active", "Inactive", "Under Construction", "Sold"] as const;
const OWNERSHIP_OPTIONS = ["Owned", "Leased", "Mortgaged", "Shared"] as const;
const USAGE_OPTIONS = ["Office", "Retail", "Residential", "Industrial", "Vacant"] as const;

export const LandBuildingFormDialog: React.FC<Props> = ({ open, mode, form, onChange, onSubmit, onClose, onDelete, submitting = false }) => {
  return (
    <Dialog open={open} onOpenChange={(v) => (!v ? onClose() : null)}>
      <DialogContent className="overflow-visible">
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "New Property" : `Edit: ${form.propertyName ?? ""}`}</DialogTitle>
          <DialogDescription>{mode === "add" ? "Create a new property." : "Update property details."}</DialogDescription>
        </DialogHeader>

        <form
          className="grid grid-cols-2 gap-4 text-sm"
          onSubmit={async (e) => {
            e.preventDefault();
            // basic required validation matching server rules
            if (!form.propertyName || String(form.propertyName).trim() === "") {
              window.alert("Property name is required");
              return;
            }
            if (!form.propertyType || !PROPERTY_TYPES.includes(String(form.propertyType) as any)) {
              window.alert(`Property type is required and must be one of: ${PROPERTY_TYPES.join(", ")}`);
              return;
            }
            if (!form.unit || !UNITS.includes(String(form.unit) as any)) {
              window.alert(`Unit is required and must be one of: ${UNITS.join(", ")}`);
              return;
            }

            // numeric conversions
            if (form.area !== undefined && form.area !== null && typeof form.area === "string") {
              const n = Number(form.area);
              onChange({ area: Number.isNaN(n) ? 0 : n });
            }
            if (form.purchaseValue !== undefined && form.purchaseValue !== null && typeof form.purchaseValue === "string") {
              const n = Number(form.purchaseValue);
              onChange({ purchaseValue: Number.isNaN(n) ? form.purchaseValue : n });
            }
            if (form.currentValue !== undefined && form.currentValue !== null && typeof form.currentValue === "string") {
              const n = Number(form.currentValue);
              onChange({ currentValue: Number.isNaN(n) ? form.currentValue : n });
            }

            await onSubmit();
            onClose();
          }}
        >
          <div>
            <label className="block text-xs text-muted-foreground mb-1">Property Name</label>
            <input
              className="w-full border rounded px-2 py-1"
              value={form.propertyName ?? ""}
              onChange={(e) => onChange({ propertyName: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs text-muted-foreground mb-1">Property Type</label>
            <Select
              value={form.propertyType ? String(form.propertyType) : "__none"}
              onValueChange={(v) => onChange({ propertyType: v === "__none" ? "" : v })}
              disabled={submitting}
            >
              <SelectTrigger size="sm">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {PROPERTY_TYPES.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-xs text-muted-foreground mb-1">Location</label>
            <input className="w-full border rounded px-2 py-1" value={form.location ?? ""} onChange={(e) => onChange({ location: e.target.value })} />
          </div>

          <div>
            <label className="block text-xs text-muted-foreground mb-1">Area</label>
            <div className="flex gap-2 items-center overflow-visible relative">
              <input
                className="flex-1 border rounded px-2 py-1 min-w-[80px]"
                value={form.area !== undefined && form.area !== null ? String(form.area) : ""}
                onChange={(e) => onChange({ area: e.target.value === "" ? undefined : Number(e.target.value) })}
              />
              <div className="">
                <Select
                  value={form.unit ? String(form.unit) : "sqm"}
                  onValueChange={(v) => onChange({ unit: v })}
                  disabled={submitting}
                >
                  <SelectTrigger size="sm" className="min-w-[80px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="z-50">
                    {UNITS.map((u) => (
                      <SelectItem key={u} value={u}>
                        {u}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs text-muted-foreground mb-1">Usage</label>
            <Select
              value={form.propertyUsage ? String(form.propertyUsage) : "__none"}
              onValueChange={(v) => onChange({ propertyUsage: v === "__none" ? "" : v })}
              disabled={submitting}
            >
              <SelectTrigger size="sm">
                <SelectValue placeholder="Select usage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__none">None</SelectItem>
                {USAGE_OPTIONS.map((u) => (
                  <SelectItem key={u} value={u}>{u}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-xs text-muted-foreground mb-1"># Floors</label>
            <input className="w-full border rounded px-2 py-1" value={form.numberOfFloors ?? ""} onChange={(e) => onChange({ numberOfFloors: e.target.value === "" ? undefined : Number(e.target.value) })} />
          </div>

          <div>
            <label className="block text-xs text-muted-foreground mb-1">Ownership</label>
            <Select
              value={form.ownershipType ? String(form.ownershipType) : "__none"}
              onValueChange={(v) => onChange({ ownershipType: v === "__none" ? "" : v })}
              disabled={submitting}
            >
              <SelectTrigger size="sm">
                <SelectValue placeholder="Select ownership" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__none">None</SelectItem>
                {OWNERSHIP_OPTIONS.map((o) => (
                  <SelectItem key={o} value={o}>{o}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-xs text-muted-foreground mb-1">Title Deed</label>
            <input className="w-full border rounded px-2 py-1" value={form.titleDeedNumber ?? ""} onChange={(e) => onChange({ titleDeedNumber: e.target.value })} />
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
            <label className="block text-xs text-muted-foreground mb-1">Annual Maintenance</label>
            <input className="w-full border rounded px-2 py-1" value={form.annualMaintenanceCost ?? ""} onChange={(e) => onChange({ annualMaintenanceCost: e.target.value === "" ? undefined : Number(e.target.value) })} />
          </div>

          <div>
            <label className="block text-xs text-muted-foreground mb-1">Insurance Expiry</label>
            <input type="date" className="w-full border rounded px-2 py-1" value={form.insuranceExpiryDate ? String(form.insuranceExpiryDate).slice(0,10) : ""} onChange={(e) => onChange({ insuranceExpiryDate: new Date(e.target.value).toISOString() })} />
          </div>

          <div>
            <label className="block text-xs text-muted-foreground mb-1">Status</label>
            <Select
              value={form.status ? String(form.status) : "__none"}
              onValueChange={(v) => onChange({ status: v === "__none" ? "" : v })}
              disabled={submitting}
            >
              <SelectTrigger size="sm">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__none">None</SelectItem>
                {STATUS_OPTIONS.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="col-span-2 flex gap-2 pt-2">
            <Button type="submit" size="sm" disabled={submitting}>
              {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{mode === "add" ? "Creating..." : "Updating..."}</> : (mode === "add" ? "Create" : "Update")}
            </Button>

            {mode === "edit" && onDelete && (
              <Button type="button" size="sm" variant="destructive" onClick={onDelete} disabled={submitting}>Delete</Button>
            )}

            <DialogClose asChild>
              <Button type="button" size="sm" variant="secondary" disabled={submitting}>Close</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};