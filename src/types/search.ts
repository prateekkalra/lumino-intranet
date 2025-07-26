export type SearchResultType = 
  | 'task' 
  | 'news' 
  | 'event' 
  | 'person' 
  | 'action' 
  | 'recognition'
  | 'analytics';

export interface SearchResult {
  id: string;
  title: string;
  description?: string;
  type: SearchResultType;
  category: string;
  content: string; // Combined searchable content
  metadata: Record<string, unknown>;
  score?: number; // Fuse.js search score
  widget: string; // Which widget this result belongs to
  action?: () => void; // Action to execute when clicked
}

export interface SearchCategory {
  type: SearchResultType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export interface SearchFilters {
  types?: SearchResultType[];
  widgets?: string[];
  dateRange?: {
    from: Date;
    to: Date;
  };
}

export interface SearchOptions {
  query: string;
  filters?: SearchFilters;
  limit?: number;
  includeScore?: boolean;
}

export interface SearchContextType {
  searchResults: SearchResult[];
  isSearching: boolean;
  searchQuery: string;
  recentSearches: string[];
  search: (options: SearchOptions) => Promise<SearchResult[]>;
  clearSearch: () => void;
  addToRecentSearches: (query: string) => void;
  clearRecentSearches: () => void;
}

// Widget data providers interface
export interface SearchDataProvider {
  getSearchableData: () => SearchResult[];
  updateData?: (data: unknown) => void;
}