import prisma from "../config/prisma.js";

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
  return await prisma.artistProfile.update({
    where: {
      userId,
    },

    data: {
      verificationStatus,
      verificationNotes,
      verified: verificationStatus === "VERIFIED",
    },
  });
};