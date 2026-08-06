import { useState } from "react";
import toast from "react-hot-toast";

import { createReview } from "../../services/reviewService";

const ReviewModal = ({
  order,
  product,
  user,
  onClose,
}) => {

  const [rating, setRating] = useState(5);

  const [comment, setComment] = useState("");

  const handleSubmit = async () => {

    const response =
      await createReview({

        buyerId: user.id,

        productId: product.id,

        rating,

        comment,

      });

    if (response.success) {

      toast.success(
        "Review submitted."
      );

      onClose();

    } else {

      toast.error(response.message);

    }

  };

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-3xl p-8 w-full max-w-lg">

        <h2 className="text-3xl font-black">

          Leave a Review

        </h2>

        <p className="mt-2 text-gray-500">

          {product.title}

        </p>

        <select

          value={rating}

          onChange={(e)=>
            setRating(Number(e.target.value))
          }

          className="w-full border rounded-xl p-3 mt-6"

        >

          <option value={5}>⭐⭐⭐⭐⭐</option>

          <option value={4}>⭐⭐⭐⭐</option>

          <option value={3}>⭐⭐⭐</option>

          <option value={2}>⭐⭐</option>

          <option value={1}>⭐</option>

        </select>

        <textarea

          rows={5}

          value={comment}

          onChange={(e)=>
            setComment(e.target.value)
          }

          placeholder="Tell others about your experience..."

          className="w-full border rounded-xl p-4 mt-5"

        />

        <div className="flex gap-4 mt-8">

          <button

            onClick={onClose}

            className="flex-1 border rounded-xl py-3"

          >

            Cancel

          </button>

          <button

            onClick={handleSubmit}

            className="flex-1 bg-cyan-500 text-white rounded-xl py-3"

          >

            Submit Review

          </button>

        </div>

      </div>

    </div>

  );

};

export default ReviewModal;