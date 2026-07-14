import artists from "../../data/artists";

const FeaturedArtists = () => {
  return (
    <section className="max-w-7xl mx-auto px-8 py-24">

      <h2 className="text-4xl font-bold mb-12">
        Featured Artists
      </h2>

      <div className="grid md:grid-cols-3 gap-8">

        {artists.map((artist) => (

          <div
  key={artist.id}
  className="group rounded-3xl overflow-hidden bg-white shadow hover:shadow-2xl transition-all duration-500"
>

  <img
    src={`https://i.pravatar.cc/500?img=${artist.id + 20}`}
    alt={artist.name}
    className="w-full h-80 object-cover group-hover:scale-105 transition duration-700"
  />

  <div className="p-6">

    <div className="flex items-center justify-between">

      <h3 className="text-2xl font-semibold">

        {artist.name}

      </h3>

      <span className="text-cyan-500 text-sm">

        ✔ Verified

      </span>

    </div>

    <p className="text-gray-500 mt-2">

      {artist.specialty}

    </p>

    <button className="mt-6 text-cyan-500 font-semibold">

      View Portfolio →

    </button>

  </div>

</div>

        ))}

      </div>

    </section>
  );
};

export default FeaturedArtists;