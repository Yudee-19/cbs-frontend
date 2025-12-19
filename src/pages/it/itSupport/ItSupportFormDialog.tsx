import React from "react";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import CustomDialog from "@/components/ui/CustomDialog";
import type { SupportTicketData } from "@/services/itServices/SupportServices";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const CATEGORY_OPTIONS = [
  "Hardware",
  "Software",
  "Network",
  "Email",
  "Access Control",
  "Printer",
  "Phone",
  "Other",
] as const;

const PRIORITY_OPTIONS = ["Low", "Medium", "High", "Critical"] as const;

const DEPT_OPTIONS = ["Finance", "HR", "Operations", "Sales", "Marketing", "IT", "Legal"] as const;

const ASSIGNEE_OPTIONS = ["Unassigned", "Mark Wilson", "James Chen", "Sarah Mitchell"] as const;
const STATUS_OPTIONS = ["Open", "InProgress", "Resolved"] as const;
type Mode = "add" | "edit";

interface Props {
  open: boolean;
  mode: Mode;
  form: SupportTicketData;
  onChange: (patch: Partial<SupportTicketData>) => void;
  onSubmit: () => void | Promise<void>;
  onClose: () => void;
  onDelete?: () => void;
  submitting?: boolean;
}

const ItSupportFormDialog: React.FC<Props> = ({
  open,
  mode,
  form,
  onChange,
  onSubmit,
  onClose,
  onDelete,
  submitting = false,
}) => {
  const footer = (
    <>
      <Button form="support-form" type="submit" size="sm" disabled={submitting}>
        {submitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {mode === "add" ? "Creating..." : "Updating..."}
          </>
        ) : mode === "add" ? "Create" : "Update"}
      </Button>

      {mode === "edit" && onDelete && (
        <Button type="button" size="sm" variant="destructive" onClick={onDelete} disabled={submitting}>
          Delete
        </Button>
      )}

      <DialogClose asChild>
        <Button type="button" size="sm" variant="secondary" disabled={submitting} onClick={onClose}>
          Close
        </Button>
      </DialogClose>
    </>
  );

  return (
    <CustomDialog
      open={open}
      onOpenChange={(v) => (!v ? onClose() : null)}
      title={mode === "add" ? "Add Ticket" : `Edit: ${form.ticketTitle || ""}`}
      description={mode === "add" ? "Create a new support ticket." : "Update ticket details."}
      footer={footer}
    >
      <form
        id="support-form"
        className="grid grid-cols-2 gap-4 text-sm"
        onSubmit={async (e) => {
          e.preventDefault();
          await onSubmit();
        }}
      >
        <div className="col-span-2">
          <label className="block text-xs text-muted-foreground mb-1">Title</label>
          <input className="w-full border rounded px-2 py-1" value={form.ticketTitle || ""} onChange={(e) => onChange({ ticketTitle: e.target.value })} required disabled={submitting} />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Category</label>
          <Select
            value={form.category ?? ""}
            onValueChange={(v) => onChange({ category: v === "__none" ? "" : v })}
            disabled={submitting}
          >
            <SelectTrigger size="sm">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key="__none_cat" value="__none">None</SelectItem>
              {CATEGORY_OPTIONS.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Priority</label>
          <Select
            value={form.priority ?? ""}
            onValueChange={(v) => onChange({ priority: v === "__none" ? "" : v })}
            disabled={submitting}
          >
            <SelectTrigger size="sm">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key="__none_pri" value="__none">None</SelectItem>
              {PRIORITY_OPTIONS.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Department</label>
          <Select
            value={form.department ?? ""}
            onValueChange={(v) => onChange({ department: v === "__none" ? "" : v })}
            disabled={submitting}
          >
            <SelectTrigger size="sm">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key="__none_dept" value="__none">None</SelectItem>
              {DEPT_OPTIONS.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Assign To</label>
          <Select
            value={form.assignTo ?? ""}
            onValueChange={(v) => onChange({ assignTo: v === "__none" ? "" : v })}
            disabled={submitting}
          >
            <SelectTrigger size="sm">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {ASSIGNEE_OPTIONS.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
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
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key="__none_status" value="__none">None</SelectItem>
              {STATUS_OPTIONS.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Submitted By</label>
          <input className="w-full border rounded px-2 py-1" value={form.submittedBy || ""} onChange={(e) => onChange({ submittedBy: e.target.value })} disabled={submitting} />
        </div>

        <div className="col-span-2">
          <label className="block text-xs text-muted-foreground mb-1">Description</label>
          <textarea className="w-full border rounded px-2 py-1 h-28" value={form.description || ""} onChange={(e) => onChange({ description: e.target.value })} disabled={submitting} />
        </div>
      </form>
    </CustomDialog>
  );
};

export default ItSupportFormDialog;