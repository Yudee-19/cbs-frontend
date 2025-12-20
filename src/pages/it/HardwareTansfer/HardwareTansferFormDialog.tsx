import React from "react";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import CustomDialog from "@/components/ui/CustomDialog";
import type { HardwareTransferData } from "@/services/itServices/HardwareTansferServices";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

type Mode = "add" | "edit";

interface Props {
  open: boolean;
  mode: Mode;
  form: Partial<HardwareTransferData>;
  onChange: (patch: Partial<HardwareTransferData>) => void;
  onSubmit: () => void | Promise<void>;
  onClose: () => void;
  onDelete?: () => void;
  submitting?: boolean;
}

const HARDWARE_OPTIONS = [
  'Dell Latitude 7420 (Laptop)',
  'HP EliteDesk 800 G6 (Desktop)',
  'MacBook Pro 16" (Laptop)',
  'Lenovo ThinkPad T14 (Laptop)',
  'Dell Monitor 27" (Monitor)',
  'iPad Pro 12.9" (Tablet)',
  'HP Laser Printer (Printer)',
  'Dell PowerEdge R740 (Server)',
] as const;

const USER_OPTIONS = [
  'John Smith - Finance',
  'Sarah Johnson - Marketing',
  'Michael Brown - Operations',
  'Ahmed Al-Rashid - Finance',
  'Emma Wilson - Design',
  'David Lee - Sales',
  'IT Department - IT',
  'Unassigned - IT',
] as const;

const TRANSFER_TYPE_OPTIONS = ['Temporary', 'Permanent', 'Loan'] as const;
const CONDITION_OPTIONS = ['Excellent', 'Good', 'Fair', 'Poor'] as const;
const STATUS_OPTIONS = ['Active', 'Returned', 'Permanent Transfer', 'Pending'] as const;

export const HardwareTransferFormDialog: React.FC<Props> = ({ open, mode, form, onChange, onSubmit, onClose, onDelete, submitting = false }) => {
  const footer = (
    <>
      <Button form="hardware-transfer-form" type="submit" size="sm" disabled={submitting}>
        {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{mode === "add" ? "Creating..." : "Updating..."}</> : (mode === "add" ? "Create" : "Update")}
      </Button>

      {mode === "edit" && onDelete && (
        <Button type="button" size="sm" variant="destructive" onClick={onDelete} disabled={submitting}>Delete</Button>
      )}

      <DialogClose asChild>
        <Button type="button" size="sm" variant="secondary" disabled={submitting}>Close</Button>
      </DialogClose>
    </>
  );

  return (
    <CustomDialog
      open={open}
      onOpenChange={(v) => (!v ? onClose() : null)}
      title={mode === "add" ? "New Transfer" : `Edit: ${form.id ?? ""}`}
      description={mode === "add" ? "Create a new hardware transfer." : "Update transfer details."}
      footer={footer}
    >
      <form
        id="hardware-transfer-form"
        className="grid grid-cols-2 gap-4 text-sm"
        onSubmit={async (e) => {
          e.preventDefault();
          // basic client-side required checks
          if (!form.transferType) {
            window.alert("Transfer type is required");
            return;
          }
          if (!form.hardwareCondition) {
            window.alert("Hardware condition is required");
            return;
          }
          await onSubmit();
          onClose();
        }}
      >
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Transfer ID</label>
          <input className="w-full border rounded px-2 py-1" value={form.id ?? ""} onChange={(e) => onChange({ id: e.target.value })} required />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Hardware Name</label>
          <Select
            value={form.hardwareName ? String(form.hardwareName) : "__none"}
            onValueChange={(v) => onChange({ hardwareName: v === "__none" ? "" : v })}
            disabled={submitting}
          >
            <SelectTrigger size="sm">
              <SelectValue placeholder="Select hardware" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__none">None</SelectItem>
              {HARDWARE_OPTIONS.map((h) => (
                <SelectItem key={h} value={h}>{h}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Serial Number</label>
          <input className="w-full border rounded px-2 py-1" value={form.serialNumber ?? ""} onChange={(e) => onChange({ serialNumber: e.target.value })} />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">From (User)</label>
          <Select
            value={form.fromUser ? String(form.fromUser) : "__none"}
            onValueChange={(v) => onChange({ fromUser: v === "__none" ? "" : v })}
            disabled={submitting}
          >
            <SelectTrigger size="sm">
              <SelectValue placeholder="Select user" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__none">None</SelectItem>
              {USER_OPTIONS.map((u) => (
                <SelectItem key={u} value={u}>{u}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">To (User)</label>
          <Select
            value={form.toUser ? String(form.toUser) : "__none"}
            onValueChange={(v) => onChange({ toUser: v === "__none" ? "" : v })}
            disabled={submitting}
          >
            <SelectTrigger size="sm">
              <SelectValue placeholder="Select user" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__none">None</SelectItem>
              {USER_OPTIONS.map((u) => (
                <SelectItem key={u} value={u}>{u}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Transfer Date</label>
          <input type="date" className="w-full border rounded px-2 py-1" value={form.transferDate ? form.transferDate.slice(0,10) : ""} onChange={(e) => onChange({ transferDate: new Date(e.target.value).toISOString() })} />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Expected Return</label>
          <input type="date" className="w-full border rounded px-2 py-1" value={form.expectedReturnDate ? form.expectedReturnDate.slice(0,10) : ""} onChange={(e) => onChange({ expectedReturnDate: new Date(e.target.value).toISOString() })} />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Transfer Type <span className="text-xs text-red-500">*</span></label>
          <Select
            value={form.transferType ? String(form.transferType) : "__none"}
            onValueChange={(v) => onChange({ transferType: v === "__none" ? "" : v })}
            disabled={submitting}
          >
            <SelectTrigger size="sm">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__none">None</SelectItem>
              {TRANSFER_TYPE_OPTIONS.map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Hardware Condition <span className="text-xs text-red-500">*</span></label>
          <Select
            value={form.hardwareCondition ? String(form.hardwareCondition) : "__none"}
            onValueChange={(v) => onChange({ hardwareCondition: v === "__none" ? "" : v })}
            disabled={submitting}
          >
            <SelectTrigger size="sm">
              <SelectValue placeholder="Select condition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__none">None</SelectItem>
              {CONDITION_OPTIONS.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="col-span-2">
          <label className="block text-xs text-muted-foreground mb-1">Reason</label>
          <input className="w-full border rounded px-2 py-1" value={form.transferReason ?? ""} onChange={(e) => onChange({ transferReason: e.target.value })} />
        </div>
      </form>
    </CustomDialog>
  );
};