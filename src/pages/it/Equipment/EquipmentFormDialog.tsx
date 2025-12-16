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
import type { NetworkEquipmentData } from "@/services/itServices/NetworkEquipmentServices";
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
  form: NetworkEquipmentData;
  onChange: (patch: Partial<NetworkEquipmentData>) => void;
  onSubmit: () => void | Promise<void>;
  onClose: () => void;
  onDelete?: () => void;
  submitting?: boolean;
}

const FIELD_LABELS = {
  equipmentName: "Equipment Name",
  equipmentType: "Type",
  ipAddress: "IP Address",
  macAddress: "MAC Address",
  serialNumber: "Serial Number",
  numberOfPorts: "Number of Ports",
  location: "Location",
  firmwareVersion: "Firmware Version",
  status: "Status",
} as const;
type FieldKey = keyof typeof FIELD_LABELS;
const REQUIRED_FIELDS: FieldKey[] = ["equipmentName", "equipmentType", "serialNumber"];
const STATUS_OPTIONS = ["Online", "Offline", "Maintenance"] as const;
const TYPE_OPTIONS = ["Switch", "Router", "Firewall", "Access Point", "Load Balancer", "Gateway"] as const;
const PORT_OPTIONS = [2, 4, 8, 16, 24, 48] as const;

const EquipmentFormDialog: React.FC<Props> = ({
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
            {mode === "add" ? "Add Equipment" : `Edit: ${form.equipmentName || ""}`}
          </DialogTitle>
          <DialogDescription>
            {mode === "add" ? "Create a new network equipment record." : "Update equipment details."}
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

              {key === "equipmentType" ? (
                <Select
                  value={form.equipmentType ? String(form.equipmentType) : "__none"}
                  onValueChange={(v) => onChange({ equipmentType: v === "__none" ? "" : v })}
                  disabled={submitting}
                >
                  <SelectTrigger size="sm">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem key="__none_type" value="__none">None</SelectItem>
                    {TYPE_OPTIONS.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : key === "numberOfPorts" ? (
                <Select
                  value={form.numberOfPorts ? String(form.numberOfPorts) : "__none"}
                  onValueChange={(v) =>
                    onChange({ numberOfPorts: v === "__none" ? undefined : Number(v) })
                  }
                  disabled={submitting}
                >
                  <SelectTrigger size="sm">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem key="__none_ports" value="__none">None</SelectItem>
                    {PORT_OPTIONS.map((n) => (
                      <SelectItem key={n} value={String(n)}>
                        {n}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : key === "status" ? (
                <Select
                  value={form.status ?? "__none"}
                  onValueChange={(v) => onChange({ status: v === "__none" ? "" : v })}
                  disabled={submitting}
                >
                  <SelectTrigger size="sm">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem key="__none_status" value="__none">None</SelectItem>
                    {STATUS_OPTIONS.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : key === "ipAddress" ? (
                <input
                  className="w-full border rounded px-2 py-1"
                  value={(form as any)[key] || ""}
                  onChange={(e) =>
                    onChange({ [key]: e.target.value } as Partial<NetworkEquipmentData>)
                  }
                  pattern="^(?:(?:25[0-5]|2[0-4]\d|1?\d{1,2})\.){3}(?:25[0-5]|2[0-4]\d|1?\d{1,2})(?:\/(?:[0-9]|[1-2][0-9]|3[0-2]))?$"
                  title="Enter a valid IPv4 address (optional CIDR), e.g. 192.168.1.1 or 10.0.0.0/24"
                  disabled={submitting}
                />
              ) : (
                <input
                  className="w-full border rounded px-2 py-1"
                  value={(form as any)[key] || ""}
                  onChange={(e) =>
                    onChange({ [key]: e.target.value } as Partial<NetworkEquipmentData>)
                  }
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

export default EquipmentFormDialog;