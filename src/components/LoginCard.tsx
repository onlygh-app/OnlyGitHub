import React, { memo, useCallback } from 'react';
import { ErrorMessage } from './ErrorMessage';

interface LoginCardProps {
  token: string;
  error: string;
  onTokenChange: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onErrorClear?: () => void;
}

const LoginCardComponent: React.FC<LoginCardProps> = ({
  token,
  error,
  onTokenChange,
  onSubmit,
  onErrorClear,
}) => {
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onTokenChange(e.target.value);
  }, [onTokenChange]);

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>OnlyGitHub</h1>
        <p>Enter your GitHub Personal Access Token</p>
        <form onSubmit={onSubmit}>
          <input
            type="password"
            placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
            value={token}
            onChange={handleInputChange}
            className="token-input"
            autoFocus
            autoComplete="off"
          />
          <button type="submit" className="submit-btn">
            Login
          </button>
        </form>
        <ErrorMessage message={error} onClose={onErrorClear} variant="card" />
        <p className="help-text">
          Create a token at:{' '}
          <a href="https://github.com/settings/tokens" target="_blank" rel="noopener noreferrer">
            github.com/settings/tokens
          </a>
        </p>
      </div>
    </div>
  );
};

export const LoginCard = memo(LoginCardComponent);
