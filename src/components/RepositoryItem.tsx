import React from 'react';
import { Repository } from '../types';

interface RepositoryItemProps {
  repo: Repository;
  index: number;
}

export const RepositoryItem: React.FC<RepositoryItemProps> = ({ repo, index }) => {
  return (
    <div className="repo-item">
      <a
        href={repo.owner.profile_url}
        target="_blank"
        rel="noopener noreferrer"
        className="repo-avatar"
        title={repo.owner.login}
      >
        <img src={repo.owner.avatar_url} alt={repo.owner.login} />
      </a>
      <div className="repo-content">
        <a
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="repo-name"
        >
          {repo.name}
        </a>
        <p className="repo-full-name">{repo.full_name}</p>
        <p className="repo-description">{repo.description}</p>
      </div>
      <div className="repo-meta">
        <span className="repo-rank">#{index + 1}</span>
        <span className="repo-language">{repo.language}</span>
        <span className="repo-stars">{repo.stars}</span>
      </div>
    </div>
  );
};
