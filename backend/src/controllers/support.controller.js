import {

  createTicket,

  getAllTickets,

  updateTicketStatus,

} from "../services/support.service.js";

export const create = async (req, res) => {

  try {

    const ticket = await createTicket(req.body);

    res.status(201).json({

      success: true,

      message: "Support ticket submitted successfully.",

      data: ticket,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

export const getAll = async (req, res) => {

  try {

    const tickets = await getAllTickets();

    res.json({

      success: true,

      data: tickets,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

export const updateStatus = async (req, res) => {

  try {

    const ticket = await updateTicketStatus(

      req.params.id,

      req.body.status

    );

    res.json({

      success: true,

      data: ticket,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};