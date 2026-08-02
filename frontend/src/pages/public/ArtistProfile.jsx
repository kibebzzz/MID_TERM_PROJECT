import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PageWrapper from "../../components/common/PageWrapper";
import ProductCard from "../../components/marketplace/ProductCard";

import { getArtistById } from "../../services/userService";

const ArtistProfile = () => {
  const { id } = useParams();

  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArtist = async () => {
      const response = await getArtistById(id);

      if (response.success) {
        setArtist(response.data);
      }

      setLoading(false);
    };

    loadArtist();
  }, [id]);

  if (loading) {
    return (
      <PageWrapper>
        <section className="max-w-7xl mx-auto px-8 py-20 text-center">
          <h1 className="text-4xl font-bold">
            Loading Artist...
          </h1>
        </section>
      </PageWrapper>
    );
  }

  if (!artist) {
    return (
      <PageWrapper>
        <section className="max-w-7xl mx-auto px-8 py-20 text-center">
          <h1 className="text-4xl font-bold">
            Artist Not Found
          </h1>
        </section>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>

      <section className="max-w-7xl mx-auto px-8 py-20">

        {/* Cover Image */}

        {artist.artistProfile?.coverImage && (
          <img
            src={artist.artistProfile.coverImage}
            alt="Cover"
            className="w-full h-80 rounded-3xl object-cover mb-10"
          />
        )}

        {/* Artist Header */}

        <div className="flex flex-col md:flex-row items-center md:items-start gap-10">

          <img
            src={
              artist.profileImage ||
              "https://placehold.co/300x300?text=Artist"
            }
            alt={artist.fullName}
            className="w-40 h-40 rounded-full object-cover shadow-xl"
          />

          <div className="flex-1">

            <h1 className="text-5xl font-black">
              {artist.fullName}
            </h1>

            <p className="text-gray-500 mt-3">
              {artist.artistProfile?.specialty || "Creative Artist"}
            </p>

            <div className="flex flex-wrap items-center gap-5 mt-5">

              {artist.artistProfile?.verified && (
                <span className="text-cyan-500 font-semibold">
                  ✔ Verified Creator
                </span>
              )}

              {artist.artistProfile?.location && (
                <span className="text-gray-500">
                  📍 {artist.artistProfile.location}
                </span>
              )}

            </div>

            <p className="mt-8 max-w-3xl leading-8 text-gray-600">
              {artist.artistProfile?.bio || "This artist hasn't added a bio yet."}
            </p>

            {/* Social Links */}

            <div className="flex gap-6 mt-8">

              {artist.artistProfile?.website && (
                <a
                  href={artist.artistProfile.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-500 hover:underline"
                >
                  Website
                </a>
              )}

              {artist.artistProfile?.instagram && (
                <a
                  href={artist.artistProfile.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-500 hover:underline"
                >
                  Instagram
                </a>
              )}

              {artist.artistProfile?.facebook && (
                <a
                  href={artist.artistProfile.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-500 hover:underline"
                >
                  Facebook
                </a>
              )}

            </div>

          </div>

        </div>

        {/* Products */}

        <div className="mt-20">

          <h2 className="text-3xl font-bold">
            Creative Works
          </h2>

          {artist.products.length === 0 ? (

            <div className="text-center py-16">

              <p className="text-gray-500">
                This artist hasn't uploaded any products yet.
              </p>

            </div>

          ) : (

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">

              {artist.products.map((product) => (

                <ProductCard
                  key={product.id}
                  product={product}
                />

              ))}

            </div>

          )}

        </div>

      </section>

    </PageWrapper>
  );
};

export default ArtistProfile;