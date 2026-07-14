import { Search } from "lucide-react";

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="relative max-w-xl">

      <Search
        className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search artwork, artist or category..."
        className="w-full rounded-2xl border border-gray-200 py-4 pl-14 pr-5 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
      />

    </div>
  );
};

export default SearchBar;