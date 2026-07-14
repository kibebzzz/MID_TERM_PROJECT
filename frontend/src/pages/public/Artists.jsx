import { Link } from "react-router-dom";

import artists from "../../data/artists";

const Artists = () => {
  return (
    <section className="max-w-7xl mx-auto px-8 py-20">

      <div className="mb-12">

        <p className="uppercase tracking-[0.3em] text-cyan-500 font-semibold">
          Palette
        </p>

        <h1 className="text-5xl font-black mt-3">
          Featured Creators
        </h1>

        <p className="text-gray-500 mt-5 max-w-2xl">
          Discover talented painters, musicians, photographers,
          fashion designers and digital creators on Palette.
        </p>

      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

        {artists.map((artist) => (

          <Link
            key={artist.id}
            to={`/artists/${artist.id}`}
          >

            <div className="bg-white rounded-3xl shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 p-6 text-center">

              <img
                src={artist.avatar}
                alt={artist.name}
                className="w-28 h-28 rounded-full mx-auto object-cover"
              />

              <h2 className="text-2xl font-bold mt-6">
                {artist.name}
              </h2>

              <p className="text-gray-500 mt-2">
                {artist.specialty}
              </p>

              <div className="flex justify-center gap-3 mt-4">

                <span className="text-yellow-500">
                  ⭐ {artist.rating}
                </span>

                {artist.verified && (
                  <span className="text-cyan-500">
                    ✔ Verified
                  </span>
                )}

              </div>

            </div>

          </Link>

        ))}

      </div>

    </section>
  );
};

export default Artists;