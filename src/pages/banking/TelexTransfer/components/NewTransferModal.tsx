import { useState, useEffect, useCallback } from "react";
import { X, Save, FileText, Upload, Trash2 } from "lucide-react";
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
import type { NewTransferModalProps } from "../types";

const NewTransferModal = ({ open, onClose, onSuccess }: NewTransferModalProps) => {
  const [loading, setLoading] = useState(false);
  const [bankAccounts, setBankAccounts] = useState<BankAccountData[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setSelectedFiles(prev => [...prev, ...Array.from(files)]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (isDraft: boolean = false) => {
    const newErrors: Record<string, string> = {};

    // Validate form
    if (!formData.senderBank.trim()) {
      newErrors.senderBank = "Sender Bank is required";
    }
    if (!formData.senderAccountNo.trim()) {
      newErrors.senderAccountNo = "Sender Account No. is required";
    }
    if (!formData.beneficiaryName.trim()) {
      newErrors.beneficiaryName = "Beneficiary Name is required";
    }
    if (!formData.beneficiaryBankName.trim()) {
      newErrors.beneficiaryBankName = "Beneficiary Bank Name is required";
    }
    if (!formData.beneficiaryAccountNo.trim()) {
      newErrors.beneficiaryAccountNo = "Beneficiary Account No. is required";
    }
    if (!formData.swiftCode.trim()) {
      newErrors.swiftCode = "SWIFT/IBAN Code is required";
    }
    if (!formData.transferAmount || isNaN(parseFloat(formData.transferAmount))) {
      newErrors.transferAmount = "Transfer Amount must be a valid number";
    }
    if (!formData.purpose.trim()) {
      newErrors.purpose = "Purpose is required";
    }
    if (!formData.authorizedBy.trim()) {
      newErrors.authorizedBy = "Authorized By is required";
    }

    if (Object.keys(newErrors).length > 0) {
      Object.values(newErrors).forEach(msg => {
        if (msg) toast.error(msg);
      });
      return;
    }

    try {
      setLoading(true);

      const transferData: Omit<TelexTransferData, "_id" | "id" | "createdAt" | "updatedAt"> = {
        transferDate: new Date(formData.transferDate).toISOString(),
        senderBank: formData.senderBank,
        senderAccountNo: formData.senderAccountNo,
        beneficiaryName: formData.beneficiaryName,
        beneficiaryBankName: formData.beneficiaryBankName,
        beneficiaryAccountNo: formData.beneficiaryAccountNo,
        swiftCode: formData.swiftCode,
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
      setSelectedFiles([]);
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
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-auto shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-4 pb-2 sticky top-0 bg-white">
          <h2 className="text-xl font-semibold">New Telex Transfer</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <div className="p-4 space-y-4">
          {/* Row 1 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-[#667085] font-normal">
                Transfer Date
                <span className="text-[#667085]">*</span>
              </Label>
              <input
                type="date"
                value={formData.transferDate}
                onChange={(e) => setFormData(prev => ({ ...prev, transferDate: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg px-2 py-2 bg-[rgba(102,112,133,0.04)] mt-1 text-[rgba(16,24,40,0.8)] placeholder:text-[rgba(16,24,40,0.8)]"
              />
            </div>
            <div>
              <Label className="text-sm text-[#667085] font-normal">
                Sender Bank Name
                <span className="text-[#667085]">*</span>
              </Label>
              <Select value={formData.senderBank} onValueChange={handleSenderBankChange}>
                <SelectTrigger className="mt-1 bg-[rgba(102,112,133,0.04)] border-gray-200 text-[rgba(16,24,40,0.8)] placeholder:text-[rgba(16,24,40,0.8)]">
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
              <Label className="text-sm text-[#667085] font-normal">
                Sender Account No.
                <span className="text-[#667085]">*</span>
              </Label>
              <Input
                value={formData.senderAccountNo}
                onChange={(e) => setFormData(prev => ({ ...prev, senderAccountNo: e.target.value }))}
                placeholder="e.g., 1111-2222-3333"
                className="mt-1 bg-[rgba(102,112,133,0.04)] border-gray-200 text-[rgba(16,24,40,0.8)] placeholder:text-[rgba(16,24,40,0.8)]"
                readOnly
              />
            </div>
            <div>
              <Label className="text-sm text-[#667085] font-normal">
                Beneficiary Name
                <span className="text-[#667085]">*</span>
              </Label>
              <Input
                value={formData.beneficiaryName}
                onChange={(e) => setFormData(prev => ({ ...prev, beneficiaryName: e.target.value }))}
                placeholder="e.g., John Doe"
                className="mt-1 bg-[rgba(102,112,133,0.04)] border-gray-200 text-[rgba(16,24,40,0.8)] placeholder:text-[rgba(16,24,40,0.8)]"
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-[#667085] font-normal">
                Beneficiary Bank Name
                <span className="text-[#667085]">*</span>
              </Label>
              <Input
                value={formData.beneficiaryBankName}
                onChange={(e) => setFormData(prev => ({ ...prev, beneficiaryBankName: e.target.value }))}
                placeholder="e.g., ABC Bank"
                className="mt-1 bg-[rgba(102,112,133,0.04)] border-gray-200 text-[rgba(16,24,40,0.8)] placeholder:text-[rgba(16,24,40,0.8)]"
              />
            </div>
            <div>
              <Label className="text-sm text-[#667085] font-normal">
                Beneficiary Account No.
                <span className="text-[#667085]">*</span>
              </Label>
              <Input
                value={formData.beneficiaryAccountNo}
                onChange={(e) => setFormData(prev => ({ ...prev, beneficiaryAccountNo: e.target.value }))}
                placeholder="e.g., 1111-2222-3333"
                className="mt-1 bg-[rgba(102,112,133,0.04)] border-gray-200 text-[rgba(16,24,40,0.8)] placeholder:text-[rgba(16,24,40,0.8)]"
              />
            </div>
          </div>

          {/* Row 3a - SWIFT/IBAN Code */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-[#667085] font-normal">
                SWIFT/IBAN Code
                <span className="text-[#667085]">*</span>
              </Label>
              <Input
                value={formData.swiftCode}
                onChange={(e) => setFormData(prev => ({ ...prev, swiftCode: e.target.value }))}
                placeholder="e.g., ABCDEFGH"
                className="mt-1 bg-[rgba(102,112,133,0.04)] border-gray-200 text-[rgba(16,24,40,0.8)] placeholder:text-[rgba(16,24,40,0.8)]"
              />
            </div>
            <div>
              <Label className="text-sm text-[#667085] font-normal">
                Transfer Amount
                <span className="text-[#667085]">*</span>
              </Label>
              <Input
                type="number"
                value={formData.transferAmount}
                onChange={(e) => setFormData(prev => ({ ...prev, transferAmount: e.target.value }))}
                placeholder="e.g., 1000.00"
                className="mt-1 bg-[rgba(102,112,133,0.04)] border-gray-200 text-[rgba(16,24,40,0.8)] placeholder:text-[rgba(16,24,40,0.8)]"
              />
            </div>
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-[#667085] font-normal">Currency</Label>
              <Select value={formData.currency} onValueChange={(value) => setFormData(prev => ({ ...prev, currency: value }))}>
                <SelectTrigger className="mt-1 bg-[rgba(102,112,133,0.04)] border-gray-200 text-[rgba(16,24,40,0.8)] placeholder:text-[rgba(16,24,40,0.8)]">
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
            <div>
              <Label className="text-sm text-[#667085] font-normal">
                Purpose of Transfer
                <span className="text-[#667085]">*</span>
              </Label>
              <Input
                value={formData.purpose}
                onChange={(e) => setFormData(prev => ({ ...prev, purpose: e.target.value }))}
                placeholder="e.g., Payment for Invoice #12345"
                className="mt-1 bg-[rgba(102,112,133,0.04)] border-gray-200 text-[rgba(16,24,40,0.8)] placeholder:text-[rgba(16,24,40,0.8)]"
              />
            </div>
          </div>

          {/* Row 5 */}
          <div className="grid grid-cols-2 gap-4">
            
            <div>
              <Label className="text-sm text-[#667085] font-normal">
                Authorized By
                <span className="text-[#667085]">*</span>
              </Label>
              <Select value={formData.authorizedBy} onValueChange={(value) => setFormData(prev => ({ ...prev, authorizedBy: value }))}>
                <SelectTrigger className="mt-1 bg-[rgba(102,112,133,0.04)] border-gray-200 text-[rgba(16,24,40,0.8)] placeholder:text-[rgba(16,24,40,0.8)]">
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
            <Label className="text-sm text-[#667085] font-normal">Remarks / Notes</Label>
            <Textarea
              value={formData.remarks}
              onChange={(e) => setFormData(prev => ({ ...prev, remarks: e.target.value }))}
              placeholder="Remarks..."
              className="mt-1 bg-[rgba(102,112,133,0.04)] border-gray-200 text-[rgba(16,24,40,0.8)] placeholder:text-[rgba(16,24,40,0.8)]"
              rows={4}
            />
          </div>

          {/* File Upload */}
          <div>
            <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center bg-gray-50/50 hover:bg-gray-100/50 transition">
              <input
                type="file"
                multiple
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
                disabled={loading}
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex items-center justify-center gap-2 text-sm text-gray-600"
              >
                <Upload className="h-4 w-4" />
                <span>Click to upload or drag files</span>
              </label>
            </div>

            {/* Selected Files List */}
            {selectedFiles.length > 0 && (
              <div className="mt-3 space-y-2">
                {selectedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center gap-2 flex-1">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                        <p className="text-xs text-gray-500">
                          {(file.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="ml-2 text-gray-400 hover:text-red-500 transition"
                      type="button"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 pt-0 gap-4">
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={loading}
              className="gap-2 w-[184px] shadow=[0px 4px 4px 0px #0000000A] border-none"
            >
              <X className="h-4 w-4" />
              Cancel
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSubmit(true)}
              disabled={loading}
              className="gap-2 w-[191px] shadow=[0px 4px 4px 0px #0000000A] border-none"
            >
              <FileText className="h-4 w-4" />
              Save Draft
            </Button>
          </div>
          <Button
            onClick={() => handleSubmit(false)}
            disabled={loading}
            className="bg-primary hover:bg-blue-800 text-white gap-2 flex-1 ml-auto"
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