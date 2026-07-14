import ProductCard from "../marketplace/ProductCard";

import products from "../../data/products";

const TrendingArtwork = () => {
  return (
    <section className="max-w-7xl mx-auto px-8 py-24">

      <h2 className="text-4xl font-bold mb-12">

        Trending Artwork

      </h2>

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