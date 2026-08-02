import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import SectionHeader from "../common/SectionHeader";
import { getArtists } from "../../services/userService";

const FeaturedArtists = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const loadArtists = async () => {
      const response = await getArtists();

      if (response.success) {
        setArtists(response.data.slice(0, 4));
      }
    };

    loadArtists();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-8 py-24">

      <SectionHeader
        title="Featured Creators"
        subtitle="Meet talented creatives shaping the future of music, art, photography, fashion and digital design."
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

        {artists.map((artist) => (

          <Link
            key={artist.id}
            to={`/artists/${artist.id}`}
          >

            <div className="group rounded-3xl overflow-hidden bg-white shadow hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">

              <img
                src={
                  artist.profileImage ||
                  "https://placehold.co/600x600?text=Artist"
                }
                alt={artist.fullName}
                className="w-full h-80 object-cover group-hover:scale-105 transition duration-700"
              />

              <div className="p-6">

                <div className="flex items-center justify-between">

                  <h3 className="text-2xl font-semibold group-hover:text-cyan-500">
                    {artist.fullName}
                  </h3>

                  {artist.artistProfile?.verified && (
                    <span className="text-cyan-500 text-sm">
                      ✔ Verified
                    </span>
                  )}

                </div>

                <p className="text-gray-500 mt-3">
                  {artist.artistProfile?.specialty || "Creative Artist"}
                </p>

                <button className="mt-6 text-cyan-500 font-semibold">
                  View Profile →
                </button>

              </div>

            </div>

          </Link>

        ))}

      </div>

    </section>
  );
};

export default FeaturedArtists;