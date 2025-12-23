import React from "react";
import { Button } from "@/components/ui/button";
import CustomDialog from "@/components/ui/CustomDialog";
import type { BankAccountData } from "@/services/banking/BankAccountServices";
import { Loader2, Upload, X as XCircle } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const CURRENCY_OPTIONS = ["KWD", "USD", "EUR", "GBP", "AED", "SAR"] as const;

type Mode = "add" | "edit" | "view";

interface Props {
  open: boolean;
  mode: Mode;
  form: Partial<BankAccountData>;
  onChange: (patch: Partial<BankAccountData>) => void;
  onSubmit: () => void | Promise<void>;
  onClose: () => void;
  submitting?: boolean;
}

export const BankAccountFormDialog: React.FC<Props> = ({
  open,
  mode,
  form,
  onChange,
  onSubmit,
  onClose,
  submitting = false,
}) => {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Here you would typically upload the file and get a fileKey
      // For now, we'll just store the file name
      onChange({ fileKey: file.name });
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    onChange({ fileKey: undefined });
  };

  const footer = (
    <>
      <Button
        variant="outline"
        size="default"
        onClick={onClose}
        disabled={submitting}
        className="gap-2"
      >
        <XCircle className="h-4 w-4" />
        Cancel
      </Button>

      <Button
        form="bank-account-form"
        type="submit"
        size="default"
        disabled={submitting}
        className="gap-2"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {mode === "add" ? "Adding..." : "Updating..."}
          </>
        ) : (
          <>
            <span className="text-lg">+</span>
            {mode === "add" ? "Add Bank" : "Update Bank"}
          </>
        )}
      </Button>
    </>
  );

  return (
    <CustomDialog
      open={open}
      onOpenChange={(v) => (!v ? onClose() : null)}
      title={mode === "add" ? "Add New Bank Account" : "Edit Bank Account"}
      description=""
      footer={footer}
      maxWidth="max-w-3xl"
    >
      <form
        id="bank-account-form"
        className="grid grid-cols-2 gap-4"
        onSubmit={async (e) => {
          e.preventDefault();
          
          // Validation
          if (!form.bankName?.trim()) {
            alert("Bank Name is required");
            return;
          }
          if (!form.accountHolder?.trim()) {
            alert("Account Holder is required");
            return;
          }
          if (!form.accountNumber?.trim()) {
            alert("Account Number is required");
            return;
          }
          
          await onSubmit();
        }}
      >
        {/* Bank Name */}
        <div>
          <label className="block text-sm text-gray-600 mb-1.5">
            Bank Name <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g , Burgan Bank"
            value={form.bankName ?? ""}
            onChange={(e) => onChange({ bankName: e.target.value })}
            disabled={submitting}
          />
        </div>

        {/* Branch */}
        <div>
          <label className="block text-sm text-gray-600 mb-1.5">Branch</label>
          <input
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g , Farwaniya Branch - 239"
            value={form.branch ?? ""}
            onChange={(e) => onChange({ branch: e.target.value })}
            disabled={submitting}
          />
        </div>

        {/* Account Holder */}
        <div>
          <label className="block text-sm text-gray-600 mb-1.5">
            Account Holder <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g , Crown International"
            value={form.accountHolder ?? ""}
            onChange={(e) => onChange({ accountHolder: e.target.value })}
            disabled={submitting}
          />
        </div>

        {/* Account Number */}
        <div>
          <label className="block text-sm text-gray-600 mb-1.5">
            Account Number <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g , 2454-4548751-622-4522-965"
            value={form.accountNumber ?? ""}
            onChange={(e) => onChange({ accountNumber: e.target.value })}
            disabled={submitting}
          />
        </div>

        {/* Currency */}
        <div>
          <label className="block text-sm text-gray-600 mb-1.5">Currency</label>
          <Select
            value={form.currency ?? "USD"}
            onValueChange={(v) => onChange({ currency: v })}
            disabled={submitting}
          >
            <SelectTrigger className="w-full h-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CURRENCY_OPTIONS.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Current Cheque Number */}
        <div>
          <label className="block text-sm text-gray-600 mb-1.5">
            Current Cheque Number
          </label>
          <input
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g , 84645115451"
            value={form.currentChequeNumber ?? ""}
            onChange={(e) => onChange({ currentChequeNumber: e.target.value })}
            disabled={submitting}
          />
        </div>

        {/* Address - Full Width */}
        <div className="col-span-2">
          <label className="block text-sm text-gray-600 mb-1.5">Address</label>
          <input
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g , Po box 5389, Ai Safat 12170, Kuwait"
            value={form.address ?? ""}
            onChange={(e) => onChange({ address: e.target.value })}
            disabled={submitting}
          />
        </div>

        {/* Cheque Template Upload - Full Width */}
        <div className="col-span-2">
          <label className="block text-sm text-gray-600 mb-1.5">
            Cheque Template (Upload Image)
          </label>
          
          {!selectedFile ? (
            <label className="flex items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-md px-4 py-3 cursor-pointer hover:border-gray-400 transition-colors">
              <Upload className="h-4 w-4 mr-2 text-gray-500" />
              <span className="text-sm text-gray-600">Select file</span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileSelect}
                disabled={submitting}
              />
            </label>
          ) : (
            <div className="flex items-center justify-between w-full border border-gray-300 rounded-md px-4 py-3">
              <div className="flex items-center gap-2">
                <Upload className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-700">{selectedFile.name}</span>
              </div>
              <button
                type="button"
                onClick={removeFile}
                className="text-gray-400 hover:text-red-500 transition-colors"
                disabled={submitting}
              >
                <XCircle className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </form>
    </CustomDialog>
  );
};
