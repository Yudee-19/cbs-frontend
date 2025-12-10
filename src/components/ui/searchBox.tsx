import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from './button';

interface SearchBoxProps {
  // controlled change handler
  onSearch: (query: string) => void;
  placeholder?: string;
  debounceMs?: number; // added
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch, placeholder, debounceMs = 400 }) => {
  const [inputValue, setInputValue] = useState('');

  // Debounce: fire onSearch after user stops typing
  useEffect(() => {
    const handle = window.setTimeout(() => {
      onSearch(inputValue.trim());
    }, debounceMs);

    return () => window.clearTimeout(handle);
  }, [inputValue, debounceMs, onSearch]);

  const handleButtonClick = () => {
    onSearch(inputValue.trim());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="relative flex-1 w-full sm:max-w-74">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            onSearch(inputValue.trim());
          }
        }}
        placeholder={placeholder || 'Search contacts...'}
        className="w-full border px-3 pr-10 py-2 text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-md h-9  to-gray-100"
      />
      <Button
        onClick={handleButtonClick}
        className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:hover:bg-accent/50 rounded-md gap-1.5 has-[>svg]:px-2.5 absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0 bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-700 transition-colors"
      >
        <Search className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default SearchBox;
