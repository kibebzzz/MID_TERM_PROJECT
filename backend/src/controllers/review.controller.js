import {
  createReview,
  getProductReviews,
  updateReview,
  deleteReview,
} from "../services/review.service.js";

export const create = async (req, res) => {

  try {

    const review = await createReview(req.body);

    res.status(201).json({

      success: true,

      data: review,

    });

  } catch (error) {

    res.status(400).json({

      success: false,

      message: error.message,

    });

  }

};

export const getAll = async (req, res) => {

  try {

    const reviews =
      await getProductReviews(
        req.params.productId
      );

    res.json({

      success: true,

      data: reviews,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

export const update = async (req, res) => {

  try {

    const review = await updateReview(

      req.params.reviewId,

      req.body.buyerId,

      req.body

    );

    res.json({

      success: true,

      data: review,

    });

  } catch (error) {

    res.status(400).json({

      success: false,

      message: error.message,

    });

  }

};

export const remove = async (req, res) => {

  try {

    await deleteReview(

      req.params.reviewId,

      req.body.buyerId

    );

    res.json({

      success: true,

      message: "Review deleted.",

    });

  } catch (error) {

    res.status(400).json({

      success: false,

      message: error.message,

    });

  }

};