import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import CustomDialog from "@/components/ui/CustomDialog";
import type { ForecastData } from "@/services/banking/ForecastServices";
import { Loader2, X as XCircle, Save } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { listBankAccounts } from "@/services/banking/BankAccountServices";
import { toast } from "sonner";

const TYPE_OPTIONS = ["Inflow", "Outflow"] as const;
const CATEGORY_OPTIONS = ["Client Payment", "Salary", "Rent", "Utilities", "Other"] as const;
const CURRENCY_OPTIONS = ["KWD", "USD", "EUR", "GBP", "AED", "SAR"] as const;
const STATUS_OPTIONS = ["Planned", "Confirmed"] as const;

type Mode = "add" | "edit";

const FORECAST_FORM_STYLES = `
  input::placeholder,
  textarea::placeholder {
    color: rgba(16, 24, 40, 0.5) !important;
  }
  [data-placeholder] {
    color: rgba(16, 24, 40, 0.8) !important;
  }
  .select-trigger-placeholder {
    color: rgba(16, 24, 40, 0.8) !important;
  }
`;

interface Props {
  open: boolean;
  mode: Mode;
  form: Partial<ForecastData>;
  onChange: (patch: Partial<ForecastData>) => void;
  onSubmit: () => void | Promise<void>;
  onClose: () => void;
  submitting?: boolean;
}

export const ForecastFormDialog: React.FC<Props> = ({
  open,
  mode,
  form,
  onChange,
  onSubmit,
  onClose,
  submitting = false,
}) => {
  const [bankAccounts, setBankAccounts] = useState<any[]>([]);
  const [loadingBanks, setLoadingBanks] = useState(false);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        setLoadingBanks(true);
        const response = await listBankAccounts(1, 200);
        setBankAccounts(response.items || []);
      } catch (error) {
        console.error("Failed to load bank accounts:", error);
        toast.error("Failed to load bank accounts");
      } finally {
        setLoadingBanks(false);
      }
    };

    if (open) {
      fetchBanks();
    }
  }, [open]);

  const footer = (
    <>
      <style>{FORECAST_FORM_STYLES}</style>
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
        form="forecast-form"
        type="submit"
        size="default"
        disabled={submitting}
        className="gap-2 flex-1"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Save className="h-4 w-4" />
            Save Forecast
          </>
        )}
      </Button>
    </>
  );

  return (
    <CustomDialog
      open={open}
      onOpenChange={(v) => (!v ? onClose() : null)}
      title={mode === "add" ? "Add Forecast Entry" : "Edit Forecast Entry"}
      description=""
      footer={footer}
      className="!w-[660px] !max-w-[660px] overflow-hidden !h-auto gap-0"
      headerClassName="!border-b-0 pb-0 pt-4"
      footerClassName="!border-t-0"
    >
      <form
        id="forecast-form"
        className="grid grid-cols-2 gap-4"
        onSubmit={async (e) => {
          e.preventDefault();

          // Collect all validation errors
          const errors: string[] = [];

          if (!form.date) {
            errors.push("Date is required");
          }
          if (!form.type) {
            errors.push("Type (Inflow/Outflow) is required");
          }
          if (!form.category) {
            errors.push("Category is required");
          }
          if (!form.description?.trim()) {
            errors.push("Description is required");
          }
          if (!form.amount || form.amount <= 0) {
            errors.push("Amount must be greater than 0");
          }
          if (!form.bankAccount) {
            errors.push("Bank Account is required");
          }

          // If there are errors, show all of them
          if (errors.length > 0) {
            errors.forEach((error) => {
              toast.error("Validation Error", {
                description: error,
              });
            });
            return;
          }

          await onSubmit();
        }}
      >
        {/* Date */}
        <div>
          <label className="block text-sm text-[#667085] mb-1.5">Date</label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            style={{
              backgroundColor: "rgba(102, 112, 133, 0.04)",
              color: "rgba(16, 24, 40, 0.8)",
            }}
            value={form.date ? new Date(form.date).toISOString().split("T")[0] : ""}
            onChange={(e) => onChange({ date: e.target.value })}
            disabled={submitting}
          />
        </div>

        {/* Type */}
        <div>
          <label className="block text-sm text-[#667085] mb-1.5">Type</label>
          <Select
            value={form.type ?? ""}
            onValueChange={(v) => onChange({ type: v as "Inflow" | "Outflow" })}
            disabled={submitting}
          >
            <SelectTrigger
              className="w-full h-10 border border-gray-300 rounded-md px-3"
              style={{
                backgroundColor: "rgba(102, 112, 133, 0.04)",
                color: "rgba(16, 24, 40, 0.8)",
              }}
            >
              <SelectValue placeholder="Inflow" data-placeholder />
            </SelectTrigger>
            <SelectContent>
              {TYPE_OPTIONS.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm text-[#667085] mb-1.5">Category</label>
          <Select
            value={form.category ?? ""}
            onValueChange={(v) => onChange({ category: v })}
            disabled={submitting}
          >
            <SelectTrigger
              className="w-full h-10 border border-gray-300 rounded-md px-3"
              style={{
                backgroundColor: "rgba(102, 112, 133, 0.04)",
                color: "rgba(16, 24, 40, 0.8)",
              }}
            >
              <SelectValue placeholder="Select Category" data-placeholder />
            </SelectTrigger>
            <SelectContent>
              {CATEGORY_OPTIONS.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm text-[#667085] mb-1.5">Description</label>
          <input
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            style={{
              backgroundColor: "rgba(102, 112, 133, 0.04)",
              color: "rgba(16, 24, 40, 0.8)",
            }}
            placeholder="Enter description..."
            value={form.description ?? ""}
            onChange={(e) => onChange({ description: e.target.value })}
            disabled={submitting}
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm text-[#667085] mb-1.5">Amount & Currency</label>
          <input
            type="number"
            step="0.01"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            style={{
              backgroundColor: "rgba(102, 112, 133, 0.04)",
              color: "rgba(16, 24, 40, 0.8)",
            }}
            placeholder="0.00"
            value={form.amount ?? ""}
            onChange={(e) => onChange({ amount: parseFloat(e.target.value) || 0 })}
            disabled={submitting}
          />
        </div>

        {/* Currency */}
        <div>
          <label className="block text-sm text-[#667085] mb-1.5">Currency</label>
          <Select
            value={form.currency ?? "KWD"}
            onValueChange={(v) => onChange({ currency: v })}
            disabled={submitting}
          >
            <SelectTrigger
              className="w-full h-10 border border-gray-300 rounded-md px-3"
              style={{
                backgroundColor: "rgba(102, 112, 133, 0.04)",
                color: "rgba(16, 24, 40, 0.8)",
              }}
            >
              <SelectValue placeholder="KWD - Kuwaiti Dinar" data-placeholder />
            </SelectTrigger>
            <SelectContent>
              {CURRENCY_OPTIONS.map((currency) => (
                <SelectItem key={currency} value={currency}>
                  {currency} - {currency === "KWD" ? "Kuwaiti Dinar" : currency}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Bank Account */}
        <div>
          <label className="block text-sm text-[#667085] mb-1.5">Bank Account</label>
          <Select
            value={form.bankAccount ?? ""}
            onValueChange={(v) => onChange({ bankAccount: v })}
            disabled={submitting || loadingBanks}
          >
            <SelectTrigger
              className="w-full h-10 border border-gray-300 rounded-md px-3"
              style={{
                backgroundColor: "rgba(102, 112, 133, 0.04)",
                color: "rgba(16, 24, 40, 0.8)",
              }}
            >
              <SelectValue placeholder={loadingBanks ? "Loading..." : "Select Bank Account"} data-placeholder />
            </SelectTrigger>
            <SelectContent>
              {bankAccounts.map((bank) => (
                <SelectItem key={bank._id || bank.id} value={bank.bankName}>
                  {bank.bankName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm text-[#667085] mb-1.5">Status</label>
          <Select
            value={form.status ?? "Planned"}
            onValueChange={(v) => onChange({ status: v as "Planned" | "Confirmed" })}
            disabled={submitting}
          >
            <SelectTrigger
              className="w-full h-10 border border-gray-300 rounded-md px-3"
              style={{
                backgroundColor: "rgba(102, 112, 133, 0.04)",
                color: "rgba(16, 24, 40, 0.8)",
              }}
            >
              <SelectValue placeholder="Planned" data-placeholder />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </form>
    </CustomDialog>
  );
};
