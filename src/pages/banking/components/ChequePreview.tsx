import { useState, useRef } from "react";
import { useDrop } from "react-dnd";
import { Button } from "@/components/ui/button";
import type { ChequeFormData } from "../NewChequePage";
import chequeImage from "@/assets/cheque.png";
import DraggableField from "./DraggableField";
import { printCheque } from "../utils/utils";

interface ChequePreviewProps {
  formData: ChequeFormData;
}

interface FieldPosition {
  x: number;
  y: number;
}

interface FieldPositions {
  payeeName: FieldPosition;
  amount: FieldPosition;
  amountInWords: FieldPosition;
  date: FieldPosition;
}

// Default positions for cheque fields (approximate positions for standard cheque)
const defaultPositions: FieldPositions = {
  date: { x: 360, y: 6 },           // Top right
  payeeName: { x: 60, y: 80 },     // Left side, below date
  amount: { x: 380, y: 80 },        // Right side, same level as payee
  amountInWords: { x: 55, y: 100 }, // Left side, middle area
};

const ChequePreview = ({ formData }: ChequePreviewProps): React.ReactNode => {
  const isVertical = formData.orientation === "vertical";
  const [fieldPositions, setFieldPositions] = useState<FieldPositions>(defaultPositions);
  const chequeRef = useRef<HTMLDivElement>(null);

  const [{ isOver }, drop] = useDrop({
    accept: 'CHEQUE_FIELD',
    drop: (item: any, monitor: any) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      if (delta && chequeRef.current) {
        const newX = Math.round(item.position.x + delta.x);
        const newY = Math.round(item.position.y + delta.y);
        
        // Update position for the specific field
        setFieldPositions((prev) => ({
          ...prev,
          [item.id]: { x: newX, y: newY },
        }));
      }
    },
    collect: (monitor: any) => ({
      isOver: monitor.isOver(),
    }),
  });

  // Only show fields if formData has values
  const showFields = formData.payeeName && formData.amount && formData.date;

  const handlePrintCheque = () => {
    if (!chequeRef.current) return;

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
    });
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <h2 className="text-lg font-semibold">Preview</h2>
      <div className={`flex justify-start items-start overflow-visible flex-1 ${isVertical ? "py-8" : ""}`}>
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
            src={chequeImage} 
            alt="Cheque Preview" 
            className={`w-full h-auto rounded-lg ${isVertical ? "rotate-90 origin-center mt-24" : ""}`}
            style={{ display: 'block', maxWidth: '100%' }}
          />
          
          {showFields && !isVertical && (
            <>
              <DraggableField
                id="date"
                text={formData.date}
                position={fieldPositions.date}
              />
              <DraggableField
                id="payeeName"
                text={formData.payeeName}
                position={fieldPositions.payeeName}
              />
              <DraggableField
                id="amount"
                text={`${formData.amount}`}
                position={fieldPositions.amount}
              />
              <DraggableField
                id="amountInWords"
                text={formData.amountInWords}
                position={fieldPositions.amountInWords}
              />
            </>
          )}
        </div>
      </div>

      {/* Print Cheque Button - At Bottom */}
      {showFields && (
        <Button
          onClick={handlePrintCheque}
          className="w-full bg-primary text-white font-medium py-2 rounded-lg"
        >
          Print Cheque
        </Button>
      )}
    </div>
  );
};

export default ChequePreview;
