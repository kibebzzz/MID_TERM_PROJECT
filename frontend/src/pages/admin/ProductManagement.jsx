import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Trash2, Star } from "lucide-react";

import {
  deleteProduct,
  toggleFeaturedProduct,
} from "../../services/productService";

import {
  getAllProducts,
} from "../../services/adminService";

const ProductManagement = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {

    const token = localStorage.getItem("token");

const response = await getAllProducts(token);

    if (response.success) {
      setProducts(response.data);
    } else {
      toast.error(response.message);
    }

    setLoading(false);

  };

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this product?")) return;

    const response = await deleteProduct(id);

    if (response.success) {

      toast.success("Product deleted.");

      loadProducts();

    } else {

      toast.error(response.message);

    }

  };

  const toggleFeatured = async (product) => {

  const response = await toggleFeaturedProduct(
    product.id
  );

  if (response.success) {

    toast.success("Featured status updated.");

    loadProducts();

  } else {

    toast.error(response.message);

  }

};

  if (loading) {
    return <h1 className="text-4xl font-black">Loading...</h1>;
  }

  return (

    <section>

      <h1 className="text-5xl font-black">
        Product Management
      </h1>

      <p className="text-gray-500 mt-3">
        Manage all products across the platform.
      </p>

      <div className="bg-white rounded-3xl shadow mt-10 overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="text-left p-5">
                Product
              </th>

              <th>
                Artist
              </th>

              <th>
                Price
              </th>

              <th>
                Featured
              </th>

              <th>
                Actions
              </th>

              <th>Status</th>

            </tr>

          </thead>

          <tbody>

            {products.map((product) => (

              <tr
                key={product.id}
                className="border-t"
              >

                <td className="p-5">

                  <div className="flex items-center gap-4">

                    <img
                      src={
                        product.imageUrls?.[0] ||
                        "https://placehold.co/80"
                      }
                      className="w-16 h-16 rounded-xl object-cover"
                    />

                    <div>

                      <h3 className="font-bold">
                        {product.title}
                      </h3>

                      <p className="text-gray-500 text-sm">
                        {product.category}
                      </p>

                    </div>

                  </div>

                </td>

                <td>
                  {product.artist.fullName}
                </td>

                <td>
                  KSh {Number(product.price).toLocaleString()}
                </td>

                <td>

                  <button
  disabled={!product.isAvailable}
  onClick={() => toggleFeatured(product)}
>

                    <Star
                      className={
                        product.featured
                          ? "fill-yellow-400 text-yellow-400"
                          : ""
                      }
                    />

                  </button>

                </td>

                <td>

                  <button
  disabled={!product.isAvailable}
  onClick={() => handleDelete(product.id)}
                    className="text-red-500"
                  >

                    <Trash2 />

                  </button>

                </td>

                <td>

  {product.isAvailable ? (

    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">

      Available

    </span>

  ) : (

    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">

      Removed

    </span>

  )}

</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </section>

  );

};

export default ProductManagement;