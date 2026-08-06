import prisma from "../config/prisma.js";
import { cleanupUnavailableProduct }
from "./productCleanup.service.js";
import { createNotification }
from "./notification.service.js";

export const createOrder = async (userId) => {

  const cart = await prisma.cart.findUnique({
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

  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty.");
  }

const existingPendingOrder =
  await prisma.order.findFirst({

    where: {

      userId,

      status: "PENDING",

    },

  });

if (existingPendingOrder) {

  throw new Error(
    "You already have a pending order. Please complete or cancel it first."
  );

}


for (const item of cart.items) {

  if (!item.product.isAvailable) {

    throw new Error(
      `${item.product.title} is no longer available.`
    );

  }

  if (

    item.product.quantity <
    item.quantity

  ) {

    throw new Error(
      `${item.product.title} is out of stock.`
    );

  }

}

  const totalAmount = cart.items.reduce(
    (sum, item) =>
      sum + item.quantity * Number(item.product.price),
    0
  );

  const order = await prisma.order.create({
    data: {
      userId,
      totalAmount,

      items: {
        create: cart.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: Number(item.product.price),
        })),
      },
    },

    include: {
      items: true,
    },
  });

  return order;
};

export const getUserOrders = async (userId) => {

  const orders = await prisma.order.findMany({

    where: {
      userId,
    },

    include: {

      items: {

        include: {

          product: {

            include: {

              reviews: {

                where: {
                  buyerId: userId,
                },

              },

            },

          },

        },

      },

    },

    orderBy: {
      createdAt: "desc",
    },

  });

  return orders.map((order) => ({

    ...order,

    items: order.items.map((item) => ({

      ...item,

      review: item.product.reviews.length > 0,

    })),

  }));

};


export const completePayment = async (
  orderId,
  shipping
) => {

  return await prisma.$transaction(

    async (tx) => {

      const order =
        await tx.order.findUnique({

          where: {
            id: orderId,
          },

          include: {

            items: {

              include: {
                product: true,
              },

            },

          },

        });

      if (!order) {
        throw new Error("Order not found.");
      }

      if (order.status !== "PENDING") {

        throw new Error(
          "This order has already been processed."
        );

      }

      const soldOutProducts = [];

      // Validate inventory

      for (const item of order.items) {

        if (!item.product.isAvailable) {

          throw new Error(
            `${item.product.title} is no longer available.`
          );

        }

        if (
          item.product.quantity <
          item.quantity
        ) {

          throw new Error(
            `${item.product.title} is out of stock.`
          );

        }

      }

      // Reduce inventory

      for (const item of order.items) {

        const remaining =
          item.product.quantity -
          item.quantity;

        await tx.product.update({

          where: {
            id: item.productId,
          },

          data: {

            quantity: remaining,

            isAvailable:
              remaining > 0,

          },

        });

        if (remaining === 0) {

          soldOutProducts.push(
            item.productId
          );

        }

      }

      const notifiedArtists = new Set();

for (const item of order.items) {

  if (
    notifiedArtists.has(
      item.product.artistId
    )
  ) continue;

  await createNotification({

    userId: item.product.artistId,

    title: "New Order Received",

    message: `You have received a new order containing "${item.product.title}".`,

    type: "ORDER",

    link: "/artist/orders",

  });

  notifiedArtists.add(
    item.product.artistId
  );

}

      // Cleanup sold-out products

      for (const productId of soldOutProducts) {

        await cleanupUnavailableProduct(
          tx,
          productId
        );

      }

      // Clear buyer cart

      await tx.cartItem.deleteMany({

        where: {

          cart: {

            userId:
              order.userId,

          },

        },

      });

      // Update order

      return await tx.order.update({

        where: {
          id: orderId,
        },

        data: {

  shippingName: shipping.shippingName,

  shippingEmail: shipping.shippingEmail,

  shippingPhone: shipping.shippingPhone,

  shippingAddress: shipping.shippingAddress,

  shippingCity: shipping.shippingCity,

  shippingCountry: shipping.shippingCountry,

  paymentMethod: shipping.paymentMethod,

  paymentReference: shipping.paymentReference,

  paidAt: new Date(),

  status: "PAID",

},

      include: {

  items: {

    include: {

     product: {

  select: {

    id: true,

    title: true,

    artistId: true,

    quantity: true,

    isAvailable: true,

  },

},

    },

  },

},

      });

    },

    {

      timeout: 15000,

    }

  );

};



export const getOrderById = async (orderId) => {

  return await prisma.order.findUnique({

    where: {
      id: orderId,
    },

    include: {

      user: true,

      items: {

        include: {
          product: true,
        },

      },

    },

  });

};

export const deletePendingOrder = async (
  orderId,
  userId
) => {

  const order =
    await prisma.order.findUnique({

      where: {
        id: orderId,
      },

    });

  if (!order) {

    throw new Error("Order not found.");

  }

  if (order.userId !== userId) {

    throw new Error("Unauthorized.");

  }

  if (order.status !== "PENDING") {

    throw new Error(
      "Only pending orders can be deleted."
    );

  }

  await prisma.order.delete({

    where: {
      id: orderId,
    },

  });

};