import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { uploadImage } from "../../services/uploadService";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import PageWrapper from "../../components/common/PageWrapper";

import {
  getProfile,
  updateArtistProfile,
} from "../../services/userService";

const ArtistSettings = () => {
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(false);

  const [profileImage, setProfileImage] = useState("");
const [coverImage, setCoverImage] = useState("");

const [uploadingProfile, setUploadingProfile] = useState(false);
const [uploadingCover, setUploadingCover] = useState(false);

  const [formData, setFormData] = useState({
    bio: "",
    specialty: "",
    location: "",
    website: "",
    instagram: "",
    facebook: "",
  });

  useEffect(() => {
    const loadProfile = async () => {
      const response = await getProfile(token);

      if (response.success) {
        const profile = response.data.artistProfile;
        setProfileImage(response.data.profileImage || "");

        setCoverImage(
  response.data.artistProfile?.coverImage || ""
);
        if (profile) {
          setFormData({
            bio: profile.bio || "",
            specialty: profile.specialty || "",
            location: profile.location || "",
            website: profile.website || "",
            instagram: profile.instagram || "",
            facebook: profile.facebook || "",
          });
        }
      }
    };

    loadProfile();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageUpload = async (file, type) => {
  if (!file) return;

  if (type === "profile") {
    setUploadingProfile(true);
  } else {
    setUploadingCover(true);
  }

  const loadingToast = toast.loading("Uploading image...");

  try {

    const response = await uploadImage(
      file,
      type === "profile"
        ? "artists/profile-images"
        : "artists/cover-images"
    );

    toast.dismiss(loadingToast);

    if (response.success) {

      toast.success("Upload successful!");

      if (type === "profile") {
        setProfileImage(response.imageUrl);
      } else {
        setCoverImage(response.imageUrl);
      }

    } else {

      toast.error(response.message);

    }

  } finally {

    if (type === "profile") {
      setUploadingProfile(false);
    } else {
      setUploadingCover(false);
    }

  }
};

  const handleSave = async () => {
    setLoading(true);

    const response = await updateArtistProfile(
  token,
  {
    ...formData,
    profileImage,
    coverImage,
  }
);

    if (response.success) {
      toast.success("Profile updated successfully.");

      const updated = await getProfile(token);

if (updated.success) {

  const profile = updated.data.artistProfile;

  setProfileImage(updated.data.profileImage || "");
  setCoverImage(profile?.coverImage || "");

  setFormData({
    bio: profile?.bio || "",
    specialty: profile?.specialty || "",
    location: profile?.location || "",
    website: profile?.website || "",
    instagram: profile?.instagram || "",
    facebook: profile?.facebook || "",
  });

}
    } else {
      toast.error(response.message);
    }

    setLoading(false);
  };

  return (
    <PageWrapper>

      <section className="max-w-4xl mx-auto py-20 px-8">

        <h1 className="text-5xl font-black">
          Profile Settings
        </h1>

        <p className="text-gray-500 mt-4">
          Update the information displayed on your public artist profile.
        </p>

        {/* Images */}

<div className="bg-white rounded-3xl shadow p-8 mt-10">

  {/* Cover */}

  <div>

    <h2 className="text-2xl font-bold mb-5">
      Cover Photo
    </h2>

    <div className="relative">

      <img
        src={
          coverImage ||
          "https://placehold.co/1200x350?text=Cover+Image"
        }
        alt="Cover"
        className="w-full h-64 object-cover rounded-3xl"
      />

      <label className="absolute bottom-5 right-5 bg-white shadow-lg px-5 py-3 rounded-xl cursor-pointer hover:bg-gray-100 transition">

        📷 Change Cover

        <input
          type="file"
          accept="image/*"
          hidden
          onChange={(e) =>
            handleImageUpload(
              e.target.files[0],
              "cover"
            )
          }
        />

      </label>

    </div>

     {uploadingCover && (
  <p className="text-sm text-cyan-500 mt-3">
    Uploading cover image...
  </p>
)}

  </div>

  {/* Profile */}

  <div className="flex flex-col items-center -mt-16">

    <img
      src={
        profileImage ||
        "https://placehold.co/200x200?text=Artist"
      }
      alt="Profile"
      className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-xl"
    />

    <label className="mt-5 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-xl cursor-pointer transition">

      📷 Change Profile Picture

      <input
        type="file"
        accept="image/*"
        hidden
        onChange={(e) =>
          handleImageUpload(
            e.target.files[0],
            "profile"
          )
        }
      />

    </label>

    {uploadingProfile && (
  <p className="text-sm text-cyan-500 mt-3">
    Uploading profile picture...
  </p>
)}

  </div>

</div>

        <div className="space-y-5 mt-10">

          <textarea
            name="bio"
            rows={5}
            value={formData.bio}
            onChange={handleChange}
            placeholder="Bio"
            className="w-full border rounded-xl p-4"
          />

          <Input
            name="specialty"
            placeholder="Specialty"
            value={formData.specialty}
            onChange={handleChange}
          />

          <Input
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
          />

          <Input
            name="website"
            placeholder="Website"
            value={formData.website}
            onChange={handleChange}
          />

          <Input
            name="instagram"
            placeholder="Instagram"
            value={formData.instagram}
            onChange={handleChange}
          />

          <Input
            name="facebook"
            placeholder="Facebook"
            value={formData.facebook}
            onChange={handleChange}
          />

          <Button
            onClick={handleSave}
            disabled={loading}
            className="w-full"
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>

        </div>

      </section>

    </PageWrapper>
  );
};

export default ArtistSettings;