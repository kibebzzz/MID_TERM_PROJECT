import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import PageWrapper from "../../components/common/PageWrapper";
import Button from "../../components/ui/Button";
import { Link } from "react-router-dom";
import {
  getVerificationRequests,
} from "../../services/adminService";

const VerificationRequests = () => {

  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {

    const response = await getVerificationRequests(token);

    if (response.success) {
      setRequests(response.data);
    } else {
      toast.error(response.message);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <PageWrapper>
        <section className="max-w-7xl mx-auto py-20">
          <h1 className="text-4xl font-black">
            Loading Verification Requests...
          </h1>
        </section>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>

      <section className="max-w-7xl mx-auto py-20 px-8">

        <h1 className="text-5xl font-black">
          Verification Requests
        </h1>

        <p className="text-gray-500 mt-4">
          Review artist verification submissions.
        </p>

        <div className="bg-white rounded-3xl shadow mt-10 overflow-hidden">

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="text-left p-5">
                  Artist
                </th>

                <th className="text-left">
                  Status
                </th>

                <th className="text-left">
                  Portfolio
                </th>

                <th className="text-left">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {requests.map((artist) => (

                <tr
                  key={artist.id}
                  className="border-t"
                >

                  <td className="p-5">

                    <div className="flex items-center gap-4">

                      <img
                        src={
                          artist.profileImage ||
                          "https://placehold.co/60x60"
                        }
                        alt={artist.fullName}
                        className="w-14 h-14 rounded-full object-cover"
                      />

                      <div>

                        <h3 className="font-bold">
                          {artist.fullName}
                        </h3>

                        <p className="text-gray-500 text-sm">
                          {artist.email}
                        </p>

                      </div>

                    </div>

                  </td>

                  <td>

                    <span
                      className={`px-3 py-2 rounded-full text-sm font-semibold ${
                        artist.artistProfile?.verificationStatus === "VERIFIED"
                          ? "bg-green-100 text-green-700"
                          : artist.artistProfile?.verificationStatus === "REJECTED"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >

                      {artist.artistProfile?.verificationStatus}

                    </span>

                  </td>

                  <td>

                    {artist.artistProfile?.portfolioUrl ? (

                      <a
                        href={artist.artistProfile.portfolioUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-cyan-500 hover:underline"
                      >
                        View Portfolio
                      </a>

                    ) : (

                      <span className="text-gray-400">
                        None
                      </span>

                    )}

                  </td>

                  <td>

                    <Link
  to={`/admin/verification/${artist.id}`}
>
  <button className="bg-cyan-500 text-white px-5 py-2 rounded-xl hover:bg-cyan-600 transition">
    Review
  </button>
</Link>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </section>

    </PageWrapper>
  );
};

export default VerificationRequests;