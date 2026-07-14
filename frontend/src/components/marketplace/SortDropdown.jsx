const SortDropdown = ({ sortBy, onSortChange }) => {
  return (
    <select
      value={sortBy}
      onChange={(e) => onSortChange(e.target.value)}
      className="bg-white border border-gray-300 rounded-xl px-5 py-3 shadow-sm hover:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
    >
      <option value="default">Sort Creative Works</option>
      <option value="newest">Newest</option>
      <option value="low">Price: Low → High</option>
      <option value="high">Price: High → Low</option>
      <option value="rating">Highest Rated</option>
    </select>
  );
};

export default SortDropdown;