import prisma from "../config/prisma.js";

export const createReview = async (data) => {

  const purchased = await prisma.orderItem.findFirst({

    where: {

      productId: data.productId,

      order: {

        userId: data.buyerId,

        status: "PAID",

      },

    },

  });

  if (!purchased) {

    throw new Error(
      "You can only review products you have purchased."
    );

  }

  const existingReview =
    await prisma.review.findFirst({

      where: {

        buyerId: data.buyerId,

        productId: data.productId,

      },

    });

  if (existingReview) {

    throw new Error(
      "You have already reviewed this product."
    );

  }

  return await prisma.review.create({

    data: {

      buyerId: data.buyerId,

      productId: data.productId,

      rating: data.rating,

      comment: data.comment,

    },

    include: {

      buyer: {

        select: {

          id: true,

          fullName: true,

          profileImage: true,

        },

      },

      product: true,

    },

  });

};

export const getProductReviews = async (productId) => {

  const reviews = await prisma.review.findMany({

    where: {

      productId,

    },

    include: {

      buyer: {

        select: {

          id: true,

          fullName: true,

          profileImage: true,

        },

      },

    },

    orderBy: {

      createdAt: "desc",

    },

  });

  return reviews.map((review) => ({

    ...review,

    verifiedPurchase: true,

  }));

};

export const updateReview = async (
  reviewId,
  buyerId,
  data
) => {

  const review = await prisma.review.findUnique({

    where: {
      id: reviewId,
    },

  });

  if (!review) {
    throw new Error("Review not found.");
  }

  if (review.buyerId !== buyerId) {
    throw new Error("Unauthorized.");
  }

  return await prisma.review.update({

    where: {
      id: reviewId,
    },

    data: {

      rating: data.rating,

      comment: data.comment,

    },

  });

};

export const deleteReview = async (
  reviewId,
  buyerId
) => {

  const review = await prisma.review.findUnique({

    where: {
      id: reviewId,
    },

  });

  if (!review) {
    throw new Error("Review not found.");
  }

  if (review.buyerId !== buyerId) {
    throw new Error("Unauthorized.");
  }

  await prisma.review.delete({

    where: {
      id: reviewId,
    },

  });

};