// components/SearchBox.tsx
import { useState, ChangeEvent } from 'react';

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim() !== '') {
      onSearch(query);
    }
  };

  return (
    <div className="flex items-center justify-center mt-8">
      <input
        type="text"
        value={query}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
        placeholder="Search GIFs..."
        className="p-2 border border-gray-300 rounded-l focus:outline-none focus:ring focus:border-blue-300 text-black"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBox;
