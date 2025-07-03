import React, { useState, useEffect } from "react";
import { Search, X, Filter } from "lucide-react";
import { debounce } from "@/lib/utils";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  showFilter?: boolean;
  onFilterClick?: () => void;
  debounceMs?: number;
  className?: string;
  disabled?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "cari...",
  value: controlledValue,
  onChange,
  onSearch,
  showFilter = false,
  onFilterClick,
  debounceMs = 300,
  className,
  disabled = false,
}) => {
  const [inputValue, setInputValue] = useState(controlledValue || "");
  const [isFocused, setIsFocused] = useState(false);

  // debounced search function
  const debouncedSearch = debounce((searchValue: string) => {
    if (onSearch) {
      onSearch(searchValue);
    }
  }, debounceMs);

  useEffect(() => {
    if (controlledValue !== undefined) {
      setInputValue(controlledValue);
    }
  }, [controlledValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    if (onChange) {
      onChange(newValue);
    }

    debouncedSearch(newValue);
  };

  const handleClear = () => {
    setInputValue("");
    if (onChange) {
      onChange("");
    }
    if (onSearch) {
      onSearch("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(inputValue);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`search-bar ${className || ""}`}>
      <div className={`search-input-container ${isFocused ? "focused" : ""}`}>
        <Search size={20} className="search-icon" />
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          disabled={disabled}
          className="search-input"
        />
        {inputValue && (
          <button
            type="button"
            onClick={handleClear}
            className="search-clear"
            aria-label="hapus pencarian"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {showFilter && (
        <button
          type="button"
          onClick={onFilterClick}
          className="search-filter-btn"
          aria-label="filter"
        >
          <Filter size={20} />
        </button>
      )}
    </form>
  );
};

interface SearchResultsProps {
  results: Array<{
    id: string;
    title: string;
    description?: string;
    type?: string;
    url?: string;
  }>;
  loading?: boolean;
  onResultClick?: (result: any) => void;
  className?: string;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  loading = false,
  onResultClick,
  className,
}) => {
  if (loading) {
    return (
      <div className={`search-results ${className || ""}`}>
        <div className="search-results-loading">
          <div className="loading-spinner" />
          <span>mencari...</span>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className={`search-results ${className || ""}`}>
        <div className="search-results-empty">
          <Search size={24} />
          <span>tidak ada hasil ditemukan</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`search-results ${className || ""}`}>
      {results.map((result) => (
        <div
          key={result.id}
          className="search-result-item"
          onClick={() => onResultClick?.(result)}
        >
          <div className="search-result-content">
            <h4 className="search-result-title">{result.title}</h4>
            {result.description && (
              <p className="search-result-description">{result.description}</p>
            )}
            {result.type && (
              <span className="search-result-type">{result.type}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchBar;
