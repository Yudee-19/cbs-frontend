import React from "react";
import { Button } from "@/components/ui/button";
import CustomDialog from "@/components/ui/CustomDialog";
import { DialogClose } from "@/components/ui/dialog";
import type { IsoData } from "@/services/company-documents/IsoServices";
import { Loader2 } from "lucide-react";

type Mode = "add" | "edit";

interface Props {
  open: boolean;
  mode: Mode;
  form: IsoData;
  onChange: (patch: Partial<IsoData>) => void;
  onSubmit: () => void | Promise<void>;
  onClose: () => void;
  onDelete?: () => void;
  submitting?: boolean;
}

export const IsoFormDialog: React.FC<Props> = ({
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
      <Button form="iso-form" type="submit" size="sm" disabled={submitting}>
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
      title={mode === "add" ? "Add ISO Certificate" : `Edit: ${form.certificateName || ""}`}
      description={mode === "add" ? "Create a new ISO certificate." : "Update certificate details."}
      footer={footer}
    >
      <form
        id="iso-form"
        className="grid grid-cols-2 gap-4 text-sm"
        onSubmit={async (e) => {
          e.preventDefault();
          await onSubmit();
          onClose();
        }}
      >
        <div className="col-span-2">
          <label className="block text-xs text-muted-foreground mb-1">Certificate Name</label>
          <input
            className="w-full border rounded px-2 py-1"
            value={form.certificateName || ""}
            onChange={(e) => onChange({ certificateName: e.target.value })}
            required
            disabled={submitting}
          />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">ISO Standard</label>
          <input
            className="w-full border rounded px-2 py-1"
            value={form.isoStandard || ""}
            onChange={(e) => onChange({ isoStandard: e.target.value })}
            disabled={submitting}
          />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Issue Date</label>
          <input
            type="date"
            className="w-full border rounded px-2 py-1"
            value={form.issueDate ? form.issueDate.slice(0, 10) : ""}
            onChange={(e) => onChange({ issueDate: new Date(e.target.value).toISOString() })}
            disabled={submitting}
          />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Expiry Date</label>
          <input
            type="date"
            className="w-full border rounded px-2 py-1"
            value={form.expiryDate ? form.expiryDate.slice(0, 10) : ""}
            onChange={(e) => onChange({ expiryDate: new Date(e.target.value).toISOString() })}
            disabled={submitting}
          />
        </div>

        <div className="col-span-2">
          <label className="block text-xs text-muted-foreground mb-1">Certifying Body</label>
          <input
            className="w-full border rounded px-2 py-1"
            value={form.certifyingBody || ""}
            onChange={(e) => onChange({ certifyingBody: e.target.value })}
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