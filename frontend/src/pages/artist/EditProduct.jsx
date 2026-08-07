import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import PageWrapper from "../../components/common/PageWrapper";

import {
  getProductById,
  updateProduct,
} from "../../services/productService";

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "PAINTING",
    quantity: 1,
    imageUrls: [],
  });

  useEffect(() => {
    const loadProduct = async () => {
      const response = await getProductById(id);

      if (response.success) {
        setFormData({
          title: response.data.title,
          description: response.data.description,
          price: response.data.price,
          category: response.data.category,
          quantity: response.data.quantity,
          imageUrls: response.data.imageUrls,
        });
      } else {
        toast.error(response.message);
        navigate("/artist/products");
      }
    };

    loadProduct();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    const response = await updateProduct(id, {
      ...formData,
      price: Number(formData.price),
      quantity: Number(formData.quantity),
    });

    setLoading(false);

    if (response.success) {
      toast.success("Product updated successfully!");

      navigate("/artist/products");
    } else {
      toast.error(response.message);
    }
  };

  return (
    <PageWrapper>
      <section className="max-w-3xl mx-auto py-20 px-8">

        <h1 className="text-4xl font-black">
          Edit Product
        </h1>

        <p className="text-gray-500 mt-3">
          Update your creative work.
        </p>

        <div className="space-y-5 mt-10">

          <Input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
          />

          <textarea
            name="description"
            rows={5}
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-xl px-5 py-3"
            placeholder="Description"
          />

          <Input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
          />

          <Input
            name="quantity"
            type="number"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Quantity"
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded-xl px-5 py-3"
          >
            <option value="PAINTING">Painting</option>
            <option value="PHOTOGRAPHY">Photography</option>
            <option value="DIGITAL_ART">Digital Art</option>
            <option value="MUSIC">Music</option>
            <option value="FASHION">Fashion</option>
            <option value="OTHER">Other</option>
          </select>


          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>

        </div>

      </section>
    </PageWrapper>
  );
};

export default EditProduct;