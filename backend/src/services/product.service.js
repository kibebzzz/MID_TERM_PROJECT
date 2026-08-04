import prisma from "../config/prisma.js";
import { cleanupUnavailableProduct }
from "./productCleanup.service.js";

export const createProduct = async (data) => {
  return await prisma.product.create({
    data,
  });
};

export const getProducts = async () => {
  return await prisma.product.findMany({

  where: {
    isAvailable: true,
  },

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
    where: {
      id,
      isAvailable: true,
    },
    include: {
      artist: {
        include: {
          artistProfile: true,
        },
      },
    },
  });
};

export const deleteProduct = async (id) => {

  const product = await prisma.product.findUnique({

    where: {
      id,
    },

  });

  if (!product) {
    throw new Error("Product not found.");
  }

  const updatedProduct =
    await prisma.product.update({

      where: {
        id,
      },

      data: {
        isAvailable: false,
      },

    });

  await cleanupUnavailableProduct(id);

  return updatedProduct;

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
    orderBy: {
      createdAt: "desc",
    },
  });

  const inventoryValue = products.reduce((total, product) => {
    return total + Number(product.price) * product.quantity;
  }, 0);

  return {
    totalProducts,
    featuredProducts,
    inventoryValue,
    products,
  };
};

export const getProductsByArtist = async (artistId) => {
  return await prisma.product.findMany({
    where: {
  artistId,
  isAvailable: true,
},
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const updateProduct = async (id, data) => {
  return await prisma.product.update({
    where: {
      id,
    },
    data,
  });
};

export const toggleFeaturedProduct = async (id) => {

  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (!product) {
    throw new Error("Product not found.");
  }

  return await prisma.product.update({
    where: {
      id,
    },
    data: {
      featured: !product.featured,
    },
  });

};

