import React from "react";
import { Button } from "@/components/ui/button";
import CustomDialog from "@/components/ui/CustomDialog";
import { DialogClose } from "@/components/ui/dialog";
import { type LicenseData } from "@/services/company-documents/LicensesServices";
import { Loader2 } from "lucide-react";
import { FileUploader } from "@/components/ui/FileUploader";

type Mode = "add" | "edit";

interface Props {
    open: boolean;
    mode: Mode;
    form: LicenseData;
    onChange: (patch: Partial<LicenseData>) => void;
    onSubmit: () => void | Promise<void>;
    onClose: () => void;
    onDelete?: () => void;
    submitting?: boolean;
    onFilesChanged?: (files: File[]) => void;
}

export const LicenseFormDialog: React.FC<Props> = ({
    open,
    mode,
    form,
    onChange,
    onSubmit,
    onClose,
    onDelete,
    submitting = false,
    onFilesChanged,
}) => {
    const footer = (
        <>
            <Button
                form="license-form"
                type="submit"
                size="sm"
                disabled={submitting}
            >
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
            title={mode === "add" ? "Add License" : `Edit: ${form.name || ""}`}
            description={
                mode === "add"
                    ? "Create a new license."
                    : "Update license details."
            }
            footer={footer}
        >
            <form
                id="license-form"
                className="grid grid-cols-2 gap-4 text-sm"
                onSubmit={async (e) => {
                    e.preventDefault();
                    await onSubmit();
                    onClose();
                }}
            >
                <div className="col-span-2">
                    <label className="block text-xs text-muted-foreground mb-1">
                        Name
                    </label>
                    <input
                        className="w-full border rounded px-2 py-1"
                        value={form.name || ""}
                        onChange={(e) => onChange({ name: e.target.value })}
                        required
                        disabled={submitting}
                    />
                </div>

                <div className="col-span-1">
                    <label className="block text-xs text-muted-foreground mb-1">
                        Number
                    </label>
                    <input
                        className="w-full border rounded px-2 py-1"
                        value={form.number || ""}
                        onChange={(e) => onChange({ number: e.target.value })}
                        required
                        disabled={submitting}
                    />
                </div>

                <div className="col-span-1">
                    <label className="block text-xs text-muted-foreground mb-1">
                        Issuing Authority
                    </label>
                    <input
                        className="w-full border rounded px-2 py-1"
                        value={form.issuingAuthority || ""}
                        onChange={(e) =>
                            onChange({ issuingAuthority: e.target.value })
                        }
                        disabled={submitting}
                    />
                </div>

                <div className="col-span-1">
                    <label className="block text-xs text-muted-foreground mb-1">
                        Issue Date
                    </label>
                    <input
                        type="date"
                        className="w-full border rounded px-2 py-1"
                        value={
                            form.issueDate ? form.issueDate.slice(0, 10) : ""
                        }
                        onChange={(e) =>
                            onChange({
                                issueDate: new Date(
                                    e.target.value
                                ).toISOString(),
                            })
                        }
                        disabled={submitting}
                    />
                </div>

                <div className="col-span-1">
                    <label className="block text-xs text-muted-foreground mb-1">
                        Expiry Date
                    </label>
                    <input
                        type="date"
                        className="w-full border rounded px-2 py-1"
                        value={
                            form.expiryDate ? form.expiryDate.slice(0, 10) : ""
                        }
                        onChange={(e) =>
                            onChange({
                                expiryDate: new Date(
                                    e.target.value
                                ).toISOString(),
                            })
                        }
                        disabled={submitting}
                    />
                </div>

                {/* File Uploader Integration */}
                <div className="col-span-2">
                    <label className="block text-xs text-muted-foreground mb-1">
                        Attachments
                    </label>
                    <FileUploader
                        className={
                            submitting ? "pointer-events-none opacity-50" : ""
                        }
                        acceptedTypes={[
                            "application/pdf",
                            "application/msword",
                            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                        ]}
                        maxFiles={1}
                        maxSizeMB={50}
                        onFilesChanged={(files) => {
                            const first = files[0];
                            onChange({ fileKey: first ? first.name : "" });
                            onFilesChanged?.(files);
                        }}
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                        Selected: {form.fileKey || "None"}
                    </p>
                </div>
            </form>
        </CustomDialog>
    );
};
