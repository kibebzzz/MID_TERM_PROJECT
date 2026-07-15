import { useParams } from "react-router-dom";
import PageWrapper from "../../components/common/PageWrapper";
import artists from "../../data/artists";
import products from "../../data/products";
import ProductCard from "../../components/marketplace/ProductCard";

const ArtistProfile = () => {
  const { id } = useParams();

  const artist = artists.find(
    (item) => item.id === Number(id)
  );

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

  const artistWorks = products.filter(
    (product) => product.artist === artist.name
  );

  return (

    <PageWrapper>
    <section className="max-w-7xl mx-auto px-8 py-20">

      {/* Header */}

      <div className="flex flex-col md:flex-row items-center md:items-start gap-10">

        <img
          src={artist.avatar}
          alt={artist.name}
          className="w-40 h-40 rounded-full object-cover shadow-xl"
        />

        <div>

          <h1 className="text-5xl font-black">
            {artist.name}
          </h1>

          <p className="text-gray-500 mt-3">
            {artist.specialty}
          </p>

          <div className="flex items-center gap-5 mt-4">

            <span className="text-yellow-500 font-semibold">
              ⭐ {artist.rating}
            </span>

            {artist.verified && (
              <span className="text-cyan-500 font-semibold">
                ✔ Verified Creator
              </span>
            )}

          </div>

          <p className="mt-8 max-w-3xl leading-8 text-gray-600">
            {artist.bio}
          </p>

        </div>

      </div>

      {/* Creative Works */}

      <div className="mt-20">

        <h2 className="text-3xl font-bold">
          Creative Works
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">

          {artistWorks.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}

        </div>

      </div>

    </section>

    </PageWrapper>
  );
};

export default ArtistProfile;