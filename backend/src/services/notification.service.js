import prisma from "../config/prisma.js";

export const createNotification = async ({

  userId,

  title,

  message,

  type,

  link = null,

}) => {

  return await prisma.notification.create({

    data:{

      userId,

      title,

      message,

      type,

      link,

    },

  });

};

export const getUserNotifications = async (userId) => {

  return await prisma.notification.findMany({

    where:{
      userId,
    },

    orderBy:{
      createdAt:"desc",
    },

  });

};

export const markAsRead = async (notificationId) => {

  return await prisma.notification.update({

    where:{
      id:notificationId,
    },

    data:{
      isRead:true,
    },

  });

};

export const markAllAsRead = async (userId) => {

  return await prisma.notification.updateMany({

    where:{
      userId,
      isRead:false,
    },

    data:{
      isRead:true,
    },

  });

};

export const notifyAdmins = async ({

  title,

  message,

  type,

  link = null,

}) => {

  const admins = await prisma.user.findMany({

    where:{
      role:"ADMIN",
    },

    select:{
      id:true,
    },

  });

  await prisma.notification.createMany({

    data:admins.map(admin=>({

      userId:admin.id,

      title,

      message,

      type,

      link,

    })),

  });

};

export const deleteNotification = async (
  notificationId
) => {

  await prisma.notification.delete({

    where: {
      id: notificationId,
    },

  });

};

export const clearNotifications = async (
  userId
) => {

  await prisma.notification.deleteMany({

    where: {
      userId,
    },

  });

};