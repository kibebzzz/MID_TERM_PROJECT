import prisma from "../config/prisma.js";

export const checkout = async (userId) => {

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

  await prisma.cartItem.deleteMany({
    where: {
      cartId: cart.id,
    },
  });

  return order;
};

export const getUserOrders = async (userId) => {
  return await prisma.order.findMany({
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
    orderBy: {
      createdAt: "desc",
    },
  });
};