const express = require("express");

const router = express.Router();
// Receive a Post Request to add an item to a cart
router.post("/cart/products", async (req, res) => {
  console.log(req.body.productId);

  res.send("Product Added to Cart");
});

module.exports = router;
