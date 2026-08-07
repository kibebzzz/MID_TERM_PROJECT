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

  reviews: {

    select: {

      rating: true,

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

  reviews: {

    include: {

      buyer: {

        select: {

          fullName: true,

          profileImage: true,

        },

      },

    },

  },

},
  });
};

export const deleteProduct = async (id) => {

  return await prisma.$transaction(async (tx) => {

    const product = await tx.product.findUnique({

      where: {
        id,
      },

    });

    if (!product) {

      throw new Error("Product not found.");

    }

    const updatedProduct =
      await tx.product.update({

        where: {
          id,
        },

        data: {

          isAvailable: false,

        },

      });

    await cleanupUnavailableProduct(
      tx,
      id
    );

    return updatedProduct;

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
    isAvailable: true,
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

const availableProducts = products.filter(
  (product) => product.isAvailable
);

const inventoryValue = availableProducts.reduce(
  (total, product) =>
    total +
    Number(product.price) * product.quantity,
  0
);

const soldProducts = await prisma.orderItem.findMany({
  where: {
    order: {
      status: "PAID",
    },
    product: {
      artistId,
    },
  },
});

const revenue = soldProducts.reduce(
  (total, item) =>
    total + item.price * item.quantity,
  0
);

const productsSold = soldProducts.reduce(
  (total, item) =>
    total + item.quantity,
  0
);

return {
  totalProducts,
  featuredProducts,
  inventoryValue,
  revenue,
  productsSold,
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

