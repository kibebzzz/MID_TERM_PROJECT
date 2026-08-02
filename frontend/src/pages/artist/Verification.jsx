import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import PageWrapper from "../../components/common/PageWrapper";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { uploadImage } from "../../services/uploadService";
import {
  getProfile,
  updateArtistProfile,
} from "../../services/userService";

const Verification = () => {
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);

  const [formData, setFormData] = useState({
    portfolioUrl: "",
    governmentIdUrl: "",
    businessCertificateUrl: "",
  });

  useEffect(() => {
    const loadProfile = async () => {
      const response = await getProfile(token);

      if (response.success) {
        setProfile(response.data.artistProfile);

        setFormData({
          portfolioUrl:
            response.data.artistProfile?.portfolioUrl || "",

          governmentIdUrl:
            response.data.artistProfile?.governmentIdUrl || "",

          businessCertificateUrl:
            response.data.artistProfile?.businessCertificateUrl || "",
        });
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

  const handleUpload = async (file, field) => {

    if (!file) return;

    const loadingToast = toast.loading("Uploading...");

    const response = await uploadImage(
  file,
  field === "governmentIdUrl"
    ? "verification/government-id"
    : "verification/business-certificate"
);

    toast.dismiss(loadingToast);

    if (response.success) {

        toast.success("Upload successful.");

        setFormData((prev) => ({
            ...prev,
            [field]: response.imageUrl,
        }));

    } else {

        toast.error("Upload failed.");

    }

};

  const handleSubmit = async () => {
    if (!formData.portfolioUrl || !formData.governmentIdUrl) {
      toast.error(
        "Please complete all required verification information."
      );
      return;
    }

    setLoading(true);

    const response = await updateArtistProfile(
      token,
      formData
    );

    if (response.success) {
      toast.success("Verification request submitted.");

      const updated = await getProfile(token);

      if (updated.success) {
        setProfile(updated.data.artistProfile);
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
          Verification Center
        </h1>

        <p className="text-gray-500 mt-4">
          Submit your verification documents so collectors can trust your profile.
        </p>

        {/* Status */}

        <div className="bg-white rounded-3xl shadow p-8 mt-10">

          <h2 className="text-2xl font-bold">
            Verification Status
          </h2>

          <div
            className={`mt-6 rounded-2xl p-6 text-center ${
              profile?.verificationStatus === "VERIFIED"
                ? "bg-green-100 text-green-700"
                : profile?.verificationStatus === "REJECTED"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >

            <h3 className="text-2xl font-bold">

              {profile?.verificationStatus === "VERIFIED" &&
                "✔ Verified Artist"}

              {profile?.verificationStatus === "PENDING" &&
                "🟡 Pending Review"}

              {profile?.verificationStatus === "REJECTED" &&
                "❌ Verification Rejected"}

            </h3>

          </div>

          <p className="mt-5 text-gray-500">

            {profile?.verificationStatus === "PENDING" &&
              "Your verification request is currently being reviewed by the Palette administration team."}

            {profile?.verificationStatus === "VERIFIED" &&
              "Congratulations! Your profile is now verified and buyers will see your verified badge across the platform."}

            {profile?.verificationStatus === "REJECTED" &&
              "Your previous submission was rejected. Please review the feedback below, update your information and submit again."}

          </p>

          {profile?.verificationNotes && (

            <div className="mt-6 bg-red-50 border border-red-200 rounded-2xl p-6">

              <h3 className="font-bold text-red-600">
                Admin Feedback
              </h3>

              <p className="mt-3 text-gray-700">
                {profile.verificationNotes}
              </p>

            </div>

          )}

        </div>

        {/* Checklist */}

        <div className="bg-gray-50 rounded-3xl p-8 mt-10">

          <h2 className="text-2xl font-bold">
            Verification Checklist
          </h2>

          <ul className="space-y-4 mt-6">

            <li>
              {formData.portfolioUrl ? "✅" : "⬜"} Portfolio Website
            </li>

            <li>
              {formData.governmentIdUrl ? "✅" : "⬜"} Government ID
            </li>

            <li>
              {formData.businessCertificateUrl ? "✅" : "⬜"} Business Registration (Optional)
            </li>

          </ul>

        </div>

        {/* Form */}

        <div className="space-y-5 mt-10">

          <Input
            disabled={profile?.verificationStatus === "VERIFIED"}
            name="portfolioUrl"
            placeholder="Portfolio Website"
            value={formData.portfolioUrl}
            onChange={handleChange}
          />

          <div>

    <label className="font-semibold block mb-2">
        Government ID *
    </label>

    <input
        disabled={profile?.verificationStatus === "VERIFIED"}
        type="file"
        accept="image/*,.pdf"
        onChange={(e) =>
            handleUpload(
                e.target.files[0],
                "governmentIdUrl"
            )
        }
        className="w-full border rounded-xl p-3"
    />

</div>

{formData.governmentIdUrl && (

<div className="mt-3 flex items-center gap-3">

  <span className="text-green-600 font-medium">
    ✅ Uploaded
  </span>

  <a
    href={formData.governmentIdUrl}
    target="_blank"
    rel="noreferrer"
    className="text-cyan-500 hover:underline"
  >
    View File
  </a>

</div>

)}

          <div>

    <label className="font-semibold block mb-2">
        Business Certificate *
    </label>

    <input
        disabled={profile?.verificationStatus === "VERIFIED"}
        type="file"
        accept="image/*,.pdf"
        onChange={(e) =>
            handleUpload(
                e.target.files[0],
                "businessCertificateUrl"
            )
        }
        className="w-full border rounded-xl p-3"
    />

</div>

{formData.businessCertificateUrl && (

<div className="mt-3 flex items-center gap-3">

  <span className="text-green-600 font-medium">
    ✅ Uploaded
  </span>

  <a
    href={formData.businessCertificateUrl}
    target="_blank"
    rel="noreferrer"
    className="text-cyan-500 hover:underline"
  >
    View File
  </a>

</div>

)}

          <Button
            className="w-full"
            disabled={
              loading ||
              profile?.verificationStatus === "VERIFIED"
            }
            onClick={handleSubmit}
          >

            {profile?.verificationStatus === "VERIFIED"
              ? "Verified"
              : loading
              ? "Submitting..."
              : "Submit Verification"}

          </Button>

        </div>

      </section>
    </PageWrapper>
  );
};

export default Verification;