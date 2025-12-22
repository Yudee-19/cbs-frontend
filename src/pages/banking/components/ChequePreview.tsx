import { useRef, useState } from "react";
import { useDrop } from "react-dnd";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { ChequePreviewProps } from "../types/types";
import chequeImage from "@/assets/cheque.png";
import chequeVerticalImage from "@/assets/cheque-vertical.png";
import DraggableField from "./DraggableField";
import { printCheque } from "../utils/utils";
import { createCheque, updateChequePrintStatus } from "@/services/banking/ChequeServices";

const ChequePreview = ({ formData, fieldPositions, onFieldPositionsChange }: ChequePreviewProps): React.ReactNode => {
  const isVertical = formData.orientation === "vertical";
  const chequeRef = useRef<HTMLDivElement>(null);
  const [isPrinting, setIsPrinting] = useState(false);

  const [{ isOver }, drop] = useDrop({
    accept: 'CHEQUE_FIELD',
    drop: (item: any, monitor: any) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      if (delta && chequeRef.current) {
        const newX = Math.round(item.position.x + delta.x);
        const newY = Math.round(item.position.y + delta.y);
        
        onFieldPositionsChange({
          ...fieldPositions,
          [item.id]: { x: newX, y: newY },
        });
      }
    },
    collect: (monitor: any) => ({
      isOver: monitor.isOver(),
    }),
  });

  const showFields = formData.payeeName && formData.amount && formData.date;

  const handlePrintCheque = async () => {
    if (!chequeRef.current) return;

    try {
      setIsPrinting(true);

      // Save cheque data to backend first
      const chequePayload = {
        bankAccount: formData.bankAccountId, // MongoDB ObjectID
        payeeName: formData.payeeName,
        amount: parseFloat(formData.amount),
        chequeDate: new Date(formData.date).toISOString(),
        address: formData.amountInWords, // Using amountInWords as address for now
      };

      const savedCheque = await createCheque(chequePayload);
      const chequeId = savedCheque._id || savedCheque.id;

      // Print the cheque
      const imgElement = chequeRef.current.querySelector('img') as HTMLImageElement | null;
      
      printCheque({
        imgElement,
        formData: {
          date: formData.date,
          payeeName: formData.payeeName,
          amount: formData.amount,
          amountInWords: formData.amountInWords,
        },
        fieldPositions,
        isVertical,
      });

      // Update print status to "Printed"
      if (chequeId) {
        await updateChequePrintStatus(chequeId as string, "Printed");
      }

      toast.success("Cheque saved and printed successfully!");
    } catch (error: any) {
      console.error("Error printing cheque:", error);
      toast.error(error?.message || "Failed to save or print cheque");
    } finally {
      setIsPrinting(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <h2 className="text-lg font-semibold">Preview</h2>
      <div className={`flex items-start overflow-visible flex-1 ${isVertical ? "justify-center" : "justify-start"}`}>
        <div
          ref={(node) => {
            drop(node);
            if (node) {
              chequeRef.current = node;
            }
          }}
          style={{
            position: 'relative',
            display: 'inline-block',
            border: isOver ? '1px dashed #0446A5' : '2px solid transparent',
          }}
          className="transition-all"
        >
          <img 
            src={isVertical ? chequeVerticalImage : chequeImage} 
            alt="Cheque Preview" 
            className={`w-full h-auto rounded-lg ${isVertical ? "max-h-[500px]" : ""}`}
          />
          
          {showFields && (
            <>
              <DraggableField
                id="date"
                text={formData.date}
                position={fieldPositions.date}
                isVertical={isVertical}
              />
              <DraggableField
                id="payeeName"
                text={formData.payeeName}
                position={fieldPositions.payeeName}
                isVertical={isVertical}
              />
              <DraggableField
                id="amount"
                text={`${formData.amount}`}
                position={fieldPositions.amount}
                isVertical={isVertical}
              />
              <DraggableField
                id="amountInWords"
                text={formData.amountInWords}
                position={fieldPositions.amountInWords}
                isVertical={isVertical}
              />
            </>
          )}
        </div>
      </div>

      {showFields && (
        <Button
          onClick={handlePrintCheque}
          disabled={isPrinting}
          className="w-full bg-primary text-white font-medium py-2 rounded-lg"
        >
          {isPrinting ? "Printing..." : "Print Cheque"}
        </Button>
      )}
    </div>
  );
};

export default ChequePreview;
