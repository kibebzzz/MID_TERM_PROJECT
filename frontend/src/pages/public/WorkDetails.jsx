import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import PageWrapper from "../../components/common/PageWrapper";

import { getProductById } from "../../services/productService";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";

const WorkDetails = () => {
  const { id } = useParams();

  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { user, isAuthenticated } = useAuth();

  const isBuyer = user?.role === "BUYER";
  const canPurchase = !isAuthenticated || isBuyer;

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);

      const response = await getProductById(id);

      if (response.success) {
        setProduct(response.data);
      } else {
        toast.error(response.message);
      }

      setLoading(false);
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <PageWrapper>
        <section className="py-32 text-center">
          <h1 className="text-4xl font-bold">
            Loading...
          </h1>
        </section>
      </PageWrapper>
    );
  }

  if (!product) {
    return (
      <PageWrapper>
        <section className="py-32 text-center">
          <h1 className="text-4xl font-bold">
            Creative Work Not Found
          </h1>
        </section>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>

      <section className="max-w-7xl mx-auto px-8 py-20">

        <div className="grid lg:grid-cols-2 gap-20">

          <img
            src={
              product.imageUrls?.[0] ||
              "https://placehold.co/600x600?text=Palette"
            }
            alt={product.title}
            className="rounded-3xl shadow-xl w-full h-[650px] object-cover"
          />

          <div>

            <p className="uppercase tracking-widest text-cyan-500 font-semibold">
              {product.category.replaceAll("_", " ")}
            </p>

            <h1 className="text-5xl font-black mt-4">
              {product.title}
            </h1>

            <p className="text-xl mt-4 text-gray-600">
              by {product.artist.fullName}
            </p>

            <div className="flex gap-6 mt-8">

              {product.artist.artistProfile?.verified && (
                <span className="text-cyan-500">
                  ✔ Verified Artist
                </span>
              )}

            </div>

            <h2 className="text-4xl font-bold mt-10">
              KSh {Number(product.price).toLocaleString()}
            </h2>

            <p className="text-gray-500 leading-8 mt-8">
              {product.description}
            </p>

            {canPurchase && (
              <div className="flex gap-5 mt-12">

                <button
                  onClick={() => addToCart(product)}
                  className="bg-cyan-500 hover:bg-cyan-600 transition text-white px-8 py-4 rounded-xl"
                >
                  Add to Cart
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className="border border-gray-300 hover:border-cyan-400 px-8 py-4 rounded-xl"
                >
                  {isWishlisted(product.id)
                    ? "♥ Wishlisted"
                    : "♡ Wishlist"}
                </button>

              </div>
            )}

          </div>

        </div>

      </section>

    </PageWrapper>
  );
};

export default WorkDetails;