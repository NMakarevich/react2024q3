export interface IThemeContext {
  theme: string;
  setTheme: (theme: string) => void;
}

export interface IPageContext {
  page: number;
  setPage: (page: number) => void;
}

export interface ISelectedItemsContext {
  items: Result[];
  itemsIds: () => number[];
  addItem: (item: Result) => void;
  removeItem: (id: number) => void;
  unselectAll: () => void;
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

export interface ApiResponse {
  total_count: number;
  items: Result[];
}
