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