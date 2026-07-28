import prisma from "../config/prisma.js";

export const createProduct = async (data) => {
  return await prisma.product.create({
    data,
  });
};

export const getProducts = async () => {
  return await prisma.product.findMany({
    include: {
      artist: {
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
};

export const getProductById = async (id) => {
  return await prisma.product.findUnique({
    where: { id },
    include: {
      artist: {
        select: {
          id: true,
          fullName: true,
          profileImage: true,
        },
      },
    },
  });
};

export const updateProduct = async (id, data) => {
  return await prisma.product.update({
    where: { id },
    data,
  });
};

export const deleteProduct = async (id) => {
  return await prisma.product.delete({
    where: { id },
  });
};

export const getArtistDashboardStats = async (artistId) => {
  const totalProducts = await prisma.product.count({
    where: {
      artistId,
    },
  });

  const featuredProducts = await prisma.product.count({
    where: {
      artistId,
      featured: true,
    },
  });

  const products = await prisma.product.findMany({
    where: {
      artistId,
    },
    select: {
      price: true,
      quantity: true,
    },
  });

  const inventoryValue = products.reduce((total, product) => {
    return total + Number(product.price) * product.quantity;
  }, 0);

  return {
    totalProducts,
    featuredProducts,
    inventoryValue,
  };
};

export const getProductsByArtist = async (artistId) => {
  return await prisma.product.findMany({
    where: {
      artistId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};