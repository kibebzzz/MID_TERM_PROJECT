import cloudinary from "../config/cloudinary.js";

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded.",
      });
    }

    const file = req.file.buffer.toString("base64");

    // Default folder is "products" if none is provided
    const folder = req.body.folder || "products";

    const result = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${file}`,
      {
        folder: `palette/${folder}`,
      }
    );

    res.status(200).json({
      success: true,
      imageUrl: result.secure_url,
    });

  } catch (error) {
    console.error("Cloudinary Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};