import { useState, useEffect, useCallback } from "react";
import { X, Save, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createTelexTransfer, type TelexTransferData } from "@/services/banking/TelexTransferServices";
import { listBankAccounts, type BankAccountData } from "@/services/banking/BankAccountServices";
import { toast } from "sonner";
import { CURRENCIES, DEFAULT_CURRENCY, AUTHORIZED_PERSONS } from "../constants";

interface NewTransferModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const NewTransferModal = ({ open, onClose, onSuccess }: NewTransferModalProps) => {
  const [loading, setLoading] = useState(false);
  const [bankAccounts, setBankAccounts] = useState<BankAccountData[]>([]);
  const [formData, setFormData] = useState({
    transferDate: new Date().toISOString().split('T')[0],
    senderBank: "",
    senderAccountNo: "",
    beneficiaryName: "",
    beneficiaryBankName: "",
    beneficiaryAccountNo: "",
    swiftCode: "",
    transferAmount: "",
    currency: DEFAULT_CURRENCY,
    purpose: "",
    authorizedBy: "",
    remarks: "",
  });

  const fetchBankAccounts = useCallback(async () => {
    try {
      const response = await listBankAccounts(1, 100);
      setBankAccounts(response.items);
    } catch (error) {
      console.error("Failed to fetch bank accounts:", error);
    }
  }, []);

  useEffect(() => {
    if (open) {
      fetchBankAccounts();
    }
  }, [open, fetchBankAccounts]);

  const handleSenderBankChange = (bankId: string) => {
    const selectedBank = bankAccounts.find(b => b._id === bankId || b.id === bankId);
    setFormData(prev => ({
      ...prev,
      senderBank: bankId,
      senderAccountNo: selectedBank?.accountNumber || "",
    }));
  };

  const handleSubmit = async (isDraft: boolean = false) => {
    try {
      setLoading(true);

      // TODO: Confirm swiftCode hardcoded value with team
      const transferData: Omit<TelexTransferData, "_id" | "id" | "createdAt" | "updatedAt"> = {
        transferDate: new Date(formData.transferDate).toISOString(),
        senderBank: formData.senderBank,
        senderAccountNo: formData.senderAccountNo,
        beneficiaryName: formData.beneficiaryName,
        beneficiaryBankName: formData.beneficiaryBankName,
        beneficiaryAccountNo: formData.beneficiaryAccountNo,
        swiftCode: "0000",
        transferAmount: parseFloat(formData.transferAmount),
        currency: formData.currency,
        purpose: formData.purpose,
        authorizedBy: formData.authorizedBy || undefined,
        remarks: formData.remarks || undefined,
        status: isDraft ? "Draft" : "Pending",
      };

      await createTelexTransfer(transferData);
      toast.success(isDraft ? "Transfer saved as draft" : "Transfer submitted for approval");
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error("Failed to create transfer:", error);
      toast.error(error?.message || "Failed to create transfer");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-5xl max-h-[90vh] overflow-auto shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
          <h2 className="text-xl font-semibold">New Telex Transfer</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-6">
          {/* Row 1 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-gray-600">Transfer Date</Label>
              <Input
                type="date"
                value={formData.transferDate}
                onChange={(e) => setFormData(prev => ({ ...prev, transferDate: e.target.value }))}
                placeholder="e.g., John Doe"
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-sm text-gray-600">Sender Bank Name</Label>
              <Select value={formData.senderBank} onValueChange={handleSenderBankChange}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="e.g., ABC Corporation" />
                </SelectTrigger>
                <SelectContent>
                  {bankAccounts.map((bank) => (
                    <SelectItem key={bank._id || bank.id} value={bank._id || bank.id || ""}>
                      {bank.bankName} - {bank.accountNumber}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-gray-600">Sender Account No.</Label>
              <Input
                value={formData.senderAccountNo}
                onChange={(e) => setFormData(prev => ({ ...prev, senderAccountNo: e.target.value }))}
                placeholder="e.g., contact@gmail.com"
                className="mt-1"
                readOnly
              />
            </div>
            <div>
              <Label className="text-sm text-gray-600">Beneficiary Name</Label>
              <Input
                value={formData.beneficiaryName}
                onChange={(e) => setFormData(prev => ({ ...prev, beneficiaryName: e.target.value }))}
                placeholder="e.g., Po box 5389, Ai Safat 12170, Kuwait"
                className="mt-1"
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-gray-600">Beneficiary Bank Name</Label>
              <Input
                value={formData.beneficiaryBankName}
                onChange={(e) => setFormData(prev => ({ ...prev, beneficiaryBankName: e.target.value }))}
                placeholder="e.g., contact@gmail.com"
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-sm text-gray-600">Beneficiary Account No.</Label>
              <Input
                value={formData.beneficiaryAccountNo}
                onChange={(e) => setFormData(prev => ({ ...prev, beneficiaryAccountNo: e.target.value }))}
                placeholder="e.g., Po box 5389, Ai Safat 12170, Kuwait"
                className="mt-1"
              />
            </div>
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-gray-600">Transfer Amount</Label>
              <Input
                type="number"
                value={formData.transferAmount}
                onChange={(e) => setFormData(prev => ({ ...prev, transferAmount: e.target.value }))}
                placeholder="e.g., 84645115451"
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-sm text-gray-600">Currency</Label>
              <Select value={formData.currency} onValueChange={(value) => setFormData(prev => ({ ...prev, currency: value }))}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CURRENCIES.map((currency) => (
                    <SelectItem key={currency} value={currency}>
                      {currency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Row 5 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-gray-600">Purpose of Transfer</Label>
              <Input
                value={formData.purpose}
                onChange={(e) => setFormData(prev => ({ ...prev, purpose: e.target.value }))}
                placeholder="e.g., 84645115451"
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-sm text-gray-600">Authorized By</Label>
              <Select value={formData.authorizedBy} onValueChange={(value) => setFormData(prev => ({ ...prev, authorizedBy: value }))}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select Authorizer" />
                </SelectTrigger>
                <SelectContent>
                  {AUTHORIZED_PERSONS.map((person) => (
                    <SelectItem key={person} value={person}>
                      {person}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Remarks */}
          <div>
            <Label className="text-sm text-gray-600">Remarks</Label>
            <Textarea
              value={formData.remarks}
              onChange={(e) => setFormData(prev => ({ ...prev, remarks: e.target.value }))}
              placeholder="Remarks..."
              className="mt-1"
              rows={4}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t bg-gray-50">
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={loading}
              className="gap-2"
            >
              <X className="h-4 w-4" />
              Cancel
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSubmit(true)}
              disabled={loading}
              className="gap-2"
            >
              <FileText className="h-4 w-4" />
              Save Draft
            </Button>
          </div>
          <Button
            onClick={() => handleSubmit(false)}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
          >
            <Save className="h-4 w-4" />
            Submit For Approval
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewTransferModal;