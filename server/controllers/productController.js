const Product = require("../models/Product");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");

const uploadProduct = async (req, res) => {
  try {
    const { name, description, price, currency } = req.body;
    const images = req.files.map((file) => file.path);

    // Resize and store optimized images
    const optimizedImages = await Promise.all(
      req.files.map(async (file) => {
        const optimizedBuffer = await sharp(file.buffer)
          .resize({ width: 600, withoutEnlargement: true })
          .toFormat("jpeg")
          .toBuffer();

        const uniqueFilename = `${uuidv4()}.jpeg`;
        const newFilePath = path.join("uploads", uniqueFilename);

        await fs.promises.writeFile(newFilePath, optimizedBuffer);

        return newFilePath;
      })
    );

    // Save the product to MongoDB
    const product = new Product({
      name,
      description,
      price,
      currency,
      images: optimizedImages,
    });

    await product.save();

    // Send a 201 response upon successful save
    res.status(201).json({ message: "Product uploaded successfully" });
  } catch (error) {
    console.error(error);
    // Handle any errors, and send a 500 response for internal server error
    res
      .status(500)
      .json({ error: "An error occurred while uploading the product" });
  }
};

const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const products = await Product.find()
      .skip(skip)
      .limit(limit)
      .select("name images")
      .exec();

    const totalProducts = await Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / limit);

    res.json({
      products,
      page,
      totalPages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { uploadProduct, getProducts };
