import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import PageWrapper from "../../components/common/PageWrapper";

import { getProductById } from "../../services/productService";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";
import { 
  getProductReviews,
  updateReview,
  deleteReview,
 } from "../../services/reviewService";


const WorkDetails = () => {
  const { id } = useParams();

  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { user, isAuthenticated } = useAuth();

  const isBuyer = user?.role === "BUYER";
  const canPurchase = !isAuthenticated || isBuyer;

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
const [reviews, setReviews] = useState([]);

const [editingReview, setEditingReview] = useState(null);

const [editedRating, setEditedRating] = useState(5);

const [editedComment, setEditedComment] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);

      const response = await getProductById(id);

      if (response.success) {
        setProduct(response.data);

        const reviewResponse =
  await getProductReviews(id);

if (reviewResponse.success) {

  setReviews(reviewResponse.data);

}
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

  const averageRating =
  reviews.length > 0

    ? (
        reviews.reduce(
          (sum, review) =>
            sum + review.rating,
          0
        ) / reviews.length
      ).toFixed(1)

    : "0.0";

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

            <div className="flex items-center gap-3 mt-5">

  <span className="text-yellow-500 text-xl">

    {"⭐".repeat(
      Math.round(averageRating)
    )}

  </span>

  <span className="font-semibold">

    {averageRating}

  </span>

  <span className="text-gray-500">

    ({reviews.length} Reviews)

  </span>

</div>

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

        <div className="mt-24">

  <h2 className="text-4xl font-black mb-10">

    Customer Reviews

  </h2>

  {reviews.length === 0 ? (

    <p className="text-gray-500">

      No reviews yet.

    </p>

  ) : (

    <div className="space-y-8">

      {reviews.map((review) => (

        <div
          key={review.id}
          className="bg-white rounded-3xl shadow p-8"
        >

          <div className="flex justify-between">

            <div>

              <h3 className="font-bold">

                {review.buyer.fullName}

              </h3>

              <p className="text-yellow-500">

                {"⭐".repeat(review.rating)}

              </p>

              {review.verifiedPurchase && (

  <span className="text-green-600 text-sm font-semibold">

    ✔ Verified Purchase

  </span>

)}

            </div>

            <span className="text-gray-400">

              {new Date(
                review.createdAt
              ).toLocaleDateString()}

            </span>

          </div>

          {editingReview === review.id ? (

  <>

    <select
      value={editedRating}
      onChange={(e) =>
        setEditedRating(Number(e.target.value))
      }
      className="border rounded-lg p-2 mt-4"
    >

      {[5,4,3,2,1].map((rating) => (

        <option
          key={rating}
          value={rating}
        >

          {rating} Star{rating > 1 ? "s" : ""}

        </option>

      ))}

    </select>

    <textarea
      value={editedComment}
      onChange={(e) =>
        setEditedComment(e.target.value)
      }
      className="w-full border rounded-xl p-3 mt-4"
    />

  </>

) : (

  <p className="mt-5 text-gray-600">

    {review.comment}

  </p>

)}

{user?.id === review.buyer.id && (

<div className="flex gap-3 mt-5">

  {editingReview === review.id ? (

    <>

      <button

        onClick={async () => {

          const response =
            await updateReview(

              review.id,

              {

                buyerId: user.id,

                rating: editedRating,

                comment: editedComment,

              }

            );

          if (response.success) {

            toast.success("Review updated.");

            setEditingReview(null);

            const refreshed =
              await getProductReviews(id);

            setReviews(refreshed.data);

          }

        }}

        className="bg-cyan-500 text-white px-4 py-2 rounded-lg"

      >

        Save

      </button>

      <button

        onClick={() =>
          setEditingReview(null)
        }

        className="border px-4 py-2 rounded-lg"

      >

        Cancel

      </button>

    </>

  ) : (

    <>

      <button

        onClick={() => {

          setEditingReview(review.id);

          setEditedRating(review.rating);

          setEditedComment(review.comment);

        }}

        className="text-cyan-500"

      >

        Edit

      </button>

      <button

        onClick={async () => {

          if (!window.confirm("Delete this review?"))
            return;

          const response =
            await deleteReview(

              review.id,

              user.id

            );

          if (response.success) {

            toast.success("Review deleted.");

            const refreshed =
              await getProductReviews(id);

            setReviews(refreshed.data);

          }

        }}

        className="text-red-500"

      >

        Delete

      </button>

    </>

  )}

</div>

)}

        </div>

      ))}

    </div>

  )}

</div>

      </section>

    </PageWrapper>
  );
};

export default WorkDetails;