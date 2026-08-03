import {
     getDashboardStats,
     getAllProducts,
     getAllUsers,
     updateUserRole,
     toggleUserStatus,
     getAnalytics,
     } from "../services/admin.service.js";

export const dashboard = async (req, res) => {

  try {

    const stats = await getDashboardStats();

    res.status(200).json({
      success: true,
      data: stats,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

export const getProducts = async (req, res) => {

  try {

    const products = await getAllProducts();

    res.status(200).json({
      success: true,
      data: products,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

export const getUsers = async (req, res) => {

  try {

    const users = await getAllUsers();

    res.status(200).json({
      success: true,
      data: users,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

export const updateRole = async (req, res) => {

  try {

    const { role } = req.body;

    const user = await updateUserRole(
      req.params.id,
      role
    );

    res.status(200).json({
      success: true,
      message: "User role updated.",
      data: user,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

export const toggleStatus = async (req, res) => {

  try {

    const user = await toggleUserStatus(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "User status updated.",
      data: user,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

export const analytics = async (req, res) => {

  try {

    const data = await getAnalytics();

    res.status(200).json({
      success: true,
      data,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};