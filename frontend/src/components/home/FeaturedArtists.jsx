import { Link } from "react-router-dom";

import artists from "../../data/artists";
import SectionHeader from "../common/SectionHeader";

const FeaturedArtists = () => {
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
                src={artist.avatar}
                alt={artist.name}
                className="w-full h-80 object-cover group-hover:scale-105 transition duration-700"
              />

              <div className="p-6">

                <div className="flex items-center justify-between">

                  <h3 className="text-2xl font-semibold group-hover:text-cyan-500 transition-colors">

                    {artist.name}

                  </h3>

                  {artist.verified && (

                    <span className="text-cyan-500 text-sm font-medium">

                      ✔ Verified

                    </span>

                  )}

                </div>

                <p className="text-gray-500 mt-3">

                  {artist.specialty}

                </p>

                <p className="mt-2 text-yellow-500 font-medium">

                  ⭐ {artist.rating}

                </p>

                <button className="mt-6 text-cyan-500 font-semibold group-hover:translate-x-2 transition-transform">

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