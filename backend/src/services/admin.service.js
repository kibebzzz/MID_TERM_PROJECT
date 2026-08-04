import prisma from "../config/prisma.js";

export const getDashboardStats = async () => {

  const totalArtists = await prisma.user.count({
    where: {
      role: "ARTIST",
    },
  });

  const totalBuyers = await prisma.user.count({
    where: {
      role: "BUYER",
    },
  });

  const totalProducts = await prisma.product.count();

  const pendingVerificationRequests =
    await prisma.artistProfile.count({
      where: {
        verificationStatus: "PENDING",
      },
    });

  const recentProducts = await prisma.product.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      artist: true,
    },
  });

  const recentVerificationRequests =
    await prisma.user.findMany({
      where: {
        role: "ARTIST",

        artistProfile: {
          is: {
            verificationStatus: "PENDING",
          },
        },
      },

      take: 5,

      orderBy: {
        createdAt: "desc",
      },

      include: {
        artistProfile: true,
      },
    });

  return {
    totalArtists,
    totalBuyers,
    totalProducts,
    pendingVerificationRequests,
    recentProducts,
    recentVerificationRequests,
  };

};

export const getAllProducts = async () => {

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

export const getAllUsers = async () => {

  return await prisma.user.findMany({

    include: {
      artistProfile: true,
    },

    orderBy: {
      createdAt: "desc",
    },

  });

};

export const updateUserRole = async (
  userId,
  role
) => {

  return await prisma.user.update({

    where: {
      id: userId,
    },

    data: {
      role,
    },

  });

};

export const toggleUserStatus = async (userId) => {

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User not found.");
  }

  return await prisma.user.update({

    where: {
      id: userId,
    },

    data: {
      isActive: !user.isActive,
    },

  });

};

export const getAnalytics = async () => {

  const totalUsers = await prisma.user.count();

  const totalArtists = await prisma.user.count({
    where: {
      role: "ARTIST",
    },
  });

  const totalBuyers = await prisma.user.count({
    where: {
      role: "BUYER",
    },
  });

  const totalProducts = await prisma.product.count();

  const featuredProducts = await prisma.product.count({
    where: {
      featured: true,
    },
  });

  const availableProducts = await prisma.product.count({
    where: {
      isAvailable: true,
    },
  });

  const removedProducts = await prisma.product.count({
    where: {
      isAvailable: false,
    },

  });

  const verifiedArtists = await prisma.artistProfile.count({
    where: {
      verificationStatus: "VERIFIED",
    },
  });

  const pendingRequests = await prisma.artistProfile.count({
    where: {
      verificationStatus: "PENDING",
    },
  });

  return {
    totalUsers,
    totalArtists,
    totalBuyers,
    totalProducts,
    featuredProducts,
    availableProducts,
    removedProducts,
    verifiedArtists,
    pendingRequests,
  };

};