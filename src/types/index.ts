export interface Owner {
  login: string;
  avatar_url: string;
  profile_url: string;
}

export interface User {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  company: string;
  location: string;
  email: string;
  blog: string;
  twitter_username: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at?: string;
  profile_url: string;
  private_repos?: number;
  disk_usage?: number;
}

export interface RepositoryPermissions {
  admin: boolean;
  maintain: boolean;
  push: boolean;
  triage: boolean;
  pull: boolean;
}

export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  url: string;
  stars: number;
  language: string;
  owner: Owner;
  fork: boolean;
  pushed_at: string;
  created_at: string;
  updated_at: string;
  forks_count: number;
  open_issues_count: number;
  archived: boolean;
  visibility: string;
  permissions?: RepositoryPermissions;
}

export type PageType = 'explore' | 'trending' | 'my';
export type SidebarPosition = 'left' | 'right';
