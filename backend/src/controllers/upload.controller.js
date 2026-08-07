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

    resource_type:
      req.file.mimetype.startsWith("audio/")
        ? "video"
        : "image",
  }
);

    res.status(200).json({
  success: true,
  fileUrl: result.secure_url,
  imageUrl: result.secure_url,
});

  } catch (error) {

  console.error(error);

  console.error(error.message);

  console.error(error.stack);

  res.status(500).json({
    success: false,
    message: error.message,
  });

}
};