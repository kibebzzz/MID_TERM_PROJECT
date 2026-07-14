import ProductCard from "../marketplace/ProductCard";
import SectionHeader from "../common/SectionHeader";
import products from "../../data/products";

const TrendingArtwork = () => {
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