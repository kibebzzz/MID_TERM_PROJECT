import { Heart, Eye, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

const ProductCard = ({ product }) => {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="group rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">

      <Link to={`/work/${product.id}`}>
        <div className="relative">
          <img
            src={
              product.imageUrls?.[0] ||
              "https://placehold.co/600x600?text=Palette"
            }
            alt={product.title}
            className="w-full h-80 object-cover"
          />

          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product);
            }}
            className="absolute top-4 right-4 bg-white rounded-full p-3 shadow-lg hover:scale-110 transition"
          >
            <Heart
              size={20}
              className={
                isWishlisted(product.id)
                  ? "fill-red-500 text-red-500"
                  : "text-gray-500"
              }
            />
          </button>
        </div>
      </Link>

      <div className="p-6">

        <div className="flex justify-between items-center">

          <span className="text-sm text-cyan-500 font-semibold">
            {product.category.replaceAll("_", " ")}
          </span>

          {product.featured && (
            <span className="text-xs bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full">
              Featured
            </span>
          )}

        </div>

        <Link to={`/work/${product.id}`}>
          <h3 className="text-2xl font-semibold mt-3 group-hover:text-cyan-500 transition-colors">
            {product.title}
          </h3>
        </Link>

        <p className="text-gray-500 mt-3">
          by {product.artist.fullName}
        </p>

        <div className="flex justify-between items-center mt-6">

          <h2 className="text-2xl font-bold">
            KSh {Number(product.price).toLocaleString()}
          </h2>

          <div className="flex gap-3">

            <Link to={`/work/${product.id}`}>
              <button className="p-2 rounded-full border hover:bg-cyan-400 hover:text-white transition">
                <Eye size={18} />
              </button>
            </Link>

            <button
              onClick={() => addToCart(product)}
              className="p-2 rounded-full bg-cyan-400 text-white hover:scale-110 transition"
            >
              <ShoppingCart size={18} />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ProductCard;