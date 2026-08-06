import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import toast from "react-hot-toast";

import { useAuth } from "./AuthContext";

import {
  getWishlist,
  addToWishlist,
  removeWishlistItem,
  clearWishlist,
} from "../services/wishlistService";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {

  const { user, isAuthenticated } = useAuth();

  const [wishlist, setWishlist] = useState([]);

  const refreshWishlist = async () => {

    if (!user) {

      setWishlist([]);

      return;

    }

    const response =
      await getWishlist(user.id);

    if (response.success) {

      setWishlist(
        response.data.items || []
      );

    }

  };

  useEffect(() => {

    if (isAuthenticated && user) {

      refreshWishlist();

    } else {

      setWishlist([]);

    }

  }, [user, isAuthenticated]);

  const toggleWishlist = async (
    product
  ) => {

    if (!user) {

      toast.error(
        "Please login first."
      );

      return;

    }

    const existing =
      wishlist.find(

        (item) =>
          item.product.id === product.id

      );

    if (existing) {

      const response =
        await removeWishlistItem(
          existing.id
        );

      if (response.success) {

        toast(
          "Removed from Wishlist 💔"
        );

        refreshWishlist();

      }

    } else {

      const response =
        await addToWishlist({

          userId: user.id,

          productId: product.id,

        });

      if (response.success) {

        toast.success(
          "Added to Wishlist ❤️"
        );

        refreshWishlist();

      } else {

        toast.error(
          response.message
        );

      }

    }

  };

  const clear = async () => {

    if (!user) return;

    const response =
      await clearWishlist(
        user.id
      );

    if (response.success) {

      setWishlist([]);

      toast.success(
        "Wishlist cleared."
      );

    }

  };

  const isWishlisted = (id) => {

    return wishlist.some(

      (item) =>
        item.product.id === id

    );

  };

  const count = useMemo(() => {

    return wishlist.length;

  }, [wishlist]);

  return (

    <WishlistContext.Provider

      value={{

        wishlist,

        toggleWishlist,

        isWishlisted,

        refreshWishlist,

        clear,

        count,

      }}

    >

      {children}

    </WishlistContext.Provider>

  );

};

export const useWishlist = () =>
  useContext(WishlistContext);