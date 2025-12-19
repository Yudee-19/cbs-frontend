import React from "react";
import { Button } from "@/components/ui/button";
import CustomDialog from "@/components/ui/CustomDialog";
import { DialogClose } from "@/components/ui/dialog";
import type { EquipmentData } from "@/services/assets/EquipmentServices";
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
  form: Partial<EquipmentData>;
  onChange: (patch: Partial<EquipmentData>) => void;
  onSubmit: () => void | Promise<void>;
  onClose: () => void;
  onDelete?: () => void;
  submitting?: boolean;
}

const CONDITION_OPTIONS = ["Excellent", "Good", "Fair", "Poor"] as const;
// const CURRENCY_OPTIONS = ["KWD", "USD", "EUR", "GBP", "AED", "SAR"] as const;
const STATUS_OPTIONS = ["Active", "Inactive", "Under Maintenance", "Disposed"] as const;
const CATEGORY_OPTIONS = [
  "Office Equipment",
  "IT Equipment",
  "Heavy Equipment",
  "Power Equipment",
  "Medical Equipment",
  "Laboratory Equipment",
  "Manufacturing Equipment",
] as const;

export const EquipmentFormDialog: React.FC<Props> = ({ open, mode, form, onChange, onSubmit, onClose, onDelete, submitting = false }) => {
  const footer = (
    <>
      <Button form="equipment-form" type="submit" size="sm" disabled={submitting} className="h-9 px-4">
        {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{mode === "add" ? "Creating..." : "Updating..."}</> : (mode === "add" ? "Create" : "Update")}
      </Button>

      {mode === "edit" && onDelete && (
        <Button type="button" size="sm" variant="destructive" onClick={onDelete} disabled={submitting} className="h-9 px-4">
          Delete
        </Button>
      )}

      <DialogClose asChild>
        <Button type="button" size="sm" variant="secondary" onClick={onClose} disabled={submitting} className="h-9 px-4">Close</Button>
      </DialogClose>
    </>
  );

  return (
    <CustomDialog
      open={open}
      onOpenChange={(v) => (!v ? onClose() : null)}
      title={mode === "add" ? "New Equipment" : `Edit: ${form.equipmentName ?? ""}`}
      description={mode === "add" ? "Add equipment details." : "Update equipment details."}
      footer={footer}
    >
      <form
        id="equipment-form"
        className="grid grid-cols-2 gap-3 text-sm"
        onSubmit={async (e) => {
          e.preventDefault();
          // minimal client validation
          if (!form.equipmentName || String(form.equipmentName).trim() === "") {
            window.alert("Equipment name is required");
            return;
          }
          if (!form.category || !CATEGORY_OPTIONS.includes(String(form.category) as any)) {
            window.alert(`Category is required and must be one of: ${CATEGORY_OPTIONS.join(", ")}`);
            return;
          }
          await onSubmit();
        }}
      >
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Name</label>
          <input className="w-full border rounded px-2 py-1" value={form.equipmentName ?? ""} onChange={(e) => onChange({ equipmentName: e.target.value })} />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Category</label>
          <Select value={String(form.category ?? CATEGORY_OPTIONS[0])} onValueChange={(v) => onChange({ category: v })} disabled={submitting}>
            <SelectTrigger className="w-full" size="sm"><SelectValue /></SelectTrigger>
            <SelectContent>
              {CATEGORY_OPTIONS.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Manufacturer</label>
          <input className="w-full border rounded px-2 py-1" value={form.manufacturer ?? ""} onChange={(e) => onChange({ manufacturer: e.target.value })} />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Model</label>
          <input className="w-full border rounded px-2 py-1" value={form.equipmentModel ?? ""} onChange={(e) => onChange({ equipmentModel: e.target.value })} />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Serial Number</label>
          <input className="w-full border rounded px-2 py-1" value={form.serialNumber ?? ""} onChange={(e) => onChange({ serialNumber: e.target.value })} />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Condition</label>
          <Select value={String(form.condition ?? CONDITION_OPTIONS[0])} onValueChange={(v) => onChange({ condition: v })} disabled={submitting}>
            <SelectTrigger className="w-full" size="sm"><SelectValue /></SelectTrigger>
            <SelectContent>
              {CONDITION_OPTIONS.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Location</label>
          <input className="w-full border rounded px-2 py-1" value={form.location ?? ""} onChange={(e) => onChange({ location: e.target.value })} />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Assigned To</label>
          <input className="w-full border rounded px-2 py-1" value={form.assignedTo ?? ""} onChange={(e) => onChange({ assignedTo: e.target.value })} />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Purchase Date</label>
          <input type="date" className="w-full border rounded px-2 py-1" value={form.purchaseDate ? String(form.purchaseDate).slice(0,10) : ""} onChange={(e) => onChange({ purchaseDate: new Date(e.target.value).toISOString() })} />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Purchase Value</label>
          <input className="w-full border rounded px-2 py-1" value={form.purchaseValue ?? ""} onChange={(e) => onChange({ purchaseValue: e.target.value === "" ? undefined : Number(e.target.value) })} />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Purchase Currency</label>
          <Select value={String(form.purchaseCurrency ?? "KWD")} onValueChange={(v) => onChange({ purchaseCurrency: v })} disabled={submitting}>
            <SelectTrigger className="w-full" size="sm"><SelectValue /></SelectTrigger>
            <SelectContent>
              {["KWD","USD","EUR","GBP","AED","SAR"].map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Current Value</label>
          <input className="w-full border rounded px-2 py-1" value={form.currentValue ?? ""} onChange={(e) => onChange({ currentValue: e.target.value === "" ? undefined : Number(e.target.value) })} />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Current Currency</label>
          <Select value={String(form.currentCurrency ?? "KWD")} onValueChange={(v) => onChange({ currentCurrency: v })} disabled={submitting}>
            <SelectTrigger className="w-full" size="sm"><SelectValue /></SelectTrigger>
            <SelectContent>
              {["KWD","USD","EUR","GBP","AED","SAR"].map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Warranty Expiry</label>
          <input type="date" className="w-full border rounded px-2 py-1" value={form.warrantyExpiry ? String(form.warrantyExpiry).slice(0,10) : ""} onChange={(e) => onChange({ warrantyExpiry: new Date(e.target.value).toISOString() })} />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Last Maintenance</label>
          <input type="date" className="w-full border rounded px-2 py-1" value={form.lastMaintenanceDate ? String(form.lastMaintenanceDate).slice(0,10) : ""} onChange={(e) => onChange({ lastMaintenanceDate: new Date(e.target.value).toISOString() })} />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Next Maintenance</label>
          <input type="date" className="w-full border rounded px-2 py-1" value={form.nextMaintenanceDate ? String(form.nextMaintenanceDate).slice(0,10) : ""} onChange={(e) => onChange({ nextMaintenanceDate: new Date(e.target.value).toISOString() })} />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Status</label>
          <Select value={String(form.status ?? STATUS_OPTIONS[0])} onValueChange={(v) => onChange({ status: v })} disabled={submitting}>
            <SelectTrigger className="w-full" size="sm"><SelectValue /></SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="col-span-2">
          <label className="block text-xs text-muted-foreground mb-1">Technical Specifications</label>
          <textarea className="w-full border rounded px-2 py-1" rows={3} value={form.technicalSpecifications ?? ""} onChange={(e) => onChange({ technicalSpecifications: e.target.value })} />
        </div>

        {/* <div className="col-span-2">
          <label className="block text-xs text-muted-foreground mb-1">Notes</label>
          <textarea className="w-full border rounded px-2 py-1" rows={3} value={form.notes ?? ""} onChange={(e) => onChange({ notes: e.target.value })} />
        </div> */}
      </form>
    </CustomDialog>
  );
};