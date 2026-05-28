import { Search } from "lucide-react";

const SearchBar = ({ search, setSearch }) => {

  return (
    <div className="relative w-full md:w-96">

      <Search
        className="absolute left-4 top-3.5 text-gray-400"
        size={18}
      />

      <input
        type="text"
        placeholder="Search your tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
      />

    </div>
  );
};

export default SearchBar;