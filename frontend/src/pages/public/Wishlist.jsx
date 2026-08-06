import { useWishlist } from "../../context/WishlistContext";
import ProductCard from "../../components/marketplace/ProductCard";

const Wishlist = () => {

    const { wishlist } = useWishlist();

    return (

        <section className="max-w-7xl mx-auto px-8 py-20">

            {wishlist.length === 0 ? (

<div className="text-center py-24">

<h2 className="text-4xl font-bold">

Your Wishlist is Empty ❤️

</h2>

<p className="text-gray-500 mt-4">

Save creative works you love.

</p>

</div>

) : (

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">

{wishlist.map((item) => (

<ProductCard
    key={item.product.id}
    product={item.product}
/>

))}

</div>

)}

        </section>

    );

};

export default Wishlist;