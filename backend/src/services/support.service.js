import prisma from "../config/prisma.js";
import {
  notifyAdmins,
  createNotification,
} from "./notification.service.js";

export const createTicket = async (data) => {

  const ticket = await prisma.supportTicket.create({

    data: {

      subject: data.subject,

      category: data.category,

      message: data.message,

      userId: data.userId || null,

    },

    include: {

      user: {

        select: {

          id: true,

          fullName: true,

          email: true,

          role: true,

        },

      },

    },

  });

  await notifyAdmins({

    title: "New Support Ticket",

    message: `${
      ticket.user?.fullName || "A guest"
    } submitted a support request.`,

    type: "SUPPORT",

    link: "/admin/support",

  });

  return ticket;

};

export const getAllTickets = async () => {

  return await prisma.supportTicket.findMany({

    include: {

      user: {

        select: {

          id: true,

          fullName: true,

          email: true,

          role: true,

        },

      },

    },

    orderBy: {

      createdAt: "desc",

    },

  });

};

export const updateTicketStatus = async (

  ticketId,

  status

) => {

  const ticket =
    await prisma.supportTicket.update({

      where: {

        id: ticketId,

      },

      data: {

        status,

      },

    });

  if (ticket.userId) {

    await createNotification({

      userId: ticket.userId,

      title: "Support Ticket Updated",

      message:

        status === "RESOLVED"

          ? "Your support request has been resolved."

          : "Your support request is being reviewed.",

      type: "SUPPORT",

      link: "/help-center",

    });

  }

  return ticket;

};