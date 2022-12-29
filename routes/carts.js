const express = require("express");
const cartsRepo = require("../repositories/carts");

const router = express.Router();
// Receive a Post Request to add an item to a cart
router.post("/cart/products", async (req, res) => {
  // Figure out the cart!
  let cart;
  if (!req.session.cartId) {
    cart = await cartsRepo.create({ items: [] });
    req.session.cartId = cart.id;
  } else {
    cart = await cartsRepo.getOne(req.session.cartId);
  }

  console.log(cart);

  // Either increment quantity for existing product
  // OR add new product to items array

  res.send("Product Added to Cart");
});

module.exports = router;
