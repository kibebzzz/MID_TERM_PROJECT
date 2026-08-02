import { useEffect, useState } from "react";

import ProductCard from "../marketplace/ProductCard";
import SectionHeader from "../common/SectionHeader";

import { getProducts } from "../../services/productService";

const TrendingArtwork = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const response = await getProducts();

      if (response.success) {
        setProducts(response.data.slice(0, 6));
      }
    };

    loadProducts();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-8 py-24">

      <SectionHeader
        title="Trending Artwork"
        subtitle="Browse the latest artwork loved by collectors across the community."
      />

      <div className="grid md:grid-cols-3 gap-10">

        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}

      </div>

    </section>
  );
};

export default TrendingArtwork;