import prisma from "../config/prisma.js";
import { createNotification } from "./notification.service.js";



export const getLoggedInUser = async (id) => {
  return prisma.user.findUnique({
    where: { id },
    include: {
      artistProfile: true,
    },
  });
};

export const getAllArtists = async () => {
  return prisma.user.findMany({
    where: {
      role: "ARTIST",
    },
    include: {
      artistProfile: true,
    },
    orderBy: {
      fullName: "asc",
    },
  });
};

export const getArtistById = async (id) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },

    include: {
      artistProfile: true,

      products: {
  where: {
    isAvailable: true,
  },

  include: {
    artist: {
      include: {
        artistProfile: true,
      },
    },
  },

  orderBy: {
    createdAt: "desc",
  },
},
    },
  });
};

export const updateProfile = async (userId, data) => {

  const {
    profileImage,
    ...artistProfile
  } = data;

  return await prisma.$transaction(async (tx) => {

    if (profileImage) {

      await tx.user.update({
        where: {
          id: userId,
        },
        data: {
          profileImage,
        },
      });

    }

    await tx.artistProfile.upsert({

      where: {
        userId,
      },

      update: {

  ...artistProfile,

  verificationStatus: "PENDING",

  verificationNotes: null,

  verified: false,

},

create: {

  userId,

  ...artistProfile,

  verificationStatus: "PENDING",

  verificationNotes: null,

  verified: false,

},

    });

    return await tx.user.findUnique({

      where: {
        id: userId,
      },

      include: {
        artistProfile: true,
      },

    });

  });

};



export const getVerificationRequests = async () => {

  return await prisma.user.findMany({

    where: {
      role: "ARTIST",

      artistProfile: {
        is: {
          verificationStatus: {
            in: ["PENDING", "REJECTED"],
          },
        },
      },
    },

    include: {
      artistProfile: true,
    },

    orderBy: {
      createdAt: "desc",
    },

  });

};

export const reviewVerification = async (
  userId,
  verificationStatus,
  verificationNotes
) => {

  const artist = await prisma.artistProfile.update({

    where: {
      userId,
    },

    data: {

      verificationStatus,

      verificationNotes,

      verified:
        verificationStatus === "VERIFIED",

    },

  });

  await createNotification({

    userId,

    title:
      verificationStatus === "VERIFIED"
        ? "Verification Approved"
        : "Verification Rejected",

    message:
      verificationStatus === "VERIFIED"
        ? "Congratulations! Your artist account has been verified."
        : "Your verification request was not approved. Please review the feedback and submit again.",

    type: "VERIFICATION",

    link: "/artist/profile",

  });

  return artist;

};

export const getArtistOrders = async (artistId) => {

  const orders = await prisma.order.findMany({

    where: {

      status: "PAID",

      items: {

        some: {

          product: {

            artistId,

          },

        },

      },

    },

    include: {

      user: {

        select: {

          id: true,

          fullName: true,

          email: true,

        },

      },

      items: {

        where: {

          product: {

            artistId,

          },

        },

        include: {

          product: true,

        },

      },

    },

    orderBy: {

      paidAt: "desc",

    },

  });

  const totalRevenue = orders.reduce(

    (sum, order) =>

      sum +

      order.items.reduce(

        (subtotal, item) =>

          subtotal +

          item.price * item.quantity,

        0

      ),

    0

  );

  const totalProductsSold = orders.reduce(

    (sum, order) =>

      sum +

      order.items.reduce(

        (subtotal, item) =>

          subtotal + item.quantity,

        0

      ),

    0

  );

  return {

    totalOrders: orders.length,

    totalRevenue,

    totalProductsSold,

    averageOrderValue:

      orders.length === 0

        ? 0

        : totalRevenue / orders.length,

    orders,

  };

};