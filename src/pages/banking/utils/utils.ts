// Validation functions
export const isValidPayeeName = (name: string): boolean => {
    if (!name || name.trim().length === 0) {
      return false;
    }
    
    const trimmedName = name.trim();
    
    // Check minimum length
    if (trimmedName.length < 2) {
      return false;
    }
    
    // Check if name contains at least one letter
    if (!/[a-zA-Z]/.test(trimmedName)) {
      return false;
    }
    
    // Check for invalid special characters (allow spaces, hyphens, apostrophes)
    // Only alphanumeric, spaces, hyphens, and apostrophes allowed
    if (!/^[a-zA-Z0-9\s\-']+$/.test(trimmedName)) {
      return false;
    }
    
    return true;
};

export const isValidAmount = (amount: string): boolean => {
    if (!amount || amount.trim().length === 0) {
      return false;
    }
    
    const numAmount = parseFloat(amount);
    
    // Check if it's a valid number
    if (isNaN(numAmount)) {
      return false;
    }
    
    // Amount must be greater than 0
    if (numAmount <= 0) {
      return false;
    }
    
    // Check decimal places (max 2)
    const decimalPlaces = amount.includes('.') ? amount.split('.')[1].length : 0;
    if (decimalPlaces > 2) {
      return false;
    }
    
    // Check if it's all zeros (e.g., "0", "0.00", "0000")
    if (numAmount === 0 || parseFloat(amount.replace(/0+/g, '0')) === 0) {
      return false;
    }
    
    return true;
};

// Print utility function
interface PrintChequeParams {
  imgElement: HTMLImageElement | null;
  formData: {
    date: string;
    payeeName: string;
    amount: string;
    amountInWords: string;
  };
  fieldPositions: {
    date: { x: number; y: number };
    payeeName: { x: number; y: number };
    amount: { x: number; y: number };
    amountInWords: { x: number; y: number };
  };
}

export const printCheque = ({
  imgElement,
  formData,
  fieldPositions,
}: PrintChequeParams): void => {
  // Get the cheque image dimensions
  const imgWidth = imgElement?.offsetWidth || 800;
  const imgHeight = imgElement?.offsetHeight || 400;

  // Convert image to base64 to embed it in the iframe
  const getBase64Image = (): string => {
    if (!imgElement) return '';
    
    const canvas = document.createElement('canvas');
    canvas.width = imgElement.naturalWidth;
    canvas.height = imgElement.naturalHeight;
    
    const ctx = canvas.getContext('2d');
    if (ctx && imgElement) {
      ctx.drawImage(imgElement, 0, 0);
      return canvas.toDataURL('image/png');
    }
    
    return '';
  };

  const base64Image = getBase64Image();

  // Build the HTML for printing with exact field positions
  const printContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Print Cheque</title>
        <style>
          @page {
            size: landscape;
            margin: 0;
          }
          html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
          }
          body {
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            font-family: Arial, sans-serif;
            background: white;
          }
          .cheque-container {
            position: relative;
            width: ${imgWidth}px;
            height: ${imgHeight}px;
            margin: 0;
            padding: 0;
          }
          .cheque-img {
            width: 100%;
            height: 100%;
            display: block;
            margin: 0;
            padding: 0;
          }
          .field {
            position: absolute;
            color: black;
            font-weight: 500;
            font-size: 14px;
            white-space: nowrap;
            margin: 0;
            padding: 0;
            line-height: normal;
            vertical-align: top;
          }
          @media print {
            body {
              margin: 0;
              padding: 0;
              display: flex;
              justify-content: flex-start;
              align-items: flex-start;
            }
            .cheque-container {
              margin: 0;
              padding: 0;
              box-shadow: none;
            }
            .cheque-img {
              display: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="cheque-container">
          <img src="${base64Image}" alt="Cheque" class="cheque-img" />
          <div class="field" style="left: ${fieldPositions.date.x + 5}px; top: ${fieldPositions.date.y + 5}px;">
            ${formData.date}
          </div>
          <div class="field" style="left: ${fieldPositions.payeeName.x + 5}px; top: ${fieldPositions.payeeName.y + 5}px;">
            ${formData.payeeName}
          </div>
          <div class="field" style="left: ${fieldPositions.amount.x + 5}px; top: ${fieldPositions.amount.y + 5}px;">
            ${formData.amount}
          </div>
          <div class="field" style="left: ${fieldPositions.amountInWords.x + 5}px; top: ${fieldPositions.amountInWords.y + 5}px;">
            ${formData.amountInWords}
          </div>
        </div>
        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 300);
          };
        </script>
      </body>
    </html>
  `;

  // Create an iframe for printing
  const printFrame = document.createElement('iframe');
  printFrame.style.display = 'none';
  document.body.appendChild(printFrame);

  const frameDoc = printFrame.contentDocument || printFrame.contentWindow?.document;
  if (frameDoc) {
    frameDoc.open();
    frameDoc.write(printContent);
    frameDoc.close();

    // Remove iframe after print dialog closes
    setTimeout(() => {
      if (document.body.contains(printFrame)) {
        document.body.removeChild(printFrame);
      }
    }, 2000);
  }
};
