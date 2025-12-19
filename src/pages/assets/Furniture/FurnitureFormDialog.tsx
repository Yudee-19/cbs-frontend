import React from "react";
import { Button } from "@/components/ui/button";
import CustomDialog from "@/components/ui/CustomDialog";
import { DialogClose } from "@/components/ui/dialog";
import type { FurnitureData } from "@/services/assets/FurnituresServices";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const CATEGORY_OPTIONS = [
  "Office Furniture",
  "Meeting Room Furniture",
  "Storage Furniture",
  "Lounge Furniture",
  "Reception Furniture",
  "Outdoor Furniture",
] as const;

const CONDITION_OPTIONS = ["Excellent", "Good", "Fair", "Poor"] as const;

// added currency + status options
const CURRENCY_OPTIONS = ["KWD", "USD", "EUR", "GBP", "AED", "SAR"] as const;
const STATUS_OPTIONS = ["Active", "Under Repair", "Inactive", "Disposed"] as const;

type Mode = "add" | "edit" | "view";

interface Props {
  open: boolean;
  mode: Mode;
  form: Partial<FurnitureData>;
  onChange: (patch: Partial<FurnitureData>) => void;
  onSubmit: () => void | Promise<void>;
  onClose: () => void;
  onDelete?: () => void;
  submitting?: boolean;
}

export const FurnitureFormDialog: React.FC<Props> = ({ open, mode, form, onChange, onSubmit, onClose, onDelete, submitting = false }) => {
  const footer = (
    <>
      <Button form="furniture-form" type="submit" size="sm" disabled={submitting}>
        {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{mode === "add" ? "Creating..." : "Updating..."}</> : (mode === "add" ? "Create" : "Update")}
      </Button>

      {mode === "edit" && onDelete && (
        <Button type="button" size="sm" variant="destructive" onClick={onDelete} disabled={submitting}>Delete</Button>
      )}

      <DialogClose asChild>
        <Button type="button" size="sm" variant="secondary" disabled={submitting} onClick={onClose}>Close</Button>
      </DialogClose>
    </>
  );

  return (
    <CustomDialog
      open={open}
      onOpenChange={(v) => (!v ? onClose() : null)}
      title={mode === "add" ? "New Furniture" : `Edit: ${form.itemName ?? ""}`}
      description={mode === "add" ? "Add furniture item." : "Update furniture item."}
      footer={footer}
    >
      <form
        id="furniture-form"
        className="grid grid-cols-2 gap-3 text-sm"
        onSubmit={async (e) => {
          e.preventDefault();
          // simple client-side validation to match server rules
          if (!form.category || !CATEGORY_OPTIONS.includes(String(form.category) as any)) {
            window.alert(`Category is required and must be one of: ${CATEGORY_OPTIONS.join(", ")}`);
            return;
          }
          if (!form.condition || !CONDITION_OPTIONS.includes(String(form.condition) as any)) {
            window.alert(`Condition is required and must be one of: ${CONDITION_OPTIONS.join(", ")}`);
            return;
          }
          if (form.purchaseCurrency && !CURRENCY_OPTIONS.includes(String(form.purchaseCurrency) as any)) {
            window.alert(`Purchase currency must be one of: ${CURRENCY_OPTIONS.join(", ")}`);
            return;
          }
          if (form.currentCurrency && !CURRENCY_OPTIONS.includes(String(form.currentCurrency) as any)) {
            window.alert(`Current currency must be one of: ${CURRENCY_OPTIONS.join(", ")}`);
            return;
          }
          if (form.status && !STATUS_OPTIONS.includes(String(form.status) as any)) {
            window.alert(`Status must be one of: ${STATUS_OPTIONS.join(", ")}`);
            return;
          }
          await onSubmit();
        }}
      >
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Name</label>
          <input className="w-full border rounded px-2 py-1" value={form.itemName ?? ""} onChange={(e) => onChange({ itemName: e.target.value })} />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Category</label>
          <Select value={String(form.category ?? CATEGORY_OPTIONS[0])} onValueChange={(v) => onChange({ category: v })} disabled={submitting}>
            <SelectTrigger className="w-full" size="sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CATEGORY_OPTIONS.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Item Code</label>
          <input className="w-full border rounded px-2 py-1" value={form.itemCode ?? ""} onChange={(e) => onChange({ itemCode: e.target.value })} />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Quantity</label>
          <input className="w-full border rounded px-2 py-1" value={form.quantity ?? ""} onChange={(e) => onChange({ quantity: e.target.value === "" ? undefined : Number(e.target.value) })} />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Location</label>
          <input className="w-full border rounded px-2 py-1" value={form.location ?? ""} onChange={(e) => onChange({ location: e.target.value })} />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Material</label>
          <input className="w-full border rounded px-2 py-1" value={form.material ?? ""} onChange={(e) => onChange({ material: e.target.value })} />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Color</label>
          <input className="w-full border rounded px-2 py-1" value={form.color ?? ""} onChange={(e) => onChange({ color: e.target.value })} />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Dimensions</label>
          <input className="w-full border rounded px-2 py-1" value={form.dimensions ?? ""} onChange={(e) => onChange({ dimensions: e.target.value })} />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Supplier</label>
          <input className="w-full border rounded px-2 py-1" value={form.supplier ?? ""} onChange={(e) => onChange({ supplier: e.target.value })} />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Purchase Date</label>
          <input
            type="date"
            className="w-full border rounded px-2 py-1"
            value={form.purchaseDate ? String(form.purchaseDate).slice(0, 10) : ""}
            onChange={(e) => onChange({ purchaseDate: new Date(e.target.value).toISOString() })}
          />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Unit Value</label>
          <input className="w-full border rounded px-2 py-1" value={form.unitValue ?? ""} onChange={(e) => onChange({ unitValue: e.target.value })} />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Purchase Currency</label>
          <Select value={String(form.purchaseCurrency ?? CURRENCY_OPTIONS[0])} onValueChange={(v) => onChange({ purchaseCurrency: v })} disabled={submitting}>
            <SelectTrigger className="w-full" size="sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CURRENCY_OPTIONS.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Current Unit Value</label>
          <input className="w-full border rounded px-2 py-1" value={form.currentUnitValue ?? ""} onChange={(e) => onChange({ currentUnitValue: e.target.value })} />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Current Currency</label>
          <Select value={String(form.currentCurrency ?? CURRENCY_OPTIONS[0])} onValueChange={(v) => onChange({ currentCurrency: v })} disabled={submitting}>
            <SelectTrigger className="w-full" size="sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CURRENCY_OPTIONS.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Condition</label>
          <Select value={String(form.condition ?? CONDITION_OPTIONS[0])} onValueChange={(v) => onChange({ condition: v })} disabled={submitting}>
            <SelectTrigger className="w-full" size="sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CONDITION_OPTIONS.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Warranty Expiry</label>
          <input
            type="date"
            className="w-full border rounded px-2 py-1"
            value={form.warrantyExpiry ? String(form.warrantyExpiry).slice(0, 10) : ""}
            onChange={(e) => onChange({ warrantyExpiry: new Date(e.target.value).toISOString() })}
          />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Status</label>
          <Select value={String(form.status ?? STATUS_OPTIONS[0])} onValueChange={(v) => onChange({ status: v })} disabled={submitting}>
            <SelectTrigger className="w-full" size="sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
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