import React from "react";
import { Button } from "@/components/ui/button";
import CustomDialog from "@/components/ui/CustomDialog";
import { DialogClose } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import type { LeaveApplicationData } from "@/services/LeaveApplicationServices";

type Mode = "add" | "edit";

interface Props {
  open: boolean;
  mode: Mode;
  form: LeaveApplicationData;
  onChange: (patch: Partial<LeaveApplicationData>) => void;
  onSubmit: () => void | Promise<void>;
  onClose: () => void;
  onDelete?: () => void;
  submitting?: boolean;
  onFilesChanged?: (files: File[]) => void;
}

const LEAVE_TYPES = [
  "Annual Leave",
  "Sick Leave",
  "Emergency Leave",
  "Casual Leave",
  "Unpaid Leave",
];

export const LeaveApplicationFormDialog: React.FC<Props> = ({
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
      <Button form="leave-form" type="submit" size="sm" disabled={submitting}>
        {submitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {mode === "add" ? "Submitting..." : "Updating..."}
          </>
        ) : mode === "add" ? (
          "Submit"
        ) : (
          "Update"
        )}
      </Button>

      {mode === "edit" && onDelete && (
        <Button
          type="button"
          size="sm"
          variant="destructive"
          onClick={onDelete}
          disabled={submitting}
        >
          Delete
        </Button>
      )}

      <DialogClose asChild>
        <Button
          type="button"
          size="sm"
          variant="secondary"
          disabled={submitting}
          onClick={onClose}
        >
          Close
        </Button>
      </DialogClose>
    </>
  );

  return (
    <CustomDialog
      open={open}
      onOpenChange={(v) => (!v ? onClose() : null)}
      title={mode === "add" ? "Apply for Leave" : "Edit Leave Request"}
      description={
        mode === "add"
          ? "Fill in the details to submit a leave application."
          : "Update your leave application."
      }
      footer={footer}
    >
      <form
        id="leave-form"
        className="grid grid-cols-2 gap-4 text-sm"
        onSubmit={async (e) => {
          e.preventDefault();
          await onSubmit();
          onClose();
        }}
      >
        <div className="col-span-2">
          <label className="block text-xs text-muted-foreground mb-1">
            Leave Type
          </label>
          <Select
            value={form.leaveType || undefined}
            onValueChange={(v) => onChange({ leaveType: v })}
            disabled={submitting}
          >
            <SelectTrigger size="sm" aria-label="Leave type">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {LEAVE_TYPES.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">
            Start Date
          </label>
          <input
            type="date"
            className="w-full border rounded px-2 py-1"
            value={form.startDate ? form.startDate.slice(0, 10) : ""}
            onChange={(e) =>
              onChange({ startDate: new Date(e.target.value).toISOString() })
            }
            disabled={submitting}
            required
          />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">
            End Date
          </label>
          <input
            type="date"
            className="w-full border rounded px-2 py-1"
            value={form.endDate ? form.endDate.slice(0, 10) : ""}
            onChange={(e) =>
              onChange({ endDate: new Date(e.target.value).toISOString() })
            }
            disabled={submitting}
            required
          />
        </div>

        <div className="col-span-2">
          <label className="block text-xs text-muted-foreground mb-1">
            Reason
          </label>
          <textarea
            className="w-full border rounded px-2 py-1 h-24 resize-y"
            value={form.reason || ""}
            onChange={(e) => onChange({ reason: e.target.value })}
            disabled={submitting}
            placeholder="Reason for leave"
            required
          />
        </div>

      </form>
    </CustomDialog>
  );
};