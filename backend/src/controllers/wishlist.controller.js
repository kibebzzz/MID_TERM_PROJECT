import {

  getWishlist,
  addToWishlist,
  removeWishlistItem,
  clearWishlist,

} from "../services/wishlist.service.js";

export const getUserWishlist = async (
  req,
  res
) => {

  try {

    const wishlist =
      await getWishlist(
        req.params.userId
      );

    res.json({

      success: true,

      data: wishlist,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

export const addItem = async (
  req,
  res
) => {

  try {

    await addToWishlist(

      req.body.userId,

      req.body.productId

    );

    res.json({

      success: true,

      message:
        "Added to wishlist.",

    });

  } catch (error) {

    res.status(400).json({

      success: false,

      message: error.message,

    });

  }

};

export const removeItem = async (
  req,
  res
) => {

  try {

    await removeWishlistItem(
      req.params.id
    );

    res.json({

      success: true,

    });

  } catch (error) {

    res.status(400).json({

      success: false,

      message: error.message,

    });

  }

};

export const clear = async (
  req,
  res
) => {

  try {

    await clearWishlist(
      req.params.userId
    );

    res.json({

      success: true,

    });

  } catch (error) {

    res.status(400).json({

      success: false,

      message: error.message,

    });

  }

};