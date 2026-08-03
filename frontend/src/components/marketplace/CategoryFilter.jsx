import categories from "../../data/categories";

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap gap-3 mt-8">

      {categories.map((category) => (

        <button
  key={category.value}
  onClick={() => onCategoryChange(category.value)}
  className={`px-5 py-2 rounded-full transition-all duration-300 ${
    selectedCategory === category.value
      ? "bg-cyan-500 text-white"
      : "border border-gray-300 hover:bg-cyan-400 hover:text-white"
  }`}
>
  {category.label}
</button>

      ))}

    </div>
  );
};

export default CategoryFilter;