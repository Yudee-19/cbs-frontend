import React from 'react';

interface LinkButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isResending?: boolean;
  ClickableText: string;
  notClickableText: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({
  onClick,
  disabled = false,
  isResending = false,
  ClickableText,
  notClickableText,
}) => {
  return (
    <div className="flex items-center justify-center gap-1 mt-4">
      <p className="text-sm text-primary">{notClickableText}</p>
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className="text-sm text-primary font-semibold underline disabled:opacity-50 disabled:cursor-not-allowed hover:text-primary/80 cursor-pointer"
      >
        {isResending ? 'Resending...' : ClickableText}
      </button>
    </div>
  );
};

export default LinkButton;
