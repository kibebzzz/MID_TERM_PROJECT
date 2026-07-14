import { useWishlist } from "../../context/WishlistContext";
import ProductCard from "../../components/marketplace/ProductCard";

const Wishlist = () => {

    const { wishlist } = useWishlist();

    return (

        <section className="max-w-7xl mx-auto px-8 py-20">

            <h1 className="text-5xl font-black">

                My Wishlist

            </h1>

            <p className="text-gray-500 mt-4">

                Your saved creative works.

            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">

                {wishlist.map((product) => (

                    <ProductCard
                        key={product.id}
                        product={product}
                    />

                ))}

            </div>

        </section>

    );

};

export default Wishlist;