import { useState } from "react";
import toast from "react-hot-toast";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import PageWrapper from "../../components/common/PageWrapper";

const UploadProduct = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "PAINTING",
    quantity: 1,
    featured: false,
    imageUrls: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    if (
      !formData.title ||
      !formData.description ||
      !formData.price
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          price: Number(formData.price),
          category: formData.category,
          quantity: Number(formData.quantity),
          featured: formData.featured,
          imageUrls: formData.imageUrls
            ? [formData.imageUrls]
            : [],
          artistId: user.id,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Product uploaded successfully!");

        setFormData({
          title: "",
          description: "",
          price: "",
          category: "PAINTING",
          quantity: 1,
          featured: false,
          imageUrls: "",
        });

      } else {
        toast.error(data.message);
      }

    } catch (error) {
      console.error(error);
      toast.error("Unable to upload product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <section className="max-w-3xl mx-auto py-20 px-8">

        <h1 className="text-4xl font-black">
          Upload Creative Work
        </h1>

        <p className="text-gray-500 mt-3">
          Share your latest creation with collectors.
        </p>

        <div className="space-y-5 mt-10">

          <Input
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
          />

          <textarea
            name="description"
            rows={5}
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full rounded-xl border px-5 py-3"
          />

          <Input
            name="price"
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
          />

          <Input
            name="imageUrls"
            placeholder="Image URL"
            value={formData.imageUrls}
            onChange={handleChange}
          />

          <Input
            name="quantity"
            type="number"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full rounded-xl border px-5 py-3"
          >
            <option value="PAINTING">Painting</option>
            <option value="PHOTOGRAPHY">Photography</option>
            <option value="DIGITAL_ART">Digital Art</option>
            <option value="MUSIC">Music</option>
            <option value="FASHION">Fashion</option>
            <option value="OTHER">Other</option>
          </select>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
            />
            Featured Product
          </label>

          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload Product"}
          </Button>

        </div>

      </section>
    </PageWrapper>
  );
};

export default UploadProduct;