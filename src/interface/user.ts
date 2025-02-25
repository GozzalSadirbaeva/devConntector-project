export interface User {
  _id: string;
  avatar?: string;
  name?: string;
}

export interface DeveloperInterface {
  _id: string;
  user?: User;
  status?: string;
  bio?: string;
  company?: string;
  location?: string;
  skills?: string[];
  education?: string[];
  experience?: string[];
  website?: string;
  githubusername?: string;
}

export interface Repo {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  html_url: string;
}