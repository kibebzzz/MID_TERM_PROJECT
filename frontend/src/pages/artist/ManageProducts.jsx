import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { 
    getArtistProducts,
    deleteProduct,
 } from "../../services/productService";

const ManageProducts = () => {
  const { user } = useAuth();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      if (!user) return;

      const response = await getArtistProducts(user.id);

      if (response.success) {
        setProducts(response.data);
      }
    };

    loadProducts();
  }, [user]);

  return (
    <div>

      <h1 className="text-4xl font-black mb-8">
        My Products
      </h1>

      {products.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 text-center shadow-sm">
          <h2 className="text-2xl font-semibold">
            No products yet
          </h2>

          <p className="text-gray-500 mt-3">
            Upload your first creative work to get started.
          </p>
        </div>
      ) : (
        <div className="space-y-5">

          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-sm p-6 flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-bold">
                  {product.title}
                </h2>

                <p className="text-gray-500 mt-2">
                  {product.category.replaceAll("_", " ")}
                </p>

                <p className="font-semibold mt-2">
                  KSh {Number(product.price).toLocaleString()}
                </p>
              </div>

              <div className="flex gap-3">

                <button className="p-3 rounded-xl bg-cyan-500 text-white">
                  <Pencil size={18} />
                </button>

                <button
  onClick={() => handleDelete(product.id)}
  className="p-3 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
>
  <Trash2 size={18} />
</button>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
};

const handleDelete = async (id) => {
  if (!window.confirm("Delete this product?")) return;

  const response = await deleteProduct(id);

  if (response.success) {
    setProducts((prev) =>
      prev.filter((product) => product.id !== id)
    );
  }
};

export default ManageProducts;