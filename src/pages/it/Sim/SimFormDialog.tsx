import React from "react";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import CustomDialog from "@/components/ui/CustomDialog";
import type { SimData } from "@/services/itServices/SimServices";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

type Mode = "add" | "edit";

interface SimFormDialogProps {
  open: boolean;
  mode: Mode;
  form: Partial<SimData>;
  onChange: (patch: Partial<SimData>) => void;
  onSubmit: () => void | Promise<void>;
  onClose: () => void;
  onDelete?: () => void;
  submitting?: boolean;
}

const FIELD_LABELS: Record<string, string> = {
  simNumber: "SIM Number",
  phoneNumber: "Phone Number",
  carrier: "Carrier",
  planType: "Plan Type",
  monthlyFee: "Monthly Fee",
  extraCharges: "Extra Charges",
  simCharges: "SIM Charges",
  dataLimit: "Data Limit",
  assignedTo: "Assigned To",
  department: "Department",
  status: "Status",
  notes: "Notes",
};

const CARRIER_OPTIONS = ["Zain Kuwait", "Ooredoo Kuwait", "STC Kuwait", "Other"] as const;
const DEPT_OPTIONS = ["IT", "Sales", "Marketing", "Finance", "Operations", "HR", "Management", "Other"] as const;
const STATUS_OPTIONS = ["Active", "Inactive", "Suspended", "Expired"] as const;

export const SimFormDialog: React.FC<SimFormDialogProps> = ({ open, mode, form, onChange, onSubmit, onClose, onDelete, submitting = false }) => {
  const footer = (
    <>
      <Button form="sim-form" type="submit" size="sm" disabled={submitting}>
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
      title={mode === "add" ? "Add SIM" : `Edit: ${form?.simNumber ?? ""}`}
      description={mode === "add" ? "Create a new SIM record." : "Update SIM details."}
      footer={footer}
    >
      <form id="sim-form" className="grid grid-cols-2 gap-4 text-sm" onSubmit={async (e) => { e.preventDefault(); await onSubmit(); onClose(); }}>
        {Object.entries(FIELD_LABELS).map(([key, label]) => (
          <div key={key} className="col-span-1">
            <label className="block text-xs text-muted-foreground mb-1">{label}</label>

            {(key === "carrier" || key === "department" || key === "status") ? (
              <Select
                value={(form as any)[key] ? String((form as any)[key]) : "__none"}
                onValueChange={(v) => {
                  const val = v === "__none" ? "" : v;
                  onChange({ [key]: val } as Partial<SimData>);
                }}
                disabled={submitting}
              >
                <SelectTrigger size="sm">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem key="__none" value="__none">None</SelectItem>

                  {key === "carrier" &&
                    CARRIER_OPTIONS.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}

                  {key === "department" &&
                    DEPT_OPTIONS.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}

                  {key === "status" &&
                    STATUS_OPTIONS.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                </SelectContent>
              </Select>
            ) : (
              <input
                className="w-full border rounded px-2 py-1"
                value={(form as any)[key] ?? ""}
                onChange={(e) => onChange({ [key]: e.target.value } as Partial<SimData>)}
                required={key === "simNumber"}
                disabled={submitting}
              />
            )}
          </div>
        ))}

        <div className="col-span-1">
          <label className="block text-xs text-muted-foreground mb-1">Expiry Date</label>
          <input type="date" className="w-full border rounded px-2 py-1" value={form?.expiryDate ? form.expiryDate.slice(0, 10) : ""} onChange={(e) => onChange({ expiryDate: new Date(e.target.value).toISOString() })} disabled={submitting} />
        </div>
      </form>
    </CustomDialog>
  );
};