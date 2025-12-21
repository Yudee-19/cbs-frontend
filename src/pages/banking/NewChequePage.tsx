import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ChequeForm from "./components/ChequeForm";
import ChequePreview from "./components/ChequePreview";

// Types
export interface ChequeFormData {
  bank: string;
  branch: string;
  account: string;
  currentCheque: string;
  currency: string;
  payeeName: string;
  amount: string;
  date: string;
  orientation: "horizontal" | "vertical";
}

export interface BankOption {
  id: string;
  name: string;
  branch: string;
  account: string;
  currentCheque: string;
  currency: string;
}

// Constants
export const defaultChequeFormData: ChequeFormData = {
  bank: "burgan-bank",
  branch: "Farwaniya Branch - 239",
  account: "0239-7074792-001-000",
  currentCheque: "7074792001",
  currency: "USD",
  payeeName: "",
  amount: "",
  date: new Date().toISOString().split("T")[0],
  orientation: "horizontal",
};

export const BANK_OPTIONS: BankOption[] = [
  {
    id: "burgan-bank",
    name: "Burgan Bank – Crown International",
    branch: "Farwaniya Branch - 239",
    account: "0239-7074792-001-000",
    currentCheque: "7074792001",
    currency: "USD",
  },
  {
    id: "nbk",
    name: "National Bank of Kuwait",
    branch: "Kuwait City Branch - 101",
    account: "0101-1234567-001-000",
    currentCheque: "1234567001",
    currency: "KWD",
  },
  {
    id: "cbd",
    name: "Commercial Bank of Dubai",
    branch: "Dubai Main Branch - 505",
    account: "0505-9876543-001-000",
    currentCheque: "9876543001",
    currency: "AED",
  },
];

const NewChequePage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<ChequeFormData>(defaultChequeFormData);
    const [previewData, setPreviewData] = useState<ChequeFormData>(defaultChequeFormData);

    const handleBack = () => navigate("/banking/cheque-printing");

    const handleInputChange = (field: keyof ChequeFormData, value: unknown) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleGeneratePreview = () => {
        setPreviewData(formData);
    };

    return (
        <div className="p-2 sm:p-4 h-full w-full flex flex-col gap-4 overflow-x-auto">
            {/* Header */}
            {/* <header className="flex items-center gap-3">
                <Button variant="ghost" size="sm" onClick={handleBack} className="h-8 w-8 p-0">
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <h1 className="text-lg sm:text-xl font-semibold">New Cheque</h1>
            </header> */}

            {/* Main Content */}
            <div className="grid grid-cols-2 gap-6 h-auto" style={{ gridTemplateColumns: '1fr 1fr' }}>
                {/* Form Section */}
                <Card className="shadow-sm flex flex-col bg-white min-w-[550px] pt-0 pb-0 shadow-none">
                    <CardContent className="h-auto p-6">
                        <ChequeForm
                            formData={formData}
                            onInputChange={handleInputChange}
                            onGeneratePreview={handleGeneratePreview}
                        />
                    </CardContent>
                </Card>

                {/* Preview Section */}
                <Card className="shadow-sm flex flex-col bg-white min-w-[550px] pt-0 pb-0 shadow-none">
                    <CardContent className="h-auto p-6">
                        <ChequePreview formData={previewData} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default NewChequePage;
