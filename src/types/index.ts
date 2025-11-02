export interface Owner {
  login: string;
  avatar_url: string;
  profile_url: string;
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
}

export type PageType = 'explore' | 'trending';
export type SidebarPosition = 'left' | 'right';
