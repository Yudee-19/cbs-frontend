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
import type { HardwareData } from "@/services/itServices/HardwareServices";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

type Mode = "add" | "edit";

interface HardwareFormDialogProps {
  open: boolean;
  mode: Mode;
  form: HardwareData;
  onChange: (patch: Partial<HardwareData>) => void;
  onSubmit: () => void | Promise<void>;
  onClose: () => void;
  onDelete?: () => void;
  submitting?: boolean;
}

const FIELD_LABELS = {
  deviceName: "Device Name",
  type: "Type",
  serialNumber: "Serial Number",
  operatingSystem: "Operating System",
  processor: "Processor",
  ram: "RAM",
  storage: "Storage",
  assignedTo: "Assigned To",
  department: "Department",
  status: "Status",
} as const;
type FieldKey = keyof typeof FIELD_LABELS;
const REQUIRED_FIELDS: FieldKey[] = ["deviceName", "type", "serialNumber"];
const STATUS_OPTIONS = ["Active", "Under Repair", "Inactive"] as const;

// New option lists per validation message
const TYPE_OPTIONS = ["Laptop", "Desktop", "Server", "Tablet", "Workstation"] as const;
const OS_OPTIONS = [
  "Windows 11 Pro",
  "Windows 10 Pro",
  "macOS Sonoma",
  "Ubuntu Server 22.04",
  "Ubuntu Desktop 22.04",
  "Linux (Other)",
] as const;
const RAM_OPTIONS = ["", "4GB", "8GB", "16GB", "32GB", "64GB", "128GB"] as const; // "" => none/null
const STORAGE_OPTIONS = [
  "",
  "128GB SSD",
  "256GB SSD",
  "512GB SSD",
  "1TB SSD",
  "2TB SSD",
  "2TB RAID",
  "4TB RAID",
] as const;
const DEPT_OPTIONS = ["", "IT", "Finance", "HR", "Operations", "Sales", "Marketing", "Legal"] as const;

export const HardwareFormDialog: React.FC<HardwareFormDialogProps> = ({
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
          <DialogTitle>
            {mode === "add" ? "Add Hardware" : `Edit: ${form.deviceName || ""}`}
          </DialogTitle>
          <DialogDescription>
            {mode === "add" ? "Create a new hardware asset." : "Update hardware details."}
          </DialogDescription>
        </DialogHeader>

        <form
          className="grid grid-cols-2 gap-4 text-sm"
          onSubmit={async (e) => {
            e.preventDefault();
            await onSubmit();
            onClose();
          }}
        >
          {(Object.entries(FIELD_LABELS) as [FieldKey, string][]).map(([key, label]) => (
            <div key={key} className="col-span-1">
              <label className="block text-xs text-muted-foreground mb-1">{label}</label>

              {key === "status" ||
              key === "type" ||
              key === "operatingSystem" ||
              key === "ram" ||
              key === "storage" ||
              key === "department" ? (
                <Select
                  value={(form as any)[key] ?? ""}
                  onValueChange={(v) => {
                    const val = v === "__none" ? "" : v;
                    onChange({ [key]: val } as Partial<HardwareData>);
                  }}
                  disabled={submitting}
                >
                  <SelectTrigger size="sm">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>

                  <SelectContent>
                    {key === "type" &&
                      TYPE_OPTIONS.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}

                    {key === "operatingSystem" &&
                      OS_OPTIONS.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}

                    {key === "ram" && (
                      <>
                        <SelectItem key="__none_ram" value="__none">
                          None
                        </SelectItem>
                        {RAM_OPTIONS.filter((s) => s !== "").map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </>
                    )}

                    {key === "storage" && (
                      <>
                        <SelectItem key="__none_storage" value="__none">
                          None
                        </SelectItem>
                        {STORAGE_OPTIONS.filter((s) => s !== "").map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </>
                    )}

                    {key === "department" && (
                      <>
                        <SelectItem key="__none_dept" value="__none">
                          None
                        </SelectItem>
                        {DEPT_OPTIONS.filter((s) => s !== "").map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </>
                    )}

                    {key === "status" &&
                      STATUS_OPTIONS.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              ) : (
                <input
                  className="w-full border rounded px-2 py-1"
                  value={(form as any)[key] || ""}
                  onChange={(e) => onChange({ [key]: e.target.value } as Partial<HardwareData>)}
                  required={REQUIRED_FIELDS.includes(key)}
                  disabled={submitting}
                />
              )}
            </div>
          ))}

          <div className="col-span-1">
            <label className="block text-xs text-muted-foreground mb-1">Purchase Date</label>
            <input
              type="date"
              className="w-full border rounded px-2 py-1"
              value={form.purchaseDate ? form.purchaseDate.slice(0, 10) : ""}
              onChange={(e) =>
                onChange({ purchaseDate: new Date(e.target.value).toISOString() })
              }
              disabled={submitting}
            />
          </div>

          <div className="col-span-1">
            <label className="block text-xs text-muted-foreground mb-1">Warranty Expiry</label>
            <input
              type="date"
              className="w-full border rounded px-2 py-1"
              value={form.warrantyExpiry ? form.warrantyExpiry.slice(0, 10) : ""}
              onChange={(e) =>
                onChange({ warrantyExpiry: new Date(e.target.value).toISOString() })
              }
              disabled={submitting}
            />
          </div>

          <DialogFooter className="col-span-2 flex gap-2 pt-2">
            <Button type="submit" size="sm" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {mode === "add" ? "Creating..." : "Updating..."}
                </>
              ) : (
                mode === "add" ? "Create" : "Update"
              )}
            </Button>
            {mode === "edit" && onDelete && (
              <Button type="button" size="sm" variant="destructive" onClick={onDelete} disabled={submitting}>
                Delete
              </Button>
            )}
            <DialogClose asChild>
              <Button type="button" size="sm" variant="secondary" disabled={submitting}>
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};