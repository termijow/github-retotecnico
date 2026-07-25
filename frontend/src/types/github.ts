export interface GitHubProfile {
  login: string;
  name?: string;
  bio?: string;
  public_repos?: number;
  followers?: number;
  following?: number;
  avatar_url?: string;
  html_url?: string;
  [key: string]: any;
}

export interface GitHubErrorResponse {
  error?: string;
}
