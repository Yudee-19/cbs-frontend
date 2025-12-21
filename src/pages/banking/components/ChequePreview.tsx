import type { ChequeFormData } from "../NewChequePage";
import chequeImage from "@/assets/cheque.png";

interface ChequePreviewProps {
  formData: ChequeFormData;
}

const ChequePreview = ({ formData }: ChequePreviewProps): React.ReactNode => {
  const isVertical = formData.orientation === "vertical";
  
  return (
    <div>
      <h2 className="text-lg font-semibold mb-6">Preview</h2>
      <div className={`flex justify-center items-center overflow-visible ${isVertical ? "py-8" : ""}`}>
        <img 
          src={chequeImage} 
          alt="Cheque Preview" 
          className={`w-full h-auto rounded-lg ${isVertical ? "rotate-90 origin-center mt-24" : ""}`}
        />
      </div>
    </div>
  );
};

export default ChequePreview;
