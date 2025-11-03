import React, { memo } from 'react';

interface ErrorMessageProps {
  message: string;
  onClose?: () => void;
  variant?: 'card' | 'banner';
}

const ErrorMessageComponent: React.FC<ErrorMessageProps> = ({
  message,
  onClose,
  variant = 'banner',
}) => {
  if (!message) return null;

  const containerClass = variant === 'card' ? 'error-message-container-card' : 'error-message-container';

  const handleClose = () => {
    onClose?.();
  };

  return (
    <div className={containerClass}>
      <p className="error-message">{message}</p>
      <button
        className={variant === 'card' ? 'close-error-btn' : 'close-button'}
        onClick={handleClose}
        type="button"
        aria-label="Close error message"
      >
        &times;
      </button>
    </div>
  );
};

export const ErrorMessage = memo(ErrorMessageComponent);
