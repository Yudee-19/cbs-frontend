import React from "react";
import { Button } from "@/components/ui/button";
import CustomDialog from "@/components/ui/CustomDialog";
import type { PayeeData } from "@/services/banking/PayeeServices";
import { Loader2, X as XCircle } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const CATEGORY_OPTIONS = ["Vendor", "Supplier", "Contractor", "Service Provider", "Other"] as const;

type Mode = "add" | "edit" | "view";

const PAYEE_FORM_STYLES = `
  input::placeholder,
  textarea::placeholder {
    color: rgba(16, 24, 40, 0.8) !important;
  }
`;

interface Props {
  open: boolean;
  mode: Mode;
  form: Partial<PayeeData>;
  onChange: (patch: Partial<PayeeData>) => void;
  onSubmit: () => void | Promise<void>;
  onClose: () => void;
  submitting?: boolean;
}

export const PayeeFormDialog: React.FC<Props> = ({
  open,
  mode,
  form,
  onChange,
  onSubmit,
  onClose,
  submitting = false,
}) => {
  const footer = (
    <>
      <style>{PAYEE_FORM_STYLES}</style>
      <Button
        variant="outline"
        size="default"
        onClick={onClose}
        disabled={submitting}
        className="gap-2"
        style={{ width: "158px" }}
      >
        <XCircle className="h-4 w-4" />
        Cancel
      </Button>

      <Button
        form="payee-form"
        type="submit"
        size="default"
        disabled={submitting}
        className="gap-2 flex-1"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {mode === "add" ? "Adding..." : "Updating..."}
          </>
        ) : (
          <>
            <span className="text-lg">+</span>
            {mode === "add" ? "Add Payee" : "Update Payee"}
          </>
        )}
      </Button>
    </>
  );

  return (
    <CustomDialog
      open={open}
      onOpenChange={(v) => (!v ? onClose() : null)}
      title={mode === "add" ? "Add New Payee" : "Edit Payee"}
      description=""
      footer={footer}
      className="!w-[660px] !max-w-[660px] overflow-hidden !h-auto gap-0"
      headerClassName="!border-b-0 pb-0 pt-4"
      footerClassName="!border-t-0"
    >
      <form
        id="payee-form"
        className="grid grid-cols-2 gap-4"
        onSubmit={async (e) => {
          e.preventDefault();
          
          // Validation
          if (!form.name?.trim()) {
            alert("Payee Name is required");
            return;
          }
          if (!form.email?.trim()) {
            alert("Email is required");
            return;
          }
          // Basic email validation
          if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            alert("Please enter a valid email address");
            return;
          }
          
          await onSubmit();
        }}
      >
        {/* Payee Name */}
        <div>
          <label className="block text-sm text-gray-600 mb-1.5">
            Payee Name <span className="text-gray-600">*</span>
          </label>
          <input
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            style={{ backgroundColor: "rgba(102, 112, 133, 0.04)", color: "rgba(16, 24, 40, 0.8)" }}
            placeholder="e.g , John Doe"
            value={form.name ?? ""}
            onChange={(e) => onChange({ name: e.target.value })}
            disabled={submitting}
          />
        </div>

        {/* Company */}
        <div>
          <label className="block text-sm text-gray-600 mb-1.5">Company</label>
          <input
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            style={{ backgroundColor: "rgba(102, 112, 133, 0.04)", color: "rgba(16, 24, 40, 0.8)" }}
            placeholder="e.g , ABC Corporation"
            value={form.company ?? ""}
            onChange={(e) => onChange({ company: e.target.value })}
            disabled={submitting}
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm text-gray-600 mb-1.5">Category</label>
          <Select
            value={form.category ?? ""}
            onValueChange={(v) => onChange({ category: v })}
            disabled={submitting}
          >
            <SelectTrigger className="w-full h-10" style={{ backgroundColor: "rgba(102, 112, 133, 0.04)", color: "rgba(16, 24, 40, 0.8)" }}>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORY_OPTIONS.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm text-gray-600 mb-1.5">Phone</label>
          <input
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            style={{ backgroundColor: "rgba(102, 112, 133, 0.04)", color: "rgba(16, 24, 40, 0.8)" }}
            placeholder="e.g , 84645115451"
            value={form.phone ?? ""}
            onChange={(e) => onChange({ phone: e.target.value })}
            disabled={submitting}
          />
        </div>

        {/* Email */}
        <div className="col-span-2">
          <label className="block text-sm text-gray-600 mb-1.5">
            Email <span className="text-gray-600">*</span>
          </label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            style={{ backgroundColor: "rgba(102, 112, 133, 0.04)", color: "rgba(16, 24, 40, 0.8)" }}
            placeholder="e.g , contact@gmail.com"
            value={form.email ?? ""}
            onChange={(e) => onChange({ email: e.target.value })}
            disabled={submitting}
          />
        </div>

        {/* Address */}
        <div className="col-span-2">
          <label className="block text-sm text-gray-600 mb-1.5">Address</label>
          <input
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            style={{ backgroundColor: "rgba(102, 112, 133, 0.04)", color: "rgba(16, 24, 40, 0.8)" }}
            placeholder="e.g , Po box 5389, Ai Safat 12170, Kuwait"
            value={form.address ?? ""}
            onChange={(e) => onChange({ address: e.target.value })}
            disabled={submitting}
          />
        </div>

        {/* Notes */}
        <div className="col-span-2">
          <label className="block text-sm text-gray-600 mb-1.5">Notes</label>
          <textarea
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            style={{ backgroundColor: "rgba(102, 112, 133, 0.04)", color: "rgba(16, 24, 40, 0.8)" }}
            placeholder="Additional Notes..."
            rows={4}
            value={form.notes ?? ""}
            onChange={(e) => onChange({ notes: e.target.value })}
            disabled={submitting}
          />
        </div>
      </form>
    </CustomDialog>
  );
};
