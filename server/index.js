import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserModel from "./Models/UserModel.js";
import AddProductModel from "./Models/AddProductModel.js";
import CartModel from "./Models/CartModel.js";
import OrderModel from "./Models/OrderModel.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// ===== CORS configuration =====
const corsOptions = {
  origin: ["http://localhost:3003"], // السماح للـ React app
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], // السماح بكل الـ methods
  allowedHeaders: ["Content-Type", "Authorization"], // السماح بالـ headers المطلوبة
  credentials: true, // إذا كنت تستخدم الكوكيز أو الـ auth
};
app.use(cors(corsOptions));
// ================================

// Database connection
const connectString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@plantify.oax4307.mongodb.net/${process.env.DATABASE_NAME}?appName=plantify`;
mongoose.connect(connectString);

app.listen(process.env.PORT, () => {
  console.log("Server is Connected");
});

// ===== Routes =====

// Registration
app.post("/registerUser", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    const newUser = new UserModel({ name, email, password });
    await newUser.save();

    res.status(201).json({
      user: newUser,
      msg: "User registered successfully"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
});

// Login
app.post("/login", async (req, res) => { 
  try { 
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) { 
      res.status(400).send({ msg: "Couldn't find the user" });
    } else if (user.password !== password) {
      res.status(400).json({ msg: "Password is incorrect" });
    } else {
      res.send({ user: user, msg: "Authentication is successfull" });
    }
  } catch (error) { 
    res.status(400).json({ error: "An unexpected error occurred" });
  }
});

// Logout
app.post("/logout", async (req, res) => {
  res.send({ msg: "logout successful" });
});

// Add Product
app.post("/AddProduct", async (req, res) => {
  try {
    const { productCode, productName, productPrice, productQuantity, productDiscribtion, productImage, productCategory, email } = req.body;

    const product = new AddProductModel({
      productCode, productName, productPrice, productQuantity, productDiscribtion, productImage, productCategory, email
    });

    await product.save();
    res.send({ product, msg: "Added." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

// Get Products
app.get("/getProducts", async (req, res) => {
  try {
    const products = await AddProductModel.find({}).sort({ createdAt: -1 });
    const countProduct = await AddProductModel.countDocuments({});
    res.send({ products, count: countProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Like/Unlike Product
app.put("/likeProduct/:productId/", async (req, res) => {
  const productId = req.params.productId;
  const userId = req.body.userId;

  try {
    const productToUpdate = await AddProductModel.findOne({ _id: productId });

    if (!productToUpdate) {
      return res.status(404).json({ msg: "Product not found." });
    }

    const userIndex = productToUpdate.likes.users.indexOf(userId);

    if (userIndex !== -1) {
      const udpatedProduct = await AddProductModel.findOneAndUpdate(
        { _id: productId },
        { $inc: { "likes.count": -1 }, $pull: { "likes.users": userId } },
        { new: true }
      );
      res.json({ product: udpatedProduct, msg: "Product unliked." });
    } else {
      const udpatedProduct = await AddProductModel.findOneAndUpdate(
        { _id: productId },
        { $inc: { "likes.count": 1 }, $addToSet: { "likes.users": userId } },
        { new: true }
      );
      res.json({ product: udpatedProduct, msg: "Product liked." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Add to Cart
app.post("/addToCart", async (req, res) => {
  const { userId, productId } = req.body;
  try {
    let cart = await CartModel.findOne({ userId });

    if (cart) {
      const productIndex = cart.products.findIndex(p => p.productId == productId);
      if (productIndex !== -1) {
        cart.products[productIndex].quantity += 1;
      } else {
        cart.products.push({ productId, quantity: 1 });
      }
    } else {
      cart = new CartModel({ userId, products: [{ productId, quantity: 1 }] });
    }

    await cart.save();
    res.json({ cart, msg: "Product added to cart." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not add to cart" });
  }
});

// Get Cart
app.get("/getCart/:userId", async (req, res) => {
  try {
    const cart = await CartModel.findOne({ userId: req.params.userId }).populate("products.productId");
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cart" });
  }
});

// Update Cart Quantity
app.patch("/updateCartQuantity", async (req, res) => {
  const { userId, productId, action } = req.body;
  try {
    const cart = await CartModel.findOne({ userId });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
    if (productIndex === -1) return res.status(404).json({ error: "Product not found in cart" });

    const product = await AddProductModel.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found in inventory" });

    const currentQuantity = cart.products[productIndex].quantity;

    if (action === "increase") {
      if (currentQuantity >= product.productQuantity) return res.status(400).json({ error: "Not enough stock available" });
      cart.products[productIndex].quantity += 1;
    } else if (action === "decrease" && currentQuantity > 1) {
      cart.products[productIndex].quantity -= 1;
    }

    await cart.save();
    const updatedCart = await CartModel.findOne({ userId }).populate("products.productId");
    res.json({ cart: updatedCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update cart quantity" });
  }
});

// Create Order
app.post("/createOrder", async (req, res) => {
  try {
    const { userId, fullName, email, phone, deliveryAddress, paymentMethod, cardDetails } = req.body;
    const cart = await CartModel.findOne({ userId }).populate("products.productId");

    if (!cart || cart.products.length === 0) return res.status(400).json({ error: "Cart is empty" });

    const products = cart.products.map(item => ({
      code: item.productId.productCode,
      name: item.productId.productName,
      image: item.productId.productImage,
      quantity: item.quantity
    }));

    const totalItems = cart.products.reduce((sum, item) => sum + item.quantity, 0);
    const cartTotal = cart.products.reduce((sum, item) => sum + (item.quantity * item.productId.productPrice), 0);

    const tax = cartTotal * 0.05;
    const discount = cartTotal > 500 ? cartTotal * 0.03 : 0;
    const orderTotal = parseFloat((cartTotal + tax - discount).toFixed(2));

    const newOrder = new OrderModel({
      userId, fullName, email, phone, deliveryAddress, paymentMethod,
      cardDetails: paymentMethod === 'card' ? cardDetails : undefined,
      products, totalItems, orderTotal
    });

    await newOrder.save();
    await CartModel.findOneAndDelete({ userId });

    res.status(201).json({ order: newOrder, msg: "Order placed successfully and cart cleared." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to place order" });
  }
});

// Delete Product
app.delete("/deleteProduct/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    await AddProductModel.findByIdAndDelete(productId);
    res.status(200).json({ msg: "Product deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

// Update Product
app.put("/updateProduct/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProduct = await AddProductModel.findByIdAndUpdate(productId, req.body, { new: true });

    if (!updatedProduct) return res.status(404).json({ msg: "Product not found" });
    res.status(200).json({ product: updatedProduct, msg: "Product updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update product" });
  }
});

// Get User Orders
app.get("/orders/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await OrderModel.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Fetch orders error:", error);
    res.status(500).json({ error: "Failed to fetch order history" });
  }
});

// Remove from Cart
app.delete("/removeFromCart", async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const cart = await CartModel.findOne({ userId });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    cart.products = cart.products.filter(p => p.productId.toString() !== productId);
    await cart.save();

    const updatedCart = await CartModel.findOne({ userId }).populate("products.productId");
    res.json({ cart: updatedCart, msg: "Product removed from cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to remove product from cart" });
  }
});

// Get All Orders (Admin)
app.get("/orders", async (req, res) => {
  try {
    const orders = await OrderModel.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});
