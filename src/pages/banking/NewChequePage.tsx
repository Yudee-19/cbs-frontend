import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Card, CardContent } from "@/components/ui/card";
import ChequeForm from "./components/ChequeForm";
import ChequePreview from "./components/ChequePreview";
import { convertAmountToWordsWithDecimals } from "../../lib/utils";
import type { ChequeFormData, FieldPositions } from "./types/types";
import {
  defaultChequeFormData,
  defaultHorizontalPositions,
  defaultVerticalPositions,
} from "./constants/constants";

const NewChequePage = () => {
    const [formData, setFormData] = useState<ChequeFormData>(defaultChequeFormData);
    const [previewData, setPreviewData] = useState<ChequeFormData>(defaultChequeFormData);
    const [fieldPositions, setFieldPositions] = useState<FieldPositions>(defaultHorizontalPositions);

    const handleInputChange = (field: keyof ChequeFormData, value: unknown) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleGeneratePreview = () => {
        const amountInWords = convertAmountToWordsWithDecimals(formData.amount, formData.currency);
        const updatedData = { ...formData, amountInWords };
        setFormData(updatedData);
        setPreviewData(updatedData);
        
        // Reset field positions to default based on orientation
        const defaultPositions = formData.orientation === "vertical" 
            ? defaultVerticalPositions 
            : defaultHorizontalPositions;
        setFieldPositions(defaultPositions);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="p-2 sm:p-4 h-full w-full flex flex-col gap-4 overflow-x-auto">

                {/* Main Content */}
                <div className="grid grid-cols-2 gap-6 w-full" style={{ gridTemplateColumns: '1fr 1fr' }}>
                    {/* Form Section */}
                    <Card className="shadow-sm flex flex-col bg-white min-w-[550px] pt-0 pb-0 shadow-none">
                        <CardContent className="p-6">
                            <ChequeForm
                                formData={formData}
                                onInputChange={handleInputChange}
                                onGeneratePreview={handleGeneratePreview}
                            />
                        </CardContent>
                    </Card>

                    {/* Preview Section */}
                    <Card className="shadow-sm flex flex-col bg-white min-w-[550px] pt-0 pb-0 shadow-none h-full">
                        <CardContent className="p-6 flex flex-col h-full">
                            <ChequePreview 
                                formData={previewData}
                                fieldPositions={fieldPositions}
                                onFieldPositionsChange={setFieldPositions}
                            />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DndProvider>
    );
};

export default NewChequePage;
