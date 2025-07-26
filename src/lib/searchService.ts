import Fuse from 'fuse.js';
import { 
  SearchResult, 
  SearchOptions, 
  SearchDataProvider, 
  SearchResultType,
  SearchFilters
} from '../types/search';

class SearchService {
  private fuse: Fuse<SearchResult> | null = null;
  private searchData: SearchResult[] = [];
  private dataProviders: Map<string, SearchDataProvider> = new Map();

  constructor() {
    this.initializeFuse();
  }

  private initializeFuse() {
    const fuseOptions = {
      keys: [
        { name: 'title', weight: 0.4 },
        { name: 'description', weight: 0.3 },
        { name: 'content', weight: 0.2 },
        { name: 'category', weight: 0.1 }
      ],
      threshold: 0.3, // Lower = more strict matching
      distance: 100,
      includeScore: true,
      shouldSort: true,
      ignoreLocation: true,
      findAllMatches: false,
      minMatchCharLength: 1
    };

    this.fuse = new Fuse(this.searchData, fuseOptions);
  }

  registerDataProvider(widgetName: string, provider: SearchDataProvider) {
    this.dataProviders.set(widgetName, provider);
    this.refreshSearchData();
  }

  unregisterDataProvider(widgetName: string) {
    this.dataProviders.delete(widgetName);
    this.refreshSearchData();
  }

  private refreshSearchData() {
    this.searchData = [];
    
    this.dataProviders.forEach((provider, widgetName) => {
      try {
        const data = provider.getSearchableData();
        this.searchData.push(...data);
      } catch (error) {
        console.warn(`Failed to get search data from widget: ${widgetName}`, error);
      }
    });

    // Reinitialize Fuse with new data
    if (this.fuse) {
      this.fuse.setCollection(this.searchData);
    }
  }

  async search(options: SearchOptions): Promise<SearchResult[]> {
    if (!options.query.trim()) {
      return [];
    }

    if (!this.fuse) {
      this.initializeFuse();
    }

    // Refresh data before searching to ensure latest content
    this.refreshSearchData();

    const results = this.fuse!.search(options.query);
    
    let searchResults: SearchResult[] = results.map(result => ({
      ...result.item,
      score: result.score
    }));

    // Apply filters
    if (options.filters) {
      searchResults = this.applyFilters(searchResults, options.filters);
    }

    // Apply limit
    if (options.limit) {
      searchResults = searchResults.slice(0, options.limit);
    }

    return searchResults;
  }

  private applyFilters(results: SearchResult[], filters: SearchFilters): SearchResult[] {
    let filteredResults = results;

    if (filters.types && filters.types.length > 0) {
      filteredResults = filteredResults.filter(result => 
        filters.types!.includes(result.type)
      );
    }

    if (filters.widgets && filters.widgets.length > 0) {
      filteredResults = filteredResults.filter(result => 
        filters.widgets!.includes(result.widget)
      );
    }

    if (filters.dateRange) {
      filteredResults = filteredResults.filter(result => {
        const resultDate = result.metadata?.date || result.metadata?.createdAt;
        if (!resultDate) return true;
        
        const date = new Date(resultDate as string);
        return date >= filters.dateRange!.from && date <= filters.dateRange!.to;
      });
    }

    return filteredResults;
  }

  getSearchSuggestions(query: string, limit: number = 5): string[] {
    if (!query.trim()) return [];

    const suggestions = new Set<string>();
    
    // Get suggestions from titles and content
    this.searchData.forEach(item => {
      const words = [
        ...item.title.toLowerCase().split(' '),
        ...(item.description?.toLowerCase().split(' ') || []),
        ...item.category.toLowerCase().split(' ')
      ];

      words.forEach(word => {
        if (word.length > 2 && word.startsWith(query.toLowerCase())) {
          suggestions.add(word);
        }
      });
    });

    return Array.from(suggestions).slice(0, limit);
  }

  getAllCategories(): string[] {
    const categories = new Set<string>();
    this.searchData.forEach(item => categories.add(item.category));
    return Array.from(categories);
  }

  getResultsByType(type: SearchResultType): SearchResult[] {
    return this.searchData.filter(item => item.type === type);
  }

  getTotalResultsCount(): number {
    return this.searchData.length;
  }

  // Debug method to inspect current search data
  getSearchData(): SearchResult[] {
    return this.searchData;
  }
}

// Export singleton instance
export const searchService = new SearchService();
export default searchService;