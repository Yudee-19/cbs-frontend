import { useRef } from "react";
import { useDrop } from "react-dnd";
import { Button } from "@/components/ui/button";
import type { ChequeFormData, FieldPositions } from "../NewChequePage";
import chequeImage from "@/assets/cheque.png";
import chequeVerticalImage from "@/assets/cheque-vertical.png";
import DraggableField from "./DraggableField";
import { printCheque } from "../utils/utils";

interface ChequePreviewProps {
  formData: ChequeFormData;
  fieldPositions: FieldPositions;
  onFieldPositionsChange: (positions: FieldPositions) => void;
}

const ChequePreview = ({ formData, fieldPositions, onFieldPositionsChange }: ChequePreviewProps): React.ReactNode => {
  const isVertical = formData.orientation === "vertical";
  const chequeRef = useRef<HTMLDivElement>(null);

  const [{ isOver }, drop] = useDrop({
    accept: 'CHEQUE_FIELD',
    drop: (item: any, monitor: any) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      if (delta && chequeRef.current) {
        // No coordinate transformation needed - text and image are already in correct orientation
        const newX = Math.round(item.position.x + delta.x);
        const newY = Math.round(item.position.y + delta.y);
        
        // Update position for the specific field
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
      isVertical,
    });
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
