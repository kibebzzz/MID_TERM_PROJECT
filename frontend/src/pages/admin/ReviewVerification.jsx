import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getArtistById,
  reviewVerification,
} from "../../services/adminService";

const ReviewVerification = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [artist, setArtist] = useState(null);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArtist();
  }, []);

  const loadArtist = async () => {
    const response = await getArtistById(id, token);

    if (response.success) {
      setArtist(response.data);
      setNotes(
        response.data.artistProfile?.verificationNotes || ""
      );
    } else {
      toast.error(response.message);
    }

    setLoading(false);
  };

  const updateStatus = async (status) => {

    const response = await reviewVerification(
      id,
      status,
      notes,
      token
    );

    if (response.success) {
      toast.success("Verification updated.");
      navigate("/admin/verification");
    } else {
      toast.error(response.message);
    }

  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <section className="max-w-5xl">

      <h1 className="text-5xl font-black">
        Review Verification
      </h1>

      <div className="bg-white rounded-3xl shadow p-8 mt-10">

        <div className="flex gap-8">

          <img
            src={
              artist.profileImage ||
              "https://placehold.co/150"
            }
            alt={artist.fullName}
            className="w-40 h-40 rounded-full object-cover"
          />

          <div>

            <h2 className="text-3xl font-bold">
              {artist.fullName}
            </h2>

            <p className="text-gray-500 mt-2">
              {artist.email}
            </p>

            <p className="mt-5">
              {artist.artistProfile?.bio}
            </p>

          </div>

        </div>

        <div className="mt-10 space-y-4">

          <a
            href={artist.artistProfile?.portfolioUrl}
            target="_blank"
            rel="noreferrer"
            className="block text-cyan-500"
          >
            🌐 Portfolio
          </a>

          <a
            href={artist.artistProfile?.governmentIdUrl}
            target="_blank"
            rel="noreferrer"
            className="block text-cyan-500"
          >
            🪪 Government ID
          </a>

          <a
            href={artist.artistProfile?.businessCertificateUrl}
            target="_blank"
            rel="noreferrer"
            className="block text-cyan-500"
          >
            📄 Business Certificate
          </a>

        </div>

        <textarea
          className="w-full border rounded-2xl p-4 mt-10"
          rows={5}
          placeholder="Feedback..."
          value={notes}
          onChange={(e) =>
            setNotes(e.target.value)
          }
        />

        <div className="flex gap-5 mt-8">

          <button
            onClick={() =>
              updateStatus("VERIFIED")
            }
            className="bg-green-600 text-white px-8 py-3 rounded-xl"
          >
            Approve
          </button>

          <button
            onClick={() =>
              updateStatus("REJECTED")
            }
            className="bg-red-600 text-white px-8 py-3 rounded-xl"
          >
            Reject
          </button>

        </div>

      </div>

    </section>
  );
};

export default ReviewVerification;