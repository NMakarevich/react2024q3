export interface IThemeContext {
  theme: string;
  setTheme: (theme: string) => void;
}

export interface Result {
  created_at: string;
  description: string;
  full_name: string;
  html_url: string;
  id: number;
  language: string;
  name: string;
  stargazers_count: number;
  topics: string[];
  owner: {
    avatar_url: string;
    id: number;
    login: string;
    html_url: string;
  };
}

export interface Response {
  total_count: number;
  items: Result[];
}
