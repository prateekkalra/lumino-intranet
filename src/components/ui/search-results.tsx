import { 
  Search, 
  FileText, 
  Calendar, 
  User, 
  Zap, 
  Award, 
  TrendingUp,
  Clock,
  ArrowRight,
  Hash
} from 'lucide-react';
import { Badge } from './badge';
import { Button } from './button';
import { ScrollArea } from './scroll-area';
import { Separator } from './separator';
import { SearchResult, SearchResultType } from '../../types/search';

interface SearchResultsProps {
  results: SearchResult[];
  query: string;
  isLoading?: boolean;
  onResultClick: (result: SearchResult) => void;
  onClearSearch: () => void;
  className?: string;
}

const getTypeIcon = (type: SearchResultType) => {
  switch (type) {
    case 'task':
      return <Hash className="h-4 w-4" />;
    case 'news':
      return <FileText className="h-4 w-4" />;
    case 'event':
      return <Calendar className="h-4 w-4" />;
    case 'person':
      return <User className="h-4 w-4" />;
    case 'action':
      return <Zap className="h-4 w-4" />;
    case 'recognition':
      return <Award className="h-4 w-4" />;
    case 'analytics':
      return <TrendingUp className="h-4 w-4" />;
    default:
      return <Search className="h-4 w-4" />;
  }
};

const getTypeColor = (type: SearchResultType) => {
  switch (type) {
    case 'task':
      return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400';
    case 'news':
      return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
    case 'event':
      return 'text-purple-600 bg-purple-100 dark:bg-purple-900/20 dark:text-purple-400';
    case 'person':
      return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20 dark:text-orange-400';
    case 'action':
      return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
    case 'recognition':
      return 'text-pink-600 bg-pink-100 dark:bg-pink-900/20 dark:text-pink-400';
    case 'analytics':
      return 'text-indigo-600 bg-indigo-100 dark:bg-indigo-900/20 dark:text-indigo-400';
    default:
      return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400';
  }
};

const highlightText = (text: string, query: string) => {
  if (!query) return text;
  
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  
  return (
    <>
      {parts.map((part, index) => (
        regex.test(part) ? (
          <mark key={index} className="bg-yellow-200 dark:bg-yellow-900/50 text-foreground rounded px-0.5">
            {part}
          </mark>
        ) : (
          <span key={index}>{part}</span>
        )
      ))}
    </>
  );
};

const formatDate = (date: string | Date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export function SearchResults({
  results,
  query,
  isLoading = false,
  onResultClick,
  onClearSearch,
  className = ''
}: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className={`p-4 ${className}`}>
        <div className="flex items-center justify-center space-x-2">
          <Search className="h-4 w-4 animate-spin" />
          <span className="text-sm text-muted-foreground">Searching...</span>
        </div>
      </div>
    );
  }

  if (!query) {
    return (
      <div className={`p-4 ${className}`}>
        <div className="text-center">
          <Search className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Start typing to search</p>
          <p className="text-xs text-muted-foreground mt-1">
            Search across tasks, news, events, and more...
          </p>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className={`p-4 ${className}`}>
        <div className="text-center">
          <Search className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm font-medium">No results found</p>
          <p className="text-xs text-muted-foreground mt-1">
            Try different keywords or check spelling
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearSearch}
            className="mt-2 h-7 text-xs"
          >
            Clear search
          </Button>
        </div>
      </div>
    );
  }

  // Group results by type
  const groupedResults = results.reduce((acc, result) => {
    if (!acc[result.type]) {
      acc[result.type] = [];
    }
    acc[result.type].push(result);
    return acc;
  }, {} as Record<SearchResultType, SearchResult[]>);

  return (
    <div className={`${className}`}>
      <ScrollArea className="h-96">
        <div className="p-2">
          {/* Results header */}
          <div className="flex items-center justify-between mb-3 px-2">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">
                {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearSearch}
              className="h-6 px-2 text-xs"
            >
              Clear
            </Button>
          </div>

          {/* Results by type */}
          {Object.entries(groupedResults).map(([type, typeResults], groupIndex) => (
            <div key={type} className="mb-4 last:mb-0">
              {/* Type header */}
              <div className="flex items-center space-x-2 mb-2 px-2">
                <div className={`p-1 rounded ${getTypeColor(type as SearchResultType)}`}>
                  {getTypeIcon(type as SearchResultType)}
                </div>
                <span className="text-xs font-medium capitalize text-muted-foreground">
                  {type}s ({typeResults.length})
                </span>
              </div>

              {/* Results */}
              <div className="space-y-1">
                {typeResults.map((result) => (
                  <Button
                    key={result.id}
                    variant="ghost"
                    className="w-full h-auto p-3 justify-start text-left hover:bg-muted/50 transition-colors"
                    onClick={() => onResultClick(result)}
                  >
                    <div className="flex items-start space-x-3 w-full">
                      <div className={`p-1.5 rounded-full ${getTypeColor(result.type)} flex-shrink-0 mt-0.5`}>
                        {getTypeIcon(result.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-medium truncate">
                            {highlightText(result.title, query)}
                          </h4>
                          <ArrowRight className="h-3 w-3 text-muted-foreground flex-shrink-0 ml-2" />
                        </div>
                        
                        {result.description && (
                          <p className="text-xs text-muted-foreground line-clamp-2 mb-1">
                            {highlightText(result.description, query)}
                          </p>
                        )}
                        
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary" className="text-xs px-1.5 py-0">
                              {result.widget}
                            </Badge>
                            {result.metadata?.priority && typeof result.metadata.priority === 'string' ? (
                              <Badge 
                                variant={result.metadata.priority === 'high' ? 'destructive' : 'secondary'}
                                className="text-xs px-1.5 py-0"
                              >
                                {String(result.metadata.priority)}
                              </Badge>
                            ) : null}
                          </div>
                          
                          {result.metadata?.date ? (
                            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>{String(formatDate(result.metadata.date as string | Date))}</span>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>

              {groupIndex < Object.keys(groupedResults).length - 1 && (
                <Separator className="mt-3" />
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}