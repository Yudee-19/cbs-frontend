import React from "react";
import { Button } from "@/components/ui/button";
import CustomDialog from "@/components/ui/CustomDialog";
import { DialogClose } from "@/components/ui/dialog";
import type { LegalDocData } from "@/services/company-documents/legalDocServices";
import { Loader2 } from "lucide-react";

type Mode = "add" | "edit";

interface Props {
  open: boolean;
  mode: Mode;
  form: LegalDocData;
  onChange: (patch: Partial<LegalDocData>) => void;
  onSubmit: () => void | Promise<void>;
  onClose: () => void;
  onDelete?: () => void;
  submitting?: boolean;
}

export const LegalDocumentFormDialog: React.FC<Props> = ({
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
      <Button form="legal-form" type="submit" size="sm" disabled={submitting}>
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
      title={mode === "add" ? "Add Document" : `Edit: ${form.name || ""}`}
      description={mode === "add" ? "Create a new document." : "Update document details."}
      footer={footer}
    >
      <form
        id="legal-form"
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
          <label className="block text-xs text-muted-foreground mb-1">Category</label>
          <input
            className="w-full border rounded px-2 py-1"
            value={form.category || ""}
            onChange={(e) => onChange({ category: e.target.value })}
            disabled={submitting}
          />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Document Date</label>
          <input
            type="date"
            className="w-full border rounded px-2 py-1"
            value={form.documentDate ? form.documentDate.slice(0, 10) : ""}
            onChange={(e) => onChange({ documentDate: new Date(e.target.value).toISOString() })}
            disabled={submitting}
          />
        </div>

        <div className="col-span-2">
          <label className="block text-xs text-muted-foreground mb-1">Parties Involved</label>
          <input
            className="w-full border rounded px-2 py-1"
            value={form.partiesInvolved || ""}
            onChange={(e) => onChange({ partiesInvolved: e.target.value })}
            disabled={submitting}
          />
        </div>

        <div className="col-span-2">
          <label className="block text-xs text-muted-foreground mb-1">File Key (optional)</label>
          <input
            className="w-full border rounded px-2 py-1"
            value={form.fileKey || ""}
            onChange={(e) => onChange({ fileKey: e.target.value })}
            disabled={submitting}
            placeholder="ims/private/..."
          />
        </div>
      </form>
    </CustomDialog>
  );
};