import { Heart, Eye, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";

 

const ProductCard = ({ product }) => {
  const { toggleWishlist, isWishlisted } = useWishlist();

  return (
    <Link to={`/work/${product.id}`}>
    <div className="group rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-2xl transition-all duration-500">

      {/* Image */}

      <div className="relative">

    <img
        src={product.image}
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

      {/* Content */}

      <div className="p-6">

        <div className="flex justify-between items-center">

  <span className="text-sm text-cyan-500 font-semibold">
    {product.category}
  </span>

  <span className="text-xs bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full">
    New
  </span>

</div>

        <h3 className="text-2xl font-semibold mt-2">
          {product.title}
        </h3>

        <div className="flex items-center justify-between mt-2">

  <p className="text-gray-500">

    by {product.artist}

  </p>

  <span className="text-yellow-500">

    ★★★★★

  </span>

</div>

        <div className="flex justify-between items-center mt-6">

          <h2 className="text-2xl font-bold">
            KSh {product.price.toLocaleString()}
          </h2>

          <div className="flex gap-3">

            <button className="p-2 rounded-full border hover:bg-cyan-400 hover:text-white transition">

              <Eye size={18} />

            </button>

            <button className="p-2 rounded-full bg-cyan-400 text-white hover:scale-110 transition">

              <ShoppingCart size={18} />

            </button>

          </div>

        </div>

      </div>

    </div>
    </Link>
  );
  
};



export default ProductCard;