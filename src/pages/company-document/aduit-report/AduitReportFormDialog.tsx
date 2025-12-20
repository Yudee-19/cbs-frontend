import React from "react";
import { Button } from "@/components/ui/button";
import CustomDialog from "@/components/ui/CustomDialog";
import { DialogClose } from "@/components/ui/dialog";
import type { AuditData } from "@/services/company-documents/AuditServices";
import { Loader2 } from "lucide-react";
import { FileUploader } from "@/components/ui/fileUploader";

type Mode = "add" | "edit";

interface Props {
  open: boolean;
  mode: Mode;
  form: AuditData;
  onChange: (patch: Partial<AuditData>) => void;
  onSubmit: () => void | Promise<void>;
  onClose: () => void;
  onDelete?: () => void;
  submitting?: boolean;
}

export const AduitReportFormDialog: React.FC<Props> = ({
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
      <Button form="audit-form" type="submit" size="sm" disabled={submitting}>
        {submitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {mode === "add" ? "Creating..." : "Updating..."}
          </>
        ) : mode === "add" ? (
          "Create"
        ) : (
          "Update"
        )}
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
      title={mode === "add" ? "Add Audit Report" : `Edit: ${form.name || ""}`}
      description={mode === "add" ? "Create a new audit report." : "Update audit report details."}
      footer={footer}
    >
      <form
        id="audit-form"
        className="grid grid-cols-2 gap-4 text-sm"
        onSubmit={async (e) => {
          e.preventDefault();
          await onSubmit();
          onClose();
        }}
      >
        <div className="col-span-2">
          <label className="block text-xs text-muted-foreground mb-1">Name</label>
          <input
            className="w-full border rounded px-2 py-1"
            value={form.name || ""}
            onChange={(e) => onChange({ name: e.target.value })}
            required
            disabled={submitting}
          />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Type</label>
          <input
            className="w-full border rounded px-2 py-1"
            value={form.type || ""}
            onChange={(e) => onChange({ type: e.target.value })}
            disabled={submitting}
          />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Auditor</label>
          <input
            className="w-full border rounded px-2 py-1"
            value={form.auditor || ""}
            onChange={(e) => onChange({ auditor: e.target.value })}
            disabled={submitting}
          />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Period Start</label>
          <input
            type="date"
            className="w-full border rounded px-2 py-1"
            value={form.periodStart ? form.periodStart.slice(0, 10) : ""}
            onChange={(e) => onChange({ periodStart: new Date(e.target.value).toISOString() })}
            disabled={submitting}
          />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Period End</label>
          <input
            type="date"
            className="w-full border rounded px-2 py-1"
            value={form.periodEnd ? form.periodEnd.slice(0, 10) : ""}
            onChange={(e) => onChange({ periodEnd: new Date(e.target.value).toISOString() })}
            disabled={submitting}
          />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Completion Date</label>
          <input
            type="date"
            className="w-full border rounded px-2 py-1"
            value={form.completionDate ? form.completionDate.slice(0, 10) : ""}
            onChange={(e) => onChange({ completionDate: e.target.value ? new Date(e.target.value).toISOString() : "" })}
            disabled={submitting}
          />
        </div>

        <div className="col-span-2">
          <label className="block text-xs text-muted-foreground mb-1">Attachments</label>
          <FileUploader
            className={submitting ? "pointer-events-none opacity-50" : ""}
            acceptedTypes={[
              "application/pdf",
              "application/msword",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ]}
            maxFiles={5}
            maxSizeMB={50}
            onFilesChanged={(files) => {
              // Map first file to fileKey for now; integrate upload to get a real key.
              onChange({ fileKey: files[0]?.name ?? "" });
            }}
          />
        </div>
      </form>
    </CustomDialog>
  );
};