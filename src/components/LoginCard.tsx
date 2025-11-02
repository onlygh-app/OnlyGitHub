import React from 'react';

interface LoginCardProps {
  token: string;
  error: string;
  onTokenChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const LoginCard: React.FC<LoginCardProps> = ({
  token,
  error,
  onTokenChange,
  onSubmit,
}) => {
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
            onChange={(e) => onTokenChange(e.target.value)}
            className="token-input"
          />
          <button type="submit" className="submit-btn">
            Login
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
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
