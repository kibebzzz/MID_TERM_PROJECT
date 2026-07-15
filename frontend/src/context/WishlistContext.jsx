import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (product) => {
    const exists = wishlist.find((item) => item.id === product.id);

    if (exists) {
      setWishlist(
        wishlist.filter((item) => item.id !== product.id)
      );

      toast("Removed from Wishlist 💔");
    } else {
      setWishlist([
        ...wishlist,
        product,
      ]);

      toast.success("Added to Wishlist ❤️");
    }
  };

  const isWishlisted = (id) => {
    return wishlist.some((item) => item.id === id);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isWishlisted,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);