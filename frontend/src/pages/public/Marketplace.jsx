import { useState } from "react";

import products from "../../data/products";

import SearchBar from "../../components/marketplace/SearchBar";
import CategoryFilter from "../../components/marketplace/CategoryFilter";
import SortDropdown from "../../components/marketplace/SortDropdown";
import ProductCard from "../../components/marketplace/ProductCard";

const Marketplace = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  // Filter products
  let filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(search.toLowerCase()) ||
      product.artist.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Create a copy before sorting
  const sortedProducts = [...filteredProducts];

  switch (sortBy) {
    case "low":
      sortedProducts.sort((a, b) => a.price - b.price);
      break;

    case "high":
      sortedProducts.sort((a, b) => b.price - a.price);
      break;

    case "rating":
      sortedProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      break;

    default:
      break;
  }

  return (
    <section className="max-w-7xl mx-auto px-8 py-20">

      {/* Header */}
      <div className="mb-10">
        <p className="uppercase tracking-[0.3em] text-cyan-500 font-semibold">
          Palette
        </p>

        <h1 className="text-5xl font-black mt-3">
          Creative Marketplace
        </h1>

        <p className="text-gray-500 mt-5 max-w-2xl">
          Discover music, paintings, photography, digital art,
          fashion and more from Kenya's most talented creators.
        </p>
      </div>

      {/* Search + Sort */}
      <div className="mt-10 flex flex-col lg:flex-row gap-6 justify-between items-center">

        <SearchBar
          value={search}
          onChange={setSearch}
        />

        <SortDropdown
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

      </div>

      {/* Categories */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Product Count */}
      <div className="flex justify-between items-center mt-10 mb-6">

        <h2 className="text-xl font-semibold">
          Showing{" "}
          <span className="text-cyan-500">
            {sortedProducts.length}
          </span>{" "}
          Creative Works
        </h2>

      </div>

      {/* Product Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

        {sortedProducts.length > 0 ? (

          sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))

        ) : (

          <div className="col-span-full text-center py-24">

            <div className="text-7xl">
              🎨
            </div>

            <h2 className="text-3xl font-bold mt-6">
              No Creative Works Found
            </h2>

            <p className="text-gray-500 mt-4">
              Try another search or category.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
                setSortBy("default");
              }}
              className="mt-8 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-xl transition"
            >
              Reset Filters
            </button>

          </div>

        )}

      </div>

    </section>
  );
};

export default Marketplace;