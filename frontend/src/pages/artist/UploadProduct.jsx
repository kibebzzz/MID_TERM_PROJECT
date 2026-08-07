import { useState } from "react";
import toast from "react-hot-toast";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import PageWrapper from "../../components/common/PageWrapper";
import { createProduct } from "../../services/productService";
import { uploadImage } from "../../services/uploadService";

const UploadProduct = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
  title: "",
  description: "",
  price: "",
  category: "PAINTING",
  quantity: 1,
  imageUrls: "",
});

const [selectedImages, setSelectedImages] = useState([]);

const [previews, setPreviews] = useState([]);

const [selectedAudio, setSelectedAudio] = useState(null);

const [audioName, setAudioName] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

const handleImageChange = (e) => {

  const files = Array.from(e.target.files);

  if (files.length === 0) return;

  if (files.length > 5) {

    toast.error("Maximum 5 images allowed.");

    return;

  }

  setSelectedImages(files);

  setPreviews(

    files.map((file) =>

      URL.createObjectURL(file)

    )

  );

};

const handleAudioChange = (e) => {

  const file = e.target.files[0];

  if (!file) return;

  setSelectedAudio(file);

  setAudioName(file.name);

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

   const imageUrls = [];

for (const image of selectedImages) {

  const uploadResponse =

    await uploadImage(image);

  if (!uploadResponse.success) {

    toast.error(uploadResponse.message);

    setLoading(false);

    return;

  }

  imageUrls.push(uploadResponse.fileUrl);

}

let audioPreviewUrl = "";

if (

  formData.category === "MUSIC" &&

  selectedAudio

) {

  const audioUpload =

    await uploadImage(

      selectedAudio,

      "music"

    );

  if (!audioUpload.success) {

    toast.error(

      "Audio upload failed."

    );

    setLoading(false);

    return;

  }

  audioPreviewUrl =

    audioUpload.fileUrl;

}

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const response = await createProduct({
  title: formData.title,
  description: formData.description,
  price: Number(formData.price),
  category: formData.category,
  quantity: Number(formData.quantity),
 imageUrls,
  audioPreviewUrl,
  artistId: user.id,
});


      if (response.success) {
        toast.success("Product uploaded successfully!");

        setFormData({
          title: "",
          description: "",
          price: "",
          category: "PAINTING",
          quantity: 1,
          imageUrls: "",
        });

      } else {
        toast.error(response.message);
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

          <div>

  <label className="block mb-2 font-medium">
    Product Image
  </label>

  <input
  type="file"
  multiple
  accept="image/*"
  onChange={handleImageChange}
  className="w-full border rounded-xl p-3"
/>

</div>

{formData.category === "MUSIC" && (

  <div className="mt-6">

    <label className="block mb-2 font-medium">

      Preview Track

    </label>

    <input

      type="file"

      accept=".mp3,.wav,.ogg,audio/*"

      onChange={handleAudioChange}

      className="w-full border rounded-xl p-3"

    />

    {audioName && (

      <p className="text-green-600 mt-3">

        🎵 {audioName}

      </p>

    )}

  </div>

)}

{previews.length > 0 && (

  <div className="grid grid-cols-3 gap-4 mt-6">

    {previews.map((preview, index) => (

      <img

        key={index}

        src={preview}

        alt={`Preview ${index + 1}`}

        className="w-full h-40 object-cover rounded-2xl border shadow"

      />

    ))}

  </div>

)}

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