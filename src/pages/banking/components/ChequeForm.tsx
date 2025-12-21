import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioButton } from "@/components/ui/radio-button";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ChequeFormData } from "../NewChequePage";
import { BANK_OPTIONS } from "../NewChequePage";

interface ChequeFormProps {
  formData: ChequeFormData;
  onInputChange: (field: keyof ChequeFormData, value: unknown) => void;
  onGeneratePreview: () => void;
}

const ChequeForm = ({ 
  formData, 
  onInputChange, 
  onGeneratePreview,
}: ChequeFormProps) => {
  const handleBankChange = (bankId: string) => {
    const selectedBank = BANK_OPTIONS.find((bank) => bank.id === bankId);
    if (selectedBank) {
      onInputChange("bank", bankId);
      onInputChange("branch", selectedBank.branch);
      onInputChange("account", selectedBank.account);
      onInputChange("currentCheque", selectedBank.currentCheque);
      onInputChange("currency", selectedBank.currency);
    }
  };

  const handleGeneratePreviewClick = () => {
    // Validate payee name
    if (!formData.payeeName || formData.payeeName.trim().length === 0) {
      toast.error("Enter valid payee name");
      return;
    }

    // Validate amount
    if (!formData.amount || parseFloat(formData.amount) === 0) {
      toast.error("Enter valid amount");
      return;
    }

    onGeneratePreview();
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-6">Cheque Details</h2>

      {/* Bank / Business Contact */}
      <div className="mb-6">
        <label className="block text-xs text-muted-foreground mb-1">
          Select Bank / Business Contact
        </label>
        <Select value={formData.bank} onValueChange={handleBankChange}>
          <SelectTrigger className="w-full bg-gray-50 shadow-none">
            <SelectValue placeholder="Select bank" />
          </SelectTrigger>
          <SelectContent>
            {BANK_OPTIONS.map((bank) => (
              <SelectItem key={bank.id} value={bank.id}>
                {bank.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Bank Details Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg border border-input">
        <div>
          <Label className="text-xs text-gray-500 mb-1 block">Branch:</Label>
          <p className="text-sm font-medium">{formData.branch}</p>
        </div>
        <div>
          <Label className="text-xs text-gray-500 mb-1 block">Account:</Label>
          <p className="text-sm font-medium">{formData.account}</p>
        </div>
        <div>
          <Label className="text-xs text-gray-500 mb-1 block">Current Cheque:</Label>
          <p className="text-sm font-medium">{formData.currentCheque}</p>
        </div>
        <div>
          <Label className="text-xs text-gray-500 mb-1 block">Currency:</Label>
          <p className="text-sm font-medium">{formData.currency}</p>
        </div>
      </div>

      {/* Payee Name */}
      <div className="mb-6">
        <label className="block text-xs text-muted-foreground mb-1">Payee Name</label>
        <Input
          type="text"
          placeholder="Enter payee name"
          value={formData.payeeName}
          onChange={(e) => onInputChange("payeeName", e.target.value)}
          className="w-full bg-gray-50 shadow-none placeholder:text-gray-700"
        />
      </div>

      {/* Amount */}
      <div className="mb-6">
        <label className="block text-xs text-muted-foreground mb-1">Amount</label>
        <div className="flex gap-2">
          <div className="flex items-center px-3 bg-gray-50 rounded-md border border-input">
            <span className="text-gray-600 font-medium">{formData.currency}</span>
          </div>
          <Input
            type="number"
            placeholder="12,345.56"
            value={formData.amount}
            onChange={(e) => onInputChange("amount", e.target.value)}
            className="flex-1 bg-gray-50 shadow-none placeholder:text-gray-700"
          />
        </div>
      </div>

      {/* Date */}
      <div className="mb-6">
        <label className="block text-xs text-muted-foreground mb-1">Date</label>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => onInputChange("date", e.target.value)}
          className="w-full border rounded-lg px-2 py-2 bg-gray-50"
        />
      </div>

      {/* Orientation */}
      <div className="mb-8">
        <label className="block text-xs text-muted-foreground mb-3">Orientation</label>
        <RadioGroupPrimitive.Root
          value={formData.orientation}
          onValueChange={(value) => onInputChange("orientation", value)}
          className="flex gap-6"
        >
          <div className="flex items-center gap-2">
            <RadioButton id="orientation-horizontal" value="horizontal" />
            <Label htmlFor="orientation-horizontal" className="text-sm cursor-pointer">
              Horizontal
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioButton id="orientation-vertical" value="vertical" />
            <Label htmlFor="orientation-vertical" className="text-sm cursor-pointer">
              Vertical
            </Label>
          </div>
        </RadioGroupPrimitive.Root>
      </div>

      {/* Generate Preview Button */}
      <Button
        onClick={handleGeneratePreviewClick}
        className="w-full bg-primary hover:bg-blue-700 text-white font-medium py-2 rounded-lg"
      >
        Generate Preview
      </Button>
    </div>
  );
};

export default ChequeForm;
