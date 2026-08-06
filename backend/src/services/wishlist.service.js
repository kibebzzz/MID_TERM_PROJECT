import prisma from "../config/prisma.js";

export const getWishlist = async (userId) => {

  let wishlist = await prisma.wishlist.findUnique({

    where: {
      userId,
    },

    include: {

      items: {

        include: {
          product: true,
        },

      },

    },

  });

  if (!wishlist) {

    wishlist = await prisma.wishlist.create({

      data: {
        userId,
      },

      include: {

        items: {

          include: {
            product: true,
          },

        },

      },

    });

  }

  return wishlist;

};

export const addToWishlist = async (
  userId,
  productId
) => {

  let wishlist = await prisma.wishlist.findUnique({

    where: {
      userId,
    },

  });

  if (!wishlist) {

    wishlist = await prisma.wishlist.create({

      data: {
        userId,
      },

    });

  }

  const existing =
    await prisma.wishlistItem.findFirst({

      where: {

        wishlistId: wishlist.id,

        productId,

      },

    });

  if (existing) {

    throw new Error(
      "Product already exists in wishlist."
    );

  }

  return await prisma.wishlistItem.create({

    data: {

      wishlistId: wishlist.id,

      productId,

    },

  });

};

export const removeWishlistItem = async (
  wishlistItemId
) => {

  return await prisma.wishlistItem.delete({

    where: {
      id: wishlistItemId,
    },

  });

};

export const clearWishlist = async (
  userId
) => {

  const wishlist =
    await prisma.wishlist.findUnique({

      where: {
        userId,
      },

    });

  if (!wishlist) return;

  await prisma.wishlistItem.deleteMany({

    where: {

      wishlistId: wishlist.id,

    },

  });

};