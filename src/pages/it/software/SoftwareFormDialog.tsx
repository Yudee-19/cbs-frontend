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
import type { SoftwareLicenseData } from "@/services/itServices/SoftwareLicenseServices";
import { Loader2 } from "lucide-react";

type Mode = "add" | "edit";

interface Props {
  open: boolean;
  mode: Mode;
  form: SoftwareLicenseData;
  onChange: (patch: Partial<SoftwareLicenseData>) => void;
  onSubmit: () => void | Promise<void>;
  onClose: () => void;
  onDelete?: () => void;
  submitting?: boolean;
}

const STATUS_OPTIONS = ["Active", "Expiring Soon", "Expired"] as const;

export const SoftwareFormDialog: React.FC<Props> = ({
  open,
  mode,
  form,
  onChange,
  onSubmit,
  onClose,
  onDelete,
  submitting = false,
}) => {
  return (
    <Dialog open={open} onOpenChange={(v) => (!v ? onClose() : null)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Add Software" : `Edit: ${form.name || ""}`}</DialogTitle>
          <DialogDescription>{mode === "add" ? "Create software license." : "Update software license."}</DialogDescription>
        </DialogHeader>

        <form className="grid grid-cols-2 gap-4 text-sm" onSubmit={async (e) => { e.preventDefault(); await onSubmit(); onClose(); }}>
          <div>
            <label className="block text-xs text-muted-foreground mb-1">Name</label>
            <input className="w-full border rounded px-2 py-1" value={form.name || ""} onChange={(e) => onChange({ name: e.target.value })} required />
          </div>

          <div>
            <label className="block text-xs text-muted-foreground mb-1">Vendor</label>
            <input className="w-full border rounded px-2 py-1" value={form.vendor || ""} onChange={(e) => onChange({ vendor: e.target.value })} />
          </div>

          <div>
            <label className="block text-xs text-muted-foreground mb-1">License Type</label>
            <input className="w-full border rounded px-2 py-1" value={form.licenseType || ""} onChange={(e) => onChange({ licenseType: e.target.value })} />
          </div>

          <div>
            <label className="block text-xs text-muted-foreground mb-1">License Key</label>
            <input className="w-full border rounded px-2 py-1" value={form.licenseKey || ""} onChange={(e) => onChange({ licenseKey: e.target.value })} />
          </div>

          <div>
            <label className="block text-xs text-muted-foreground mb-1">Total Seats</label>
            <input type="number" className="w-full border rounded px-2 py-1" value={form.totalSeats ?? ""} onChange={(e) => onChange({ totalSeats: Number(e.target.value) || 0 })} />
          </div>

          <div>
            <label className="block text-xs text-muted-foreground mb-1">Seats Used</label>
            <input type="number" className="w-full border rounded px-2 py-1" value={form.seatsUsed ?? ""} onChange={(e) => onChange({ seatsUsed: Number(e.target.value) || 0 })} />
          </div>

          <div>
            <label className="block text-xs text-muted-foreground mb-1">Purchase Date</label>
            <input type="date" className="w-full border rounded px-2 py-1" value={form.purchaseDate ? form.purchaseDate.slice(0,10) : ""} onChange={(e) => onChange({ purchaseDate: new Date(e.target.value).toISOString() })} />
          </div>

          <div>
            <label className="block text-xs text-muted-foreground mb-1">Expiry Date</label>
            <input type="date" className="w-full border rounded px-2 py-1" value={form.expiryDate ? form.expiryDate.slice(0,10) : ""} onChange={(e) => onChange({ expiryDate: new Date(e.target.value).toISOString() })} />
          </div>

          <div>
            <label className="block text-xs text-muted-foreground mb-1">Renewal Cost</label>
            <input className="w-full border rounded px-2 py-1" value={form.renewalCost || ""} onChange={(e) => onChange({ renewalCost: e.target.value })} />
          </div>

          <div>
            <label className="block text-xs text-muted-foreground mb-1">Assigned Department</label>
            <input className="w-full border rounded px-2 py-1" value={form.assignedDepartment || ""} onChange={(e) => onChange({ assignedDepartment: e.target.value })} />
          </div>

          <div>
            <label className="block text-xs text-muted-foreground mb-1">Status</label>
            <select className="w-full border rounded px-2 py-1 bg-white" value={form.status || ""} onChange={(e) => onChange({ status: e.target.value })}>
              <option value="">Select</option>
              {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <DialogFooter className="col-span-2 flex gap-2 pt-2">
            <Button type="submit" size="sm" disabled={submitting}>
              {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{mode === "add" ? "Creating..." : "Updating..."}</> : (mode === "add" ? "Create" : "Update")}
            </Button>
            {mode === "edit" && onDelete && <Button type="button" size="sm" variant="destructive" onClick={onDelete} disabled={submitting}>Delete</Button>}
            <DialogClose asChild>
              <Button type="button" size="sm" variant="secondary" disabled={submitting}>Close</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SoftwareFormDialog;