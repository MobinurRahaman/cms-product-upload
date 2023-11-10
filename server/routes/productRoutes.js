const express = require("express");
const multer = require("multer");
const productController = require("../controllers/productController");

const router = express.Router();
const upload = multer();

router.post(
  "/upload-product",
  upload.array("images", 6),
  productController.uploadProduct
);
router.get("/products", productController.getProducts);

module.exports = router;
