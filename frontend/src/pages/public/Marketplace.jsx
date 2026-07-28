import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { getProducts } from "../../services/productService";

import SearchBar from "../../components/marketplace/SearchBar";
import CategoryFilter from "../../components/marketplace/CategoryFilter";
import SortDropdown from "../../components/marketplace/SortDropdown";
import ProductCard from "../../components/marketplace/ProductCard";
import PageWrapper from "../../components/common/PageWrapper";

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const searchQuery = searchParams.get("search");

    if (searchQuery) {
      setSearch(searchQuery);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getProducts();

      if (response.success) {
        setProducts(response.data);
      }

      setLoading(false);
    };

    fetchProducts();
  }, []);

  let filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(search.toLowerCase()) ||
      product.artist.fullName.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts];

  switch (sortBy) {
    case "low":
      sortedProducts.sort(
        (a, b) => Number(a.price) - Number(b.price)
      );
      break;

    case "high":
      sortedProducts.sort(
        (a, b) => Number(b.price) - Number(a.price)
      );
      break;

    default:
      break;
  }

  if (loading) {
    return (
      <PageWrapper>
        <section className="max-w-7xl mx-auto py-32 text-center">
          <h2 className="text-2xl font-semibold">
            Loading Marketplace...
          </h2>
        </section>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <section className="max-w-7xl mx-auto px-8 py-20">

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

        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <div className="flex justify-between items-center mt-10 mb-6">
          <h2 className="text-xl font-semibold">
            Showing{" "}
            <span className="text-cyan-500">
              {sortedProducts.length}
            </span>{" "}
            Creative Works
          </h2>
        </div>

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
              <div className="text-7xl">🎨</div>

              <h2 className="text-3xl font-bold mt-6">
                No Creative Works Found
              </h2>

              <p className="text-gray-500 mt-4">
                Try another search or category.
              </p>
            </div>
          )}
        </div>

      </section>
    </PageWrapper>
  );
};

export default Marketplace;