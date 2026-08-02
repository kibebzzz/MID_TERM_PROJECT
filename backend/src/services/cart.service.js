import prisma from "../config/prisma.js";

export const getOrCreateCart = async (userId) => {
  let cart = await prisma.cart.findUnique({
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

  if (!cart) {
    cart = await prisma.cart.create({
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

  return cart;
};

export const addToCart = async (
  userId,
  productId,
  quantity = 1
) => {
  const cart = await getOrCreateCart(userId);

  const existingItem = await prisma.cartItem.findFirst({
    where: {
      cartId: cart.id,
      productId,
    },
  });

  if (existingItem) {
    return await prisma.cartItem.update({
      where: {
        id: existingItem.id,
      },
      data: {
        quantity: {
          increment: quantity,
        },
      },
    });
  }

  return await prisma.cartItem.create({
    data: {
      cartId: cart.id,
      productId,
      quantity,
    },
  });
};

export const getCart = async (userId) => {
  const cart = await getOrCreateCart(userId);

  return await prisma.cart.findUnique({
    where: {
      id: cart.id,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
};

export const removeCartItem = async (cartItemId) => {
  return await prisma.cartItem.delete({
    where: {
      id: cartItemId,
    },
  });
};

export const updateCartQuantity = async (
  cartItemId,
  quantity
) => {
  return await prisma.cartItem.update({
    where: {
      id: cartItemId,
    },
    data: {
      quantity,
    },
  });
};


export const clearCart = async (userId) => {
  const cart = await prisma.cart.findUnique({
    where: {
      userId,
    },
  });

  if (!cart) return;

  await prisma.cartItem.deleteMany({
    where: {
      cartId: cart.id,
    },
  });

  return true;
};