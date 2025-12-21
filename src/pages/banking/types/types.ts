export interface ChequeFormData {
  bank: string;
  branch: string;
  account: string;
  currentCheque: string;
  currency: string;
  payeeName: string;
  amount: string;
  amountInWords: string;
  date: string;
  orientation: "horizontal" | "vertical";
}

export interface FieldPosition {
  x: number;
  y: number;
}

export interface FieldPositions {
  payeeName: FieldPosition;
  amount: FieldPosition;
  amountInWords: FieldPosition;
  date: FieldPosition;
}

export interface BankOption {
  id: string;
  name: string;
  branch: string;
  account: string;
  currentCheque: string;
  currency: string;
}

export interface ChequeFormProps {
  formData: ChequeFormData;
  onInputChange: (field: keyof ChequeFormData, value: unknown) => void;
  onGeneratePreview: () => void;
}

export interface ChequePreviewProps {
  formData: ChequeFormData;
  fieldPositions: FieldPositions;
  onFieldPositionsChange: (positions: FieldPositions) => void;
}

export interface DraggableFieldProps {
  id: string;
  text: string;
  position: FieldPosition;
  isVertical?: boolean;
}

export interface PrintChequeParams {
  imgElement: HTMLImageElement | null;
  formData: {
    date: string;
    payeeName: string;
    amount: string;
    amountInWords: string;
  };
  fieldPositions: FieldPositions;
  isVertical: boolean;
}
