import { useParams } from "react-router-dom";
import products from "../../data/products";

const WorkDetails = () => {
  const { id } = useParams();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <div className="text-center py-40">
        <h1 className="text-4xl font-bold">
          Creative Work Not Found
        </h1>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-8 py-20">

      <div className="grid lg:grid-cols-2 gap-20">

        {/* Image */}

        <img
          src={product.image}
          alt={product.title}
          className="rounded-3xl shadow-xl w-full h-[650px] object-cover"
        />

        {/* Details */}

        <div>

          <p className="uppercase tracking-widest text-cyan-500 font-semibold">

            {product.category}

          </p>

          <h1 className="text-5xl font-black mt-4">

            {product.title}

          </h1>

          <p className="text-xl mt-4 text-gray-600">

            by {product.artist}

          </p>

          <div className="flex gap-6 mt-8">

            <span className="text-yellow-500 text-lg">

                ⭐ {product.rating}

            </span>

            <span className="text-cyan-500">

                ✔ Verified Artist

            </span>

          </div>

          <h2 className="text-4xl font-bold mt-10">

            KSh {product.price.toLocaleString()}

          </h2>

          <p className="text-gray-500 leading-8 mt-8">

            {product.description}

          </p>

          <div className="flex gap-5 mt-12">

            <button className="bg-cyan-500 hover:bg-cyan-600 transition text-white px-8 py-4 rounded-xl">

              Add to Cart

            </button>

            <button className="border border-gray-300 hover:border-cyan-400 px-8 py-4 rounded-xl">

              ♡ Wishlist

            </button>

          </div>

        </div>

      </div>

    </section>
  );
};

export default WorkDetails;