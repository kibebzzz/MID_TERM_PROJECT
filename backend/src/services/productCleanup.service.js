import prisma from "../config/prisma.js";

export const cleanupUnavailableProduct = async (
  tx,
  productId
) => {

  // Remove from every cart

  await tx.cartItem.deleteMany({

    where: {
      productId,
    },

  });

  // Cancel pending orders containing this product

  const pendingOrders =
    await tx.order.findMany({

      where: {

        status: "PENDING",

        items: {

          some: {
            productId,
          },

        },

      },

      select: {
        id: true,
      },

    });

  if (pendingOrders.length > 0) {

    await tx.order.updateMany({

      where: {

        id: {

          in: pendingOrders.map(
            (o) => o.id
          ),

        },

      },

      data: {

        status: "CANCELLED",

      },

    });

  }

};