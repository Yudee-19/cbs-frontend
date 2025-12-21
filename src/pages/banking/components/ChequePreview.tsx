import type { ChequeFormData } from "../NewChequePage";

interface ChequePreviewProps {
  formData: ChequeFormData;
  showPreview: boolean;
}

const ChequePreview = ({ formData, showPreview }: ChequePreviewProps) => {
  if (!showPreview) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center text-gray-500">
          <p className="text-sm">Click "Generate Preview" to see the cheque</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Preview</h2>
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8 border-2 border-blue-200 shadow-sm">
        {/* Cheque Preview Container */}
        <div className="bg-white rounded-md shadow-md p-6 aspect-video flex flex-col justify-between font-serif border border-gray-300">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs text-gray-600 font-sans">CHEQUE NO.</p>
              <p className="text-lg font-bold">{formData.currentCheque}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-600 font-sans">DATE</p>
              <p className="text-sm font-semibold">
                {new Date(formData.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </p>
            </div>
          </div>

          {/* Payee Section */}
          <div className="border-b-2 border-dashed border-gray-400 pb-2 mb-4">
            <p className="text-xs text-gray-600 font-sans mb-1">PAY TO THE ORDER OF</p>
            <p className="text-base font-bold min-h-6">
              {formData.payeeName || "___________________________"}
            </p>
          </div>

          {/* Amount Section */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-xs text-gray-600 font-sans mb-1">AMOUNT (WORDS)</p>
              <p className="text-sm font-semibold min-h-6">
                {formData.amount ? `${formData.currency} ${formData.amount}` : "___________________________"}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-600 font-sans mb-1">AMOUNT (FIGURES)</p>
              <p className="text-lg font-bold border-b border-black min-h-6">
                {formData.amount || ""}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs text-gray-600 font-sans mb-2">AUTHORIZED SIGNATURE</p>
              <div className="border-t border-black w-24 h-px"></div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-600 font-sans mb-2">BANK DETAILS</p>
              <p className="text-xs text-gray-700 font-sans">{formData.branch}</p>
              <p className="text-xs text-gray-700 font-sans">{formData.account}</p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-4 text-center text-xs text-gray-600">
          <p>Currency: {formData.currency}</p>
          <p>Days Present: {formData.daysPresent ? "Yes" : "No"}</p>
        </div>
      </div>
    </div>
  );
};

export default ChequePreview;
